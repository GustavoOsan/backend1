const { Router } = require('express');
const CartManager = require('../managers/cart.manager.js');

const router = Router();
const cartManager = new CartManager();

router.post('/', (req, res) => {
    const newCart = cartManager.createCart();
    res.status(201).json(newCart);
});

router.get('/:cid', (req, res) => {
    const { cid } = req.params;
    const cart = cartManager.getCartById(cid);

    if (cart) {
        res.status(200).json(cart.products);
    } else {
        res.status(404).json({ error: 'Carrito no encontrado.' });
    }
});

router.post('/:cid/product/:pid', (req, res) => {
    const { cid, pid } = req.params;
    const result = cartManager.addProductToCart(cid, pid);

    if (result.error) {
        return res.status(4404).json({ error: result.error });
    }

    res.status(200).json(result);
});

module.exports = router;