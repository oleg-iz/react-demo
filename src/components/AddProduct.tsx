import React from "react";
import * as AppContext from "../context/App/Index";
import * as Model from "../model/Index";
import { IFormState } from "./Definition";
import { Input, InputWidth } from "./Input";
import { TextBox } from "./TextBox";
import { Validation } from "./Validation";

interface Props
{
}

export const AddProduct = (): React.ReactElement<Props> =>
{
  const { addProduct, getProductByCode } = AppContext.useIt();
  const [state, setState] = React.useState<IFormState<Partial<Model.IProduct>>>({ errors: {}, values: {} });

  const handleSubmit = React.useCallback(async (): Promise<void> =>
  {
    const validation = new Validation(state.values);

    const uniqueCode = validation
      .field("uniqueCode")
      .mandatory()
      .unique(getProductByCode)
      .asString();

    const name = validation
      .field("name")
      .mandatory()
      .asString();

    const price = validation
      .field("price")
      .mandatory()
      .isNumber()
      .asNumber();

    const description = validation
      .field("description")
      .asString();

    const errors = validation.getErrors();
    if (errors !== undefined)
    {
      setState(prevState => ({ ...prevState, errors }));
      return;
    }

    try
    {
      await addProduct({ description, name, price, uniqueCode });
      setState({ errors: {}, values: {} });
    }
    catch
    {
      // Handle API error
    }
  }, [addProduct, getProductByCode, state.values]);

  return (
    <div className="demo-form">
      <div className="demo-form__row">
        <Input formState={state} name="uniqueCode" onSetState={setState} placeholder="Unique Code" width={InputWidth.Width20} />
        <Input formState={state} name="name" onSetState={setState} placeholder="Name" width={InputWidth.Width40} />
        <Input formState={state} name="price" onSetState={setState} placeholder="Price" width={InputWidth.Width20} />
      </div>
      <div className="demo-form__row">
        <TextBox formState={state} name="description" onSetState={setState} placeholder="Description" />
      </div>
      <button className="demo-button demo-button--submit demo-button--align-end" onClick={handleSubmit} type="button">Save</button>
    </div>
  );
}