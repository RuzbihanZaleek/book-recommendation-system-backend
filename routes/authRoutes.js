const express = require("express");
const router = express.Router();

router.post("/signup", (req, res) => {
  res.send("Signup endpoint");
});

router.post("/login", (req, res) => {
  res.send("Login endpoint");
});

router.post("/logout", (req, res) => {
  res.send("Logout endpoint");
});

module.exports = router;
