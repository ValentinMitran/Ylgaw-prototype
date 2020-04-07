const router = require("express").Router();
const verifyToken = require("../utils/verifyToken");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Followed = require("../models/Follows/Followed");
const Following = require("../models/Follows/Following");
const Post = require("../models/Social/Post");
const dotenv = require("dotenv");
const aws = require("aws-sdk");

dotenv.config();

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

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
      following: following,
    });
  }
  res.json(processedList);
});

router.get("/posts", verifyToken, async (req, res) => {
  const decoded = jwt.decode(req.header("authToken"));
  const s3 = new aws.S3();
  let data = [];
  let image;
  let params = {};
  let self;
  let amFollowing;
  const posts = await Post.find({});

  let followingList = await Following.findOne({ username: decoded.username });

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

  await Promise.all(
    await posts.map(async (post) => {
      image = `${post.username}/pfp.png`;
      params = {
        Bucket: "ylgaw",
        Key: image,
      };
      let img64 = await getImage().catch(() => {});
      if (decoded.username === post.username) {
        self = true;
      } else {
        self = false;
        for (let i = 0; i < followingList.following.length; i++) {
          if (followingList.following[i] === post.username) {
            amFollowing = true;
          } else {
            amFollowing = false;
          }
        }
      }
      if (self == false && amFollowing == true) {
        amFollowing = true;
      } else if (self == false && amFollowing == false) {
        amFollowing = false;
      }

      data.push({
        pfp: img64,
        self: self ? true : false,
        amFollowing: amFollowing ? true : false,
        username: post.username,
        content: post.content,
      });
    })
  );

  res.send(data);
});

router.post("/posts", verifyToken, async (req, res) => {
  const decoded = jwt.decode(req.header("authToken"));
  const post = new Post({
    username: decoded.username,
    content: req.body.content,
  });

  try {
    await post.save();
    res.send("Success");
  } catch (err) {
    res.status(400).send(err);
  }
});
module.exports = router;
