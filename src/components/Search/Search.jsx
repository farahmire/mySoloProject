import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    height: "100vh",
    backgroundColor: "#333",
  },
  formContainer: {
    backgroundColor: "#333",
    padding: theme.spacing(2),
    borderRadius: "5px",
    color: "#fff",
    alignSelf: "flex-start",
  },
  textField: {
    marginBottom: theme.spacing(2),
    color: "white"
  },
  currentPriceContainer: {
    backgroundColor: "#333",
    padding: theme.spacing(2),
    color: "#fff",
    borderRadius: "5px",
    marginTop: theme.spacing(2),
    alignSelf: "center",
  },
}));

const Search = () => {
  const stockData = useSelector((store) => store.stockData.currentPrice);
  const dispatch = useDispatch();
  const [symbol, setSymbol] = useState("");
  // const [currency, setCurrency] = useState("");
  // const [description, setDescription] = useState("");
  // const [bought, setBought] = useState("");

  const classes = useStyles();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({
      type: "FETCH_STOCK_DATA",
      payload: {
        symbol,
      },
    });
  };

  const handleAddToWatchlist = () => {
    dispatch({
      type: "SET_WATCHLIST",
      payload: symbol,
    });
    console.log("THIS IS THE DISPATCH SET WATCLIST");
  };

  return (
    <div className={classes.root}>
      <Box className={classes.formContainer}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Stock Symbol"
            value={symbol}
            onChange={(event) => setSymbol(event.target.value)}
            variant="outlined"
            className={classes.textField}
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            style={{ backgroundColor: "#FFA726" }}
          >
            Look Up Stock
          </Button>
        </form>
      </Box>
      <Box className={classes.currentPriceContainer}>
        <h2>Current Price is: ${stockData}</h2>
        <Button
          variant="contained"
          onClick={handleAddToWatchlist}
          style={{ backgroundColor: "#FFA726" }}
        >
          Add to Watchlist
        </Button>
      </Box>
    </div>
  );
};

export default Search;
