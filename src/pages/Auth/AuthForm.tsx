import { AuthForm } from "components/forms/Form";
import { nameof } from "extensions/Nameof";
import { useState } from "react";
import { useSelector } from "react-redux";

export type LoginModel = {
  login: string,
  password: string,
}

type LoginFormProps = {
  onSubmit(authFormData: LoginModel): void;
}

export function LoginForm(props: LoginFormProps)
{
  return (
    <AuthForm.Template<LoginModel> onSubmit={props.onSubmit}>
      <AuthForm.FieldHoc minLength={5} type="login" fieldName={nameof<LoginModel>("login")} placeHolder="Логин" Required />
      <AuthForm.FieldHoc type="password" fieldName={nameof<LoginModel>("password")} placeHolder="Пароль" />
      <AuthForm.SubmitButtonHoc name="Войти"/>
    </AuthForm.Template>
  )
} 