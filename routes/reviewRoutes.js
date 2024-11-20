const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Get all reviews");
});

router.post("/", (req, res) => {
  res.send("Add a new review");
});

module.exports = router;
