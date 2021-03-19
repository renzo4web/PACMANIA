import { width, squares, grid } from './grid';
import { ghostEatPacman } from './ghosts';

const score = document.getElementById('score');
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
  pacman = document.querySelector('div.pacman');
  const currPosition = squares.indexOf(pacman);
  if (
    pacman.className.includes('ghost') &&
    !pacman.className.includes('scared')
  ) {
    ghostEatPacman();
    hasLost = true;
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

const pacmanInterval = setInterval(movePacman, 300);

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

const gameLost = () => {
  const div = document.createElement('div');
  const restartBtn = document.createElement('button');
  div.classList.add('lost');
  div.innerHTML = 'GAME LOST';
  div.insertAdjacentElement('beforeend', restartBtn);
  grid.appendChild(div);
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
  gameLost
};
