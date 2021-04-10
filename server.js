const dotenv = require("dotenv");
const errorHandler = require("./middleware/error");
const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 8080;

dotenv.config({ path: "./config.env" });

const isProduction = process.env.NODE_ENV === "production";

const authRoute = require("./routes/authRoutes");

mongoose
  .connect(
    !isProduction ? process.env.MONGO_URI_DEV : process.env.MONGO_URI_PROD,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("DB connected successfully"))
  .catch(err => console.error(err));

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200);
  res.json({ message: "API working, ya dig" });
});

app.use("/api/v1/auth", authRoute);

app.use(errorHandler);

const server = app.listen(PORT, () =>
  console.log(`Sever running on port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});

module.exports = app;
