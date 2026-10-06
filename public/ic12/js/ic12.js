// IC12 – COSC 2328 – Professor McCurry
// Implemented by: [Augie Pedraza]

// --- Element Selection by ID ---
const statusBox = document.getElementById('status-box');
statusBox.textContent = "DOM is ready! Elements successfully selected.";
console.log("Status Box:", statusBox);

// --- querySelector Selection ---
const firstCard = document.querySelector('.card');
firstCard = document.querySelector('p').textContent = "This was selected using querySelector!";

// --- classList.add ---

firstCard.classList.add("highlight");
statusBox.classList.add("active");

// --- querySelectorAll + forEach (with even-index hilight) ---
const listItems = document.querySelectorAll('.list-item');
listItems.forEach((item, index) => {
    if (index % 2 === 0) {
        item.classList.add("highlight");
    }
});

// --- classlist.toggle + classList.remove ---
const thirdCard = document.querySelectorAll('#card-3');
thirdCard.classList.toggle("hidden");

const secondCard = document.querySelector('#card-2');
secondCard.classList.remove("card");

// --- textContext vs innerHTML saftey ---
const secondCardParagraph = secondCard.querySelector
secondCardParagraph.textContent = "Safe update: even text like <script>alert('hack')</script> renders as plain characters, not real HTML.";


