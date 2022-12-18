const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  productName: {
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
    default: 0.0
  },
  model: [{
    type: String,
    colour: [{
      name: String,
      image: String,
    }],
    size: [{
      val: Number,
    }],
  }],
  countInStock: {
    type: Number,
    required: '{PATH} is required!',
    min: 0,
    max: 255
  },
  categorie: {
    type: mongoose.Schema.Types.ObjectId, ref: 'categorie',
    required: '{PATH} is required!'
  },
  subcategorie: {
    type: mongoose.Schema.Types.ObjectId, ref: 'subcategorie',
    required: '{PATH} is required!'
  }
}, {
  timestamps: true
});
/**
 * https://stackoverflow.com/questions/68345787/category-and-subcategory-in-mongodb-using-mongoose
 If you want to make sure that the hierarchy of the category and subcategory, you can always add some middleware validation on your pre-save:
 */
productSchema.pre('save', async function (next) {
  if (this.SubCategory) {
    try {
      const check = await SubCategory.findById(this.SubCategory);
      if (!check || JSON.stringify(check.Category) !== JSON.stringify(this.Category)) {
        throw new Error('Check your Category and/or SubCategory');
      }
    } catch (error) {
      throw error;
    }
  }
  next();
});
module.exports = mongoose.model('product', productSchema);