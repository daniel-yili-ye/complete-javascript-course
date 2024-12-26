'use strict';

// DOM selectors
const againButton = document.querySelector('.btn.again'); // Again! button
const checkButton = document.querySelector('.btn.check'); // Check! button
const display = document.querySelector('div.number'); // Display number
const message = document.querySelector('p.message'); // message
let score = 20; // Score
const highScore = document.querySelector('span.highscore'); // Highscore
const body = document.querySelector('body');

let secretNumber = getRandomNumber();

// function for picking random number between 1-20
function getRandomNumber() {
  return Math.floor(Math.random() * 20) + 1; // Generates a random number between 1 and 20
}

function displayMessage(text) {
  message.textContent = text;
}

// function for validating game guesses
function validateGame() {
  // Read the input value inside the function
  const guess = Number(document.querySelector('input.guess').value);

  if (!guess) {
    displayMessage('⛔️ No number!');
  } else if (guess === secretNumber) {
    displayMessage('🎉 Correct Number!');
    body.style.backgroundColor = '#60b347';
    display.textContent = secretNumber;
    highScore.textContent = Math.max(Number(highScore.textContent), score);
  } else if (guess !== secretNumber) {
    if (score > 0) {
      score--;
      document.querySelector('span.score').textContent = score;
      displayMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too low!');
    } else {
      displayMessage('💥 You lost the game!');
      score = 0;
    }
  }
}
checkButton.addEventListener('click', validateGame);

///////////////////////////////////////
// Coding Challenge #1

/* 
Implement a game rest functionality, so that the player can make a new guess! Here is how:

1. Select the element with the 'again' class and attach a click event handler
2. In the handler function, restore initial values of the score and secretNumber variables
3. Restore the initial conditions of the message, number, score and guess input field
4. Also restore the original background color (#222) and number width (15rem)

GOOD LUCK 😀
*/

document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNumber = getRandomNumber();

  displayMessage('Start guessing...'); // message
  display.textContent = '?'; // number
  document.querySelector('span.score').textContent = score; // score
  document.querySelector('input.guess').value = ''; // guess

  body.style.backgroundColor = '#222';
  display.style.width = '15rem';
});
