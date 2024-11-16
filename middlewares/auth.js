const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const verifyToken = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', ''); // Extract the token from the header
    // console.log("Token from middleware:", token); 
    
    if (!token) {
        return res.status(401).json({ message: 'Access Denied: No token provided' });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
        if(err){
          return  res.status(403).json({ message: 'Invalid token' });
        }
    req.user = decoded;
    next();
    })
};

module.exports = verifyToken;  

