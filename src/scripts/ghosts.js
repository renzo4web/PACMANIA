import { squares, width } from './grid';
import { changeClass, isShortcut } from './components';

class Ghost {
  className;
  startIndex;
  speed;

  constructor(className, startIndex, speed) {
    this.className = className;
    this.startIndex = startIndex;
    this.speed = speed;
    this.currentIndex = startIndex;
    this.isScared = false;
    this.timerId = NaN;
  }
}

const ghosts = [
  new Ghost('blinky', 348, 250),
  new Ghost('pinky', 376, 400),
  new Ghost('inky', 351, 300),
  new Ghost('clyde', 379, 500),
];

const displayGhosts = () => {
  for (const ghost of ghosts) {
    squares[ghost.startIndex].classList.add('ghost');
    squares[ghost.startIndex].classList.add(ghost.className);
  }
};

const moveGhost = (ghost) => {
  const directions = [-1, +1, -width, +width];
  let direction = directions[Math.floor(Math.random() * directions.length)];
  let currPosition = ghost.currentIndex;
  let nextPos = isShortcut(currPosition);
  nextPos = nextPos + -direction;

  if (!squares[nextPos].classList.contains('wall')) {
    changeClass(squares[currPosition], ghost.className);
    changeClass(squares[currPosition], 'ghost');
    changeClass(squares[nextPos], 'ghost', true);
    changeClass(squares[nextPos], ghost.className, true);
  }
};

export { moveGhost, ghosts, displayGhosts };
