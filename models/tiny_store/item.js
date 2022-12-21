var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.set('debug', true);

const ObjectId = mongoose.Schema.Types.ObjectId;

const ItemSchema = new Schema({
    product:{
        type: String,
        required: '{PATH} is required!',
        unique: [true, "{PATH} must be unique"] // `product` must be unique
    },
    shop: { type: ObjectId, ref: 'Shop' },
    buyer:[{
        type: ObjectId, ref: 'User'
    }]
});

ItemSchema.post('save', function(error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        console.log('post(save) error:\n',error)
      next(new Error('email must be unique'));
    } else {
        console.log('post(save) error:\n',error)
      next(error);
    }
  });

const Item = mongoose.model('Item', ItemSchema);

module.exports = { Item };