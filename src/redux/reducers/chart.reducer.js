
const chartReducer = (state = {}, action) => {
    switch (action.type) {
      case 'FETCH_CHART_DATA_SUCCESS':
        return {
            ...state,
            ...action.payload,
          };
    default:
        return state;
    }
  };
  
  export default chartReducer;