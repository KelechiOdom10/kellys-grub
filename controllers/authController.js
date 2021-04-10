const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const ErrorResponse = require("../utils/errorResponse");
const { generateAccessToken } = require("../utils/jwtGenerators");

const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!email || !password || !username) {
    return next(
      new ErrorResponse("Please fill all the necessary fields.", 400)
    );
  }

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

    res.status(200);
    res.json({
      status: "success",
      message: "User successfully created",
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(
        new ErrorResponse("User does not exist, please sign up!", 401)
      );
    }

    const isValid = bcrypt.compare(password, user.password);
    if (!isValid) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    const token = generateAccessToken({ user: { id: user.id } });

    res.status(200);
    res.json({
      status: "success",
      user: {
        id: user.id,
        username: user.username,
        isAdmin: user.isAdmin,
      },
      token: `Bearer ${token}`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
