import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import { errorHandler } from "./middleware/error";
import authRoute from "./routes/authRoutes";
import categoryRoute from "./routes/categoryRoutes";
import { isAuth } from "./middleware/auth";
import { isProduction } from "./constants";

dotenv.config();

const PORT = process.env.PORT || 8080;
const MONGO_URL = !isProduction
  ? process.env.MONGO_URI_DEV
  : process.env.MONGO_URI_PROD;

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(passport.initialize());

mongoose.set("strictQuery", false);
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("DB connected successfully"))
  .catch(err => console.error(err));

// Passport config
require("./config/passport");

app.use("/api/auth", authRoute);
app.use("/api/category", categoryRoute);

app.use(errorHandler);

// TEST ROUTES
app.get("/", (_req, res) => {
  res.status(200);
  res.json({ message: "API working, ya dig" });
});

app.get("/profile", isAuth, function (req, res) {
  res.send(req.user);
});

const server = app.listen(PORT, () =>
  console.log(`Sever running on port ${PORT}`)
);

process.on("unhandledRejection", (err: any) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});

module.exports = app;
