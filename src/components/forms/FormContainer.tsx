import React, { useRef, useState } from "react";
import { WithNested } from "types/WithChildren";

type RegisterField<T> = (fieldName: string, setValue: T) => ValueSetValueSetValid<T>;
type ValueSetValueObj<T> = { value: T, setValue: (value: T) => void };
type ValueSetValueSetValid<T> = ValueSetValueObj<T> & { setIsValid: (isValid: boolean) => void };

export type FormContainerProps<T = {[key: string]: any}> = {
  onSubmit?(model: T): void,
  initialState?: T,
} & WithNested;

type FormContextType<T> = { registerField: RegisterField<T>, isFormValid: boolean, onSubmit: () => void };
type InnerModel = { [key: string]: {isValid: boolean, value: any} };

export const FormContext
  = React.createContext({} as FormContextType<any>);

export function FormContainer<FormModel extends {[key: string]: any}>(props: FormContainerProps<FormModel>)
{
  const mapFormModelToInnerModel = (formModel?: FormModel): InnerModel => {
    if(props.initialState){
      const mapedEntries = Object.entries(props.initialState).map(entry => {
        const [key, value] = entry;
        return [key, {value, isValid: true}];
      });
      return Object.fromEntries(mapedEntries);
    }
    return {};
  }

  const stateRef = useRef<InnerModel>(mapFormModelToInnerModel(props.initialState));
  const [isFormValid, setIsFormValid] = useState(false);

  const registerField = <T,>(fieldName: string, setValue: (value: T) => void): ValueSetValueSetValid<T> =>
  {
    if (!(fieldName in stateRef.current))
    {
      stateRef.current[fieldName] = {isValid: true, value: undefined};
    }

    return {
      setIsValid: (isValid: boolean) => {
        stateRef.current[fieldName].isValid = isValid;
        setIsFormValid(Object.values(stateRef.current).map(v => v.isValid).every(iv => iv));
       },
      value: stateRef.current[fieldName].value,
      setValue: (value: T) =>
      {
        stateRef.current[fieldName].value = value;
        setValue(value);
      }
    };
  }

  const onSubmit = () => {
    if (props.onSubmit){
      const modelEntries = Object.entries(stateRef.current).map(entry => [entry[0], entry[1].value]);
      props.onSubmit(Object.fromEntries(modelEntries));
    }
  }

  return (
    <FormContext.Provider value={{ registerField, isFormValid, onSubmit}}>
      {props.children}
    </FormContext.Provider>
  )
}



