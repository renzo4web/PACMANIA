import { squares, width, grid } from './grid';
import { changeClassArr, isShortcut, pacman , showScore } from './components';

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
      changeClassArr(squares[ghost.currentIndex], [
        ghost.className,
        'ghost',
        'scared',
      ]);

      ghost.currentIndex += direction;
      ghost.currentIndex = isShortcut(ghost.currentIndex);

      changeClassArr(
        squares[ghost.currentIndex],
        [ghost.className, 'ghost'],
        true
      );

      if (ghost.isScared) {
        squares[ghost.currentIndex].classList.add('scared');
      }
    } else {
      direction = directions[Math.floor(Math.random() * directions.length)];
    }
    pacmanEatPower();
    if (
      squares[ghost.currentIndex].classList.contains('pacman') &&
      ghost.isScared
    ) {
      changeClassArr(squares[ghost.currentIndex], [
        ghost.className,
        'ghost',
        'scared',
      ]);

      clearInterval(ghost.timerId);
    }
  }, ghost.speed);
};

const pacmanEatPower = () => {
  let pacman = document.querySelector('div.pacman');
  if (pacman.classList.contains('power-pellet')) {
    squares[squares.indexOf(pacman)].classList.remove('power-pellet');
    grid.classList.add('shake');
    const bonus = 10;
    showScore(bonus);
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

const ghostEatPacman = () => {
  ghosts.forEach((ghost) => clearInterval(ghost.timerId));
};

ghosts.forEach(moveGhost);

export { moveGhost, ghosts, displayGhosts, ghostEatPacman };
