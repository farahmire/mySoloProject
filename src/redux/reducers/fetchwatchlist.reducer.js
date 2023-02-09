const fetchWatchlistReducer = (state = [], action) => {
    switch (action.type) {
      case "FETCH_WATCHLIST_SUCCESS":
        return action.payload;
      default:
        return state;
    }
  };

  export default fetchWatchlistReducer;