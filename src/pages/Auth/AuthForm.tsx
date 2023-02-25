import { AuthFormFieldHoc } from "components/forms/auth/AuthFormFieldHoc";
import { AuthFormFieldTemplate } from "components/forms/auth/AuthFormFieldTemplate";
import { AuthFormInputText } from "components/forms/auth/AuthFormInputText";
import { AuthFormSubmitButton } from "components/forms/auth/AuthFormSubmitButton";
import { AuthFormTemplate } from "components/forms/auth/AuthFormTemplate";
import { FormContainer } from "components/forms/FormContainer";
import { FormFieldContainer } from "components/forms/FormFieldContainer";
import { nameof } from "extensions/Nameof";
import { useState } from "react";
import { RequiredValidator } from "validators/RequiredValidator";



export type AuthFormData = {
  login: string,
  password: string,
}

type AuthFormProps = {
  onSubmit(authFormData: AuthFormData): void;
}

export function AuthForm(props: AuthFormProps)
{
  const [fieldsState] = useState<{[key: string]: any}>({});

  const buildAuthData = () =>
  {
    const login = fieldsState[nameof<AuthFormData>("login")];
    const password = fieldsState[nameof<AuthFormData>("password")];
    if (!login || !password)
    {
      throw new Error("Fileds login or password not found");
    }

    return {
      login: login.value,
      password: password.value,
    }
  }

  const submitButtonClick = () =>
  {
    props.onSubmit(buildAuthData());
  };

  return (
    <FormContainer state={fieldsState}>
      <AuthFormTemplate>
        <AuthFormFieldHoc type="login" name={nameof<AuthFormData>("login")} placeHolder="Логин"></AuthFormFieldHoc>
        <AuthFormFieldHoc type="password" name={nameof<AuthFormData>("password")} placeHolder="Пароль"></AuthFormFieldHoc>
        <FormFieldContainer name="test" showInfo={true} validators={[new RequiredValidator()]} showErrorWhen={(params) => params.isDirty }>
          <AuthFormFieldTemplate>
            <AuthFormInputText placeHolder="Имя"></AuthFormInputText>
          </AuthFormFieldTemplate>
        </FormFieldContainer>
        <AuthFormSubmitButton onClick={submitButtonClick}>Войти</AuthFormSubmitButton>
      </AuthFormTemplate>
    </FormContainer>
  )
}