import React from "react";
import { ClassNames } from "../utils/ClassNames";
import { IFormState, IFormValues } from "./Definition";

interface Props<V extends IFormValues>
{
  formState: IFormState<V>;
  name: string;
  onSetState: (state: IFormState<V>) => void;
  placeholder?: string;
}

interface IState
{
  controlValue: string;
  error?: string;
}

export const TextBox = <V extends IFormValues>({ formState, name, onSetState, placeholder }: Props<V>): React.ReactElement<Props<V>> =>
{
  const state = React.useMemo<IState>(() =>
  {
    const formValue = formState.values[name];
    const controlValue = typeof formValue === "string" ? formValue : "";
    const error = formState.errors[name];

    return {
      controlValue,
      error
    }
  }, [formState.errors, formState.values, name]);

  const handleChange = React.useCallback<React.ChangeEventHandler<HTMLTextAreaElement>>(event =>
  {
    const controlValue = event.target.value;
    const values = { ...formState.values, [name]: controlValue };
    const errors = { ...formState.errors };
    delete errors[name];
    onSetState({ ...formState, errors, values });
  }, [formState, name, onSetState]);

  return (
    <label className={ClassNames.join(["demo-form__control", { "demo-form__control--error": state.error !== undefined }])} >
      <textarea className="demo-form__textarea" onChange={handleChange} placeholder={placeholder} value={state.controlValue} />
      {
        state.error !== undefined &&
        <div className="demo-form__error">
          {state.error}
        </div>
      }
    </label>
  );
}