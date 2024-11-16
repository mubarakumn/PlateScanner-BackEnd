
{
    /*
    // {=======To continue Here}
// Update plate status to 'traffic'
app.post('/platedetails/traffic/:num', async (req, res) => {
  const { num } = req.params;
  try {
    const updated = await PlateNumberModel.findOneAndUpdate(
      { PlateNumber: num.toUpperCase() },  // Ensure uppercase matching
      { $addToSet: { Status: 'traffic' } },  // Prevent duplicate entries in the status array
      { new: true }
    );

    if (updated) {
      res.status(200).json({ message: 'Plate set to Traffic Violation successfully', updated });
    } else {
      res.status(404).json({ message: 'Plate number not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Similar status update for stolen
app.post('/platedetails/stolen/:num', async (req, res) => {
  const { num } = req.params;
  try {
    const updated = await PlateNumberModel.findOneAndUpdate(
      { PlateNumber: num.toUpperCase() },
      { $addToSet: { Status: 'stolen' } },
      { new: true }
    );

    if (updated) {
      res.status(200).json({ message: 'Plate marked as stolen', updated });
    } else {
      res.status(404).json({ message: 'Plate number not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Update plate status to 'crime'
app.post('/platedetails/crime/:num', async (req, res) => {
  const { num } = req.params;
  try {
    const updated = await PlateNumberModel.findOneAndUpdate(
      { PlateNumber: num.toUpperCase() },
      { $addToSet: { Status: 'crime' } },
      { new: true }
    );

    if (updated) {
      res.status(200).json({ message: 'Plate marked for crime', updated });
    } else {
      res.status(404).json({ message: 'Plate number not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Update plate status to 'wanted'
app.post('/platedetails/wanted/:num', async (req, res) => {
  const { num } = req.params;
  try {
    const updated = await PlateNumberModel.findOneAndUpdate(
      { PlateNumber: num.toUpperCase() },
      { $addToSet: { Status: 'wanted' } },
      { new: true }
    );

    if (updated) {
      res.status(200).json({ message: 'Plate marked as wanted', updated });
    } else {
      res.status(404).json({ message: 'Plate number not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Update plate status to 'flagged'
app.post('/platedetails/flagged/:num', async (req, res) => {
  const { num } = req.params;
  try {
    const updated = await PlateNumberModel.findOneAndUpdate(
      { PlateNumber: num.toUpperCase() },  // Ensure uppercase matching
      { $addToSet: { Status: 'flagged' } },  // Prevent duplicate entries in the status array
      { new: true }
    );

    if (updated) {
      res.status(200).json({ message: 'Plate flagged successfully', updated });
    } else {
      res.status(404).json({ message: 'Plate number not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// {=====End to Continue}

     */
}






// app.post('/register', async (req, res) => {
//     const { email, password } = req.body;
//     console.log(email, password);
//     try {
//       const existingUser = await UserModel.findOne({ email });
//       if (existingUser) return res.status(400).json({ message: 'User already exists' });
  
//       const hashedPassword = await bcrypt.hash(password, 10);
//       const newUser = new UserModel({
//         email,
//         password: hashedPassword,
//       });
  
//       await newUser.save();
//       res.status(201).json({ message: 'User created successfully' });
//     } catch (err) {
//       console.error('Register error:', err);
//       res.status(500).json({ message: 'Server error' });
//     }
//   });
  
//   // Login Route
//   app.post('/login', async (req, res) => {
//     const { email, password } = req.body;
  
//     try {
//       const user = await UserModel.findOne({ email });
//       if (!user) return res.status(400).json({ message: 'Invalid email or password' });
  
//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });
  
//       // Generate access and refresh tokens
//       const accessToken = generateAccessToken(user);
//       const refreshToken = generateRefreshToken(user);
  
//       // Store refresh token in HTTP-only cookies
//       res.cookie('refreshToken', refreshToken, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === 'production',
//         maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
//       });
  
