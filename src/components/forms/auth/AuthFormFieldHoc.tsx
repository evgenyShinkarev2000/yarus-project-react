import { WithPlaceHolder } from "types/WithPlaceHolder";
import { FormFieldContainer } from "../FormFieldContainer";
import { AuthFormInputPassword } from "./AuthFormInputPassword";
import { AuthFormFieldTemplate } from "./AuthFormFieldTemplate";
import { AuthFormInputText } from "./AuthFormInputText";

type SupportedInputType = "login" | "password";

type AuthFormFieldHocProps = {
  type: SupportedInputType,
  name: string,
} & WithPlaceHolder

export const AuthFormFieldHoc = (props: AuthFormFieldHocProps) =>
{
  const templateBuilder = (children: React.ReactElement) => (
    <FormFieldContainer name={props.name}>
      <AuthFormFieldTemplate>
        {children}
      </AuthFormFieldTemplate>
    </FormFieldContainer>
  );

  switch (props.type)
  {
    case "login":
      return (
        <>
          {templateBuilder(<AuthFormInputText placeHolder={props.placeHolder} />)}
        </>
      )
    case "password":
      return (
        <>
          {templateBuilder(<AuthFormInputPassword placeHolder={props.placeHolder} />)}
        </>
      )
    default:
      throw new Error("Not supported");
  }
}