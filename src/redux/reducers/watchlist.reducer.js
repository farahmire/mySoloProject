
    const watchlistReducer = (state = [], action) => {
    switch (action.type) {
    case "ADD_TO_WATCHLIST":
    return {
    ...state,
    watchlist: [...state.watchlist, action.payload]
    };
    default:
    return state;
    }
    };
    
    export default watchlistReducer;