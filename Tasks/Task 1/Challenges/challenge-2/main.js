const customerName = "Ahmed";
const productCategory = "Electronics";
const productPrice = 1000;
const quantity = 2;
const couponCode = "SAVE10";
const paymentMethod = "Cash";

function calculateSubtotal(price, qty) {
  return price * qty;
}

function applyCategoryDiscount(category, subtotal) {
  let discountRate = 0;

  if (category === "Electronics") {
    discountRate = 0.10;
  } else if (category === "Clothes") {
    discountRate = 0.15;
  } else if (category === "Groceries") {
    discountRate = 0.05;
  }

  return subtotal - subtotal * discountRate;
}

function applyCouponDiscount(coupon, subtotal) {
  if (coupon === "SAVE10") {
    return subtotal - subtotal * 0.10;
  }

  return subtotal;
}

function applyPaymentDiscount(method, subtotal) {
  if (method === "Cash") {
    return subtotal - subtotal * 0.05;
  }

  return subtotal;
}

function calculateVat(subtotal) {
  return subtotal * 0.14;
}

function generateInvoice() {
  const subtotal = calculateSubtotal(productPrice, quantity);
  const afterCategoryDiscount = applyCategoryDiscount(productCategory, subtotal);
  const afterCouponDiscount = applyCouponDiscount(couponCode, afterCategoryDiscount);
  const afterPaymentDiscount = applyPaymentDiscount(paymentMethod, afterCouponDiscount);
  const vat = calculateVat(afterPaymentDiscount);
  let finalTotal = afterPaymentDiscount + vat;

  if (finalTotal < 0) {
    finalTotal = 0;
  }

  console.log("Customer: " + customerName);
  console.log("Product Category: " + productCategory);
  console.log("Subtotal: " + subtotal);
  console.log("Discounted Total: " + afterPaymentDiscount.toFixed(2));
  console.log("VAT: " + vat.toFixed(2));
  console.log("Final Total: " + finalTotal.toFixed(2));

  return finalTotal;
}

console.log("--- Checkout Invoice ---");
generateInvoice();
