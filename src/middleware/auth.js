const passport = require("passport");
const express = require("express");
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns
 */
const isAuth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      res.status(401);
      res.json({
        success: false,
        message: "Not authorized to access this route",
      });
      return;
    }
    req.user = user;
    next();
  })(req, res, next);
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {function} next
 * @returns
 */
const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403);
    res.json({
      success: false,
      message: "Not authorized as admin",
    });
  }
};

module.exports = { isAuth, isAdmin };
