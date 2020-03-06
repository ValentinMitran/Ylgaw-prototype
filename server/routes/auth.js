const router = require("express").Router();
const jwt = require("jsonwebtoken");

router.get("/isLoggedIn", (req, res) => {
  res.send(false);
});

module.exports = router;
