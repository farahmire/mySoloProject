const initialState = {
  stockData: [],
  loading: false,
  error: null,
};

const stockData = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_STOCK_DATA_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'FETCH_STOCK_DATA_SUCCESS':
      return {
        ...state,
        stockData: action.data,
        loading: false,
        error: null,
      };
    case 'FETCH_STOCK_DATA_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default stockData;