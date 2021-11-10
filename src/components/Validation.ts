import { FormErrors, FormValue, IFormValues } from "./Definition";

type FnSetError = (message: string) => void;

export class Validation<V extends IFormValues>
{
  private errors: FormErrors<V>;
  private readonly formValues: V;
  private hasError: boolean;

  constructor(formValues: V)
  {
    this.formValues = formValues;
    this.errors = {};
    this.hasError = false;
  }

  public field(name: string): ValidationField<V>
  {
    const value = this.formValues[name];

    return new ValidationField(this, value, message =>
    {
      this.errors = { ...this.errors, [name]: message };
      this.hasError = true;
    });
  }

  public getErrors(): FormErrors<V> | undefined
  {
    return this.hasError ? this.errors : undefined;
  }
}

export class ValidationField<V extends IFormValues>
{
  private readonly setError: FnSetError;
  private validation: Validation<V> | undefined;
  public readonly value: FormValue;

  constructor(validation: Validation<V>, value: FormValue, setError: FnSetError)
  {
    this.setError = setError;
    this.validation = validation;
    this.value = value;
  }

  public asString(): string
  {
    return this.value === undefined ? "" : typeof this.value === "string" ? this.value.trim() : this.value.toString();
  }

  public asNumber(): number
  {
    return typeof this.value === "number" ? this.value : Number(this.value);
  }

  public isNumber(): this
  {
    if (this.validation !== undefined)
    {
      const value = Number(this.value);
      if (isNaN(value) || !isFinite(value))
      {
        this.setError("Value must be a number");
        this.validation = undefined;
      }
    }
    return this;
  }

  public mandatory(): this
  {
    if (this.validation !== undefined)
    {
      if (this.value === undefined || (typeof this.value === "string" && this.value.trim() === ""))
      {
        this.setError("Value is required");
        this.validation = undefined;
      }
    }
    return this;
  }

  public unique<E>(getEntityByCode: (uniqueCode: string) => E | undefined): this
  {
    if (this.validation !== undefined)
    {
      const entity = getEntityByCode(this.value as string);
      if (entity !== undefined)
      {
        this.setError("Entered unique code already exists");
        this.validation = undefined;
      }
    }
    return this;
  }
}
