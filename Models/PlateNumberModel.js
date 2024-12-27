const { default: mongoose } = require("mongoose");

// Define the schema and model for plate numbers
const PlateNumberSchema = new mongoose.Schema({
    plateNumber: { type: String, required: true, uppercase: true },
    ownerName: { type: String, required: true },
    phone: { type: Number, required: true },
    vehicleType: { type: String, required: true },
    brand: { type: String, required: true },
    chassis: { type: String, required: true },
    color: { type: String, required: true },
    Comment: { type:[String] },
    Status: {
      type: [String],  // Array of status values
      enum: ['flagged', 'stolen', 'wanted', 'crime', 'clear'],  // predefined statuses
    },
    createdAt: { type: Date, default: Date.now },
  });
  
  const PlateNumberModel = mongoose.model('PlateNumber', PlateNumberSchema);

  module.exports = PlateNumberModel