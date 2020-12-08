const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: String,
  address: String,
  contact: String,
  email: String
});

module.exports = mongoose.model("User", userSchema);
