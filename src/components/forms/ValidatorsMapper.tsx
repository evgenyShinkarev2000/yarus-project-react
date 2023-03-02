import React from "react"
import { IValidator } from "validators/IValidator"
import { MinLengthValidator } from "validators/LengthValidator"
import { RequiredValidator } from "validators/RequiredValidator"
import { ShowMessageWhen } from "./Form"
import { FormContainer } from "./FormContainer"
import { FormFieldContainerProps } from "./FormFieldContainer"

export type ValidatorMapName = {
  minLength?: number,
  Required?: any,
}

export type InputUserInterraction = "touched" | "dirty" | "focusedOut";
export type ShowSuccessfulInterraction = "always" | InputUserInterraction | "error";

export type ValidatorShowMapName = {
  showInfo?: boolean,
  showErrorWhen?: InputUserInterraction,
  showSuccessfulWhen?: ShowSuccessfulInterraction,
}

type ValidatorMappersProps = {
  children: React.ReactElement<FormFieldContainerProps<any>, typeof FormContainer>,
} & ValidatorMapName & ValidatorShowMapName

export const ValidatorsMapper = (props: ValidatorMappersProps) =>
{
  const validators: IValidator<any>[] = [];
  if (props.minLength)
  {
    validators.push(new MinLengthValidator(props.minLength));
  }
  if (props.Required !== undefined)
  {
    validators.push(new RequiredValidator());
  }

  const showErrorMessageWhen = props.showErrorWhen ? selectShowErrorMessageWhen(props.showErrorWhen) : undefined;
  const showSuccessfulWhen = props.showSuccessfulWhen ? selectShowSeccessfulMessageWhen(props.showSuccessfulWhen) : undefined;

  const propsWithValidators: FormFieldContainerProps<any> = {
    ...props.children.props,
    validators,
    showErrorWhen: showErrorMessageWhen,
    showInfo: props.showInfo,
    showSuccessfulWhen,
  }

  return React.cloneElement(props.children, propsWithValidators);
}

function selectShowErrorMessageWhen(interraction: InputUserInterraction): ShowMessageWhen
{
  const selector: {[key in InputUserInterraction]: ShowMessageWhen} = {
    dirty: (params) => params.isDirty && params.hasError,
    touched: (params) => params.isTouched && params.hasError,
    focusedOut: (params) => params.hasFocusedOut && params.hasError,
  }

  return selector[interraction];
}

function selectShowSeccessfulMessageWhen(interraction: ShowSuccessfulInterraction): ShowMessageWhen
{
  const selector: {[key in ShowSuccessfulInterraction]: ShowMessageWhen} = {
    always: (params) => !params.hasError,
    error: (params) => params.hasError,
    dirty: (params) => params.isDirty && !params.hasError,
    touched: (params) => params.isTouched && !params.hasError,
    focusedOut: (params) => params.hasFocusedOut && !params.hasError,
  }
  
  return selector[interraction];
}