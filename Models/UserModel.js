const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'user',
  },
  resetOTP: {
    type: String,
    default: null,
  },
  resetOTPExpiry: {
    type: Date,
    default: null,
  },
});
const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel
