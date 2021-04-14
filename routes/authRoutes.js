const {
  register,
  login,
  forgotPassword,
  resetPassword,
  logout,
} = require("../controllers/authController");
const express = require("express");
const passport = require("passport");
const { generateAccessToken } = require("../utils/jwtGenerators");
const router = express.Router();

const isProduction = process.env.NODE_ENV === "production";
const clientUrl = !isProduction
  ? process.env.CLIENT_URL_DEV
  : process.env.CLIENT_URL_PROD;

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/forgotpassword").post(forgotPassword);
router.route("/reset/:token").post(resetPassword);

router.route("/google").get(
  passport.authenticate("google", {
    session: false,
    scope: ["profile", "email"],
  })
);

router.route("/google/callback").get(
  passport.authenticate("google", {
    failureRedirect: `${clientUrl}/login`,
    session: false,
  }),
  (req, res) => {
    const token = generateAccessToken({ id: req.user.id });

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    res.redirect(`${clientUrl}/menu`);
  }
);

router.route("/facebook").get(
  passport.authenticate("facebook", {
    session: false,
    scope: ["public_profile", "email"],
  })
);

router.route("/facebook/callback").get(
  passport.authenticate("facebook", {
    failureRedirect: `${clientUrl}/login`,
    session: false,
  }),
  (req, res) => {
    const token = generateAccessToken({ id: req.user.id });
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    res.redirect(`${clientUrl}/menu`);
  }
);

router.route("/logout").post(logout);

module.exports = router;
