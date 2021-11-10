import React from "react";
import { ClassNames } from "../utils/ClassNames";

export interface ITableColumn<R>
{
  centered?: boolean;
  onCellContent: (record: R, recordIndex: number) => React.ReactNode;
  title: string;
  titleCentered?: boolean;
}

interface Props<R>
{
  columns: ITableColumn<R>[];
  records: R[] | undefined;
}

export const Table = <R,>({ columns, records }: Props<R>): React.ReactElement<Props<R>> =>
{
  return (
    <div className="demo-table__wrapper">
      <table className="demo-table">
        <thead className="demo-table__head">
          <tr>
            {
              columns.map((column, columnIndex) =>
              {
                const { title, titleCentered } = column;
                const className = ClassNames.join({
                  "demo-table__cell--centered": titleCentered
                });
                return (
                  <th className={className} key={columnIndex}>
                    {title}
                  </th>
                );
              })
            }
          </tr>
        </thead>
        <tbody className="demo-table__body">
          {
            records !== undefined && records.length > 0 ?
              records.map((record, recordIndex) => (
                <tr key={recordIndex}>
                  {
                    columns.map((column, columnIndex) =>
                    {
                      const { centered } = column;
                      const className = ClassNames.join({
                        "demo-table__cell--centered": centered,
                      });
                      return (
                        <td className={className} data-title={column.title} key={columnIndex}>
                          {column.onCellContent(record, recordIndex)}
                        </td>
                      );
                    })
                  }
                </tr>
              ))
              :
              <tr>
                <td className={"demo-table__cell--centered"} colSpan={columns.length}>
                  No records found
                </td>
              </tr>
          }
        </tbody>
      </table>
    </div>
  );
}
