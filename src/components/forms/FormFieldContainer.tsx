import React, { useContext, useEffect, useId, useMemo, useRef, useState } from "react";
import { WithNested } from "types/WithChildren";
import { IValidator } from "validators/IValidator";
import { FieldAppearance, FormInputProps, MessageType, ShowMessageWhen, ValidationMessages } from "./Form";
import { FormContext } from "./FormContainer";

export const FormFieldContext = React.createContext({} as FormFieldContextType<any>);

export type FormFieldContextType<T> = {
  messages: ValidationMessages
  fieldAppearance: FieldAppearance,
} & FormInputProps<T>;

export type FormFieldContainerProps<T> = {
  fieldName: string,
  validators?: IValidator<T>[],
  showErrorWhen?: ShowMessageWhen,
  showInfo?: boolean,
  showSuccessfulWhen?: ShowMessageWhen,
} & WithNested

export const FormFieldContainer = <T,>(props: FormFieldContainerProps<T>) =>
{
  const [, notifyStateChange] = useState(false); // тригерит ререндер при вводе
  const forceUpdate = () => notifyStateChange((prev) => !prev); // чтобы перерендерился, нужно новое значение
  const inputChangeCallback = () => // состояние input хранится в FormContainer
  {
    const value = getValue();
    props.validators?.forEach(validator => validator.validate(value));
    forceUpdate();
  }

  const formContext = useContext(FormContext);
  const { getValue, setValue, setIsValid, } =
    useMemo(() => {
      const fieldHandlers = formContext.registerField(props.fieldName, inputChangeCallback);
      const value = fieldHandlers.getValue();
      props.validators?.forEach(validator => validator.validate(value));

      return fieldHandlers

    }, [props.fieldName, formContext.registerField]);

  const [isTouched, setIsTouched] = useState(false);
  const [isDirty, setIsDirty] = useState(!!getValue());
  const [hasFocusedOut, setHasFocusedOut] = useState(false);

  const errorMessages = props.validators?.filter(validator => !validator.isFieldValid).map(validator => validator.message) ?? [];
  const successfulMessages = props.validators?.filter(validator => validator.isFieldValid).map(validator => validator.message) ?? [];
  const hasError = errorMessages.length > 0;

  useEffect(() => setIsValid(!hasError));

  const showError = !!props.showErrorWhen?.({ isTouched, isDirty, hasFocusedOut, hasError });
  const showSuccessful = !!props.showSuccessfulWhen?.({ isTouched, isDirty, hasFocusedOut, hasError });
  const showInfo = !showError && props.showInfo;
  const messages: { messageType: MessageType, message: string }[] = [];

  if (showInfo)
  {
    errorMessages.forEach(errorMessage => messages.push({ messageType: "details", message: errorMessage }));
  }
  else if (showError)
  {
    errorMessages.forEach(errorMessage => messages.push({ messageType: "error", message: errorMessage }));
  }

  if (showSuccessful)
  {
    successfulMessages.forEach(successfulMessage => messages.push({ messageType: "ok", message: successfulMessage }));
  }

  const wasInteractionWithField = isTouched || isDirty || hasFocusedOut;
  const fieldAppearance: FieldAppearance = showError && hasError ? "error" : !hasError && wasInteractionWithField ? "ok" : "unset";

  const setValueAndDirty = (value: T) =>
  {
    setIsDirty(true);
    setValue(value);
  }

  const formFieldContext: FormFieldContextType<T> = {
    value: getValue(),
    setValue: setValueAndDirty,
    onFocusOut: () => setHasFocusedOut(true),
    messages,
    onFocusIn: () => setIsTouched(true),
    fieldAppearance,
  };

  return (
    <FormFieldContext.Provider value={formFieldContext}>
      {props.children}
    </FormFieldContext.Provider>
  )
}