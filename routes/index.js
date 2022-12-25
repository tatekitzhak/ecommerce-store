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