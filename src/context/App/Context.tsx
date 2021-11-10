import React from "react";
import { FnAddInventoryItem, FnAddProduct, FnGetInventoryItemByCode, FnGetProductByCode, IContext, IState, ReducerMessage, ReducerMessageType } from "./Definitions";
import { reducer } from "./Reducer";

const Context = React.createContext<IContext | undefined>(undefined);

interface Props
{
  children?: React.ReactNode;
}

export const Provider = ({ children }: Props): React.ReactElement<Props> =>
{
  const initialState = React.useMemo<IState>(() =>
  {
    return {
      inventoryItems: [],
      products: []
    }
  }, []);

  const [state, dispatch] = React.useReducer<React.Reducer<IState, ReducerMessage>>(reducer, initialState);

  const getInventoryItemByCode = React.useCallback<FnGetInventoryItemByCode>(uniqueCode =>
  {
    for (const inventoryItem of state.inventoryItems)
    {
      if (inventoryItem.uniqueCode === uniqueCode)
      {
        return inventoryItem;
      }
    }
    return undefined;
  }, [state.inventoryItems]);

  const getProductByCode = React.useCallback<FnGetProductByCode>(uniqueCode =>
  {
    for (const product of state.products)
    {
      if (product.uniqueCode === uniqueCode)
      {
        return product;
      }
    }
    return undefined;
  }, [state.products]);

  const addInventoryItem = React.useCallback<FnAddInventoryItem>(async inventoryItem =>
  {
    const uniqueCode = inventoryItem.uniqueCode;

    if (getInventoryItemByCode(uniqueCode) !== undefined)
    {
      throw new Error(`Inventory item with code ${uniqueCode} already exists`);
    }

    // await API.addInventoryItem(inventoryItem);

    dispatch({ type: ReducerMessageType.AddInventoryItem, payload: inventoryItem });
  }, [getInventoryItemByCode]);

  const addProduct = React.useCallback<FnAddProduct>(async product =>
  {
    const uniqueCode = product.uniqueCode;

    if (getProductByCode(uniqueCode) !== undefined)
    {
      throw new Error(`Porduct with code ${uniqueCode} already exists`);
    }

    // await API.addProduct(product);

    dispatch({ type: ReducerMessageType.AddProduct, payload: product });
  }, [getProductByCode]);

  const context: IContext = {
    ...state,
    addInventoryItem,
    addProduct,
    getInventoryItemByCode,
    getProductByCode
  }

  return (
    <Context.Provider value={context}>
      {children}
    </Context.Provider>
  );
}

export const useIt = (): IContext =>
{
  const context = React.useContext(Context);
  if (context === undefined)
  {
    throw new Error("Context is undefined");
  }
  return context;
};
