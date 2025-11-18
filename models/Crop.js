const mongoose = require('mongoose');

const CropSchema = new mongoose.Schema({
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  quantity: { type: Number, default: 0 },
  price: { type: Number, required: true },
  grade: String,
  location: String,
  category: {
    type: String,
    enum: ["vegetables", "grains", "fruits", "organic", "others"],
    required: true
  },
  status: { type: String, enum: ["active", "pending", "sold"], default: "active" },
  image: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Crop", CropSchema);
