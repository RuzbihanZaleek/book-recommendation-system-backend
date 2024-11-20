const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { port } = require("./config/config");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/books", require("./routes/bookRoutes"));
app.use("/api/reviews", require("./routes/reviewRoutes"));

app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).send({ message: "Internal Server Error" });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
