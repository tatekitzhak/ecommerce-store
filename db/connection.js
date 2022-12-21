const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

mongoose.Promise = require('bluebird');

const { mongo } = require('../config/env');

module.exports = {
    async mongooseConnection(args) {
        console.log('\x1b[36m', `${args}:`, '\x1b[0m', 'connections process...');

        await mongoose.connect(mongo.uri,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }).then((result) => {
                console.log(`Database server connected on: \x1b[36m ${mongo.uri} \x1b[0m`, ) // mongoose.connection.states
            }).catch((error) => {
                console.log('Connection failed: ', error)
            });;

        return mongoose
    }
}