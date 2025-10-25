const fs = require('fs');
const { randomUUID } = require('crypto');

const PRODUCTS_FILE_PATH = './data/products.json';

class ProductManager {
    
    constructor() {
        this.path = PRODUCTS_FILE_PATH;
    }

    readData() {
        if (!fs.existsSync(this.path)) return [];
        const data = fs.readFileSync(this.path, 'utf-8');
        return JSON.parse(data);
    }

    writeData(data) {
        fs.writeFileSync(this.path, JSON.stringify(data, null, 2));
    }

    getProducts() {
        return this.readData();
    }

    getProductById(pid) {
        const products = this.readData();
        const product = products.find(p => p.id === pid);
        return product;
    }

    addProduct(productData) {
        const { title, description, code, price, status = true, stock, category, thumbnails = [] } = productData;
        
        if (!title || !description || !code || !price || !stock || !category) {
            return { error: 'Todos los campos son obligatorios excepto thumbnails.' };
        }

        const products = this.readData();
        
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
        this.writeData(products);
        return newProduct;
    }

    updateProduct(pid, updateFields) {
        const products = this.readData();
        const productIndex = products.findIndex(p => p.id === pid);

        if (productIndex !== -1) {
            delete updateFields.id;
            products[productIndex] = { ...products[productIndex], ...updateFields };
            this.writeData(products);
            return products[productIndex];
        } else {
            return null;
        }
    }

    deleteProduct(pid) {
        let products = this.readData();
        const initialLength = products.length;

        products = products.filter(p => p.id !== pid);

        if (products.length < initialLength) {
            this.writeData(products);
            return true;
        } else {
            return false;
        }
    }
}

module.exports = ProductManager;