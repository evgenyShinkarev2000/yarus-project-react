import { useContext } from "react";
import { WithNested } from "types/WithChildren";
import { FormContext } from "../FormContainer";
import styles from "./AuthFormSubmitButton.module.scss";


type AuthFormSubmitButtonProps = WithNested;


export const AuthFormSubmitButton = (props: AuthFormSubmitButtonProps) =>
{
  const {isFormValid, onSubmit} = useContext(FormContext);

  return (
    <button className={`${styles.submitBtn} ${!isFormValid ? styles.disabled : ""}`} onClick={onSubmit}>{props.children}</button>
  )
}