const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const subCategorieSchema = mongoose.Schema({
  name: {
    type: String,
    // required: '{PATH} is required!'
  },
  categories: {
    type: ObjectId, ref: 'Categorie',
    // required: '{PATH} is required!'
  },
  products: [
    { type: ObjectId, ref: 'Product' }
  ]
}, {
  timestamps: true
});

module.exports = mongoose.model('Subcategorie', subCategorieSchema);