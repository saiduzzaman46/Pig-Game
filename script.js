'use strict';

const scoreEls = [document.getElementById('score--0'), document.getElementById('score--1')];
const currentEls = [document.getElementById('current--0'), document.getElementById('current--1')];
const players = [document.querySelector('.player--0'), document.querySelector('.player--1')];
const diceEl = document.querySelector('.dice');
const [btnNew, btnRoll, btnHold] = document.querySelectorAll('.btn');

let scores, current, active, playing;

const init = () => {
  scores = [0, 0];
  current = 0;
  active = 0;
  playing = true;
  scoreEls.forEach(el => (el.textContent = 0));
  currentEls.forEach(el => (el.textContent = 0));
  players.forEach(el => el.classList.remove('player--winner', 'player--active'));
  players[0].classList.add('player--active');
  diceEl.classList.add('hidden');
};

const switchPlayer = () => {
  currentEls[active].textContent = current = 0;
  players[active].classList.toggle('player--active');
  active = 1 - active;
  players[active].classList.toggle('player--active');
};

btnRoll.addEventListener('click', () => {
  if (!playing) return;
  const dice = Math.trunc(Math.random() * 6) + 1;
  diceEl.src = `dice-${dice}.png`;
  diceEl.classList.remove('hidden');
  dice !== 1 ? (current += dice, currentEls[active].textContent = current) : switchPlayer();
});

btnHold.addEventListener('click', () => {
  if (!playing) return;
  scores[active] += current;
  scoreEls[active].textContent = scores[active];
  scores[active] >= 100 ? (playing = false, players[active].classList.add('player--winner')) : switchPlayer();
});

btnNew.addEventListener('click', init);
init();
