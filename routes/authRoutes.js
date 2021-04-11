const {
  register,
  login,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");
const express = require("express");
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/forgotpassword").post(forgotPassword);
router.route("/reset/:token").post(resetPassword);

module.exports = router;
