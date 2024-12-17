require("dotenv").config();
const express = require("express");
const cors = require("cors");
const login = require("./routes/login");
const authenticateToken = require("./auth");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use("/auth", login);
app.use(cors());
app.use(express.json());
app.get("/", authenticateToken, (req, res) => {
  res.json("secure 🛡️");
});
app.listen(8000, () => {
  console.log("runnig in port 8000");
});
