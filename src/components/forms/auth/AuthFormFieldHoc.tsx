import { WithPlaceHolder } from "types/WithPlaceHolder";
import { FormFieldActivator } from "../FormFieldAvtivator";
import { FormFieldContainer } from "../FormFieldContainer";
import { InputUserInterraction, ShowSuccessfulInterraction, ValidatorMapName, ValidatorsMapper } from "../ValidatorsMapper";
import { AuthFormFieldTemplate } from "./AuthFormFieldTemplate";
import { AuthFormInputPassword } from "./AuthFormInputPassword";
import { AuthFormInputText } from "./AuthFormInputText";

type SupportedInputType = "login" | "password";

type AuthFormFieldHocProps = {
  type: SupportedInputType,
  fieldName: string,
  showInfo?: boolean,
  showErrorWhen?: InputUserInterraction,
  showSuccessfulWhen?: ShowSuccessfulInterraction,
  children?: never,
} & WithPlaceHolder & ValidatorMapName

export const AuthFormFieldHoc = (props: AuthFormFieldHocProps) =>
{
  const templateBuilder = (children: React.JSXElementConstructor<any>) => (
    <ValidatorsMapper
      Required={props.Required}
      minLength={props.minLength}
      showErrorWhen={props.showErrorWhen ?? "dirty"}
      showInfo={props.showInfo ?? false}
      showSuccessfulWhen={props.showSuccessfulWhen ?? "error"}
    >
      <FormFieldContainer fieldName={props.fieldName}>
        <FormFieldActivator activate={AuthFormFieldTemplate}>
          <FormFieldActivator activate={children} props={{ placeHolder: props.placeHolder }} />
        </FormFieldActivator>
      </FormFieldContainer>
    </ValidatorsMapper>
  );

  switch (props.type)
  {
    case "login":
      return (
        <>
          {templateBuilder(AuthFormInputText)}
        </>
      )
    case "password":
      return (
        <>
          {templateBuilder(AuthFormInputPassword)}
        </>
      )
    default:
      throw new Error("Not supported");
  }
}