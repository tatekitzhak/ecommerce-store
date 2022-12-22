const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;
const { Product } = require('../../models/index')

module.exports = {
    async getAllProduct(req, res, next) {
        try {
            const books = await Book.find().populate('author');
            res.send(books);
        } catch (err) {
            next(err);
        }
    },
    async createProduct(req, res) {
        try {
            const product = req.body;
            console.log('products:\n', product);
/* 
            for (author of authors) {
                var newAuthor = new Author(author);
                await newAuthor.save();
            }

            const a = await Author.find();
            console.log('authors: ', a);
             */
            res.status(200).json({ product: req.body });

        } catch (error) {
            console.log('error:\n', error);
        }
    },
    async AddTagToBook(req, res, next) {
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
    async CreateBookAndAddToTag(req, res, next) {
        try {
            const { tagId } = req.params;
            const book = req.body;
            const newBook = await Book.create(book);
            const newTag = await Tag.findByIdAndUpdate(
                tagId,
                { $push: { books: newBook._id } },
                { new: true, useFindAndModify: false },
            );
            res.send(newTag);
        } catch (err) {
            next(err);
        }
    },
};