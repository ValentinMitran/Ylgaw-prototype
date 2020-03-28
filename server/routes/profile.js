const router = require("express").Router();
const verifyToken = require("../utils/verifyToken");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Followed = require("../models/Follows/Followed");
const Following = require("../models/Follows/Following");

router.post("/verifyUserName", verifyToken, async (req, res) => {
  const username = req.body.username;
  const user = await User.findOne(
    { username: username },
    { _id: 1, username: 1 }
  );
  if (user) {
    return res.status(202).send(user);
  }
  if (!user) {
    return res.status(400).send("User doesnt exist");
  }
});

router.post("/getProfileData", verifyToken, async (req, res) => {
  const user = await User.findOne(
    { username: req.body.username },
    { _id: 1, username: 1, title: 1 }
  );
  const followers = await Followed.aggregate([
    { $match: { username: user.username } },
    { $project: { _id: 0, qty: { $size: "$followed" } } }
  ]);
  const followings = await Following.aggregate([
    { $match: { username: user.username } },
    { $project: { _id: 0, qty: { $size: "$following" } } }
  ]);
  const profile = {
    _id: user._id,
    username: user.username,
    title: user.title,
    followers: followers[0].qty,
    following: followings[0].qty
  };
  res.send(profile);
});

router.post("/follow", verifyToken, async (req, res) => {
  const decoded = jwt.decode(req.header("authToken"));
  const self = decoded.username;
  const target = req.body.username;
  await Following.updateOne(
    { username: self },
    { $push: { following: target } },
    { new: true, upsert: true }
  );
  await Followed.updateOne(
    { username: target },
    { $push: { followed: self } },
    { new: true, upsert: true }
  );
  res.send("Success");
});

router.post("/unfollow", verifyToken, async (req, res) => {
  const decoded = jwt.decode(req.header("authToken"));
  const self = decoded.username;
  const target = req.body.username;
  await Following.updateOne(
    { username: self },
    { $pull: { following: target } },
    { new: true, upsert: true }
  );
  await Followed.updateOne(
    { username: target },
    { $pull: { followed: self } },
    { new: true, upsert: true }
  );
  res.send("Success");
});

module.exports = router;
