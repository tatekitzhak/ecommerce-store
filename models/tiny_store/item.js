var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// mongoose.set('debug', true);

const ObjectId = mongoose.Schema.Types.ObjectId;

const ItemSchema = new Schema({
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
ItemSchema.pre('save', async function(next){
  const user = this;
  // console.log('ItemSchema: Pre implement just before saving!');
});

ItemSchema.post('save', function (_) {
  // console.log('ItemSchema: Post implement just after saving!');
    
});

module.exports = mongoose.model('Item', ItemSchema);