import products from '../data/products.js';

export const cart = {

};

export function addToCart(productId) {
    console.log('add to cart');
    const foundProduct = products.find(product => product.id === parseInt(productId));
    if (!foundProduct) {
        console.error('Product not found:', productId);
        return;
    } else {

    }
    cart.push(productId);

}