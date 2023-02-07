const express = require('express');
const axios = require('axios');
require('dotenv').config()
const pool = require('../modules/pool');

const BASE_URL = "https://finnhub.io/api/v1";


const router = express.Router();


router.post('/',  async (req, res) => {
    console.log('req', req)
    const symbol = req.body.symbol
    console.log('sym', symbol)
  
    try {
      const response = await axios.get(`${BASE_URL}/quote?symbol=${symbol}&token=${process.env.REACT_APP_FINNHUB_API_KEY}`)
      console.log('This is the C response', response.data)
      const data = {
        currentPrice: response.data.c, 
        change: response.data.d,
        percentChange: response.data.dp,
        high: response.data.h,
        low: response.data.l,
        open: response.data.o,
        previousClose: response.data.pc
      }
      res.send(data);
    } catch (error) {
        console.error(error)
    }
  
  });




module.exports = router;