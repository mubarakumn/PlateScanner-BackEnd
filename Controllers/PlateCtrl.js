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

// Update status of a plate number
const UpdateStatus = async (req, res) => {
  try {
    const { plateNumber, status } = req.params;
    const { action } = req.query; // Use `action=add` or `action=remove` in the query parameter

    // Validate the status
    const validStatuses = ['flagged', 'stolen', 'wanted', 'crime', 'clear'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
    }

    let updateOperation;
    if (action === 'add') {
      updateOperation = { $addToSet: { Status: status } }; // Add the status if not already present
    } else if (action === 'remove') {
      updateOperation = { $pull: { Status: status } }; // Remove the status if present
    } else {
      return res.status(400).json({ error: "Invalid action. Use 'action=add' or 'action=remove'." });
    }

    // Update the plate's status
    const plate = await PlateNumberModel.findOneAndUpdate(
      { PlateNumber: plateNumber },
      updateOperation,
      { new: true } // Return the updated document
    );

    if (!plate) {
      return res.status(404).json({ error: 'Plate number not found.' });
    }

    return res.status(200).json({
      message: `Status ${action === 'add' ? 'added' : 'removed'} successfully.`,
      updatedPlate: plate,
    });
  } catch (error) {
    console.error('Error updating status:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};

// Update plate comment 
const UpdateComments = async (req, res) => {
  const { plateNumber } = req.params; // Plate number from the request URL
  const { Comment, action } = req.body; // Comment and action from the request body

  if (!Comment || !action) {
      return res.status(400).json({ message: 'Both Comment and action are required.' });
  }

  try {
      let updateOperation;

      if (action === 'add') {
          updateOperation = { $addToSet: { Comment } }; // Adds the comment if not already present
      } else if (action === 'remove') {
          updateOperation = { $pull: { Comment } }; // Removes the specific comment
      } else {
          return res.status(400).json({ message: 'Invalid action. Use "add" or "remove".' });
      }

      // Update the plate document
      const updatedPlate = await PlateNumberModel.findOneAndUpdate(
          { PlateNumber: plateNumber },
          updateOperation,
          { new: true } // Return the updated document
      );

      if (!updatedPlate) {
          return res.status(404).json({ message: 'Plate number not found.' });
      }

      res.status(200).json({ message: `Comment ${action}ed successfully!`, data: updatedPlate });
  } catch (error) {
      console.error('Error updating comments:', error);
      res.status(500).json({ message: 'Failed to update comments. Please try again.' });
  }
};



  module.exports = {
  AddPlate,
  Plates,
  GetPlate,
  UpdateStatus,
  UpdateComments
  }