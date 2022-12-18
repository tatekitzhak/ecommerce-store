const mongoose = require('mongoose');

const OrderSchema = new Schema({
  number: { type: Number },
  items: [{
    type: Schema.Types.ObjectId, ref: 'Product'
  }],
  events: [{
    type: Schema.Types.ObjectId, ref: 'OrderEvent'
  }]
},
{
  timestamps: true
});

module.exports = mongoose.model('order', OrderSchema);