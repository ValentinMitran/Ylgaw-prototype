const router = require("express").Router();
const verifyToken = require("../utils/verifyToken");
const jwt = require("jsonwebtoken");
const User = require("./../models/User");

const dotenv = require("dotenv");
dotenv.config();

router.post("/topup", verifyToken, async (req, res) => {
  const topUp = req.body.amount * 100;
  const stripe = require("stripe")(process.env.STRIPE_SEC_KEY);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: topUp,
    currency: "eur"
  });
  res.send({
    publishableKey: process.env.STRIPE_PUB_KEY,
    clientSecret: paymentIntent.client_secret
  });
});

router.post("/topup/success", verifyToken, async (req, res) => {
  const decoded = jwt.decode(req.header("authToken"));
  const topUp = req.body.amount * 100;
  await User.updateOne(
    { username: decoded.username },
    { $inc: { balance: topUp } }
  );
  res.status(204).send();
});

router.get("/balance", verifyToken, async (req, res) => {
  const decoded = jwt.decode(req.header("authToken"));
  const data = await User.findOne(
    { username: decoded.username },
    { _id: 1, username: 1, balance: 1 }
  );
  res.send(data);
});

module.exports = router;