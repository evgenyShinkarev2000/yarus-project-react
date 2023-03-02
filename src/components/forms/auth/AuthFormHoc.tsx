import { FormModel } from "../Form"
import { FormContainerProps } from "../FormContainer"
import { AuthFormTemplate } from "./AuthFormTemplate"

export const AuthFormHoc = <T extends { [key: string]: any }>(props: FormContainerProps<T>) =>
{
  return (
    <FormModel.Container<T> onSubmit={props.onSubmit} initialState={props.initialState}>
      <AuthFormTemplate>
        {props.children}
      </AuthFormTemplate>
    </FormModel.Container>
  )
}