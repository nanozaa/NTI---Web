const cart = require('../data/cart');

function calculateTotal() {
  return cart.reduce((total, item) => total + item.price, 0);
}

module.exports = calculateTotal;
