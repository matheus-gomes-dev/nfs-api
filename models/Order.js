const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  }],
  status: {
    type: String,
    enum: ['waiting', 'completed', 'canceled'],
    default: 'waiting',
    required: true
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);