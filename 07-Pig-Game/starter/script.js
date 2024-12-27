'use strict';

const btnRollDice = document.querySelector('.btn--roll');
const btnHoldGame = document.querySelector('.btn--hold');
const btnNewGame = document.querySelector('.btn--new');

const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');

const player0Section = document.querySelector('.player--0');
const player1Section = document.querySelector('.player--1');

const img = document.querySelector('.dice');

let currScores, scores, activePlayer, active;

init();

function init() {
  currScores = [0, 0];
  scores = [0, 0];
  activePlayer = 0;
  active = true;

  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;

  player0Section.classList.remove('player--winner');
  player1Section.classList.remove('player--winner');

  player0Section.classList.add('player--active');
  player1Section.classList.remove('player--active');
}

function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

function switchPlayer() {
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Section.classList.toggle('player--active');
  player1Section.classList.toggle('player--active');
}

// user rolls dice
btnRollDice.addEventListener('click', function () {
  if (active) {
    const roll = rollDice();

    img.src = `dice-${roll}.png`;

    if (roll === 1) {
      currScores[activePlayer] = 0;
      document.querySelector(`#current--${activePlayer}`).textContent = 0;
      switchPlayer();
    } else {
      currScores[activePlayer] += roll;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currScores[activePlayer];
    }
  }
});

// user holds score
btnHoldGame.addEventListener('click', function () {
  if (active) {
    scores[activePlayer] += currScores[activePlayer];
    currScores[activePlayer] = 0;

    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    document.querySelector(`#current--${activePlayer}`).textContent = 0;

    if (scores[activePlayer] >= 100) {
      // player wins
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      active = false;
    } else {
      switchPlayer();
    }
  }
});

// user resets game
btnNewGame.addEventListener('click', init);
