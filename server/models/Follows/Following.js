const mongoose = require("mongoose");

const followingSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  following: [
    {
      type: String
    }
  ]
});

module.exports = mongoose.model("Following", followingSchema);
