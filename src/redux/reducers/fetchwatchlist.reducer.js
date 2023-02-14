const fetchWatchlistReducer = (state = [], action) => {
  console.log("THIS IS FETCH WATCHLIST REDUCER PAYLOAD", action.payload);

    switch (action.type) {
      case "FETCH_WATCHLIST_SUCCESS":
        return action.payload;
        case "DELETE_STOCK_SUCCESS":
          return {
            ...state,
            watchlist: state.watchlist.filter(
              (stock) => stock.id !== action.response.data.id
            )
          };
          case "UPDATE_STOCK_SUCCESS":
            return state.map(stock => {
              if (stock.id === action.payload.id) {
                return {
                  ...stock,
                  purchased: action.payload.purchased
                };
              }
              return stock;
            });
      default:
        return state;
    }
  };

  export default fetchWatchlistReducer;