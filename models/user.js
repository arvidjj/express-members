const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    maxLength: 20,
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    maxLength: 15,
  },
  lastname: {
    type: String,
    required: true,
    maxLength: 15,
  },
  membershipStatus: {
    type: String,
    required: true,
  },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;