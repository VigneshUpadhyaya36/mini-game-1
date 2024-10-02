let box = document.getElementById('box');
let timerDisplay = document.getElementById('timer');
let result = document.getElementById('result');
let pointsDisplay = document.getElementById('points');
let nextGameButton = document.getElementById('next-game-button');

let startTime, endTime, timeoutId, timerInterval;
let points = 0;
let gameEnded = false;

// Function to start the game and the timer
function startGame() {
    // Resetting the color, result, and points display
    box.style.backgroundColor = '#ffa406';
    result.textContent = '';
    pointsDisplay.textContent = '';
    nextGameButton.style.display = 'none';
    gameEnded = false;

    // Resetting and starting the timer display
    let currentTime = 0;
    timerDisplay.textContent = `Time: ${currentTime.toFixed(4)} s`;
    timerInterval = setInterval(() => {
        currentTime += 0.01;
        timerDisplay.textContent = `Time: ${currentTime.toFixed(4)} s`;
    }, 10);

    // Random delay between 1 to 5 seconds to change the color
    let delay = Math.floor(Math.random() * 4000) + 3000;

    timeoutId = setTimeout(() => {
        box.style.backgroundColor = '#ff0000';
        startTime = new Date().getTime();
        clearInterval(timerInterval); // Stop the timer display at this point
    }, delay);
}

// Event listener for box click
box.addEventListener('click', () => {
    if (gameEnded) return;

    if (box.style.backgroundColor === 'rgb(255, 0, 0)') {
        endTime = new Date().getTime();
        let reactionTime = (endTime - startTime) / 1000;
        result.textContent = `Your reaction time is: ${reactionTime.toFixed(4)} seconds`;

        // Assign points based on the reaction time
        if (reactionTime < 0.3) {
            points = 100;
        } else if (reactionTime < 0.5) {
            points = 70;
        } else if (reactionTime < 0.65) {
            points = 60;
        } else if (reactionTime< 0.7) {
            points = 50;
        } else if (reactionTime < 1) {
            points = 30;
        } else {
            points = 0;
        }

        pointsDisplay.textContent = `You earned: ${points} points`;

        // End the game and show the "NEXT GAME" button
        gameEnded = true;
        nextGameButton.style.display = 'block';

    } else {
        clearTimeout(timeoutId);
        clearInterval(timerInterval);
        result.textContent = "Clicked too early! Wait for the color to change.";
        startGame(); // Restart the game
    }
});

// Function to redirect to the home page (you can replace this with your desired URL)
function goToHomePage() {
    window.location.href = "http://127.0.0.1:5501/index.html"; // Redirect to the homepage or desired page
}

// Start the game initially
startGame();
