import { nameof } from "extensions/Nameof";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { WithNested } from "types/WithChildren";
import { FormFieldContainerProps } from "./FormFieldContainer";

type DoRegisterField<T> = (fieldName: string, notifyInputChange: () => void) => GetValueSetValueSetValid<T>;
type ValueSetValueObj<T> = { getValue: () => T, setValue: (value: T) => void };
type GetValueSetValueSetValid<T> = ValueSetValueObj<T> & { setIsValid: (isValid: boolean) => void };

export type FormContainerProps<T extends { [key: string]: any }> = {
  onSubmit?(model: T): void,
  modelState?: T,
  mutable?: any,
} & WithNested;

type FormContextType<T> = { registerField: DoRegisterField<T>, isFormValid: boolean, onSubmit: () => void };
type InnerModel = { [key: string]: { isValid: boolean, value: any, notifyInputChange: () => void } };

export const FormContext
  = React.createContext({} as FormContextType<any>);

export function FormContainer<FormModel extends { [key: string]: any }>(props: FormContainerProps<FormModel>)
{
  useEffect(() => checkDublicatedNames(props.children), []);

  const innerModel = useMemo(() => props.modelState ? mapFormModelToInnerModel(props.modelState) : {}, [props.modelState]);
  const [isFormValid, setIsFormValid] = useState(false);

  const registerField = useCallback(buildRegisterField(innerModel, setIsFormValid), [innerModel]);

  const onSubmit = () =>
    props.onSubmit?.(mapInnerModelToFormModel<FormModel>(innerModel));

  return (
    <FormContext.Provider value={{ registerField, isFormValid, onSubmit }}>
      {props.children}
    </FormContext.Provider>
  )
}

function buildRegisterField<T>(innerModel: InnerModel, setIsFormValid: (isValid: boolean) => void): DoRegisterField<T>
{
  return (fieldName: string, notifyInputChange: () => void): GetValueSetValueSetValid<T> =>
  {
    if (!(fieldName in innerModel))
    {
      innerModel[fieldName] = { isValid: true, value: undefined, notifyInputChange };
    }

    return {
      setIsValid: (isValid: boolean) =>
      {
        innerModel[fieldName].isValid = isValid;
        setIsFormValid(Object.values(innerModel).map(v => v.isValid).every(iv => iv));
      },
      getValue: () => innerModel[fieldName].value,
      setValue: (value: T) =>
      {
        innerModel[fieldName].value = value;
        notifyInputChange();
      }
    };
  }
}

function checkDublicatedNames(element?: React.ReactElement | string | React.ReactElement[])
{
  const names: string[] = [];
  checkDublicatedNamesRecursive(names, element);
  const namePairCount: { [key: string]: number } = {};
  names.forEach(name =>
  {
    if (name in namePairCount)
    {
      namePairCount[name] += 1;
    }
    else
    {
      namePairCount[name] = 1;
    }
  });
  const repeatedNamesEntries = Object.entries(namePairCount).filter(pair => pair[1] > 1);
  if (repeatedNamesEntries.length > 0)
  {
    const repeatedPairCount = Object.fromEntries(repeatedNamesEntries);
    console.log("Form with fields names", names, "contains repeated names", repeatedPairCount);
  }
}

function checkDublicatedNamesRecursive(names: string[], element?: React.ReactElement | string | React.ReactElement[]): void
{
  if (!element || typeof element === "string")
  {
    return;
  }
  if (Array.isArray(element))
  {
    element.forEach(e => checkDublicatedNamesRecursive(names, e));

    return;
  }
  const propName = nameof<FormFieldContainerProps<any>>("fieldName");
  if (propName in element.props)
  {
    names.push(element.props[propName]);
  }
  checkDublicatedNamesRecursive(names, element.props?.children);
}

function mapFormModelToInnerModel<T extends { [key: string]: any }>(formModel: T): InnerModel
{
  const mapedEntries = Object.entries(formModel).map(entry =>
  {
    const [key, value] = entry;

    return [key, { value, isValid: true }];
  });

  return Object.fromEntries(mapedEntries);
}

function mapInnerModelToFormModel<FormModel extends { [key: string]: any }>(innerModel: InnerModel): FormModel
{
  const modelEntries = Object.entries(innerModel).map(entry => [entry[0], entry[1].value]);

  return Object.fromEntries(modelEntries);
}