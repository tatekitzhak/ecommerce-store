const mongoose = require('mongoose');

const subCategorieSchema = mongoose.Schema({
  title: {
    type: String,
    required: '{PATH} is required!'
  },
  subtitle: {
    type: String
  },
  categories: {
    type: mongoose.Schema.Types.ObjectId, ref: 'categories',
    required: '{PATH} is required!'
  },
  products: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'products' }
  ]
}, {
  timestamps: true
});

module.exports = mongoose.model('subcategorie', subCategorieSchema);