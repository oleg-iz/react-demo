import * as Model from "../../model/Index";

export interface IState
{
  inventoryItems: Model.IInventoryItem[];
  products: Model.IProduct[];
}

export type FnAddInventoryItem = (inventoryItem: Model.IInventoryItem) => Promise<void>;
export type FnAddProduct = (product: Model.IProduct) => Promise<void>;
export type FnGetInventoryItemByCode = (uniqueCode: string) => Model.IInventoryItem | undefined;
export type FnGetProductByCode = (uniqueCode: string) => Model.IProduct | undefined;

export interface IContext extends IState
{
  addInventoryItem: FnAddInventoryItem;
  addProduct: FnAddProduct;
  getInventoryItemByCode: FnGetInventoryItemByCode;
  getProductByCode: FnGetProductByCode;
}

export enum ReducerMessageType
{
  AddInventoryItem,
  AddProduct
}

export type ReducerMessage =
  { type: ReducerMessageType.AddInventoryItem, payload: Model.IInventoryItem } |
  { type: ReducerMessageType.AddProduct, payload: Model.IProduct }
  ;