const axios = require("axios");
const { BOOK } = require("../../constants/constants");
require('dotenv').config();

const searchBooksCommand = async (args, token) => {
  const [criteria, ...values] = args.split(" ");
  const queryMap = { title: "title", genre: "genre", author: "author" };

  if (!queryMap[criteria]) {
    return "Invalid search criteria. Use `title`, `genre`, or `author`.";
  }

  const query = `${criteria}=${values.join(" ")}`;

  try {
    const response = await axios.get(
      `${process.env.API_URL}/books/search?${query}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const books = response.data.data;
    return books
      .map(
        (book) =>
          `Title: ${book.title}, Author: ${book.author}, Genre: ${book.genre}`
      )
      .join("\n");
  } catch (err) {
    if (err.response && err.response.status === 404) {
      return BOOK.MESSAGES.NO_RESULTS_FOUND;
    }
    console.error(err.message);
    return BOOK.MESSAGES.SEARCH_ERROR;
  }
};

module.exports = searchBooksCommand;
