const fs = require('fs');
const { randomUUID } = require('crypto');
const path = require('path');

const CARTS_FILE_PATH = path.join(__dirname, '../data/carts.json');

class CartManager {

    constructor() {
        this.path = CARTS_FILE_PATH;
    }

    readData() {
        if (!fs.existsSync(this.path)) return [];
        const data = fs.readFileSync(this.path, 'utf-8');
        return JSON.parse(data);
    }

    writeData(data) {
        fs.writeFileSync(this.path, JSON.stringify(data, null, 2));
    }

    createCart() {
        const carts = this.readData();
        const newCart = {
            id: randomUUID(),
            products: []
        };
        carts.push(newCart);
        this.writeData(carts);
        return newCart;
    }

    getCartById(cid) {
        const carts = this.readData();
        const cart = carts.find(c => c.id === cid);
        return cart;
    }

    addProductToCart(cid, pid) {
        const carts = this.readData();
        const cartIndex = carts.findIndex(c => c.id === cid);

        if (cartIndex === -1) {
            return { error: 'Carrito no encontrado.' };
        }

        const cart = carts[cartIndex];
        const productIndex = cart.products.findIndex(p => p.product === pid);

        if (productIndex !== -1) {
            cart.products[productIndex].quantity += 1;
        } else {
            cart.products.push({ product: pid, quantity: 1 });
        }

        this.writeData(carts);
        return cart;
    }
}

module.exports = CartManager;