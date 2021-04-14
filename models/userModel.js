const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    provider: {
      type: String,
      required: true,
      default: "email",
    },
    username: {
      type: String,
      required: [true, "Please enter a username"],
    },
    email: {
      type: String,
      trim: true,
      required: [
        () => {
          return this.provider !== "email" ? false : true;
        },
        "Please enter an email address",
      ],
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
      required: [
        function () {
          return this.provider === "email";
        },
        "Password is required",
      ],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    avatar: String,
    isAdmin: {
      type: Boolean,
      default: false,
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
      select: false,
    },
    facebookId: {
      type: String,
      unique: true,
      sparse: true,
      select: false,
    },
    resetPasswordToken: String,
    resetPasswordTokenExpiry: Date,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
