const CategoriesController = require('./store/categoriesController');
const SubcategoriesController = require('./store/subCategoriesController')
const ProductController = require('./store/productController');

module.exports = {
    CategoriesController,
    SubcategoriesController,
    ProductController,
    // Tiny store
    ShopController: require('./tiny_store/shopController')
};

