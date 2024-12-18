require("dotenv").config();
const express = require("express");
const cors = require("cors");
const login = require("./routes/login");
const authenticateToken = require("./auth");
const jwt = require("jsonwebtoken");

const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use("/auth", login);
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.get("/", authenticateToken, (req, res) => {
  res.json("secure 🛡️");
});
app.get("/check", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, process.env.SECRETE, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});
app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

app.listen(8000, () => {
  console.log("runnig in port 8000");
});
