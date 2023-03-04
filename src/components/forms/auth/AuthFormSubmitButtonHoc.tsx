import { FormSubmitButtonActivator } from "../FormSubmitButtonActivator"
import { AuthFormSubmitButton } from "./AuthFormSubmitButton"

export const AuthFormSubmitButtonHoc = (props: {name?: string, children?: never}) => {
  return (
    <FormSubmitButtonActivator activate={AuthFormSubmitButton}>
      {props.name}
    </FormSubmitButtonActivator>
  )
}