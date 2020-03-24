const router = require("express").Router();
const verifyToken = require("../utils/verifyToken");
const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config();

router.post("/", verifyToken, function(req, res) {
  
res.send('Sucess');

});

module.exports = router;