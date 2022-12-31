const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const PORT = process.env.PORT || 8080;

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

const authRoute = require("./routes/authRoutes");
const categoryRoute = require("./routes/categoryRoutes");
const { isAuth, isAdmin } = require("./middleware/auth");

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(passport.initialize());

mongoose.set("strictQuery", false);
mongoose
  .connect(
    !isProduction ? process.env.MONGO_URI_DEV : process.env.MONGO_URI_PROD,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("DB connected successfully"))
  .catch(err => console.error(err));

// Passport config
require("./config/passport");

app.use("/api/auth", authRoute);
app.use("/api/category", categoryRoute);

app.use(errorHandler);

// TEST ROUTES
app.get("/", (req, res) => {
  res.status(200);
  res.json({ message: "API working, ya dig" });
});

app.get("/profile", isAuth, function (req, res) {
  res.send(req.user);
});

const server = app.listen(PORT, () =>
  console.log(`Sever running on port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});

module.exports = app;
