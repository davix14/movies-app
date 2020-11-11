const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  rating: { type: Number, required: true },
  description: { type: String, required: true },
  dateEntered: { type: Number, required: true }
});

module.exports = mongoose.model('Movie', postSchema);
