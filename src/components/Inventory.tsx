import React from "react";
import * as AppContext from "../context/App/Index";
import * as Model from "../model/Index";
import { AddInventory } from "./AddInventory";
import { ITableColumn, Table } from "./Table";

interface Props
{
}

export const Inventory = (): React.ReactElement<Props> =>
{
  const { inventoryItems } = AppContext.useIt();

  const columns = React.useMemo<ITableColumn<Model.IInventoryItem>[]>(() =>
  {
    return [
      {
        onCellContent: inventoryItem => inventoryItem.uniqueCode,
        title: "Unique Code"
      },
      {
        centered: true,
        onCellContent: inventoryItem => inventoryItem.name,
        title: "Name",
        titleCentered: true
      },
      {
        centered: true,
        onCellContent: inventoryItem => inventoryItem.unitOfMeasurement,
        title: "UOM",
        titleCentered: true
      },
      {
        centered: true,
        onCellContent: inventoryItem => inventoryItem.quantity.toString(),
        title: "Quantity",
        titleCentered: true
      },
      {
        centered: true,
        onCellContent: inventoryItem => inventoryItem.description,
        title: "Description",
        titleCentered: true
      }
    ]
  }, []);

  return (
    <div className="demo-page">
      <div className="demo-page__title">Add New Inventory Item</div>
      <AddInventory />
      <Table columns={columns} records={inventoryItems} />
    </div>
  );
}