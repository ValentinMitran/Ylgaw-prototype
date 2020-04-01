const router = require("express").Router();
const verifyToken = require("../utils/verifyToken");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Followed = require("../models/Follows/Followed");
const Following = require("../models/Follows/Following");
const dotenv = require("dotenv");
dotenv.config();

router.get("/usersList", verifyToken, async (req, res) => {
  const decoded = jwt.decode(req.header("authToken"));
  const userList = await User.find({}, { username: 1, _id: 1 });
  let followingList = await Following.findOne({ username: decoded.username });
  let processedList = [];
  let following;
  let iqty = userList.length;
  let jqty = followingList.following.length;

  for (let i = 0; i < iqty; i++) {
    if (userList[i].username == decoded.username) {
      continue;
    }
    following = false;
    for (let j = 0; j < jqty; j++) {
      if (userList[i].username == followingList.following[j]) {
        following = true;
      }
    }
    processedList.push({
      _id: userList[i]._id,
      username: userList[i].username,
      following: following
    });
  }
  res.json(processedList);
});

module.exports = router;
