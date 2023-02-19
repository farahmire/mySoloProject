const express = require('express');
const axios = require('axios');
require('dotenv').config()
const pool = require('../modules/pool');

const BASE_URL = "https://finnhub.io/api/v1";
const FROM_DATE = "1645142329";
const TO_DATE = "1676678329";

// const fromTimestamp = new Date(FROM_DATE).getTime() / 1000;
// const toTimestamp = new Date(TO_DATE).getTime() / 1000;

const router = express.Router();

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