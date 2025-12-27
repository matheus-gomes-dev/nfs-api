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
    enum: ['aguardando', 'completa', 'canceleda'],
    default: 'aguardando',
    required: true
  },
  comment: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);