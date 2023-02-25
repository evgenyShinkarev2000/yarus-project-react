import React, { useContext, useEffect, useState } from "react";
import { WithNested } from "types/WithChildren";
import { IValidator } from "validators/IValidator";
import { FormContext } from "./FormContainer";

export const FormFieldContext = React.createContext({} as FormFieldContextType<any>);

export type FieldAppearance = "error" | "ok" | "unset";
export type MessageType = "ok" | "error" | "details";
export type ShowMessageWhen =
  (params: { isTouched: boolean, isDirty: boolean, hasFocusedOut: boolean, hasError: boolean }) => boolean;

type FormFieldContextType<T> = {
  value: T,
  setValue(value: T): void,
  messages: { messageType: MessageType, message: string }[],
  onFocusOut(): void,
  onFocusIn(): void,
  fieldAppearance: FieldAppearance,
};
type FormFieldContainerProps<T> = {
  name: string,
  validators?: IValidator<T>[],
  showErrorWhen?: ShowMessageWhen,
  showInfo?: boolean,
  showSuccessfulWhen?: ShowMessageWhen,
} & WithNested

export const FormFieldContainer = <T,>(props: FormFieldContainerProps<T>) =>
{
  const [, setInputValue] = useState<any>(); // тригерит ререндер при вводе
  const {value, setValue, setIsValid,} = useContext(FormContext).registerField(props.name, setInputValue);

  const [isTouched, setIsTouched] = useState(false);
  const [isDirty, setIsDirty] = useState(!!value);
  const [hasFocusedOut, setHasFocusedOut] = useState(false);

  const validate = () => {
    props.validators?.forEach(validator => validator.validate(value));
  }

  validate();
  const errorMessages = props.validators?.filter(validator => !validator.isFieldValid).map(validator => validator.message) ?? [];
  const successfulMessages = props.validators?.filter(validator => validator.isFieldValid).map(validator => validator.message) ?? [];
  const hasError = errorMessages.length > 0;

  useEffect(() => setIsValid(!hasError));

  const showError = !!props.showErrorWhen?.({isTouched, isDirty, hasFocusedOut, hasError });
  const showSuccessful = !!props.showSuccessfulWhen?.({isTouched, isDirty, hasFocusedOut, hasError});
  const showInfo = !showError && props.showInfo;
  const messages: { messageType: MessageType, message: string }[] = [];

  if (showInfo){
    errorMessages.forEach(errorMessage => messages.push({messageType: "details", message: errorMessage}));
  } 
  else if (showError){
    errorMessages.forEach(errorMessage => messages.push({messageType: "error", message: errorMessage}));
  }

  if (showSuccessful){
    successfulMessages.forEach(successfulMessage => messages.push({messageType: "ok", message: successfulMessage}));
  }

  const wasInteractionWithField = isTouched || isDirty || hasFocusedOut;
  const fieldAppearance: FieldAppearance = showError && hasError ? "error" : !hasError &&  wasInteractionWithField ? "ok" : "unset"; 

  const setValueAndNotify = (value: T) =>
  {
    setIsDirty(true);
    setValue(value);
  }
  
  const formFieldContext: FormFieldContextType<T> = {
    value: value,
    setValue: setValueAndNotify,
    onFocusOut: () => {
      setHasFocusedOut(true);
    },
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