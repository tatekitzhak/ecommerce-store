const express = require("express");
const { apiRateNetworkTrafficLimiter } = require('../middlewares/rateLimiter');

// var bookRouter = require('./book/route');
var categoriesRouter = require('./product/route');
var subCategoriesRouter = require('./product/route');

module.exports = function (app) {
    app.use(express.json());

    // app.use("/", apiRateNetworkTrafficLimiter, bookRouter);
    app.use("/categories", apiRateNetworkTrafficLimiter, categoriesRouter);
    app.use("/subcategories", apiRateNetworkTrafficLimiter, subCategoriesRouter);
};