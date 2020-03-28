const mongoose = require("mongoose");

const followedSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  followed: [
    {
      type: String
    }
  ]
});

module.exports = mongoose.model("Followers", followedSchema);
