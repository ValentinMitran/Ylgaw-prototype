const router = require("express").Router();
const verifyToken = require("../utils/verifyToken");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Followed = require("../models/Follows/Followed");
const Following = require("../models/Follows/Following");
const Post = require("../models/Social/Post");
const Ads = require("../models/Store/Ads");
const upload = require("./../utils/uploads/profile");
const singleUpload = upload.single("pfp");

const aws = require("aws-sdk");

const dotenv = require("dotenv");
dotenv.config();

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

router.post("/pfp", verifyToken, function (req, res) {
  singleUpload(req, res, function (err) {
    if (err) {
      return res.status(422).send({
        errors: [{ title: "File Upload Error", detail: err.message }],
      });
    }

    return res.json({ imageUrl: req.file.location });
  });
});

router.post("/getProfileData", verifyToken, async (req, res) => {
  const decoded = jwt.decode(req.header("authToken"));

  const user = await User.findOne(
    { username: req.body.username },
    { _id: 1, username: 1, title: 1 }
  );
  const followers = await Followed.aggregate([
    { $match: { username: req.body.username } },
    { $project: { _id: 0, qty: { $size: "$followed" } } },
  ]);
  const followings = await Following.aggregate([
    { $match: { username: req.body.username } },
    { $project: { _id: 0, qty: { $size: "$following" } } },
  ]);

  let self;
  let amFollowing;
  if (decoded.username === req.body.username) {
    self = true;
  } else {
    self = false;
    let followingList = await Following.findOne({ username: decoded.username });
    for (let i = 0; i < followingList.following.length; i++) {
      if (followingList.following[i] === req.body.username) {
        amFollowing = true;
      }
    }
  }

  const s3 = new aws.S3();
  const image = `${req.body.username}/pfp.png`;
  var params = {
    Bucket: "ylgaw",
    Key: image,
  };

  //move that function out and pass it params

  async function getImage() {
    return new Promise((resolve, reject) => {
      s3.getObject(params, function (error, data) {
        if (error) {
          console.log("Failed to retrieve an object: " + error);
          reject(error);
        } else {
          const img64 = Buffer.from(data.Body).toString("base64");
          resolve(img64);
          console.log("Loaded " + data.ContentLength + " bytes");
        }
      });
    });
  }
  let img64 = await getImage().catch(() => {});

  const profile = {
    _id: user._id,
    pfp: img64,
    username: user.username,
    title: user.title,
    followers: followers[0].qty,
    following: followings[0].qty,
    self: self,
  };
  if (self == false && amFollowing == true) {
    profile.amFollowing = true;
  } else if (self == false) {
    profile.amFollowing = false;
  }

  res.status(200).send(profile);
});

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

router.post("/FollowingList", verifyToken, async (req, res) => {
  const target = req.body.username;
  const rawList = await Following.findOne({ username: target });
  const list = await User.find(
    { username: { $in: rawList.following } },
    { _id: 1, username: 1 }
  );

  res.send(list);
});

router.post("/FollowersList", verifyToken, async (req, res) => {
  const target = req.body.username;
  const rawList = await Followed.findOne({ username: target });
  const list = await User.find(
    { username: { $in: rawList.followed } },
    { _id: 1, username: 1 }
  );

  res.send(list);
});

router.post("/feed", verifyToken, async (req, res) => {
  let posts = await Post.find({ username: req.body.target });
  res.send(posts);
});
router.post("/shop", verifyToken, async (req, res) => {
  let listings = await Ads.find({ username: req.body.target });
  res.send(listings);
});
router.post("/stats", verifyToken, async (req, res) => {
  res.send("lol");
});

module.exports = router;
