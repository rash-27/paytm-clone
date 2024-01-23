const express = require('express');
const { authMiddleware } = require('../middlewares/auth');
const router = express.Router();
const {Bank} = require('../models/banks');
const mongoose = require('mongoose');

//check balance
router.get('/balance', authMiddleware,async(req, res) => { 
   const userId = req.user.userId;
   const userDetails = await Bank.findOne({userId});
   if(!userDetails)return res.status(400).send('User doesnt exist');
    res.json({
        balance:userDetails.balance
    });
});

//transfer money
router.post('/transfer', authMiddleware,async(req, res) => { 
    const session = await mongoose.startSession();

    //Transaction is started
    session.startTransaction();

    const userId = req.user.userId;
    const {amount ,to} = req.body;
    if(!amount || !to)return res.status(400).send('Invalid request');
    const user = await Bank.findOne({userId})
    const otherUser = await Bank.findById(to);
    if(!otherUser)return res.status(400).send('User doesnt have a bank account exist');
    if(amount<0)return res.status(400).send('Invalid amount');
    if(userId===to)return res.status(400).send('Invalid request');
    if(user.balance<amount)return res.status(400).send('Insufficient balance');
    if(amount>10000)return res.status(400).send('Amount limit exceeded');
    user.balance-=amount;
    otherUser.balance+=amount; 
    await user.save();
    await otherUser.save();


    //Transaction is ended
    await session.commitTransaction();
    res.json({
        balance:user.balance,
        message:'Transaction successful'
    });
});

module.exports = router;