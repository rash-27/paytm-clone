const express = require('express');
const router = express.Router();

router.get('/transactions', (req, res) => { 
    res.send('transactions');
});

module.exports = router;