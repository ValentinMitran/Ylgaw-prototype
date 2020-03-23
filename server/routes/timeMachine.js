const router = require("express").Router();
const verifyToken = require("../utils/verifyToken");
const jwt = require("jsonwebtoken");

const Note = require("../models/timemachine/Note");

const upload = require("./../utils/file-upload");
const singleUpload = upload.single("daily");

const aws = require("aws-sdk");

const dotenv = require("dotenv");
dotenv.config();

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  region: process.env.AWS_REGION
});

router.post("/upload", verifyToken, function(req, res) {
  singleUpload(req, res, function(err) {
    if (err) {
      return res.status(422).send({
        errors: [{ title: "File Upload Error", detail: err.message }]
      });
    }

    return res.json({ imageUrl: req.file.location });
  });
});

router.post("/get", verifyToken, async (req, res) => {
  const decoded = jwt.decode(req.header("authToken"));

  const s3 = new aws.S3();
  const date =
    req.body.date.toString() +
    req.body.month.toString() +
    req.body.year.toString();
  const image = `${decoded.username}/${date}.png`;
  const note = await Note.findOne({ username: decoded.username, date: date });
  var params = {
    Bucket: "ylgaw",
    Key: image
  };
  s3.getObject(params, function(error, data) {
    if (error != null) {
      console.log("Failed to retrieve an object: " + error);
      res.send("false");
    } else {
      const img64 = Buffer.from(data.Body).toString("base64");
      res.send({ img64, note });
      console.log("Loaded " + data.ContentLength + " bytes");
    }
  });
});

router.post("/remove", verifyToken, (req, res) => {
  const decoded = jwt.decode(req.header("authToken"));

  const s3 = new aws.S3();
  const date =
    req.body.date.toString() +
    req.body.month.toString() +
    req.body.year.toString();
  const image = `${decoded.username}/${date}.png`;

  var params = {
    Bucket: "ylgaw",
    Key: image
  };
  s3.deleteObject(params, function(err, data) {
    if (err) {
      console.log(err, err.stack);
    } else {
      res.send("Success");
    }
  });
});

router.post("/note/update", verifyToken, async (req, res) => {
  const decoded = jwt.decode(req.header("authToken"));
  Note.countDocuments({ username: decoded.username,date:req.body.date }, async function(
    err,
    count
  ) {
    if (count == 0) {
      const note = new Note({
        username: decoded.username,
        text: req.body.text,
        date: req.body.date
      });
      try {
        await note.save();
        res.send("Success");
      } catch (err) {
        res.status(400).send(err);
      }
    } else {
      await Note.updateOne(
        { username: decoded.username, date: req.body.date },
        { text: req.body.text }
      );
      res.send("Success");
    }
  });
});

module.exports = router;