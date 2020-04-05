const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Posts", postSchema);
