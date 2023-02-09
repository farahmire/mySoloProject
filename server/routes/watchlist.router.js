const express = require('express');
const axios = require('axios');
require('dotenv').config()
const pool = require('../modules/pool');


const BASE_URL = "https://finnhub.io/api/v1";

const router = express.Router();

router.get("/", async (req, res) => {
  // console.log("this is req", req);
  const symbol = req.body.symbol
 console.log('this is GET route', req.body)
  try {
    
    const response = await axios.get(`${BASE_URL}/stock/profile2?symbol=${symbol}&token=${process.env.REACT_APP_FINNHUB_API_KEY}`)
; console.log("This is the watchlist data in GET", response.data)

    const queryText = 
    `SELECT * FROM "watchlist" 
    WHERE user_id=$1;`;
                      
    const sqlValues = [
      // response.data.currency, 
      // response.data.name, 
      // response.data.ticker,
      req.user.id
    ]
    pool
      .query(queryText, sqlValues)
      .then((result) => {
        console.log(` GET WATCHLIST ROUTE`, result);
        res.sendStatus(201);
      })
   
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});


router.post("/", async (req, res) => {
    // console.log("this is req", req);
    console.log('this is POST route', req.body)
    try {
      const symbol = req.body.symbol
      const response = await axios.get(`${BASE_URL}/stock/profile2?symbol=${symbol}&token=${process.env.REACT_APP_FINNHUB_API_KEY}`)
      console.log("This is the POST watchlist data", response.data);
  
      const queryText = `INSERT INTO "watchlist" ("currency", "description", "symbol", "user_id")
                         VALUES ($1, $2, $3, $4)`;
      const sqlValues = [
        response.data.currency, 
        response.data.name, 
        response.data.ticker,
        req.user.id
      ]
      pool
        .query(queryText, sqlValues)
        .then((result) => {
          console.log(`Added WATCHLIST to the database`, result);
          res.sendStatus(201);
        })
       
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });
  
  module.exports = router;
