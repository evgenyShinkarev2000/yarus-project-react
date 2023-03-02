import React, { useContext } from "react";
import { FormSubmitButtonProps } from "./Form";
import { FormContext } from "./FormContainer";

export const FormSubmitButtonActivator = (
  props: {
    activate: (JSX.Element) | (React.JSXElementConstructor<any>),
    props?: object,
    children?: React.ReactNode,
    disabledClassName?: string,
  }) =>
{
  const context = useContext(FormContext);

  if (React.isValidElement(props.activate))
  {
    const cloneProps: React.ButtonHTMLAttributes<HTMLButtonElement> = {
      ...props.props,
      onClick: (e: React.MouseEvent<HTMLButtonElement>) => context.onSubmit(),
      className: props.disabledClassName ?? "disabled",
    }

    return (
      <>
        {
          React.cloneElement(props.activate, cloneProps, props.children)
        }
      </>
    )
  }

  const createProps: FormSubmitButtonProps = {
    ...props.props,
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => context.onSubmit(),
    isDisabled: !context.isFormValid,
  }

  return (
    <>
      {React.createElement(props.activate as (...params: any[]) => React.ReactElement, createProps, props.children)}
    </>
  )
}