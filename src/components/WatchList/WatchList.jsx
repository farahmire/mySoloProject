import React, {  useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({

  
  table: {
    backgroundColor: "orange",
    width: "100%",
    
  },
  tableCell: {
    padding: "5px 10px",
  },
  buttons: {
    backgroundColor: "black",
    color: "white",
  },
});

const Watchlist = () => {
  const fetchWatchlistReducer = useSelector(
    (store) => store.fetchWatchlistReducer
  );

  const watchlistArray = Object.values(fetchWatchlistReducer);

  console.log("this is fetchwatchlist reducer", fetchWatchlistReducer);
  const dispatch = useDispatch();
  const classes = useStyles();

  // Fetch the current watchlist data from the server
  useEffect(() => {
    dispatch({
      type: "FETCH_WATCHLIST",
    });
  }, []);


  const handleDelete = (stockId) => {
    dispatch({
      type: "DELETE_STOCK_FROM_WATCHLIST",
      payload: { id: stockId },
    });
    dispatch({
      type: "FETCH_WATCHLIST",
    });
  };

  const handleBought = (stockId) => {
    dispatch({
      type: "UPDATE_STOCK_FROM_WATCHLIST",
      payload: { id: stockId },
    });
    dispatch({
      type: "FETCH_WATCHLIST",
    });
  };

  return (
    <div style={{ backgroundColor: "#333", minHeight: "100vh" }}>
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell className={classes.tableCell}>Logo</TableCell>
          <TableCell className={classes.tableCell}>Symbol</TableCell>
          <TableCell className={classes.tableCell}>Company Name</TableCell>
          <TableCell className={classes.tableCell}>Currency</TableCell>
          <TableCell className={classes.tableCell}>Link</TableCell>
          <TableCell className={classes.tableCell}>Bought</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {watchlistArray.map((stock, index) => (
          <TableRow
            key={index}
            style={{ backgroundColor: stock.bought ? "green" : "inherit" }}
          >
            <TableCell className={classes.tableCell}>
              <img src={stock.logo} alt={`${stock.symbol} logo`} />
            </TableCell>
            <TableCell className={classes.tableCell}>{stock.symbol}</TableCell>
            <TableCell className={classes.tableCell}>
              {stock.description}
            </TableCell>
            <TableCell className={classes.tableCell}>
              {stock.currency}
            </TableCell>
            <TableCell className={classes.tableCell}>
              <a href={stock.weburl} target="weburl">
                {stock.weburl}
              </a>
            </TableCell>
            <TableCell className={classes.tableCell}>
              {stock.bought ? "Yes" : "No"}
            </TableCell>
            <TableCell className={classes.tableCell}>
              <Button
                className={classes.buttons}
                onClick={() => handleBought(stock.id)}
              >
                Buy
              </Button>
            </TableCell>
            <TableCell className={classes.tableCell}>
              <Button
                className={classes.buttons}
                onClick={() => handleDelete(stock.id)}
              >
                Sell
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
  );
}

export default Watchlist;