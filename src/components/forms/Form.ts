import { AuthFormSubmitButtonHoc } from './auth/AuthFormSubmitButtonHoc';
import { AuthFormHoc } from './auth/AuthFormHoc';
import { AuthFormSubmitButton } from './auth/AuthFormSubmitButton';
import { AuthFormInputPassword } from './auth/AuthFormInputPassword';
import { AuthFormInputText } from './auth/AuthFormInputText';
import { AuthFormFieldTemplate } from 'components/forms/auth/AuthFormFieldTemplate';
import { AuthFormTemplate } from 'components/forms/auth/AuthFormTemplate';
import { FormFieldActivator } from 'components/forms/FormFieldAvtivator';
import { AuthFormFieldHoc } from './auth/AuthFormFieldHoc';
import { FormContainer } from "./FormContainer";
import { FormFieldContainer } from "./FormFieldContainer";
import { ValidatorsMapper } from './ValidatorsMapper';

export const FormModel = {
  Container: FormContainer,
  Field: {
    Container: FormFieldContainer,
    Activator: FormFieldActivator,
    ValidatorsMapper
  },
}
export const AuthForm = {
  Template: AuthFormHoc,
  FieldHoc: AuthFormFieldHoc,
  Components: {
    FormTemplate: AuthFormTemplate,
    FieldTemplate: AuthFormFieldTemplate,
    InputText: AuthFormInputText,
    InputPassword: AuthFormInputPassword,
    SubmitButton: AuthFormSubmitButton,
  },
  SubmitButtonHoc: AuthFormSubmitButtonHoc,
}

export type FieldAppearance = "error" | "ok" | "unset";

export type MessageType = "ok" | "error" | "details";

export type ShowMessageWhen =
  (params: { isTouched: boolean, isDirty: boolean, hasFocusedOut: boolean, hasError: boolean }) => boolean;

export type ValidationMessages = Array<{messageType: MessageType, message: string}>;

export type FormInputProps<T> = {
  value: T,
  setValue(value: T): void,
  onFocusOut(): void,
  onFocusIn(): void,
}

export type FormSubmitButtonProps = {
  onClick(e: React.MouseEvent<HTMLButtonElement> | undefined): void,
  isDisabled: boolean,
}
