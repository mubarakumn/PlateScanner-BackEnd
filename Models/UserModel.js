const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
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
  // subscription
  subscription: {
    type: [String],
    default: [{title: '',message: '', status: 'active', expiry: '2022-12-31'}]
  },
});
const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel
