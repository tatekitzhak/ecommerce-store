const mongoose = require('mongoose');

const categorieSchema = mongoose.Schema({
  name: { 
  	type: String, 
    required: '{PATH} is required!',
    unique: true
  },
  subtitle: {
  	type: String
  },
  website: {
  	type: String
  },
  subcategories: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'subcategories' }
  ],
  products: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'products' }
  ]
}, {
  timestamps: true
});

module.exports = mongoose.model('categorie', categorieSchema);