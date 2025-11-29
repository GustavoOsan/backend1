const { Router } = require('express');
const productModel = require('../models/product.model.js');
const cartModel = require('../models/cart.model.js');

const router = Router();

router.get('/products', async (req, res) => {
    try {
        let { limit = 10, page = 1, sort, query } = req.query;

        let filter = {};
        if (query) {
            if (query === 'true' || query === 'false') {
                filter.status = query === 'true';
            } else {
                filter.category = query;
            }
        }

        let options = {
            limit: parseInt(limit),
            page: parseInt(page),
            lean: true
        };

        if (sort) {
            options.sort = { price: sort === 'asc' ? 1 : -1 };
        }

        let result = await productModel.paginate(filter, options);

        res.render('products', {
            products: result.docs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.hasPrevPage ? `/products?page=${result.prevPage}&limit=${limit}` : null,
            nextLink: result.hasNextPage ? `/products?page=${result.nextPage}&limit=${limit}` : null
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
});

router.get('/carts/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartModel.findById(cid).lean();

        if (!cart) {
            return res.status(404).render('error', { message: 'Carrito no encontrado' });
        }

        res.render('cart', { cart });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener el carrito');
    }
});

router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts');
});

module.exports = router;