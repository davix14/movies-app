const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  rating: { type: Number, required: false },
  description: { type: String, required: false },
  dateEntered: { type: Number, required: true },
  dateChanged: { type: Number, required: true },
  creator: { type: mongoose.Schema.Types.ObjectID, ref: "User", required: true },
  searchResult: { type: Object, required: false },
  tags: { type: Array, required: false}
});

module.exports = mongoose.model('Movie', postSchema);
