var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.set('debug', true);
/**
 * https://github.com/Automattic/mongoose/issues/4802
 */
const ObjectId = mongoose.Schema.Types.ObjectId;

const ShopSchema = new Schema({
    owner: { type: ObjectId, ref: 'Owner' }
});
const Shop = mongoose.model('Shop', ShopSchema);

module.exports = { Shop };