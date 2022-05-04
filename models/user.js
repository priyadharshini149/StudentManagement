const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const userDetails = mongoose.model("users", userSchema);
module.exports = userDetails;
