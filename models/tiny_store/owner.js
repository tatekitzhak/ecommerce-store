var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.set('debug', true);

const ObjectId = mongoose.Schema.Types.ObjectId;

const OwnerSchema = new Schema({
    name: { type: String }
});

const Owner = mongoose.model('Owner', OwnerSchema);

module.exports = { Owner };