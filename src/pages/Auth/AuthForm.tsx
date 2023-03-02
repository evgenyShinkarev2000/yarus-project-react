import { AuthForm } from "components/forms/Form";
import { nameof } from "extensions/Nameof";
import { useState } from "react";

export type AuthFormModel = {
  login: string,
  password: string,
}

type AuthFormProps = {
  onSubmit(authFormData: AuthFormModel): void;
}

export function LoginForm(props: AuthFormProps)
{
  const [initialState] = useState({} as AuthFormModel);

  return (
    <AuthForm.Template<AuthFormModel> onSubmit={props.onSubmit} initialState={initialState}>
      <AuthForm.FieldHoc minLength={5} type="login" name={nameof<AuthFormModel>("login")} placeHolder="Логин" Required />
      <AuthForm.FieldHoc type="password" name={nameof<AuthFormModel>("password")} placeHolder="Пароль" />
      <AuthForm.SubmitButtonHoc name="Войти"></AuthForm.SubmitButtonHoc>
    </AuthForm.Template>
  )
} 