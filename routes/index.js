const express = require("express");

const shopRouter = require('./tiny_store/route');
const { apiRateNetworkTrafficLimiter } = require('../middlewares/rateLimiter');
const { mongoose_debug }  = require('../middlewares/enableDebugLoggingMongoose');

/**
 * https://github.com/Automattic/mongoose/issues/4802
 */

module.exports = function (app) {
    app.use(mongoose_debug)    
    app.use(express.json());
    app.use('/shop', apiRateNetworkTrafficLimiter, shopRouter);
    /* 
        app.get('/create-shop', apiRateNetworkTrafficLimiter, async function (req, res, next) {
    
            const saved_data = await Owner.create({ name: 'Ran' })
                .then(async function (owner) {
                    return await Shop.create({ owner: owner._id })
                })
                .then(async function (shop) {
                    console.log("shop:", shop)
                    return await Item.create({ shop: shop._id, product: 'abc' })
                })
                .then(async function (shop) {
                    return await Item.findOne({ _id: shop._id })
                        .populate({
                            path: 'shop',
                            select: 'owner',
                            populate: {
                                path: 'owner',
                                select: 'name'
                            },
                            options: { lean: true }
                        }).
                        then(item => console.log("item.toObject():", item.toObject()))
                        .catch(error => console.log('error:', error));
                });
    
            res.status(200).json(saved_data);
    
        })
        .post();
     */
    /* 
        app.get('/populate-shop', apiRateNetworkTrafficLimiter, async function (req, res, next) {
    
            const shop = await Shop.find().populate('owner');
    
            console.log('shop', shop);
            res.status(200).json(shop);
    
        });
     */
    /* 
        app.get('/populate-item', apiRateNetworkTrafficLimiter, async function (req, res, next) {
    
            const item = await Item.find().populate({
                path: 'shop',
                select: 'owner',
                populate: {
                    path: 'owner',
                    select: 'name'
                },
                options: { lean: true }
            });
    
            console.log('shop', item);
            res.status(200).json(item);
    
        });
         */
};