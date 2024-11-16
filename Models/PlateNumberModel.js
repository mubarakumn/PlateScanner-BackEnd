const { default: mongoose } = require("mongoose");

// Define the schema and model for plate numbers
const PlateNumberSchema = new mongoose.Schema({
    PlateNumber: { type: String, required: true, uppercase: true },
    ownerName: { type: String, required: true },
    carModel: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    Comment: { type:[String] },
    Status: {
      type: [String],  // Array of status values
      enum: ['flagged', 'stolen', 'wanted', 'crime', 'clear'],  // predefined statuses
    },
  });
  
  const PlateNumberModel = mongoose.model('PlateNumber', PlateNumberSchema);

  module.exports = PlateNumberModel