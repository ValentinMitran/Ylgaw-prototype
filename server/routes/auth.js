const router = require("express").Router();
const jwt = require("jsonwebtoken");
const verifyToken = require("../utils/verifyToken");
const {
  registerValidation,
  loginValidation
} = require("./../utils/dataValidation");

router.get("/isLoggedIn", verifyToken, (req, res) => {
  res.send(true);
});

router.post("/register", (req, res) => {
  res.send(true);
});

router.post("/login", (req, res) => {
  res.send(true);
});

router.post("/logout", (req, res) => {
  res.send(false);
});

module.exports = router;
