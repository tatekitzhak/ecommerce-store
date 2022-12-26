const ObjectId = require('mongoose').Types.ObjectId;
const { Product, Owner, Shop } = require('../../models/index')
//  https://github.com/Automattic/mongoose/issues/4802
module.exports = {
    async getAllShops(req, res, next) {
        try {
            const product = await Product.find();
            const owner = await Owner.find()
                .populate({
                    path: 'shops',
                    select: 'name',
                    populate: {
                        path: 'products',
                        select: ['name','items']
                    },
                    options: { lean: true }
                });
            const shop = await Shop.find()
                .populate({
                    path: 'owner',
                    select: 'name',
                    options: { lean: true }
                });

            res.json({ owner, shop, product });
        } catch (err) {
            next(err);
        }
        finally {
            //finallyCode - Code block to be executed regardless of the try result
            /**
             * Do some clean up
             * Do log
             */
            console.log('finally:')
          }
    },
    async createShop(req, res, next) {
        const store = req.body;
        try {
            for (let i = 0; i < store.length; i++) {

                await Owner.create({ name: store[i].name })
                    .then(async function (owner) {

                        for (let s = 0; s < store[i].shops.length; s++) {

                            await Shop.create({ owner: owner._id, name: store[i].shops[s].name })
                                .then(async function (shop) {

                                    for (let p = 0; p < store[i].shops[s].products.length; p++) {
                                        
                                        let productName = store[i].shops[s].products[p].name;

                                        await Product.create({ name: productName, shops: shop._id, })
                                            .then(async function (product) {
                                                let productItems = store[i].shops[s].products[p].items;
                                                let updatedProduct = await Product.findOneAndUpdate({ _id: product._id },
                                                    { "$push": { items: { $each: productItems} } },
                                                    { new: true });

                                                await Shop.findByIdAndUpdate(shop._id, {
                                                    $push: { products: product._id }
                                                }, { 'new': true });
                                            });
                                    };

                                    return await Owner.findByIdAndUpdate(owner._id, {
                                        $push: { shops: shop._id }
                                    }, { 'new': true });

                                })
                                .catch(err => console.log('Error on bundle: Shop.create: ' + err));
                        };
                    })
                    .catch(err => console.log('Error on bundle: Owner.create: ' + err));
            };

            const product = await Product.find();
            const owner = await Owner.find();
            const shop = await Shop.find()
                .populate({
                    path: 'owner',
                    select: 'name',
                    options: { lean: true }
                });
            res.status(200).json({ owner, shop, product });

        } catch (error) {
            console.log('error:\n', error);
            next(error)
        }
        finally {
            //finallyCode - Code block to be executed regardless of the try result
            /**
             * Do some clean up
             * Do log
             */
            console.log('Finally will execute every time');
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