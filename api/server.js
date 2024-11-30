const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

const verifyToken = require('../middlewares/auth');
const generateAccessToken = require('../GenerateJWT/generateJwt')
const generateRefreshToken = require('../GenerateJWT/generateJwt')
const UserRoutes = require('../Routes/UserRoute')
const PlateRoutes = require('../Routes/PlateRoute')

dotenv.config();

// Initialize express app
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());


app.use(cors({
  origin: 'exp://192.168.43.154:8081', // Allow only frontend running on this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));


// ++++ User Authentication ++++ //
app.use('/user', UserRoutes)
app.use('/plate', PlateRoutes)



// mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/PlateScanner')
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));


// Refresh Token Route
app.post('/token', (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) return res.status(403).json({ message: 'Access denied' });

  try {
    jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, user) => {
      if (err) return res.status(403).json({ message: 'Invalid refresh token' });

      const newAccessToken = generateAccessToken({ id: user.id });
      res.json({ token: newAccessToken });
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to verify token and send back the payload
app.get('/verify-token', verifyToken, async(req, res) => {
  // console.log("verifed data", req);
  
  // If the middleware passes, this part of the code is executed
  return res.status(200).json({  
      message: 'Token is valid',
      user: req.user  // The decoded payload (e.g., user role, userId, etc.)
  });
});

// Listening on a port
// const PORT = process.env.PORT || 3000;
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
