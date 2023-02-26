import React from "react";
import { FormFieldContextType } from "../FormFieldContainer";

export const TestFormField = (props: FormFieldContextType<string>) => {
  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setValue(e.currentTarget.value);
  }

  return (
  <>
  <input type="text" value={props.value ?? ""} onInput={onInput} onFocus={props.onFocusIn} onBlur={props.onFocusOut} placeholder="test"></input>
  </>)
  
}