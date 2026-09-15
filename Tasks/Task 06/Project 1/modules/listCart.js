const cart = require('../data/cart');

function listCart() {
  if (cart.length === 0) {
    console.log('Cart is empty.');
    return cart;
  }

  cart.forEach((item) => {
    console.log(`${item.name} - $${item.price.toFixed(2)}`);
  });

  return cart;
}

module.exports = listCart;
