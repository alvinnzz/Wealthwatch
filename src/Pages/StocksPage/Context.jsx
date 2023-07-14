import { createContext, useState, useEffect } from "react";
import { toast } from 'react-toastify';

export const Context = createContext();

export const ContextProvider = (props) => {
  const [watchList, setWatchList] = useState([]);
  // to allow all components in stockspage folder to have access to watchlist

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const uid = sessionStorage.getItem("userId");
        const response = await fetch(
          "https://wealthwatchbackend-c341579f13b3.herokuapp.com/api/users/getStock/" +
            uid,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const responseData = await response.json();
        if (responseData.error){
          throw new Error(responseData.error);
        }
        console.log(responseData.stocks);
        setWatchList(responseData.stocks);
      } catch (err) {
        console.log(err);
        alert("Receiving stocks failed!");
      }
    };
    fetchStocks();
  }, []); // Empty dependency array to trigger the effect only once

  const addStock = async (stock) => {
    try {
      // if (watchList.length >= 3) {
      //   alert("Maximum quota hit. Delete a stock before adding");
      // } else
      if (watchList.length < 3) {
        const uid = sessionStorage.getItem("userId");
        const response = await fetch(
          "https://wealthwatchbackend-c341579f13b3.herokuapp.com/api/users/addStock/" +
            uid,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              stock: stock,
            }),
          }
        );
        const responseData = await response.json();
        if (responseData.error){
          throw new Error(responseData.error);
        }
        console.log(responseData.stocks);
        toast.success("Added stock successfully!");
        if (watchList.indexOf(stock) === -1 && watchList.length <= 3) {
          setWatchList([...watchList, stock]);
        }
      }
    } catch (err) {
      console.log(err);
      toast.error("Adding stock failed!");
    }
  };

  const deleteStock = async (stock) => {
    try {
      const uid = sessionStorage.getItem("userId");
      const response = await fetch(
        "https://wealthwatchbackend-c341579f13b3.herokuapp.com/api/users/deleteStock/" +
          uid,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            stock: stock,
          }),
        }
      );
      const responseData = await response.json();
      if (responseData.error){
        throw new Error(responseData.error);
      }
      console.log(responseData.stocks);
      toast.success("Stock deleted successfully!");
    } catch (err) {
      console.log(err);
      toast.error("Deleting stock failed!");
    }
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
