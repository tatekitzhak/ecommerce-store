const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;
const { Categorie, Subcategorie } = require('../../models/index')

module.exports = {
    async getAllSubcategories(req, res, next) {
        try {
            const item = await Subcategorie.find(); //.populate('Automotive and Transport');
            res.send({ Subcategories: item });
        } catch (err) {
            next(err);
        }
    },
    async createSubcategorie(req, res, next) {
        try {
            const categorieId = req.params;
            console.log('categorieId:\n', categorieId);

            for (newItem of newCategories) {
                var item = new categorie(newItem);
                await item.save();
            }

            const a = await categorie.find();
            console.log('categorie: ', a);

            res.status(200).json({ categorie: a });

        } catch (error) {
            console.log('error:\n', error);
            next(error)
        }
    },
    async addSubcategories(req, res, next) {
        try {
            const { bookId, TagId } = req.params;
            const newBook = await Book.findByIdAndUpdate(
                bookId,
                { $push: { tags: TagId } },
                { new: true, useFindAndModify: false },
            );
            res.send(newBook);
        } catch (err) {
            next(err);
        }
    },
    async createSubcategorieAndAddToCategories(req, res, next) {
        try {
            const categorieId = req.params;
            const { title, subtitle } = req.body[0];

            /*  const book = req.body;
             const newBook = await Book.create(book);
             const newTag = await Tag.findByIdAndUpdate(
                 tagId,
                 { $push: { books: newBook._id } },
                 { new: true, useFindAndModify: false },
             ); */

            // Check for error condition
            if (!ObjectId.isValid(categorieId)) {
                return next(new Error('Categorie ID object id not passed\n'));

            } else {
               
                const categorie = await Categorie.findById(categorieId.id, function (error, docs) {
                    if (error) {
                        console.log('err findById:', error);
                        return next(new Error('Mongoose findById method not properly casting to id strings to ObjectId'));
                    }
                    else {
                        console.log("findById Result : ", docs);
                        return docs;
                    }
                }).clone();
                // Create and save new document
                const new_subcategorie = new Subcategorie({ title: title, subtitle: subtitle, categories: categorie});
                const subcategorie_saved = await new_subcategorie.save();

                // Referencing schema to categorie(schema) and Pushing documents to another document as array elements
                categorie.subcategories.push(new_subcategorie);
                const categorie_saved = categorie.save();
                // return success response
                return res.status(200).json({
                    categorieId: categorieId,
                    title, subtitle,
                    categorie_saved,
                    categorie: categorie
                });
            }
        } catch (err) {
            next(err);
        }
    },
};