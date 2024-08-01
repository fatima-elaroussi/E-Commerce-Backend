const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    max : 64
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  resetLink: {
    data: String,
    }
}, {timestamps: true});

module.exports = User = mongoose.model('User', UserSchema);
