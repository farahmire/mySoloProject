const express = require('express');
const axios = require('axios');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
require('dotenv').config()
const pool = require('../modules/pool');

// shortned url so i can make the api call and then just call on BASE_URL in its place
const BASE_URL = "https://finnhub.io/api/v1";

const router = express.Router();

// GET / - A route that retrieves the watchlist data for the authenticated user. 
// The middleware function rejectUnauthenticated checks whether the user is authenticated 
// before processing the request. The route retrieves the user's watchlist data from the database 
// and returns it in the response body as a JSON object.

router.get("/", rejectUnauthenticated, async (req, res) => {
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


// POST / - A route that adds a stock to the user's watchlist. 
// The middleware function rejectUnauthenticated checks whether the user 
// is authenticated before processing the request. The route sends a request to the Finnhub API 
// to retrieve data for the stock symbol provided in the request body. The data is then inserted 
// into the database as a new watchlist item.

router.post("/", rejectUnauthenticated,  async (req, res) => {
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


// DELETE /:id - A route that removes a stock from the user's watchlist. 
// The route expects the watchlist item ID to be provided as a URL parameter. 
// The route sends a SQL query to the database to delete the watchlist item with the given ID.

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

// PUT /:id - A route that updates a watchlist item to indicate that the user has bought the stock.
//  The route expects the watchlist item ID to be provided as a URL parameter. 
//  The route sends a SQL query to the database to update the bought column of the watchlist item 
//  with the given ID to true.

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
