const mongoose = require('mongoose')
const express = require('express')
const likeRoutes = express.Router()
let Like = require('../models/Like')
let Report = require('../models/Report')
const Schema = mongoose.Schema

let Like = new Schema({
    value: {
        type: Number
    },
    _report: {
        type: String,
        ref: 'Report'
    }
}, {
    timestamps: true
});





likeRoutes.route('/').get(function(req, res) {
    Like.find(function(err, like) {
        if (err) {
            console.log(err)
        } else {
            res.json(like)
        }
    })
})

likeRoutes.route('/:id').get(async (req, res) => {
    console.log(req.params.id)
    let id = req.params.id
    Like.findById(id, function(err, like){
        res.json(like)
    })
})

likeRoutes.route('/add').post(function(req, res){
    let like = new Like({
        value: req.body.value,
        _report: req.body._report
    })
    like.save((err, doc) => {
        if (err)
            res.send(err)
            console.log(req.body._report)
        Report.findOneAndUpdate(req.body._report,
            { $push: { like: doc._id} },
            { new: true , useFindAndModify: false},
            (err, post) => {
                if (err)
                    res.send(err)
                res.json({doc})
            }
        )
    })

})

likeRoutes.route('/update/:id').post(function(req, res){
    Like.findById(req.params.id, function(err, like) {
        if (!like)
            res.status(404).send('data is not found')
        else
            like.title = req.body.title
            like.desc = req.body.desc
            like.markdown = req.body.markdown

            like.save().then(like => {
                res.json('Like updated!!!')
            })
            .catch(err => {
                res.status(400).send('Update didnt work')
            })
    })
})

module.exports = likeRoutes