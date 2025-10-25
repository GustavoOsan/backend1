const { Router } = require('express');
const ProductManager = require('../managers/product.manager.js');

const router = Router();
const productManager = new ProductManager();

router.get('/', (req, res) => {
    const products = productManager.getProducts();
    res.status(200).json(products);
});

router.get('/:pid', (req, res) => {
    const { pid } = req.params;
    const product = productManager.getProductById(pid);
    
    if (product) {
        res.status(200).json(product);
    } else {
        res.status(404).json({ error: 'Producto no encontrado.' });
    }
});

router.post('/', (req, res) => {
    const result = productManager.addProduct(req.body); 

    if (result.error) {
        return res.status(400).json({ error: result.error });
    }

    res.status(201).json(result);
});

router.put('/:pid', (req, res) => {
    const { pid } = req.params;
    const updateFields = req.body;
    
    const updatedProduct = productManager.updateProduct(pid, updateFields);

    if (updatedProduct) {
        res.status(200).json(updatedProduct);
    } else {
        res.status(404).json({ error: 'Producto no encontrado.' });
    }
});

router.delete('/:pid', (req, res) => {
    const { pid } = req.params;
    const success = productManager.deleteProduct(pid);

    if (success) {
        res.status(204).send();
    } else {
        res.status(404).json({ error: 'Producto no encontrado.' });
    }
});

module.exports = router;