const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    requried: true,
    min: 6,
    max: 100,
  },

  name: {
    type: String,
    requried: true,
    min: 6,
    max: 100,
  },

  password: {
    type: String,
    requried: true,
    min: 6,
    max: 1000,
  },

  isAdmin: {
    type: Boolean,
    required: false,
  },

  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
