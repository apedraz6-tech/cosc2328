// HW5 – COSC 2328 – Professor McCurry
// Implemented by: Augie Pedraza

console.log("=== BOOKSTORE INVENTORY CALCULATOR ===");

// 5.2 - Book inventory variables & data (IC10 applied)
const book1 = { title: "The Hobbit", author: "J.R.R. Tolkien", price: 14.99 };
const book2 = { title: "Dune", author: "Frank Herbert", price: 18.5 };
const book3 = { title: "Fahrenheit 451", author: "Ray Bradbury", price: 12.25 };

const TAX_RATE = 0.0825; // 8.25%
let isMember = true;

console.log("--- Book Inventory ---");
console.log("Title: " + book1.title + " | Author: " + book1.author + " | Price: $" + book1.price);
console.log("Title: " + book2.title + " | Author: " + book2.author + " | Price: $" + book2.price);
console.log("Title: " + book3.title + " | Author: " + book3.author + " | Price: $" + book3.price);

// 5.3 - Function declarations: subtotal & currency formatting (IC11 applied)
console.log("--- Function Declarations Test ---");

function calculateSubtotal(price, quantity) {
  return price * quantity;
}

function formatCurrency(amount) {
  return "$" + amount.toFixed(2);
}

const testSubtotal = calculateSubtotal(book1.price, 3);
console.log("Subtotal for 3 x " + book1.title + ": " + formatCurrency(testSubtotal));

// 5.4 - Arrow functions: tax & member discount (IC11 applied)
console.log("--- Arrow Functions Test ---");

const calculateTax = subtotal => subtotal * TAX_RATE;

const applyMemberDiscount = (subtotal, isMember) => {
  return isMember ? subtotal * 0.9 : subtotal;
};

console.log("Tax on $50.00: " + formatCurrency(calculateTax(50)));
console.log("Member price for $50.00: " + formatCurrency(applyMemberDiscount(50, true)));
console.log("Non-member price for $50.00: " + formatCurrency(applyMemberDiscount(50, false)));

// 5.5 - Function expression with default parameters: full order total (IC11 applied)
console.log("--- Function Expression with Defaults ---");

const calculateTotal = function (price, quantity = 1, isMember = false) {
  const subtotal = calculateSubtotal(price, quantity);
  const discounted = applyMemberDiscount(subtotal, isMember);
  const tax = calculateTax(discounted);
  return discounted + tax;
};

console.log("All three args (" + book2.title + ", qty 2, member): " + formatCurrency(calculateTotal(book2.price, 2, isMember)));
console.log("Price + quantity (default isMember = false): " + formatCurrency(calculateTotal(book2.price, 2)));
console.log("Just price (defaults for both): " + formatCurrency(calculateTotal(book2.price)));

// 5.6 - Rest operator: bulk order pricing (IC11 applied)
console.log("--- Rest Operator Test ---");

function calculateBulkOrder(...prices) {
  let total = 0;
  for (const price of prices) {
    total += price;
  }
  return total;
}

console.log("Three prices: " + formatCurrency(calculateBulkOrder(book1.price, book2.price, book3.price)));
console.log("Five prices: " + formatCurrency(calculateBulkOrder(book1.price, book2.price, book3.price, 9.99, 22.0)));

// 5.7 - Callback functions: flexible pricing (IC11 applied)
console.log("--- Callback Functions ---");

function processOrder(book, quantity, callback) {
  const total = callback(book.price, quantity);
  return book.title + " x " + quantity + " = " + formatCurrency(total);
}

const standardPricing = (price, quantity) => price * quantity;
const memberPricing = (price, quantity) => price * quantity * 0.9;

console.log("Standard: " + processOrder(book3, 2, standardPricing));
console.log("Member:   " + processOrder(book3, 2, memberPricing));

// 5.8 - Object methods with this: order summary (IC11 applied)
console.log("--- Object Methods ---");

const orderSummary = {
  customerName: "Augie",
  items: [],
  addItem(book, quantity) {
    this.items.push({ book: book, quantity: quantity });
  },
  getTotal() {
    let total = 0;
    for (const item of this.items) {
      total += item.book.price * item.quantity;
    }
    return total;
  },
  displaySummary() {
    let summary = "Order for " + this.customerName + ":\n";
    for (const item of this.items) {
      summary += "  " + item.book.title + " x " + item.quantity + " = " + formatCurrency(item.book.price * item.quantity) + "\n";
    }
    summary += "Total: " + formatCurrency(this.getTotal());
    return summary;
  }
};

orderSummary.addItem(book1, 2);
orderSummary.addItem(book2, 1);
console.log("getTotal(): " + formatCurrency(orderSummary.getTotal()));
console.log(orderSummary.displaySummary());

// 5.9 - Truthy/falsy conditional logic: discount code validation (IC10 applied)
console.log("--- Truthy/Falsy Validation ---");

function validateDiscount(code) {
  if (code) {
    const upperCode = code.toUpperCase();
    if (upperCode === "MEMBER10") {
      return 0.10;
    } else if (upperCode === "SAVE20") {
      return 0.20;
    }
  }
  return 0;
}

console.log('validateDiscount("MEMBER10"): ' + validateDiscount("MEMBER10"));
console.log('validateDiscount("SAVE20"): ' + validateDiscount("SAVE20"));
console.log('validateDiscount(""): ' + validateDiscount(""));
console.log('validateDiscount("INVALID"): ' + validateDiscount("INVALID"));

// 5.10 - Closures: nested order processor (capstone)
console.log("--- Nested Functions & Closures ---");

function createOrderProcessor(storeName) {
  const storeTaxRate = 0.0825; // local variable the nested function "closes over"

  function processStoreOrder(book, quantity) {
    const subtotal = book.price * quantity;
    const total = subtotal + subtotal * storeTaxRate;
    return storeName + " | " + book.title + " x " + quantity + " | Total (with tax): " + formatCurrency(total);
  }

  return processStoreOrder; // return the nested function itself, not its result
}

const downtownProcessor = createOrderProcessor("Hilltop Books Downtown");
console.log(downtownProcessor(book1, 1));
console.log(downtownProcessor(book2, 2));
console.log(downtownProcessor(book3, 3));
