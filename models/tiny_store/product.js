var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// mongoose.set('debug', true);

const ObjectId = mongoose.Schema.Types.ObjectId;

const ProductSchema = new Schema({
  name: {
    type: String
  },
  /*   product:{
        type: String,
        required: '{PATH} is required!',
        unique: [true, "{PATH} must be unique"] // `product` must be unique
    }, */
  shop: [{
    type: ObjectId, ref: 'Shop'
  }],
  buyer: [{
    type: ObjectId, ref: 'User'
  }],
  items:[Number]
});
// Pre save middleware Just before saving model
ProductSchema.pre('save', async function(next){
  const user = this;
  // console.log('ProductSchema: Pre implement just before saving!');
});

ProductSchema.post('save', function (_) {
  // console.log('ProductSchema: Post implement just after saving!');
    
});

module.exports = mongoose.model('Product', ProductSchema);