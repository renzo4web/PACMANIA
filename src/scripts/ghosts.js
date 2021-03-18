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

  ghost.timerId = setInterval(() => {
    if (
      !squares[ghost.currentIndex + direction].classList.contains('wall') &&
      !squares[ghost.currentIndex + direction].classList.contains('ghost')
    ) {
      squares[ghost.currentIndex].classList.remove(ghost.className);
      squares[ghost.currentIndex].classList.remove('ghost');
      // changeClass(squares[ghost.currentIndex], 'pac-dot',true);
      ghost.currentIndex += direction;
      ghost.currentIndex = isShortcut(ghost.currentIndex);
      squares[ghost.currentIndex].classList.add(ghost.className);
      squares[ghost.currentIndex].classList.add('ghost');
      // changeClass(squares[ghost.currentIndex], 'pac-dot');
    } else {
      direction = directions[Math.floor(Math.random() * directions.length)];
    }

    if (
      squares[ghost.currentIndex].classList.contains('pacman')
    ) {
      console.log('dsd');
      squares[ghost.currentIndex].classList.remove(ghost.className);
      squares[ghost.currentIndex].classList.remove('ghost');
      clearInterval(ghost.timerId);
    }
  }, ghost.speed);
};

ghosts.forEach(moveGhost);

export { moveGhost, ghosts, displayGhosts };
