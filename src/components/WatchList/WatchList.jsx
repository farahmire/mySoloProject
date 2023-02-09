import React, {  useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import Search from "../Search/Search"

const Watchlist = () => {
  
  const watchlist = useSelector((state) => state.watchlist);
  const dispatch = useDispatch();

  // Fetch the current watchlist data from the server
  useEffect(() => {
   
    dispatch({
        type: "FETCH_WATCHLIST",
     
      });
    }, []);

  
  return (
    <table>
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Name</th>
          <th>Current Price</th>
        </tr>
      </thead>
      <tbody>
        
        {watchlist ? watchlist.map((stock) => (
          <tr key={stock.id}>
            <td>{stock.symbol}</td>
            <td>{stock.currency}</td>
            <td>{stock.description}</td>
            <td>{stock.symbol}</td>
            <td>{stock.bought}</td>

          </tr>
        )): null}
      </tbody>
    </table>
  );
};

export default Watchlist;
