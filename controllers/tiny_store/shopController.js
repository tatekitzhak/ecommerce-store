const ObjectId = require('mongoose').Types.ObjectId;
const { Product, Owner, Shop } = require('../../models/index')

module.exports = {
    async getAllShops(req, res, next) {
        try {
            const product = await Product.find();
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

            res.json({ owner, shop, product });
        } catch (err) {
            next(err);
        }
    },
    async createShop(req, res, next) {
        const store = req.body;
        try {
            console.log('store:',store[0].shop[0])
            for (let i = 0; i < store.length; i++) {
                await Owner.create({ name: store[i].name })
                    .then(async function (owner) {

                        for (let s = 0; s < store[i].shop.length; s++) {

                            console.log('Shop:',store[i].shop[s].name)

                            await Shop.create({ owner: owner._id, name: store[i].shop[s].name })
                                .then(async function (shop) {

                                    for (let p = 0; p < store[i].shop[s].products.length; p++) {
                                        console.log('Product:',store[i].shop[s].products[p]) 
                                        await Product.create({ name: store[i].shop[s].products[p].name, shop: shop._id, })
                                        .then(async function (product) {
                                            let updatedProduct = await Product.findOneAndUpdate({ _id: product._id },
                                                { "$push": { items: { $each: store[i].shop[s].products[p].items } } },
                                                { new: true });

                                            await Shop.findByIdAndUpdate(shop._id, {
                                                $push: { products: product._id }
                                            }, { 'new': true });
                                        });
                                    }
                            

                                    return await Owner.findByIdAndUpdate(owner._id, {
                                        $push: { shop: shop._id }
                                    }, { 'new': true });

                                })
                                .catch(err => console.log('Error on bundle: Shop.create: ' + err));
                        }
                    })
                    .catch(err => console.log('Error on bundle: Owner.create: ' + err));

            };
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