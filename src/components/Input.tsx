import React from "react";
import { ClassNames } from "../utils/ClassNames";
import { FormValue, IFormState, IFormValues } from "./Definition";

export enum InputWidth
{
  Width20,
  Width40
}

interface Props<V extends IFormValues, C extends FormValue>
{
  formState: IFormState<V>;
  name: string;
  onSetState: (state: IFormState<V>) => void;
  onValueFrom?: (formValue: C) => string;
  onValueTo?: (controlValue: string, formValue: C) => C;
  placeholder?: string;
  width?: InputWidth;
}

interface IState<C extends FormValue>
{
  controlValue: string;
  error?: string;
  formValue: C;
}

export const Input = <V extends IFormValues, C extends FormValue>({ formState, name, onSetState, onValueFrom, onValueTo, placeholder, width }: Props<V, C>): React.ReactElement<Props<V, C>> =>
{
  const state = React.useMemo<IState<C>>(() =>
  {
    const formValue = formState.values[name] as C;
    const controlValue = onValueFrom !== undefined ? onValueFrom(formValue) : typeof formValue === "string" ? formValue : "";
    const error = formState.errors[name];

    return {
      controlValue,
      error,
      formValue
    }
  }, [formState.errors, formState.values, name, onValueFrom]);

  const handleChange = React.useCallback<React.ChangeEventHandler<HTMLInputElement>>(event =>
  {
    const controlValue = event.target.value;
    const formValue = onValueTo !== undefined ? onValueTo(controlValue, state.formValue) : controlValue as C;
    const values = { ...formState.values, [name]: formValue };
    const errors = { ...formState.errors };
    delete errors[name];
    onSetState({ ...formState, errors, values });
  }, [formState, name, onSetState, onValueTo, state.formValue]);

  const className = React.useMemo(() =>
  {
    return ClassNames.join([
      "demo-form__control",
      {
        "demo-form__control--error": state.error !== undefined,
        "demo-form__control--w20": width === InputWidth.Width20,
        "demo-form__control--w40": width === InputWidth.Width40
      }
    ])
  }, [state.error, width])

  return (
    <label className={className}>
      <input className="demo-form__input" onChange={handleChange} placeholder={placeholder} type="text" value={state.controlValue} />
      {
        state.error !== undefined &&
        <div className="demo-form__error">
          {state.error}
        </div>
      }
    </label>
  );
}