const PlateNumberModel = require("../Models/PlateNumberModel");

// POST /plate/add
const AddPlate = async (req, res) => {
    const { PlateNumber, ownerName, carModel, Comment } = req.body;
  
    if (!PlateNumber || !ownerName || !carModel) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
  
    try {
      const newPlate = new PlateNumberModel({ PlateNumber, ownerName, carModel, Comment });
      await newPlate.save();
      return res.status(200).json({ message: 'Plate registered successfully!' });
    } catch (error) {
      console.error(error);
      if (error.code === 11000) {
        // Handle duplicate PlateNumber
        return res.status(400).json({ message: 'Plate number already exists.' });
      }
      return res.status(500).json({ message: 'Failed to register plate. Please try again.' });
    }
  }

// API endpoint to get plates
const Plates = async (req, res) => {
    const { number } = req.params;
    try {
      const plates = await PlateNumberModel.find({});
      if (plates) {
        res.status(200).json({
          success: true,
          data: plates,
          message: 'Plates retrieved successfully',
        });
      } else {
        res.status(404).json({ message: 'Plate number not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  }

// API endpoint to get plate details by plate number
const GetPlate = async (req, res) => {
    const { number } = req.params;
    try {
      const plateDetails = await PlateNumberModel.findOne({ PlateNumber: number.toUpperCase() });
      if (plateDetails) {
        res.status(200).json({
          success: true,
          data: plateDetails,
          message: 'Plate number details retrieved successfully',
        });
      } else {
        res.status(404).json({ message: 'Plate number not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  }

// Update plate status 
const UpdateStatus = async (req, res) => {
    const { plateNumber } = req.params;
    const { Status } = req.body;  // Get status from request body
  
    if (!Status || !Array.isArray(Status)) {
      return res.status(400).json({ message: 'Status must be an array.' });
    }
  
    try {
      // Find the plate and update its status
      const updatedPlate = await PlateNumberModel.findOneAndUpdate(
        { PlateNumber: plateNumber },
        { $set: { Status } },  // Update the status array
        { new: true }
      );
  
      if (!updatedPlate) {
        return res.status(404).json({ message: 'Plate number not found.' });
      }
  
      res.status(200).json({ message: 'Status updated successfully!', data: updatedPlate });
    } catch (error) {
      console.error('Error updating status:', error);
      res.status(500).json({ message: 'Failed to update status. Please try again.' });
    }
  }

// Update plate status 
const UpdateComments = async (req, res) => {
    const { plateNumber } = req.params;
    const { Comment } = req.body;  // Get comments from request body
  
    if (!Comment || !Array.isArray(Comment)) {
      return res.status(400).json({ message: 'Comment must be an array.' });
    } 
  
    try {
      // Find the plate and update its comments
      const updatedPlate = await PlateNumberModel.findOneAndUpdate(
        { PlateNumber: plateNumber },
        { $set: { Comment } },  // Update the comments array
        { new: true }
      );
  
      if (!updatedPlate) {
        return res.status(404).json({ message: 'Plate number not found.' });
      }
  
      res.status(200).json({ message: 'Comments updated successfully!', data: updatedPlate });
    } catch (error) {
      console.error('Error updating comments:', error);
      res.status(500).json({ message: 'Failed to update comments. Please try again.' });
    }
  }

  module.exports = {
  AddPlate,
  Plates,
  GetPlate,
  UpdateStatus,
  UpdateComments
  }