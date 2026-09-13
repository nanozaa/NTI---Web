const addToCart = require('./modules/addToCart');
const removeFromCart = require('./modules/removeFromCart');
const listCart = require('./modules/listCart');
const calculateTotal = require('./modules/calculateTotal');

addToCart(1);
addToCart(2);
addToCart(3);

console.log('Cart items:');
listCart();
console.log(`Total: $${calculateTotal().toFixed(2)}`);

removeFromCart(2);

console.log('\nAfter removing Headphones:');
listCart();
console.log(`Total: $${calculateTotal().toFixed(2)}`);
