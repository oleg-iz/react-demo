import React from "react";
import * as AppContext from "../context/App/Index";
import * as Model from "../model/Index";
import { controlValueFromInteger, controlValueToInteger, IFormState } from "./Definition";
import { Input, InputWidth } from "./Input";
import { TextBox } from "./TextBox";
import { Validation } from "./Validation";

interface Props
{
}

export const AddInventory = (): React.ReactElement<Props> =>
{
  const { addInventoryItem, getInventoryItemByCode } = AppContext.useIt();
  const [state, setState] = React.useState<IFormState<Partial<Model.IInventoryItem>>>({ errors: {}, values: {} });

  const handleSubmit = React.useCallback(async (): Promise<void> =>
  {
    const validation = new Validation(state.values);

    const uniqueCode = validation
      .field("uniqueCode")
      .mandatory()
      .unique(getInventoryItemByCode)
      .asString();

    const name = validation
      .field("name")
      .mandatory()
      .asString();

    const unitOfMeasurement = validation
      .field("unitOfMeasurement")
      .mandatory()
      .asString();

    const quantity = validation
      .field("quantity")
      .mandatory()
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
      await addInventoryItem({ description, name, quantity, uniqueCode, unitOfMeasurement });
      setState({ errors: {}, values: {} });
    }
    catch
    {
      // Handle API error
    }
  }, [addInventoryItem, getInventoryItemByCode, state.values]);

  return (
    <div className="demo-form">
      <div className="demo-form__row">
        <Input formState={state} name="uniqueCode" onSetState={setState} placeholder="Unique Code" width={InputWidth.Width20} />
        <Input formState={state} name="name" onSetState={setState} placeholder="Name" width={InputWidth.Width40} />
        <Input formState={state} name="unitOfMeasurement" onSetState={setState} placeholder="Unit of Measurement" width={InputWidth.Width20} />
        <Input formState={state} name="quantity" onSetState={setState} onValueFrom={controlValueFromInteger} onValueTo={controlValueToInteger} placeholder="Quantity" width={InputWidth.Width20} />
      </div>
      <div className="demo-form__row">
        <TextBox formState={state} name="description" onSetState={setState} placeholder="Description" />
      </div>
      <button className="demo-button demo-button--submit demo-button--align-end" onClick={handleSubmit} type="button">Save</button>
    </div>
  );
}