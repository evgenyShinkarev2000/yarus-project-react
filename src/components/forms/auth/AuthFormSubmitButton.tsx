import { WithNested } from "types/WithChildren";
import { FormSubmitButtonProps } from "../Form";
import styles from "./AuthFormSubmitButton.module.scss";

export const AuthFormSubmitButton = (props: FormSubmitButtonProps & WithNested) =>
{
  return (
    <button className={`${styles.submitBtn} ${props.isDisabled ? styles.disabled : ""}`} onClick={props.onClick}>{props.children}</button>
  )
}