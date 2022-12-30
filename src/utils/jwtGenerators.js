const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

/**
 *
 * @param {{id: mongoose.ObjectId}} payload
 * @returns {string}
 */
const generateAccessToken = payload => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

/**
 *
 * @param {{id: string}} payload
 * @returns {string}
 */
const generateRefreshToken = payload => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = { generateAccessToken, generateRefreshToken };
