import React, { useContext } from "react";
import { FieldAppearance, FormFieldContext, MessageType } from "../FormFieldContainer";
import styles from "./AuthFormFieldTemplate.module.scss";

export const AuthFormFieldTemplate = ({ children }: { children: React.ReactElement | React.ReactElement[] }) =>
{
  const { messages, fieldAppearance } = useContext(FormFieldContext);

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
      <div className={`${styles.inputContainer} ${styles[fieldAppearanceClassSelector(fieldAppearance)]}`}>
        {children}
      </div>
      {messages.length > 0 &&
        <div className={styles.messages}>
          {messages.map((message, index) =>
          {
            return (<div className={styles[messageClassSelector(message.messageType)]} key={index}>{message.message}</div>)
          })}
        </div>}
    </div>
  )
}