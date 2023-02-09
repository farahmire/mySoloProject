
const setWatchlistReducer = (state = [], action) => {
  console.log("THIS IS SET WATCHLIST REDUCER PAYLOAD", action.payload);
    switch (action.type) {
      case "SET_WATCHLIST_SUCCESS":
        return action.payload;
      default:
        return state;
        
    }
  };



  export default setWatchlistReducer;

 