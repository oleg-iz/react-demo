import { IState, ReducerMessage, ReducerMessageType } from "./Definitions";

export function reducer(prevState: IState, message: ReducerMessage): IState
{
  switch (message.type)
  {
    case ReducerMessageType.AddInventoryItem: {
      const inventoryItem = message.payload;
      return { ...prevState, inventoryItems: [...prevState.inventoryItems, inventoryItem] };
    }
    case ReducerMessageType.AddProduct: {
      const product = message.payload;
      return { ...prevState, products: [...prevState.products, product] };
    }
  }
  return prevState;
}