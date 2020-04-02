const router = require("express").Router();
const verifyToken = require("../utils/verifyToken");
const jwt = require("jsonwebtoken");
const Ad = require("./../models/Store/Ads");

const dotenv = require("dotenv");
dotenv.config();

router.post("/getAd", verifyToken, async (req, res) => {
  const ads = await Ad.findOne({ _id: req.body.adId });

  res.send(ads);
});

router.get("/ads", verifyToken, async (req, res) => {
  const ads = await Ad.find({}, {});
  res.send(ads);
});

router.post("/ads", verifyToken, async (req, res) => {
  const decoded = jwt.decode(req.header("authToken"));

  const ad = new Ad({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    username: decoded.username
  });

  try {
    await ad.save();
    res.send("Success");
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/myads", verifyToken, async (req, res) => {
  const decoded = jwt.decode(req.header("authToken"));

  const ads = await Ad.find({ username: decoded.username }, {});

  res.send(ads);
});

module.exports = router;
