const router = require("express").Router();
const verifyToken = require("../utils/verifyToken");
const jwt = require("jsonwebtoken");

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

router.post("/get", verifyToken, (req, res) => {
  res.send(
    `https://ylgaw.s3.eu-west-3.amazonaws.com/mrx/${req.body.date}${req.body.month}${req.body.year}.png`
  );
});

router.post("/remove", verifyToken, (req, res) => {
  const decoded = jwt.decode(req.header("auth-token"));

  const s3 = new aws.S3();
  const date = req.body.date.toString()+req.body.month.toString()+req.body.year.toString();
  const image = `${decoded.username}/${date}.png`

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

module.exports = router;