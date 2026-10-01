// IC11 – COSC 2328 – Professor McCurry
// Implemented by: [Augie Pedraza]

// step 5 - Function declarations 

console.log("--- Function Declarations ---");
function greet(name){return "Hello, " + name + "!";}
console.log(greet("Maria"));
function area(width, height){return width * height;}
console.log(area("Area of 4 x 5 = " + area(4,5)));

// step 6 Function expressions + arrow functions 

console.log("--- Function Expressions and Arrow Functions ---");
const multiply = function (a,b) {return a * b;};
const devide =  (a,b) => {return a / b;};
const square = n => n * n;
console.log("multiply(3, 6) = " + multiply(3, 6));
console.log("divide(20, 5) = " + devide(20, 5));
console.log("square(7) = " + square(7));

// step 7 Default parameters + Rest operator
console.log(" --- Default Parameters & Rest Operator---");
function greetuser(name, greeting = "Hello") {return greeting + ", " + name;}
console.log(greetuser("Sam"));
console.log(greetuser("Sam", "Yo"));

function sumALL(...numbers) {
    let total =0;
    for (const n of numbers) { total += n;}
    return total;
}

console.log("sumALL(1, 2, 3) = " + sumALL(1, 2, 3));

// Step 8 - Callback functions 
console.log(" --- Callback Functions ---");

function processNumber(value, callback) {
    console.log("Processing " + value + "...");
    return callback(value);
}

const double = n => n * 2;
const triple = n => n * 3;

console.log("double -> " + processNumber(5, double));
console.log("triple -> " + processNumber(5, triple));

// Step 9 - Object methods with this 
console.log(" --- Object Methods with (this) ---");

const product = {
    brand: "Acme",
    price: 12.5,
    quality: 4,
    total() {return this.price * this.quality;},
describe(){
    return this.quality + "x" + this.brand + "@ $" + this.price + " = $" + this.total().toFixed(2);
}
};

console.log("Total: $" + product.total().toFixed(2));
console.log(product.describe());
    
