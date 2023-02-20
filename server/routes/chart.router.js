const express = require('express');
const axios = require('axios');
require('dotenv').config()
const pool = require('../modules/pool');

// The BASE_URL constant is set to the Finnhub API base URL. 
// The FROM_DATE and TO_DATE constants are set to Unix timestamps 
// representing the start and end dates of the requested candle data.

const BASE_URL = "https://finnhub.io/api/v1";
const FROM_DATE = "1645142329";
const TO_DATE = "1676678329";



const router = express.Router();

// When a POST request is received, the symbol value is extracted from the request body. 
// The code then makes an HTTP GET request to the Finnhub API with the axios library, 
// passing in the symbol, resolution, FROM_DATE, TO_DATE, and API key as query parameters.

router.post('/', async (req, res) => {
    try {
        const symbol = req.body.symbol;
        console.log('Request body:', req.body);

        const response = await axios.get(`${BASE_URL}/stock/candle`, {
            params: {
                symbol,
                resolution: 'M',
                FROM_DATE,
                TO_DATE,
                token: process.env.REACT_APP_FINNHUB_API_KEY,
            },
        });

        console.log('Chart server response:', response.data);
        
        // If the HTTP request is successful, the candle data is extracted from the API response and returned
        // to the client as a JSON object containing arrays of open, high, low, close, and timestamp values.

        // If an error occurs, an error message is returned with an HTTP 500 status code.

        const data = {
            closePrice: response.data.c,
            highPrice: response.data.h,
            lowPrice: response.data.l,
            open: response.data.o,
            timestamp: response.data.t,
        };

        res.send(data);
    } catch (error) {
        console.error('Error fetching chart data:', error);
        res.status(500).json({ error: 'Error fetching chart data' });
    }
});

module.exports = router;