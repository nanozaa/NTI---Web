const cart = require('../data/cart');

function removeFromCart(productId) {
  const itemIndex = cart.findIndex((item) => item.id === productId);

  if (itemIndex === -1) {
    return null;
  }

  const [removedItem] = cart.splice(itemIndex, 1);
  return removedItem;
}

module.exports = removeFromCart;
