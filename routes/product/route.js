const express = require('express');

const { CategoriesController, SubcategoriesController } = require('../../controllers/index');

const router = express.Router();

router.route('/')
    .get(CategoriesController.getAllCategories)
    .post( CategoriesController.createCategorie );

router.route('/:id')
    .get( SubcategoriesController.getAllSubcategories)
    .post( SubcategoriesController.createSubcategorieAndAddToCategories );


module.exports = router;