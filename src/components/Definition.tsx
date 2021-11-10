type ControlError = string | undefined;

export type FormValue = number | string | undefined;

export interface IFormValues
{
  [key: string]: FormValue;
}

export type FormErrors<V extends IFormValues> = {
  [K in keyof V]?: ControlError;
};

export interface IFormState<V extends IFormValues>
{
  values: V;
  errors: FormErrors<V>;
}

const regExpInteger = new RegExp("^[0-9]+$");

export const controlValueToInteger = (controlValue: string, formValue: number | undefined): number | undefined =>
{
  const newFormValue = controlValue === "" ? undefined : regExpInteger.test(controlValue) ? Number(controlValue) : NaN;
  return newFormValue === undefined ? undefined : isNaN(newFormValue) ? formValue : newFormValue;
};

export const controlValueFromInteger = (formValue: number | undefined): string =>
{
  return formValue !== undefined ? formValue.toString() : "";
};
