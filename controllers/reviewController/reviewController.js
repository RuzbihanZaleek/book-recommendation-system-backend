const Review = require('../../models/Review');
// const Book = require('../../models/Book');
// const User = require('../../models/User');

exports.createReview = async (req, res) => {
  const { content, rating, bookId } = req.body;
  try {
    const review = await Review.create({ content, rating, bookId, userId: req.user.id });
    res.status(201).json(review);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error creating review' });
  }
};
