import { useEffect } from "react";
import { WithNested } from "types/WithChildren";
import { FieldAppearance, MessageType } from "../Form";
import styles from "./AuthFormFieldTemplate.module.scss";

type AuthFormFieldTemplateProps = {
  messages: Array<{messageType: MessageType, message: string}>,
  fieldAppearance: FieldAppearance
} & WithNested

export const AuthFormFieldTemplate = (props: AuthFormFieldTemplateProps) =>
{
  const fieldAppearanceClassSelector = (fieldAppearance: FieldAppearance) => {
    const selector: {[key in FieldAppearance]: string} = {
      ok: "ok",
      error: "error",
      unset: "unset",
    }

    return selector[fieldAppearance];
  }

  const messageClassSelector = (messageType: MessageType) => 
  {
    const selector: {[key in MessageType]: string} = {
      ok: "ok",
      details: "details",
      error: "error",
    }

    return selector[messageType];
  };

  return (
    <div className={styles.fieldTemplate}>
      <div className={`${styles.inputContainer} ${styles[fieldAppearanceClassSelector(props.fieldAppearance)]}`}>
        {props.children}
      </div>
      {props.messages.length > 0 &&
        <div className={styles.messages}>
          {props.messages.map((message, index) =>
          {
            return (<div className={styles[messageClassSelector(message.messageType)]} key={index}>{message.message}</div>)
          })}
        </div>}
    </div>
  )
}