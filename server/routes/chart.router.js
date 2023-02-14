const express = require('express');
const axios = require('axios');
require('dotenv').config()
const pool = require('../modules/pool');

const BASE_URL = "https://finnhub.io/api/v1";
const TIMEFRAME = "1644793927&to=1676329927"

const router = express.Router();


router.post('/',  async (req, res) => {

    const symbol = req.body.symbol
    console.log('sym', symbol)
  
    try {
      const response = await axios.get(`${BASE_URL}/stock/candle?symbol=${symbol}&resolution=W&from=${TIMEFRAME}&token=${process.env.REACT_APP_FINNHUB_API_KEY}`)
      console.log('This is the chart server response', response.data)
      const data = {
        closePrice: response.data.c, 
        highPrice: response.data.h,
        lowPrice: response.data.l,
        open: response.data.o,
        status: response.data.s,
        timestamp: response.data.t,
     }
      res.send(data);
    } catch (error) {
        console.error(error)
    }
  
  });




module.exports = router;