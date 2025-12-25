const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  cost: {
    type: Number,
    required: false,
    default: 0
  },
  imgSrc: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    enum: ['lanches', 'açaí', 'bebidas', 'sobremesas', 'refeições'],
    required: true,
    trim: true
  },
  available: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);