//       res.status(200).json({
//         message: 'Login successful',
//         token: accessToken,
//         refreshToken: refreshToken, // Send refresh token if necessary
//         role: user.role,
//       });
//     } catch (err) {
//       console.error('Login error:', err);
//       res.status(500).json({ message: 'Server error' });
//     }
//   });


// ++++ Plate Management APIs ++++ //
// // POST /plate/add
// app.post('/plate/add', async (req, res) => {
//   const { PlateNumber, ownerName, carModel, Comment } = req.body;

//   if (!PlateNumber || !ownerName || !carModel) {
//     return res.status(400).json({ message: 'All fields are required.' });
//   }

//   try {
//     const newPlate = new PlateNumberModel({ PlateNumber, ownerName, carModel, Comment });
//     await newPlate.save();
//     return res.status(200).json({ message: 'Plate registered successfully!' });
//   } catch (error) {
//     console.error(error);
//     if (error.code === 11000) {
//       // Handle duplicate PlateNumber
//       return res.status(400).json({ message: 'Plate number already exists.' });
//     }
//     return res.status(500).json({ message: 'Failed to register plate. Please try again.' });
//   }
// });

// // API endpoint to get plates
// app.get('/plates', async (req, res) => {
//   const { number } = req.params;
//   try {
//     const plates = await PlateNumberModel.find({});
//     if (plates) {
//       res.status(200).json({
//         success: true,
//         data: plates,
//         message: 'Plates retrieved successfully',
//       });
//     } else {
//       res.status(404).json({ message: 'Plate number not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// });
// // API endpoint to get plate details by plate number
// app.get('/plate/:number', async (req, res) => {
//   const { number } = req.params;
//   try {
//     const plateDetails = await PlateNumberModel.findOne({ PlateNumber: number.toUpperCase() });
//     if (plateDetails) {
//       res.status(200).json({
//         success: true,
//         data: plateDetails,
//         message: 'Plate number details retrieved successfully',
//       });
//     } else {
//       res.status(404).json({ message: 'Plate number not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// });


// // PUT /plates/:plateNumber/update-status
// app.put('/plates/:plateNumber/update-status', async (req, res) => {
//     const { plateNumber } = req.params;
//     const { Status } = req.body;  // Get status from request body
  
//     if (!Status || !Array.isArray(Status)) {
//       return res.status(400).json({ message: 'Status must be an array.' });
//     }
  
//     try {
//       // Find the plate and update its status
//       const updatedPlate = await PlateNumberModel.findOneAndUpdate(
//         { PlateNumber: plateNumber },
//         { $set: { Status } },  // Update the status array
//         { new: true }
//       );
  
//       if (!updatedPlate) {
//         return res.status(404).json({ message: 'Plate number not found.' });
//       }
  
//       res.status(200).json({ message: 'Status updated successfully!', data: updatedPlate });
//     } catch (error) {
//       console.error('Error updating status:', error);
//       res.status(500).json({ message: 'Failed to update status. Please try again.' });
//     }
//   });
  
//   // PUT /plates/:plateNumber/update-comments
//   app.put('/plates/:plateNumber/update-comments', async (req, res) => {
//     const { plateNumber } = req.params;
//     const { Comment } = req.body;  // Get comments from request body
  
//     if (!Comment || !Array.isArray(Comment)) {
//       return res.status(400).json({ message: 'Comment must be an array.' });
//     }
  
//     try {
//       // Find the plate and update its comments
//       const updatedPlate = await PlateNumberModel.findOneAndUpdate(
//         { PlateNumber: plateNumber },
//         { $set: { Comment } },  // Update the comments array
//         { new: true }
//       );
  
//       if (!updatedPlate) {
//         return res.status(404).json({ message: 'Plate number not found.' });
//       }
  
//       res.status(200).json({ message: 'Comments updated successfully!', data: updatedPlate });
//     } catch (error) {
//       console.error('Error updating comments:', error);
//       res.status(500).json({ message: 'Failed to update comments. Please try again.' });
//     }
//   });
  