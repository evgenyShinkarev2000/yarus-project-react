import React, { useContext } from "react";
import { WithPlaceHolder } from "types/WithPlaceHolder";
import { FormFieldContext } from "../FormFieldContainer";

export const AuthFormInputText = ({ placeHolder }: WithPlaceHolder) =>
{
  const { value, setValue, onFocusIn, onFocusOut } = useContext(FormFieldContext);
  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => 
  {
    setValue(e.currentTarget.value);
  }

  return (
    <input
      className="stretch"
      type="text"
      value={value ?? ""}
      onInput={onInput}
      placeholder={placeHolder}
      onFocus={onFocusIn}
      onBlur={onFocusOut}
    ></input>
  )
}