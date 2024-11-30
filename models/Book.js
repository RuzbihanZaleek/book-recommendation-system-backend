const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { BOOK } = require("../constants/constants");

const Book = sequelize.define(
  "Books",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      validate: {
        len: {
          args: [0, 1000],
          msg: BOOK.VALIDATIONS.DESCRIPTION_CHAR_LIMIT,
        },
      },
    },
    genre: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [0, 100],
          msg: BOOK.VALIDATIONS.GENRE_CHAR_LIMIT,
        },
      },
    },
    published_date: {
      type: DataTypes.DATEONLY,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["title", "author"],
      },
    ],
  }
);

module.exports = Book;
