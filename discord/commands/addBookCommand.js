const { Op } = require("sequelize");
const {
  BOOK,
  USERBOOK,
  DISCORD_COMMANDS,
} = require("../../constants/constants");
const Book = require("../../models/Book");
const UserBooks = require("../../models/UserBooks");

module.exports = {
  name: DISCORD_COMMANDS.USERBOOK.NAME,
  description: DISCORD_COMMANDS.USERBOOK.DESCRIPTION,
  async execute(message, args) {
    // Check if a book name is provided
    if (args.length === 0) {
      return message.reply(DISCORD_COMMANDS.USERBOOK.VALIDATION);
    }

    const bookName = args.join(" ").toLowerCase();
    const userId = message.author.id;

    try {
      // Search for the book by name
      const book = await Book.findOne({
        where: { title: { [Op.iLike]: `%${bookName}%` } },
      });

      if (!book) {
        return message.reply(BOOK.MESSAGES.NO_RESULTS_FOUND);
      }

      const existingEntry = await UserBooks.findOne({
        where: { UserId: userId, BookId: book.id },
      });

      if (existingEntry) {
        return message.reply(USERBOOK.VALIDATIONS.ALREADY_EXISTS);
      }

      // Add the book to the user's library
      await UserBooks.create({
        UserId: userId,
        BookId: book.id,
      });

      return message.reply(DISCORD_COMMANDS.USERBOOK.ADD_SUCCESS(book.title));
    } catch (error) {
      console.error(error.message);
      return message.reply(USERBOOK.MESSAGES.CREATE_ERROR);
    }
  },
};
