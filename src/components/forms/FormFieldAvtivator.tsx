import React, { useContext } from "react";
import { FormFieldContext } from "./FormFieldContainer";

// (...params: any[]) => React.ReactElement
export const FormFieldActivator = (props: { activate: (JSX.Element) | (React.JSXElementConstructor<any>), props?: object, children?: React.ReactNode }) =>
{
  const context = useContext(FormFieldContext);

  if (React.isValidElement(props.activate))
  {
    const cloneProps: React.InputHTMLAttributes<HTMLInputElement> = {
      ...props.props,
      value: context.value ?? "",
      onInput: (e: React.ChangeEvent<HTMLInputElement>) => context.setValue(e.currentTarget.value),
      onFocus: context.onFocusIn,
      onBlur: context.onFocusOut,
    }

    return (
      <>
        {
        React.cloneElement(props.activate, cloneProps, props.children)
        }
      </>
    )
  }

  const createProps = {
    ...props.props,
    ...context,
  }
  
  return (
    <>
      {React.createElement(props.activate as (...params: any[]) => React.ReactElement, createProps, props.children)}
    </>
  )
}