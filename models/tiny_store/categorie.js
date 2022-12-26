const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

const categorieSchema = mongoose.Schema({
  name: { 
  	type: String, 
    /* required: '{PATH} is required!',
    unique: true */
  },
  subcategories: [
    { type: ObjectId, ref: 'Subcategorie' }
  ]
}, {
  timestamps: true
});

module.exports = mongoose.model('Categorie', categorieSchema);