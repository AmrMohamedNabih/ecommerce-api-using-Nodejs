const mongoose = require('mongoose');

const productOrderSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', // Assumes an existing Product model
    required: true,
  },
  orderCount: {
    type: Number,
    default: 0,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('ProductOrder', productOrderSchema);