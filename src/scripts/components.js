import {createGrid, grid, squares, width} from './grid';
import {ghostEatPacman, ghosts, startGhost} from './ghosts';

let score = document.getElementById('score');
let pacman = document.querySelector('div.pacman');
let hasLost = false;
let steps = 0;
let scoreCount = 0;
const bonusPowerPellet = 10;
const bonusGhostEaten = 20;

const handleKey = (event) => {
  if (hasLost) return;
  switch (event.key) {
    case 'ArrowUp':
      steps = -width;
      break;
    case 'ArrowDown':
      steps = width;
      break;
    case 'ArrowLeft':
      steps = -1;
      break;
    case 'ArrowRight':
      steps = 1;
      break;
    default:
      return;
  }

  console.log(steps);
};

const movePacman = () => {
  if (document.querySelectorAll('.pac-dot').length <= 0) {
    gameRestart('win');
  }
  pacman = document.querySelector('div.pacman');
  const currPosition = squares.indexOf(pacman);
  if (
      pacman.className.includes('ghost') &&
      !pacman.className.includes('scared')
  ) {
    ghostEatPacman();
    gameRestart();
    return;
  }
  let nextPos = isShortcut(currPosition);
  nextPos = nextPos + -steps;
  if (
      !squares[nextPos].classList.contains('wall') &&
      !squares[nextPos].classList.contains('ghost-lair')
  ) {
    changeClass(squares[currPosition], 'pacman');
    pacmanEating(nextPos);
    changeClass(squares[nextPos], 'pac-dot');
    changeClass(squares[nextPos], 'pacman', true);
  }
};

let timerId = setInterval(movePacman, 300);

const pacmanInterval = (stop) => {
  if (stop) {
    clearInterval(timerId);
  } else {
    setInterval(movePacman, 300);
  }
};

const sumScore = (points) => {
  scoreCount += points;
  score.textContent = scoreCount;
};

const changeClass = (element, css, add) => {
  add ? element.classList.add(css) : element.classList.remove(css);
};

const isShortcut = (index) => {
  const shortcutLeftIndex = 364;
  const shortcutRightIndex = 391;
  if (index === shortcutLeftIndex) return shortcutRightIndex;
  if (index === shortcutRightIndex) return shortcutLeftIndex;
  return index;
};

const pacmanEating = (nextPos) => {
  if (squares[nextPos].classList.contains('pac-dot')) {
    sumScore(1);
  }
};

const changeClassArr = (elem, arrayClass, toAdd) => {
  arrayClass.forEach((cssClass, i) => {
    toAdd ? elem.classList.add(cssClass) : elem.classList.remove(cssClass);
  });
};

const pacmanEatPower = () => {
  let pacman = document.querySelector('div.pacman');
  if (pacman.classList.contains('power-pellet')) {
    score += 10;
    squares[squares.indexOf(pacman)].classList.remove('power-pellet');
    grid.classList.add('shake');

    ghosts.forEach((ghost) => {
      ghost.isScared = true;
    });

    setTimeout(() => {
      ghosts.forEach((ghost) => {
        ghost.isScared = false;
      });
      grid.classList.remove('shake');
    }, 15000);
  }
};

const gameRestart = (win) => {
  pacmanInterval(true);
  scoreCount = 0;
  grid.innerHTML = '';
  const div = document.createElement('div');
  const btn = document.createElement('button');
  const header = document.querySelector('header');
  btn.textContent = 'Restart';
  btn.classList.add('restart');
  div.classList.add('lost');
  div.innerHTML = win ? 'WIN👏' : 'GAME LOST😢';
  div.insertAdjacentElement('beforeend', btn);
  header.insertAdjacentElement('afterend', div);
  const btnRestart = document.querySelector('button.restart');
  startGame(btnRestart);
};

const startInputEvent = window.addEventListener('keydown', handleKey);

const startGame = (btnRestart) => {
  btnRestart.addEventListener('click', () => {
    const endGameScreen = document.querySelector('.lost');
    endGameScreen.style.display = 'none';
    createGrid();
    startGhost();
    window.addEventListener('keydown', handleKey);
    timerId = setInterval(movePacman, 300);
  });
};

export {
  handleKey,
  isShortcut,
  changeClass,
  pacman,
  changeClassArr,
  scoreCount,
  pacmanEatPower,
  sumScore,
  bonusGhostEaten,
  bonusPowerPellet,
  gameRestart as gameLost,
  pacmanInterval,
  startInputEvent,
};
