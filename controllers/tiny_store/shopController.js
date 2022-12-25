const ObjectId = require('mongoose').Types.ObjectId;
const { Item, Owner, Shop } = require('../../models/index')

module.exports = {
    async getAllShops(req, res, next) {
        try {
            const owner = await Owner.find();
            const shop = await Shop.find()
                .populate({
                    path: 'owner',
                    select: 'name',
                    options: { lean: true }
                });
            /* .populate({
                path: 'shop',
                select: 'owner',
                populate: {
                    path: 'owner',
                    select: 'name'
                },
                options: { lean: true }
            }); */

            res.json({ owner, shop });
        } catch (err) {
            next(err);
        }
    },
    async createShop(req, res, next) {
        const store = req.body;
        try {
            for (let i = 1; i < 4; i++) {
                await Owner.create({ name: `ran - ${i}` })
                    .then(async function (owner) {
                        for (let s = 1; s < 3; s++) {
                            await Shop.create({ owner: owner._id, name: `shop ${s}` })
                                .then(function (shop) {
                                    return Owner.findByIdAndUpdate(owner._id, {
                                        $push: { shop: shop._id }},{ 'new': true });

                                })
                                .catch(err => console.log('Error on bundle: Shop.create: ' + err));
                        }
                    })
                    .catch(err => console.log('Error on bundle: Owner.create: ' + err));

            }
            /* await Owner.create({ name: 'Ran' })
                .then(async function (owner) {
                    return await Shop.create({ owner: owner._id })
                })
                .then(function (shop) {
                    return Item.create({ shop: shop._id, name: 'abcde' })
                        .then(function (item) {
                            console.log('item:', item.name)
                            return Item.updateOne({ name: item.name },
                                { $push: { items: { $each: [777, 8882] } } },
                                { upsert: true });
                        });
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
                        then(item => console.log("item.toObject():", item))
                        .catch(error => console.log('error:', error));
                })
                .catch(err => console.log('Error on bundle: Owner.create: ' + err));
 */
            res.status(200).json({ store });

        } catch (error) {
            console.log('error:\n', error);
            next(error)
        };
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