const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Get all books");
});

router.post("/", (req, res) => {
  res.send("Add a new book");
});

router.get("/:id", (req, res) => {
  res.send(`Get book with ID: ${req.params.id}`);
});

router.put("/:id", (req, res) => {
  res.send(`Update book with ID: ${req.params.id}`);
});

router.delete("/:id", (req, res) => {
  res.send(`Delete book with ID: ${req.params.id}`);
});

module.exports = router;
