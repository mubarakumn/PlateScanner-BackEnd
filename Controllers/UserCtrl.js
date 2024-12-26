const { generateAccessToken, generateRefreshToken } = require("../GenerateJWT/generateJwt");
const UserModel = require("../Models/UserModel");
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

require('dotenv').config();

// Register Route
const Register = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    try {
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({
            email,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        console.error('Register error:', err);
        res.status(500).json({ message: 'Server error' });
    }
}

// Login Route
const Login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid email or password' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

        // Generate access and refresh tokens
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        // Store refresh token in HTTP-only cookies
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.status(200).json({
            message: 'Login successful',
            token: accessToken,
            refreshToken: refreshToken, // Send refresh token if necessary
            role: user.role,
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Server error' });
    }
}

// Reset Password Route
const sendResetOTP = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).send('Email is required');

  try {
    const user = await UserModel.findOne({ email });
    
    if (!user){
      console.log(`No user found for email: ${email}`);
      return res.status(400).json({ message: 'User not found' });
    }

    // Generate a random 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Save OTP and expiry in user record
    user.resetOTP = otp;
    user.resetOTPExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    // Send email with reset link
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your email password or app password
      },
    });

    const mailOptions = {
      from: `"Plate Scanner App" <noreply@platescanner.com> <noreply@platescanner.com>`, 
      replyTo: "noreply@platescanner.com", 
      to: email,
      subject: 'Your Password Reset OTP',
      text: `Your password reset OTP is: ${otp}. It will expire in 10 minutes.`,
    };

    await transporter.sendMail(mailOptions).catch(err => {
      console.error("Error sending mail:", err);
      return res.status(500).json({ message: 'Failed to send email' }, email, user, pass);
    });
    
    res.status(200).json('OTP sent successfully');
  } catch (err) {
    console.error("Error in sendResetOTP:", err);
    res.status(500).json('Internal server error');
  }
};

// Verify OTP and reset password handler
const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if OTP is valid
    const currentTimestamp = Date.now();
    if (user.resetOTP !== otp || currentTimestamp > user.resetOTPExpiry) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the password and clear OTP fields
    user.password = hashedPassword;
    user.resetOTP = null;
    user.resetOTPExpiry = null;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error resetting password:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

 


module.exports = {Register,Login, sendResetOTP, resetPassword}