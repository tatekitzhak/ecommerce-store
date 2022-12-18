const mongoose = require('mongoose');

/**
 * https://stackoverflow.com/questions/53880700/how-to-create-mongodb-schema-design-while-dealing-with-single-user-account-and-m
 * https://www.mauaznar.com/posts/snippets/mongoose/
 */

const orderSchema = new Schema({
  referenceId: {
    type: String
  },
  description: {
    type: String
  },
  title: {
    type: String
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  status: {
    type: String,
    enum: ['open', 'pending', 'closed'],
    default: 'open'
  },
  status: {
    type: String,
    enum: ["Ordered", "Processing", "On the way", "Completed"],
    default: "Ordered"
  },
  items: {
    type: Schema.Types.ObjectId, ref: 'product'
  },
  events: [{
    type: Schema.Types.ObjectId, ref: 'orderEvent'
  }],
  seen: [{
    by: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    at: {
      type: Number,
    }
  }],
  comments: [{
    message: {
      type: String
    },
    commentedBy: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    commentedAt: {
      type: Number,
    },
    images: [imagesSchema]
  }, {
    strict: false,
    versionKey: false
  }],
  images: [imagesSchema]
}, {
  strict: false,
  versionKey: false
}, {
  timestamps: true
});

module.exports = mongoose.model('order', orderSchema);