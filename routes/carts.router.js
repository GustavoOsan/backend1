const { Router } = require('express');
const fs = require('fs');
const { randomUUID } = require('crypto');
const router = Router();
const CARTS_FILE_PATH = './data/carts.json';

const readData = () => {
    if (!fs.existsSync(CARTS_FILE_PATH)) return [];
    const data = fs.readFileSync(CARTS_FILE_PATH, 'utf-8');
    return JSON.parse(data);
};

const writeData = (data) => {
    fs.writeFileSync(CARTS_FILE_PATH, JSON.stringify(data, null, 2));
};

router.post('/', (req, res) => {
    const carts = readData();
    const newCart = {
        id: randomUUID(),
        products: []
    };
    carts.push(newCart);
    writeData(carts);
    res.status(201).json(newCart);
});


router.get('/:cid', (req, res) => {
    const { cid } = req.params;
    const carts = readData();
    const cart = carts.find(c => c.id === cid);
    if (cart) {
        res.status(200).json(cart.products);
    } else {
        res.status(404).json({ error: 'Carrito no encontrado.' });
    }
});


router.post('/:cid/product/:pid', (req, res) => {
    const { cid, pid } = req.params;
    const carts = readData();
    const cartIndex = carts.findIndex(c => c.id === cid);
    if (cartIndex === -1) {
        return res.status(404).json({ error: 'Carrito no encontrado.' });
    }
    const cart = carts[cartIndex];
    const productIndex = cart.products.findIndex(p => p.product === pid);
    if (productIndex !== -1) {
        cart.products[productIndex].quantity += 1;
    } else {
        cart.products.push({ product: pid, quantity: 1 });
    }

    writeData(carts);
    res.status(200).json(cart);
});

module.exports = router;