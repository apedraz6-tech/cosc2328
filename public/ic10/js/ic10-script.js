// IC10 – COSC 2328 – Professor McCurry
// Implemented by: [Augie Pedraza]

// Step 5 - variables & concatenation

const city = "San Antonio";
const country = "USA";

let Population = 1550000;

console.log("Location: " + city + ", " + country);
console.log("Population: " + Population);

// Step 6 - a decision
if (Population > 1000000) {
  console.log("This is a metropolis.");
} else {
  console.log("This is a growing city.");
}

// step 7 - boolean
let isLoggedIn = true;

if (isLoggedIn) {
  console.log("Welcome back!");
} else {
  console.log("Please log in");
}

// step 8 - truthy/falsy
let username = 123;
if (username) {
  console.log("Username accepted: " + username);
} else {
  console.log("Username is required.");
}

// step 9 - combigned logic

const hasAccount = false;
const isEmailVerified = false;
const agreedToTerms = true;

if((hasAccount && isEmailVerified) || agreedToTerms){
if (username) {
  console.log("Registration allowed");
} else {
  console.log("Registration blocked");
}
}
