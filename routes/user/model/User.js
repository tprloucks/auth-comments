// bringing in mongoose
const mongoose = require("mongoose");
// creating our user schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
});
// exporting user schema
module.exports = mongoose.model("user", userSchema);
