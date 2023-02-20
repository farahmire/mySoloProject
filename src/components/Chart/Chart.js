import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Highcharts from "highcharts/highstock";
import HighchartsMore from "highcharts/highcharts-more";
import HollowCandlestick from "highcharts/modules/hollowcandlestick";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

HighchartsMore(Highcharts);
HollowCandlestick(Highcharts);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#333",
  },
  formContainer: {
    backgroundColor: "#333",
    padding: theme.spacing(2),
    borderRadius: "5px",
    color: "#fff",
    marginBottom: theme.spacing(2),
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  currentPriceContainer: {
    backgroundColor: "#333",
    padding: theme.spacing(2),
    color: "#fff",
    borderRadius: "5px",
    marginTop: theme.spacing(2),
    alignSelf: "center",
  },
}));

const Chart = () => {
  const [chart, setChart] = useState(null);
  const chartReducer = useSelector((store) => store.chartReducer);
  const dispatch = useDispatch();
  const [symbol, setSymbol] = useState("");
  const classes = useStyles();

  const data = {
    closePrice: chartReducer.closePrice,
    highPrice: chartReducer.highPrice,
    lowPrice: chartReducer.lowPrice,
    open: chartReducer.open,
    timestamp: chartReducer.timestamp,
  };

  // The component also uses useEffect to create a Highcharts chart that displays the retrieved stock data
  //  in a hollow candlestick format. The useEffect hook takes an array of dependencies that includes the data
  //   and chart state variables. When either of these variables changes, useEffect will re-render the chart.
  useEffect(() => {
    if (data.closePrice) {
      if (!chart) {
        setChart(
          Highcharts.stockChart("chart", {
            chart: {
              backgroundColor: "#333",
            },
            rangeSelector: {
              selected: 1,
            },
            xAxis: {
              type: "datetime",
            },
            yAxis: {
              title: {
                text: "Price",
              },
            },
            navigator: {
              series: {
                color: Highcharts.getOptions().colors[0],
              },
            },
            // The series property of the chart options object is an array of series that will be displayed on the chart.
            // In this case, there is only one series, which is a hollow candlestick series. 
            // The type property is set to "hollowcandlestick", which tells Highcharts to create a hollow candlestick chart.
            series: [
              {
                type: "hollowcandlestick",
                name: "Hollow Candlestick",
                // The data property of the series is an array of arrays that contains the actual data that
                // will be displayed on the chart. Each sub-array represents a single data point and has five elements: 
                // the timestamp (in milliseconds since January 1, 1970), the opening price, the high price, the low price,
                // and the closing price. These values are obtained from the chartReducer object,
                // which is part of the application's Redux store.
                data: data.timestamp.map((time, index) => {
                  return [                    
                    time * 1000,                    
                    data.open[index],
                    data.highPrice[index],
                    data.lowPrice[index],
                    data.closePrice[index],
                  ];
                }),
              },
            ],
          })
        );
      } else {
        chart.series[0].setData(
          data.timestamp.map((time, index) => {
            return [           
              time * 1000,              
              data.open[index],
              data.highPrice[index],
              data.lowPrice[index],
              data.closePrice[index],
            ];
          })
        );
      }
    }
  }, [data, chart]);

  const handleChart = (event) => {
    event.preventDefault();
    dispatch({
      type: "FETCH_CHART_DATA",
      payload: symbol,
    });
  };

  return (
    <form className={classes.root} onSubmit={handleChart}>
      <TextField
        label="stock symbol"
        value={symbol}
        variant='outlined'
        InputProps={{
          style: { color: "white" },
        }}
        onChange={(event) => setSymbol(event.target.value)}
      />
      <Button
        type="submit"
        variant="contained"
            style={{ backgroundColor: "#FFA726" }}>
        Get Chart Data
      </Button>
      <div id="chart" style={{ width: "100%", height: "70vh" }}></div>
    </form>
  );
};

export default Chart;