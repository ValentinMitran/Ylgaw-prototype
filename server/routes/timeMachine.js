const router = require("express").Router();
const jwt = require("jsonwebtoken");
const verifyToken = require("../utils/verifyToken");
const User = require("../models/User");

router.post("/",verifyToken, (req, res) => {
  
    if(req.body.date == 21){
        res.send(true);
    }
    res.send(false);

});

module.exports = router;
