const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const UserBooks = sequelize.define("UserBooks", {
  UserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Users",
      key: "id",
    },
  },
  BookId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Books",
      key: "id",
    },
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [["reading", "finished", "plan_to_read"]],
    },
    defaultValue: "plan_to_read",
  },
  date_added: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = UserBooks;
