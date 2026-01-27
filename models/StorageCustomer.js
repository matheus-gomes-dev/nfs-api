const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const storageCustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  fee: {
    type: Number,
    required: true,
    min: 0
  },
  payday: {
    type: Date,
    required: true
  },
  customerPicture: {
    type: String,
    trim: true
  },
  equipmentPicture: {
    type: String,
    trim: true
  },
  active: {
    type: Boolean,
    default: true
  },
  comments: {
    type: [commentSchema],
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('StorageCustomer', storageCustomerSchema);