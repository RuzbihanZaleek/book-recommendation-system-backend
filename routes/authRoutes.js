const express = require("express");
const router = express.Router();

router.post("/signup", (req, res) => {
  res.send("Signup endpoint called");
});

router.post("/login", (req, res) => {
  res.send("Login endpoint called");
});

router.post("/logout", (req, res) => {
  res.send("Logout endpoint called");
});

module.exports = router;
