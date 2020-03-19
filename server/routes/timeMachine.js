const router = require("express").Router();
const jwt = require("jsonwebtoken");
const multer = require("multer");
const verifyToken = require("../utils/verifyToken");
const fs = require("fs");
const upload = require("./../utils/file-upload");
const singleUpload = upload.single("daily");

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
module.exports = router;