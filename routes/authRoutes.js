const express = require("express");
const {
  signup,
  login,
} = require("../controllers/authController/authController");
const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", (req, res) => {
  res.send("Logout endpoint called");
});

module.exports = router;
