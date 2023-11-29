const express = require('express');
const path = require('path');
const router = express.Router();


// /games/roulette
router.get("/roulette", (req, res) => {
    res.sendFile(path.resolve(__dirname + "/../src/views/roulette.html"));
});

// /games/hi-lo
router.get("/hi-lo", (req, res) => {
    res.sendFile(path.resolve(__dirname + "/../src/views/hi-lo.html"));
});


module.exports = router;