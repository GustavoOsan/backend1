const { Router } = require('express');
const fs = require('fs');
const { randomUUID } = require('crypto');

const router = Router();
const PRODUCTS_FILE_PATH = './data/products.json';


const readData = () => {
    if (!fs.existsSync(PRODUCTS_FILE_PATH)) return [];
    const data = fs.readFileSync(PRODUCTS_FILE_PATH, 'utf-8');
    return JSON.parse(data);
};

const writeData = (data) => {
    fs.writeFileSync(PRODUCTS_FILE_PATH, JSON.stringify(data, null, 2));
};


router.get('/', (req, res) => {
    const products = readData();
    res.status(200).json(products);
});


router.get('/:pid', (req, res) => {
    const { pid } = req.params;
    const products = readData();
    const product = products.find(p => p.id === pid);
    if (product) {
        res.status(200).json(product);
    } else {
        res.status(404).json({ error: 'Producto no encontrado.' });
    }
});


router.post('/', (req, res) => {
    const { title, description, code, price, status = true, stock, category, thumbnails = [] } = req.body;
    if (!title || !description || !code || !price || !stock || !category) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios excepto thumbnails.' });
    }

    const products = readData();
    const newProduct = {
        id: randomUUID(),
        title,
        description,
        code,
        price: Number(price),
        status,
        stock: Number(stock),
        category,
        thumbnails
    };

    products.push(newProduct);
    writeData(products);
    res.status(201).json(newProduct);
});


router.put('/:pid', (req, res) => {
    const { pid } = req.params;
    const updateFields = req.body;
    const products = readData();
    const productIndex = products.findIndex(p => p.id === pid);

    if (productIndex !== -1) {
        delete updateFields.id;
        products[productIndex] = { ...products[productIndex], ...updateFields };
        writeData(products);
        res.status(200).json(products[productIndex]);
    } else {
        res.status(404).json({ error: 'Producto no encontrado.' });
    }
});


router.delete('/:pid', (req, res) => {
    const { pid } = req.params;
    let products = readData();
    const initialLength = products.length;

    products = products.filter(p => p.id !== pid);

    if (products.length < initialLength) {
        writeData(products);
        res.status(204).send();
    } else {
        res.status(404).json({ error: 'Producto no encontrado.' });
    }
});

module.exports = router;