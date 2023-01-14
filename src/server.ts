import dotenv from "dotenv";
import Cors from "cors";
import cookieParser from "cookie-parser";
import express, { Response } from "express";
import mongoose from "mongoose";
import passport from "passport";
import authRoute from "./routes/authRoutes";
import categoryRoute from "./routes/categoryRoutes";
import productRoute from "./routes/productRoutes";
import { isAuth } from "./middleware/auth";
import { isProduction } from "./constants";
import { errorHandler } from "./middleware/error";

dotenv.config();

const PORT = process.env.PORT || 8080;
const MONGO_URL = !isProduction
  ? process.env.MONGO_URI_DEV
  : process.env.MONGO_URI_PROD;

const app = express();

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());
app.use(passport.initialize());
app.use(Cors());

mongoose.set("strictQuery", false);
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("DB connected successfully"))
  .catch(err => console.error(err));

// Passport config
require("./config/passport");

app.use("/api/auth", authRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/products", productRoute);

// TEST ROUTES
app.get("/", (_req, res: Response) => {
  res.status(200);
  res.json({ message: "API working, ya dig" });
});

app.get("/profile", isAuth, function (req, res) {
  res.send(req.user);
});

//  Handle errors
app.use(errorHandler);

const server = app.listen(PORT, () =>
  console.log(`Sever running on port ${PORT}`)
);

process.on("unhandledRejection", (err: any) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});
