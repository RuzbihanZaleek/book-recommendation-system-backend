const User = require("./User");
const Book = require("./Book");
const Review = require("./Review");
const UserBooks = require("./UserBooks");

// User <-> Book Many-to-Many relationship
User.belongsToMany(Book, { through: UserBooks });
Book.belongsToMany(User, { through: UserBooks });

// User has many Reviews
User.hasMany(Review, { onDelete: "CASCADE" });
Review.belongsTo(User);

// Book has many Reviews
Book.hasMany(Review, { onDelete: "CASCADE" });
Review.belongsTo(Book);

// Association between UserBooks and Book
UserBooks.belongsTo(Book);
// Association between UserBooks and User
UserBooks.belongsTo(User);

// Export the models
module.exports = { User, Book, Review, UserBooks };
