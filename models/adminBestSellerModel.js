const mongoose = require('mongoose');

const adminBestSellerSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assumes an existing User model
    required: true,
  },
  addedDate: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});
adminBestSellerSchema.index({ isActive: 1, addedDate: -1 });

module.exports = mongoose.model('AdminBestSeller', adminBestSellerSchema);