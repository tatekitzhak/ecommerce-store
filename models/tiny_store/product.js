var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// mongoose.set('debug', true);

const ObjectId = mongoose.Schema.Types.ObjectId;

const ProductSchema = new Schema({
  name: {
    type: String,
    /* required: '{PATH} is required!',
    unique: [true, "{PATH} must be unique"] // `product` must be unique */
  },
  shops: [{
    type: ObjectId, ref: 'Shop'
  }],
  buyers: [{
    type: ObjectId, ref: 'User'
  }],
  items: [Schema.Types.Mixed],
  categories: {
    type: ObjectId, ref: 'Categorie',
    // required: '{PATH} is required!'
  },
  subcategories: [{
    type: ObjectId, ref: 'Subcategorie'
  }]
});
// Pre save middleware Just before saving model
ProductSchema.pre('save', async function (next) {
  const user = this;
  // console.log('ProductSchema: Pre implement just before saving!');
});

ProductSchema.post('save', function (_) {
  // console.log('ProductSchema: Post implement just after saving!');

});

module.exports = mongoose.model('Product', ProductSchema);