import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

// The component also uses the useStyles hook to define custom styles that are applied to some of the Material-UI components.
// The styles define the appearance and layout of the input field, form container,
// and current price container. The backgroundColor, color, and marginTop and marginBottom properties
// are used to set the background color, text color, and margin spacing of the containers.
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#333",
  },
  formContainer: {
    backgroundColor: "#333",
    padding: theme.spacing(2),
    borderRadius: "5px",
    color: "#fff",
    marginBottom: theme.spacing(2),
  },
  textField: {
    marginBottom: theme.spacing(2),
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

// The component starts by using the useSelector and useDispatch hooks from the react-redux library
// to access the state and dispatch actions, respectively. The component also uses the
// useState hook to keep track of the value of the stock symbol entered by the user in a form input field.

const Search = () => {
  const stockData = useSelector((store) => store.stockData.currentPrice);
  const dispatch = useDispatch();
  const [symbol, setSymbol] = useState("");
  const classes = useStyles();

  // When the user submits the form, the handleSubmit function is called.
  // This function dispatches an action with a payload containing the stock symbol
  // to the Redux store. The Redux store then handles the action and sends an API request
  // to fetch the stock data, which is saved in the store.

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({
      type: "FETCH_STOCK_DATA",
      payload: {
        symbol,
      },
    });
  };

  // If the stock data is available in the store, the component displays it along with
  // a button that allows the user to add the stock to their watchlist.
  // When the user clicks the "Add to Watchlist" button, the handleAddToWatchlist function
  // dispatches another action with the stock symbol payload to the Redux store.

  const handleAddToWatchlist = () => {
    dispatch({
      type: "SET_WATCHLIST",
      payload: symbol,
    });
  };

  // The component uses the Material-UI TextField component to render the input field
  //  and the Button component to render the "Look Up Stock" and "Add to Watchlist" buttons.
  //  The Box component is used to group related elements together and apply some styling.

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
            InputProps={{
              style: { color: "white" },
            }}
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
      {stockData && (
        <Box className={classes.currentPriceContainer}>
          <h2 style={{ marginBottom: "16px" }}>
            Current Price of {symbol} is : ${stockData}{" "}
          </h2>
          <Button
            variant="contained"
            onClick={handleAddToWatchlist}
            style={{ backgroundColor: "#FFA726" }}
          >
            Add to Watchlist
          </Button>
        </Box>
      )}
    </div>
  );
};

export default Search;
