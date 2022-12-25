/* var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.set('debug', true);

 https://github.com/Automattic/mongoose/issues/4802
 
const ObjectId = mongoose.Schema.Types.ObjectId;

const OwnerSchema = new Schema({
    name: { type: String }
});
const ShopSchema = new Schema({
    owner: { type: ObjectId, ref: 'Owner' }
});
const ItemSchema = new Schema({
    product:{
        type: String,
        required: '{PATH} is required!',
        unique: '{PATH} is required!', // `product` must be unique
    },
    shop: { type: ObjectId, ref: 'Shop' },
    buyer:[{
        type: ObjectId, ref: 'User'
    }]
});

ItemSchema.post('save', function(error, doc, next) {
    if (error.code === 11000) {
        console.log('post(save) MongoServerError:\n',error)
      next(new Error(`\n${this.product} must be unique\n`));
    } else {
        console.log('post(save) error:\n',error)
      next(error);
    }
  });

const Owner = mongoose.model('Owner', OwnerSchema);
const Shop = mongoose.model('Shop', ShopSchema);
const Item = mongoose.model('Item', ItemSchema);
 */
module.exports = {
    Owner: require('./owner'),
    Shop: require('./shop'),
    Product: require('./item')
};