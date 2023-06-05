import { createContext, useState } from "react";

export const Context = createContext();

export const ContextProvider = (props) => {
  const [watchList, setWatchList] = useState(["GOOGL", "MSFT", "AMZN"]);
  // to allow all components in stockspage folder to have access to watchlist

  const addStock = (stock) => {
    if (watchList.indexOf(stock) === -1) {
      setWatchList([...watchList, stock]);
    }
  };

  const deleteStock = (stock) => {
    setWatchList(
      watchList.filter((element) => {
        return element !== stock;
      })
    );
  };

  return (
    <Context.Provider value={{ watchList, addStock, deleteStock }}>
      {props.children}
    </Context.Provider>
  );
};

// const obj = {
//     watchlist,
//     addStock,
//     deleteStock
// }
