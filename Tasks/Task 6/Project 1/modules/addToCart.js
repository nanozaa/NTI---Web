const products = require('../data/products');
const cart = require('../data/cart');

function addToCart(productId) {
  const product = products.find((item) => item.id === productId);

  if (!product) {
    throw new Error(`Product with ID ${productId} was not found.`);
  }

  cart.push({ ...product });
  return cart;
}

module.exports = addToCart;
