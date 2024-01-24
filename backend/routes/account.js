const express = require("express");
const { authMiddleware } = require("../middlewares/auth");
const router = express.Router();
const { Bank } = require("../models/banks");
const mongoose = require("mongoose");

//check balance
router.get("/balance", authMiddleware, async (req, res) => {
  const userId = req.user.userId;
  const userDetails = await Bank.findOne({ userId });
  if (!userDetails) return res.status(400).send("User doesnt exist");
  res.json({
    balance: userDetails.balance,
  });
});

//transfer money
router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();

  //Transaction is started
  session.startTransaction();

  const userId = req.user.userId;
  const { amount, to } = req.body;
  if (!amount || !to) return res.status(400).send("Invalid request");
  const user = await Bank.findOne({ userId }).session(session);
  const otherUser = await Bank.findById(to).session(session);
  if (!otherUser) {
    await session.abortTransaction();
    return res.status(400).send("User doesnt have a bank account exist");
  }
  if (amount < 0) {
    await session.abortTransaction();
    return res.status(400).send("Invalid amount");
  }
  if (userId === to) {
    await session.abortTransaction();
    return res.status(400).send("Invalid request");
  }
  if (user.balance < amount) {
    await session.abortTransaction();
    return res.status(400).send("Insufficient balance");
  }

  await Bank.findByIdAndUpdate(user._id, {$inc:{balance:-amount}}).session(session);
  await Bank.findByIdAndUpdate(otherUser._id, {$inc:{balance:amount}}).session(session);
  //Transaction is ended
  await session.commitTransaction();
  res.json({
    balance: user.balance-amount,
    message: "Transaction successful",
  });
});

module.exports = router;
