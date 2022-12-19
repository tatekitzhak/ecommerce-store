var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.set('debug', true);
/**
 * https://github.com/Automattic/mongoose/issues/4802
 */
const ObjectId = mongoose.Schema.Types.ObjectId;

const OwnerSchema = new Schema({
    name: { type: String }
});
const ShopSchema = new Schema({
    owner: { type: ObjectId, ref: 'Owner' }
});
const ItemSchema = new Schema({
    shop: { type: ObjectId, ref: 'Shop' }
});

const Owner = mongoose.model('Owner', OwnerSchema);
const Shop = mongoose.model('Shop', ShopSchema);
const Item = mongoose.model('Item', ItemSchema);

module.exports = {
    Owner,
    Shop,
    Item
};