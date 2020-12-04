const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  username: { type: Number, required: true },

});

module.exports = mongoose.model('User', userSchema);
