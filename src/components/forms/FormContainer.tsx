import React, { useState } from "react";
import { WithNested } from "types/WithChildren";

type RegisterField<T> = (fieldName: string, setValue: T) => ValueSetValueSetValid<T>;
type ValueSetValueObj<T> = { value: T, setValue: (value: T) => void };
type ValueSetValueSetValid<T> = ValueSetValueObj<T> & { setIsValid: (isValid: boolean) => void };

type FormContainerProps = {
  state: { [key: string]: any },
} & WithNested;

type FormContextType<T> = { registerField: RegisterField<T>, isFormValid: boolean };

export const FormContext
  = React.createContext({} as FormContextType<any>);

export function FormContainer(props: FormContainerProps)
{
  const [state, setState] = useState<{ [key: string]: any }>({});
  const [fieldsValidities] = useState<boolean[]>([]);
  const [isFormValid, setIsFormValid] = useState(false);

  const registerField = <T,>(fieldName: string, setValue: (value: T) => void): ValueSetValueSetValid<T> =>
  {
    if (!(fieldName in state))
    {
      state[fieldName] = undefined;
      setState(state);
      fieldsValidities.push(true);
    }

    return {
      setIsValid: (isValid: boolean) => {
        fieldsValidities[fieldsValidities.length - 1] = isValid;
        setIsFormValid(fieldsValidities.every(fv => fv));
       },
      value: state[fieldName],
      setValue: (value: T) =>
      {
        state[fieldName] = value;
        setValue(value);
      }
    };
  }

  return (
    <FormContext.Provider value={{ registerField, isFormValid }}>
      {props.children}
    </FormContext.Provider>
  )
}



