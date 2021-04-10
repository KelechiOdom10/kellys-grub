const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const { generateAccessToken } = require("../utils/jwtGenerators");

const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!email || !password || !username) {
    res.status(400);
    res.json({
      status: "error",
      message: "Please fill all the necessary fields.",
    });
  }

  try {
    const user = await User.findOne({ email });

    if (user) {
      res.status(401);
      res.json({ status: "error", message: "User already exists!" });
      return;
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
    res
      .status(500)
      .json({ status: "error", message: "Internal Server Error!" });
    throw new Error(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    res.json({
      status: "error",
      message: "Please provide an email and password",
    });
  }

  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      res.status(401);
      res.json({
        status: "error",
        message: "User does not exist, please sign up!",
      });
      return;
    }

    const isValid = bcrypt.compare(password, user.password);
    if (!isValid) {
      res.status(401);
      res.json({ status: "error", message: "Invalid credentials!" });
      return;
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
    res
      .status(500)
      .json({ status: "error", message: "Internal Server Error!" });
    throw new Error(error);
  }
};

module.exports = { register, login };
