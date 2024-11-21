const Book = require('../../models/Book');
const sendResponse = require('../../utils/response');

exports.createBook = async (req, res) => {
  const { title, author, description, genre, published_date } = req.body;
  try {
    const book = await Book.create({ title, author, description, genre, published_date });
    res.status(201).json(book);
  } catch (err) {
    console.error(err.message);
    // res.status(500).json({ error: 'Error creating book: ' });
    sendResponse(res, 500, 'Error creating book', null)
  }
};