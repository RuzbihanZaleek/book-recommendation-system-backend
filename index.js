const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { port } = require("./config/config");
const sequelize = require("./config/database");
const { DATABASE, SERVER } = require("./constants/constants");
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const userBooksRoutes = require("./routes/userBooksRoutes");
const { startDiscordBot } = require("./config/discord");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/userbooks", userBooksRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: SERVER.SERVER_ERROR });
});

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log(DATABASE.MESSAGES.SYNC_SUCCESS);
  })
  .catch((err) => {
    console.error(DATABASE.MESSAGES.SYNC_FAIL, err);
  });

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});

// Start Discord Bot
startDiscordBot();
