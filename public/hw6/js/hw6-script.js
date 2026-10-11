// HW6 – COSC 2328 – Professor McCurry
// Implemented by: Augie Pedraza

// 6.2 - Data objects (IC10/IC11 applied)
const productPrices = {
  laptop: 999.99,
  tablet: 499.99,
  phone: 699.99,
  monitor: 299.99
};

const discountCodes = {
  SAVE10: 0.10,
  SAVE20: 0.20,
  STUDENT: 0.15
};

// 6.3 - Arrow function: 8.25% tax
const calculateTax = (subtotal) => subtotal * 0.0825;

// 6.4 - Function expression: returns the discount amount (0 if blank/invalid)
const applyDiscount = function (subtotal, code) {
  const cleanCode = code.trim().toUpperCase();
  if (!cleanCode) {
    return 0;
  }
  const rate = discountCodes[cleanCode];
  if (!rate) {
    return 0;
  }
  return subtotal * rate;
};

// 6.5 - DOM element selection (selected once, reused in the handler)
const orderForm = document.getElementById("orderForm");
const productSelect = document.getElementById("product");
const quantityInput = document.getElementById("quantity");
const discountInput = document.getElementById("discountCode");
const resultsContainer = document.getElementById("results");

const resultProduct = document.getElementById("resultProduct");
const resultQuantity = document.getElementById("resultQuantity");
const resultSubtotal = document.getElementById("resultSubtotal");
const resultDiscount = document.getElementById("resultDiscount");
const resultTax = document.getElementById("resultTax");
const resultTotal = document.getElementById("resultTotal");

// 6.6 - Submit listener + preventDefault (IC13 applied)
orderForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // 6.7 - Read form data, bracket-notation lookup, validation
  const selectedProduct = productSelect.value;
  const quantity = Number(quantityInput.value);
  const discountCode = discountInput.value.trim();
  const price = productPrices[selectedProduct];

  if (!selectedProduct || !price) {
    alert("Please choose a product.");
    return;
  }
  if (!quantity || quantity < 1) {
    alert("Quantity must be at least 1.");
    return;
  }

  // 6.8 - Calculation logic (tax on the DISCOUNTED subtotal)
  const subtotal = price * quantity;
  const discountAmount = applyDiscount(subtotal, discountCode);
  const discountedSubtotal = subtotal - discountAmount;
  const tax = calculateTax(discountedSubtotal);
  const total = discountedSubtotal + tax;

  // 6.9 - Dynamic display
  resultProduct.textContent = selectedProduct;
  resultQuantity.textContent = quantity;
  resultSubtotal.textContent = "$" + subtotal.toFixed(2);
  resultDiscount.textContent = "-$" + discountAmount.toFixed(2);
  resultTax.textContent = "$" + tax.toFixed(2);
  resultTotal.textContent = "$" + total.toFixed(2);

  resultsContainer.classList.remove("results-hidden");
});
