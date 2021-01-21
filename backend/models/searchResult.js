const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  Title: { type: String, required: true },
  Year: { type: String, required: true },
  imdbID: { type: String, required: true },
  Type: { type: String, required: true },
  Poster: { type: String, required: true }
});

module.exports = mongoose.model('SearchResult', postSchema);

