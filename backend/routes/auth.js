const express = require('express');
const router = express.Router();

const {User} = require('../user');

router.get('/signup', (req, res) => {
    res.send('signup');
})


module.exports = router;