var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// mongoose.set('debug', true);

const ObjectId = mongoose.Schema.Types.ObjectId;

const ItemSchema = new Schema({
  /*   product:{
        type: String,
        required: '{PATH} is required!',
        unique: [true, "{PATH} must be unique"] // `product` must be unique
    }, */
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

module.exports = mongoose.model('Item', ItemSchema);