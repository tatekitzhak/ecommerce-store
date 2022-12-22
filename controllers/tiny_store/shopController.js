const ObjectId = require('mongoose').Types.ObjectId;
const { Item, Owner , Shop } = require('../../models/index')

module.exports = {
    async getAllShops(req, res, next) {
        try {
            const item = await Item.find().populate({
                path: 'shop',
                select: 'owner',
                populate: {
                    path: 'owner',
                    select: 'name'
                },
                options: { lean: true }
            });
            // const popluatedClaim = await Claim.findById(insertedClaim._id).populate({ path: "billed_insurances",});
            /* const item1 = await Categorie.findOne({ name: 'Food and Beverage' })
                .populate('subcategories').exec((err, doc) => {
                    if (err) {
                        return console.log('populate subcategories:', err);
                    }
                    console.log('subcategories doc:', doc);
                    return doc;
                }) */;

            res.json({ item });
        } catch (err) {
            next(err);
        }
    },
    async createShop(req, res, next) {

        try {
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

            res.status(200).json({ createShop: saved_data });

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