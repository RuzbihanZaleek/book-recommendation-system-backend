const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { port } = require("./config/config");
const sequelize = require("./config/database");
const { DATABASE, SERVER } = require("./constants/constants");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/books", require("./routes/bookRoutes"));
app.use("/api/reviews", require("./routes/reviewRoutes"));

app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).send({ message: SERVER.SERVER_ERROR });
});

sequelize
  .sync()
  .then(() => {
    console.log(DATABASE.MESSAGES.SYNC_SUCCESS);
  })
  .catch((err) => {
    console.error(DATABASE.MESSAGES.SYNC_FAIL, err);
  });

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
