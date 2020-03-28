const router = require("express").Router();
const verifyToken = require("../utils/verifyToken");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

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

  const profile = {
    _id: user._id,
    username: user.username,
    title: user.title
  };
  res.send(profile);
});

module.exports = router;
