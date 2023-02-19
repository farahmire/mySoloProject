
const chartReducer = (state = {}, action) => {
    switch (action.type) {
      case 'FETCH_CHART_DATA_SUCCESS':
       const newState = {
            ...state,
            ...action.payload,
          };
          console.log("this is newSTATE", newState)
          return newState;
    default:
        return state;
    }
  };

  export default chartReducer;

//   useEffect(() => {
//     if (data.closePrice) {
//       if (!chart) {
//         setChart(
//           Highcharts.chart("chart", {
//             title: {
//               text: "Stock Data",
//             },
//             xAxis: {
//               title: {
//                 text: "DATE",
//               },
//               type: "datetime", // set the x-axis to use datetime format
//               categories: data.timestamp,
//             },
//             series: [
//               {
//                 name: "Close Price",
//                 data: data.closePrice,
//               },
//               {
//                 name: "High Price",
//                 data: data.highPrice,
//               },
//               {
//                 name: "Low Price",
//                 data: data.lowPrice,
//               },
//               {
//                 name: "Open Price",
//                 data: data.open,
//               },
//             ],
//           })
//         );
//       } else {
//         chart.series[0].setData(data.closePrice);
//         chart.series[1].setData(data.highPrice);
//         chart.series[2].setData(data.lowPrice);
//         chart.series[3].setData(data.open);
//       }
//     }
//   }, [data, chart]);