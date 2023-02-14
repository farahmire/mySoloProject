import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const Chart = () => {
  const [symbol, setSymbol] = useState("");
  const chartData = useSelector((store) => store.chartReducer);
  const dispatch = useDispatch();
  const handleChart = (event) => {
    event.preventDefault();
    dispatch({ type: "FETCH_CHART_DATA", payload: symbol });
  };

  const options = {
    title: {
      text: "Stock Price and Volume"
    },
    xAxis: {
      categories: chartData.timestamp
    },
    yAxis: [
      {
        title: {
          text: "Price"
        }
      },
      {
        title: {
          text: "Volume"
        },
        opposite: true
      }
    ],
    series: [
      {
        name: "Close Price",
        data: chartData.closePrice
      },
      {
        name: "High Price",
        data: chartData.highPrice
      },
      {
        name: "Low Price",
        data: chartData.lowPrice
      },
      {
        name: "Open",
        data: chartData.open
      },
      {
        name: "Volume",
        data: chartData.volume,
        yAxis: 1
      }
    ]
  };

  return (
    <div>
      <form onSubmit={handleChart}>
        <input
          placeholder="Enter Stock Symbol"
          value={symbol}
          onChange={(event) => setSymbol(event.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default Chart;