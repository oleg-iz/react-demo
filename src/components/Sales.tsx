import React from "react";
import * as AppContext from "../context/App/Index";
import * as Model from "../model/Index";
import { AddProduct } from "./AddProduct";
import { ITableColumn, Table } from "./Table";

interface Props
{
}

export const Sales = (): React.ReactElement<Props> =>
{
  const { products } = AppContext.useIt();

  const [productName, setProductName] = React.useState<string>("");
  const [searchProductName, setSearchProductName] = React.useState<string>("");

  const columns = React.useMemo<ITableColumn<Model.IProduct>[]>(() =>
  {
    return [
      {
        centered: true,
        onCellContent: product => product.uniqueCode,
        title: "Unique Code",
        titleCentered: true
      },
      {
        centered: true,
        onCellContent: product => product.name,
        title: "Name",
        titleCentered: true
      },
      {
        centered: true,
        onCellContent: product => product.price.toFixed(2),
        title: "Price",
        titleCentered: true
      },
      {
        centered: true,
        onCellContent: product => product.description,
        title: "Description",
        titleCentered: true
      }
    ]
  }, []);

  return (
    <div className="demo-page">
      <div className="demo-page__title">Add New Product</div>
      <AddProduct />
      <div className="demo-search">
        <label>
          <input className="demo-form__input demo-form__input--centered" onChange={event => setProductName(event.target.value)} placeholder="Product Name" type="text" value={productName} />
        </label>
        <button className="demo-button" onClick={() => setSearchProductName(productName.trim())} type="button">Search</button>
      </div>
      <Table columns={columns} records={searchProductName === "" ? products : products.filter(product => product.name.indexOf(searchProductName) >= 0)} />
    </div>
  );
}