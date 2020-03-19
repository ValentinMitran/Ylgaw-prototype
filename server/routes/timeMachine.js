const router = require("express").Router();
const jwt = require("jsonwebtoken");
const multer = require("multer");
const verifyToken = require("../utils/verifyToken");
const fs = require("fs");

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const path = `./timemachine/${req.body["username"]}`;
    fs.mkdirSync(path, { recursive: true });
    cb(null, path);
  },
  filename: function(req, file, cb) {
    var filename = file.originalname;
    var fileExtension = filename.split(".")[1];
    cb(null, Date.now() + "." + fileExtension);
  }
});
const upload = multer({ storage: storage });

router.post("/upload", upload.single("daily"), verifyToken, (req, res) => {
  req.file ? res.send(true) : res.send(false);
});

router.post("/get", verifyToken, (req, res) => {
  if (req.body.date == 21) {
    res.send(true);
  } else {
    res.send(false);
  }
});
module.exports = router;