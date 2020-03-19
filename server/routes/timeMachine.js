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
      return res
        .status(422)
        .send({
          errors: [{ title: "File Upload Error", detail: err.message }]
        });
    }

    return res.json({ imageUrl: req.file.location });
  });
});

router.post("/get", verifyToken, (req, res) => {
  if (req.body.date == 21) {
    res.send(true);
  } else {
    res.send(false);
  }
});
module.exports = router;