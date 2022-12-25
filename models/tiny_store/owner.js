var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// mongoose.set('debug', true);

const ObjectId = mongoose.Schema.Types.ObjectId;

// Define the user schema
const User = new Schema({
    username: {
        type: String,
        /* required: '{PATH} is required!',
        unique: true */
    },
    password: {
        type: String,
        /* required: '{PATH} is required!',
        unique: true */
    }
});

const OwnerSchema = new Schema({
    name: { type: String },
    user: {
        type: User
    },
    shops: [{
        type: ObjectId, ref: 'Shop'
    }],
});


module.exports = mongoose.model('Owner', OwnerSchema)