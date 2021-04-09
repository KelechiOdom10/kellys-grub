const express = require("express");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 8080;

dotenv.config({ path: "./config.env" });

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
	res.status(200);
	res.json({ message: "We outchea" });
});

app.listen(PORT, () => {
	console.log(`Sever running on port ${PORT}`);
});
