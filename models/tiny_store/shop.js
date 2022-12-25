var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// mongoose.set('debug', true);
/**
 * https://github.com/Automattic/mongoose/issues/4802
 */
const ObjectId = mongoose.Schema.Types.ObjectId;

const ShopSchema = new Schema({
    name: {
        type: String,
        /* required: '{PATH} is required!',
        unique: true */
    },
    owner: { type: ObjectId, ref: 'Owner' },
    products: [{
        type: ObjectId, ref: 'Product'
    }]
});

// Pre save middleware Just before saving model
ShopSchema.pre('save', async function(next){
    const user = this;
    // console.log('Pre implement just before saving!');
});

// Post save middleware Just after saving model
ShopSchema.post('save', function (error, doc, next) {
    // console.log('Post implement just after saving!');
    if (error.code === 11000) {
        console.log('post(save) MongoServerError:\n', error)
        next(new Error(`\n${this.name} must be unique\n`));
    } else {
        console.log('post(save) error:\n', error)
        next(error);
    }
    // next((error.code === 11000) ? new Error(`This (${this.name}) item field already exist`) : error)
});

module.exports = mongoose.model('Shop', ShopSchema);