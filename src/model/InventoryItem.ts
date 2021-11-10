import { IEntity } from "./Entity";

export interface IInventoryItem extends IEntity
{
  quantity: number;
  unitOfMeasurement: string;
}