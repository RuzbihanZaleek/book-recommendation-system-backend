const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Book = require('./Book');

const Review = sequelize.define('Review', {
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
});

Review.belongsTo(User);
Review.belongsTo(Book);

module.exports = Review;
