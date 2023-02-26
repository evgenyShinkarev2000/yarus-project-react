import { AuthFormFieldHoc } from "components/forms/auth/AuthFormFieldHoc";
import { AuthFormFieldTemplate } from "components/forms/auth/AuthFormFieldTemplate";
import { AuthFormInputText } from "components/forms/auth/AuthFormInputText";
import { AuthFormSubmitButton } from "components/forms/auth/AuthFormSubmitButton";
import { AuthFormTemplate } from "components/forms/auth/AuthFormTemplate";
import { FormContainer } from "components/forms/FormContainer";
import { FormFieldActivator } from "components/forms/FormFieldAvtivator";
import { FormFieldContainer } from "components/forms/FormFieldContainer";
import { TestFormField } from "components/forms/test/TestFormField";
import { nameof } from "extensions/Nameof";
import { useState } from "react";
import { MinLengthValidator } from "validators/LengthValidator";
import { RequiredValidator } from "validators/RequiredValidator";



export type AuthFormModel = {
  login: string,
  password: string,
}

type AuthFormProps = {
  onSubmit(authFormData: AuthFormModel): void;
}

export function AuthForm(props: AuthFormProps)
{
  const [initialState] = useState({login: "123", password:"13273"} as AuthFormModel);

  return (
    <FormContainer<AuthFormModel> onSubmit={props.onSubmit} initialState={initialState}>
      <AuthFormTemplate>
        <AuthFormFieldHoc type="login" name={nameof<AuthFormModel>("login")} placeHolder="Логин"></AuthFormFieldHoc>
        <AuthFormFieldHoc type="password" name={nameof<AuthFormModel>("password")} placeHolder="Пароль"></AuthFormFieldHoc>
        <FormFieldContainer name="name" showInfo={true} validators={[new RequiredValidator()]} showErrorWhen={(params) => params.isDirty }>
          <AuthFormFieldTemplate>
            <AuthFormInputText placeHolder="Имя"></AuthFormInputText>
          </AuthFormFieldTemplate>
        </FormFieldContainer>
        <FormFieldContainer name="test" showInfo={true} validators={[new MinLengthValidator(4)]} showErrorWhen={(params) => params.hasFocusedOut}>
          <AuthFormFieldTemplate>
            <FormFieldActivator activate={TestFormField} props={{}}></FormFieldActivator>
          </AuthFormFieldTemplate>
        </FormFieldContainer>
        <FormFieldContainer name="activate input" validators={[new MinLengthValidator(3)]} showErrorWhen={(params) => params.isTouched}>
          <AuthFormFieldTemplate>
            <FormFieldActivator activate={<input></input>}></FormFieldActivator>
          </AuthFormFieldTemplate>
        </FormFieldContainer>
        <AuthFormSubmitButton>Войти</AuthFormSubmitButton>
      </AuthFormTemplate>
    </FormContainer>
  )
}