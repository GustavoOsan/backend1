const { Router } = require('express');
const ProductManager = require('../managers/product.manager.js');

const router = Router();
const productManager = new ProductManager();

router.get('/', (req, res) => {
    const products = productManager.getProducts();
    res.render('home', { products });
});

router.get('/realtimeproducts', (req, res) => {
    const products = productManager.getProducts();
    res.render('realtimeproducts', { products });
});

module.exports = router;