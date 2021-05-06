const bcrypt = require("bcrypt");
const crypto = require("crypto");
const express = require("express");
const User = require("../models/userModel");
const ErrorResponse = require("../utils/errorResponse");
const { generateAccessToken } = require("../utils/jwtGenerators");
const sendEmail = require("../utils/sendEmail");

const isProduction = process.env.NODE_ENV === "production";
const clientUrl = !isProduction
  ? process.env.CLIENT_URL_DEV
  : process.env.CLIENT_URL_PROD;

/**
 * @typedef {object} registerRequestBody
 * @property {string} username
 * @property {string} email
 * @property {string} password
 *
 * @param {express.Request<{}, {}, registerRequestBody>} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns
 */
const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      return next(new ErrorResponse("User already exists!", 401));
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201);
    res.json({
      success: true,
      message: "User successfully created",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @typedef {object} loginRequestBody
 * @property {string} email
 * @property {string} password
 *
 * @param {express.Request<{},{}, loginRequestBody>} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns
 */
const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    const token = generateAccessToken({ id: user.id });

    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: isProduction,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      })
      .json({ success: true, message: "Successfully logged in!" });
  } catch (error) {
    next(error);
  }
};

/**
 * @typedef {object} forgotPasswordRequestBody
 * @property {string} email
 *
 * @param {express.Request<{},{}, forgotPasswordRequestBody>} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns
 */
const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(
        new ErrorResponse(
          "Your request could not be processed as entered. Please try again.",
          404
        )
      );
    }

    const resetToken = crypto.randomBytes(18).toString("hex");
    if (!resetToken) {
      return next(
        new ErrorResponse(
          "Your request could not be processed as entered. Please try again.",
          400
        )
      );
    }

    user.resetPasswordToken = resetToken;
    user.resetPasswordTokenExpiry = Date.now() + 10 * (60 * 1000); //10 minutes

    await user.save();

    const resetUrl = `${clientUrl}/resetpassword/${resetToken}`;

    const message = `
      <h1>You have requested a password reset for your Kelly's Grub account</h1>
      <p>Please follow this link to reset your password:</p>
      <a href=${resetUrl} clicktracking=off>Click here</a>
      <p>If this wasn't authorized by you please ignore this email!</p>
    `;

    try {
      await sendEmail({
        to: user.email,
        subject: "Password Reset Request for Kelly's Grub",
        html: message,
      });

      res.status(200);
      res.json({
        success: true,
        message:
          "Email successfully sent. Please check your inbox to reset your password.",
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordTokenExpiry = undefined;

      await user.save();
      return next(new ErrorResponse("Email could not be sent", 500));
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @typedef {object} resetPasswordRequestBody
 * @property {string} password
 *
 * @param {express.Request<{},{}, resetPasswordRequestBody>} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns
 */
const resetPassword = async (req, res, next) => {
  const { password } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return next(
        new ErrorResponse(
          "Your token has expired. Please attempt to reset your password again.",
          400
        )
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    if (!hashedPassword) {
      return next(
        new ErrorResponse(
          "Your request could not be processed. Please attempt to reset your password again.",
          400
        )
      );
    }

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpiry = undefined;

    await user.save();

    res.status(201);
    res.json({
      success: true,
      message:
        "Password changed successfully. Please login with your new password.",
    });
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns
 */
const logout = async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(0),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

module.exports = { register, login, forgotPassword, resetPassword, logout };
