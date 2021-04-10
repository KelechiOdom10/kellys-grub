const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  provider: {
    type: String,
    required: true,
    default: "email",
  },
  username: {
    type: String,
    required: [true, "Please enter a username"],
    match: [/^[a-zA-Z0-9_]+$/, "Username is invalid"],
  },
  email: {
    type: String,
    trim: true,
    required: [true, "Please enter an email address"],
    minlength: 5,
    maxlength: 255,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)+(\.\w{2,3})+$/,
      "Please enter a valid email address",
    ],
    index: true,
  },
  password: {
    type: String,
    trim: true,
    minLength: 6,
    select: false,
  },
  avatar: String,
  isAdmin: {
    type: Boolean,
    default: false,
  },
  // google
  googleId: {
    type: String,
    unique: true,
    sparse: true,
    select: false,
  },
  // fb
  facebookId: {
    type: String,
    unique: true,
    sparse: true,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
