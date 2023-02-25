import { useContext } from "react";
import { WithNested } from "types/WithChildren";
import { FormContext } from "../FormContainer";
import styles from "./AuthFormSubmitButton.module.scss";


type AuthFormSubmitButtonProps = {
  onClick(): void,
} & WithNested


export const AuthFormSubmitButton = (props: AuthFormSubmitButtonProps) =>
{
  const {isFormValid} = useContext(FormContext);

  return (
    <button className={`${styles.submitBtn} ${!isFormValid ? styles.disabled : ""}`} onClick={props.onClick}>{props.children}</button>
  )
}