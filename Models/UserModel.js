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
    title: { type: String, default: 'Subscription Ended' },
    message: { type: String, default: 'Please renew to continue using the app or app will shutdown suddenly!!!' },
    expiry: { 
      type: Date, 
      default: () => {
        const now = new Date();
        return new Date(now.setMonth(now.getMonth() - 1));
      }
    }
  }
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
