import React from "react";
import * as AppContext from "../context/App/Index";
import { Inventory } from "./Inventory";
import { Sales } from "./Sales";

interface Props
{
}

export const App = (): React.ReactElement<Props> =>
{
  const pathName = React.useMemo(() =>
  {
    const pathName = window.location.pathname.toLowerCase();
    return pathName.endsWith("/") ? pathName.slice(0, -1) : pathName;
  }, []);

  return (
    <AppContext.Provider>
      {
        pathName === "/sales" &&
        <Sales />
      }
      {
        pathName === "/inventory" &&
        <Inventory />
      }
    </AppContext.Provider>
  );
}