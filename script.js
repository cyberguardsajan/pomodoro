let timer;
let timeLeft = 25 * 60; // Default to 25 minutes in seconds

const timerDisplay = document.getElementById('timer');
const alarmSound = document.getElementById('alarmSound');
const timeInput = document.getElementById('timeInput');
const quoteText = document.getElementById('quoteText');
const quoteAuthor = document.getElementById('quoteAuthor');



function startTimer() {
    clearInterval(timer); // Clear any existing timer
    timeLeft = parseInt(timeInput.value) * 60; // Get user-defined time in seconds
    updateDisplay();

    timer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timer);
            alarmSound.play();
            return;
        }
        timeLeft--;
        updateDisplay();
    }, 1000);
}

// Function to fetch quotes and display a random one
async function displayRandomQuote() {
    const response = await fetch('quotes.json'); // Ensure quotes.json is in the same directory
    const quotes = await response.json();
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteText.textContent = quotes[randomIndex].quote;
    quoteAuthor.textContent = `— ${quotes[randomIndex].author}`;
}

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

document.getElementById('startBtn').addEventListener('click', startTimer);
document.getElementById('stopBtn').addEventListener('click', () => {
    clearInterval(timer);
    timeLeft = 25 * 60; // Reset to default
    updateDisplay();
});

// Initialize display
updateDisplay();
displayRandomQuote(); // Display a random quote on page load
