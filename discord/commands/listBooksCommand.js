const apiService = require('../../config/apiService');

module.exports = {
  name: 'listbooks',
  description: 'List all books in your library',
  async execute(message) {
    try {
      const response = await apiService.get('/books');
      const books = response.data;
      const bookList = books
        .map((book, idx) => `${idx + 1}. ${book.title} by ${book.author}`)
        .join('\n');
      message.channel.send(`Books:\n${bookList}`);
    } catch (err) {
      message.channel.send('Error fetching books.');
    }
  },
};
