const mongoose = require('mongoose')
const Schema = mongoose.Schema

let Report = new Schema({
    title: {
        type: String
    },
    summary: {
        type: String
    },
    analysis: {
        type: String
    },
    source_title: {
        type: String
    },
    source_link: {
        type: String
    },
    author: {
        type: String
    },
    like: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Like'
    },
    player: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Player'
    }
}, {
    timestamps: true
});
