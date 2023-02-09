const fetchWatchlistReducer = (state = [], action) => {
  console.log("THIS IS FETCH WATCHLIST REDUCER PAYLOAD", action.payload);

    switch (action.type) {
      case "FETCH_WATCHLIST_SUCCESS":
        return action.payload;
      default:
        return state;
    }
  };

  export default fetchWatchlistReducer;