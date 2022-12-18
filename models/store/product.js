const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: '{PATH} is required!',
    unique: true
  },
  description: {
    type: String,
    required: '{PATH} is required!'
  },
  price: {
    type: Number,
    default: 0
  },
  categories: {
    type: mongoose.Schema.Types.ObjectId, ref: 'categories',
    required: '{PATH} is required!'
  },
  subcategories: {
    type: mongoose.Schema.Types.ObjectId, ref: 'subcategories',
    required: '{PATH} is required!'
  },
  countInStock: {
    type: Number,
    required: '{PATH} is required!',
    min: 0,
    max: 255
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('product', productSchema);