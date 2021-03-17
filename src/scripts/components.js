import { width, squares } from './grid';
import { moveGhost } from './ghosts';
const score = document.getElementById('score');
let pacman = document.querySelector('div .pacman');

let steps = 0;
let scoreCount = 0;

const handleKey = (event) => {
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
  pacman = document.querySelector('div .pacman');
  const currPosition = squares.indexOf(pacman);
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

const game = (state) => {
  if (state) {
    setInterval(movePacman, 300);
    return;
  }
};

const showScore = (scoreCount) => {
  score.textContent = scoreCount;
};

const changeClass = (element, css, add) => {
  add ? element.classList.add(css) : element.classList.remove(css);
};

const isShortcut = (index) => {
  const shorcutLeftIndex = 364;
  const shorcutRightIndex = 391;
  if (index === shorcutLeftIndex) return shorcutRightIndex;
  if (index === shorcutRightIndex) return shorcutLeftIndex;
  return index;
};
const pacmanEating = (nextPos) => {
  if (squares[nextPos].classList.contains('pac-dot')) {
    scoreCount++;
    showScore(scoreCount);
  }
};

export { handleKey, isShortcut, game , changeClass};
