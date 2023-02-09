
const setWatchlistReducer = (state = [], action) => {
    switch (action.type) {
      case "SET_WATCHLIST_SUCCESS":
        return action.payload;
      default:
        return state;
    }
  };



  export default setWatchlistReducer;

 