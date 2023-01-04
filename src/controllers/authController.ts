import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
import User from "~/models/userModel";
import { sendEmail } from "~/utils/sendEmail";
import { ErrorResponse } from "~/utils/errorResponse";
import { generateAccessToken } from "~/utils/jwtGenerators";
import { EMAIL_PROVIDER } from "~/constants";
import { zParse } from "~/middleware/validate";
import {
  ForgotPasswordSchema,
  LoginSchema,
  RegisterSchema,
  ResetPasswordSchema,
} from "~/validation/auth";

const isProduction = process.env.NODE_ENV === "production";
const clientUrl = !isProduction
  ? process.env.CLIENT_URL_DEV
  : process.env.CLIENT_URL_PROD;

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    body: { email, password, username },
  } = await zParse(RegisterSchema, req, res);

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

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    body: { email, password },
  } = await zParse(LoginSchema, req, res);

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    if (user && user.provider !== EMAIL_PROVIDER.Email) {
      return next(
        new ErrorResponse(
          `That email address is already in use using ${user.provider} provider.`,
          400
        )
      );
    }

    const isValid = await bcrypt.compare(password, user.password!);
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

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    body: { email },
  } = await zParse(ForgotPasswordSchema, req, res);

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

    if (user && user.provider !== EMAIL_PROVIDER.Email) {
      return res.status(400).send({
        error: `That email address is already in use using ${user.provider} provider.`,
      });
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

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    body: { password },
  } = await zParse(ResetPasswordSchema, req, res);

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

export const logout = async (_req: Request, res: Response) => {
  res.cookie("token", "none", {
    expires: new Date(0),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};
