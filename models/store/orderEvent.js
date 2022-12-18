const mongoose = require('mongoose');

const OrderEventSchema = new Schema({
  order: {
    type: Schema.Types.ObjectId, ref: 'Order',
    required: true
  },
  status: {
    type: String,
    enum: ['initialized', 'preparing', 'ready']
  }
},
{
  timestamps: true
});

module.exports = mongoose.model('orderEvent', OrderEventSchema);