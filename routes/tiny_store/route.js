const express = require('express');

const { ShopController } = require('../../controllers/index');

const shopRouter = express.Router();

shopRouter.route('/')
    .get(ShopController.getAllShops)
    .post( ShopController.createShop );

module.exports = shopRouter;