
const stockData = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_STOCK_DATA_SUCCESS':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default stockData;