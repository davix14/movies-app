const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  registrationDate: { type: Number, required: true },
  lastUpdate: { type: Number, required: true }
});

module.exports = mongoose.model('User', userSchema);
