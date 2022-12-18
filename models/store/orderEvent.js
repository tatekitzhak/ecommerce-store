const mongoose = require('mongoose');

const OrderEventSchema = new Schema({
  order: {
    type: Schema.Types.ObjectId, 
    ref: 'order',
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

/**
 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//simplified models
const OrderSchema = new Schema({
     number: { type: Number },
     items: { type: Schema.Types.ObjectId, ref: 'Product' },
     events: [{ type: Schema.Types.ObjectId, ref: 'OrderEvent' }]
});
const OrderEventSchema = new Schema({
    order: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
    status: { type: String, enum: ['initialized', 'preparing', 'ready'] }
});
let Order = mongoose.model('Order', OrderSchema);
let OrderEvent = mongoose.model('OrderEvent', OrderEventSchema);
let session = await mongoose.startSession();
session.startTransaction();
try {
    let order = new Order({
        number: 5
    });
    let event = new OrderEvent({
        order: order.id,
        status: 'initialized'
    });
    await event.save({ session });
    order.events.push(event);
    await order.save({ session });
    await session.commitTransaction();
}
catch (err) {
    await session.abortTransaction();
}
finally {
    session.endSession();
}
 */

module.exports = mongoose.model('orderEvent', OrderEventSchema);