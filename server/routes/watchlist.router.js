const express = require('express');
const axios = require('axios');
require('dotenv').config()
const pool = require('../modules/pool');


const BASE_URL = "https://finnhub.io/api/v1";

const router = express.Router();

router.get("/", async (req, res) => {
  const symbol = req.body.symbol
  console.log("This is the symbol in GET route:", symbol)

  try {
    const response = await axios.get(
      `${BASE_URL}/stock/profile2?symbol=${symbol}&token=${process.env.REACT_APP_FINNHUB_API_KEY}`
    );
    console.log("This is the watchlist data in GET", response.data);

    const queryText = `
      SELECT * FROM "watchlist" WHERE user_id=$1;
    `;
    const sqlValues = [req.user.id];

    pool
      .query(queryText, sqlValues)
      .then((result) => {
        console.log(`GET WATCHLIST ROUTE`, result);

        // Use the API response data

        res.json(result.rows);
      });
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
  
      const queryText = `INSERT INTO "watchlist" ("logo", "currency", "description", "symbol", "weburl", "user_id")
                         VALUES ($1, $2, $3, $4, $5, $6)`;
      const sqlValues = [
        response.data.logo,
        response.data.currency, 
        response.data.name, 
        response.data.ticker,
        response.data.weburl,
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

  router.delete("/:id", (req, res) => {
    const id = req.params.id;
    const sqlQuery = 
    `DELETE FROM "watchlist" WHERE id =$1;`;
    
    pool
      .query(sqlQuery, [id])
      .then((result) => {
        console.log(`DELETE STOCK ROUTE`, result);
      })
      .catch((error) => {
        console.error(error);
        res.sendStatus(500);
      });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const sqlQuery = 
  `UPDATE "watchlist"
  SET bought = true
  WHERE id = $1;`;

  pool
    .query(sqlQuery, [id])
    .then((result) => {
      console.log(`UPDATE STOCK ROUTE`, result);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
});
    
  
  module.exports = router;
