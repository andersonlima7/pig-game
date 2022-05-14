'use strict';

// Selecting elements
const player0Section = document.querySelector('.player--0');
const player1Section = document.querySelector('.player--1');
const scorePlayer0 = document.querySelector('#score--0');
const scorePlayer1 = document.querySelector('#score--1');
const currentScorePlayer0 = document.querySelector('#current--0');
const currentScorePlayer1 = document.querySelector('#current--1');
const dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting conditions

const scores = [0, 0];
let currentScore;
let activePlayer;
let activeScorePlayer = () =>
  activePlayer === 0 ? currentScorePlayer0 : currentScorePlayer1;

const newGame = function () {
  dice.classList.add('hidden');
  scores[0] = 0;
  scores[1] = 0;
  scorePlayer0.textContent = 0;
  scorePlayer1.textContent = 0;
  currentScore = 0;
  currentScorePlayer0.textContent = 0;
  currentScorePlayer1.textContent = 0;
  activePlayer = 0;

  player0Section.classList.remove('player--winner');
  player1Section.classList.remove('player--winner');

  player0Section.classList.add('player--active');
  player0Section.classList.remove('player--hidden');
  player1Section.classList.add('player--hidden');
  player1Section.classList.remove('player--active');
  btnHold.classList.remove('hidden');
  btnRoll.classList.remove('hidden');
};

let switchPlayer = function () {
  activePlayer = 1 - activePlayer; //Change the active player 1 - 0 = 1, 1-1 = 0
  player0Section.classList.toggle('player--active');
  player1Section.classList.toggle('player--active');
  currentScore = 0;
  activeScorePlayer().textContent = currentScore;
};

newGame();

// Rolling dice functionality

btnRoll.addEventListener('click', function () {
  // Generate a random dice roll
  const diceValue = Math.trunc(Math.random() * 6) + 1;

  // Show the dice
  dice.classList.remove('hidden');
  dice.src = `dice-${diceValue}.png`;

  if (diceValue !== 1) {
    // Add the dice value to current store
    currentScore += diceValue;
    activeScorePlayer().textContent = currentScore;
  } else {
    //   Switch to next player
    currentScore = 0;
    activeScorePlayer().textContent = currentScore;
    switchPlayer();
  }
});

btnHold.addEventListener('click', function () {
  scores[activePlayer] += currentScore;
  document.querySelector(`#score--${activePlayer}`).textContent =
    scores[activePlayer];
  if (scores[activePlayer] >= 15) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
    dice.classList.add('hidden');
    btnHold.classList.add('hidden');
    btnRoll.classList.add('hidden');
  } else switchPlayer();
});

btnNew.addEventListener('click', newGame);
