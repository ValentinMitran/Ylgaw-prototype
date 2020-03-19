const router = require("express").Router();
const jwt = require("jsonwebtoken");
const verifyToken = require("../utils/verifyToken");

router.post("/get", verifyToken, (req, res) => {
  if (req.body.date == 21) {
    res.send(true);
  }
  res.send(false);
});

router.post("/upload", verifyToken, (req, res) => {
  res.send(false);
});

module.exports = router;