import React from "react";
import { WithPlaceHolder } from "types/WithPlaceHolder";
import { FormInputProps } from "../Form";

export const AuthFormInputText = (props: FormInputProps<string> & WithPlaceHolder) =>
{
  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => props.setValue(e.currentTarget.value);

  return (
    <input
      className="stretch"
      type="text"
      value={props.value ?? ""}
      onInput={onInput}
      placeholder={props.placeHolder}
      onFocus={props.onFocusIn}
      onBlur={props.onFocusOut}
    ></input>
  )
}