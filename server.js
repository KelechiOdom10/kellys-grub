const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 8080;

const isProduction = process.env.NODE_ENV === "production";

dotenv.config({ path: "./config.env" });

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
  res.json({ message: "We outchea" });
});

app.use("/api/v1/auth", authRoute);

app.listen(PORT, () => {
  console.log(`Sever running on port ${PORT}`);
});

module.exports = app;
