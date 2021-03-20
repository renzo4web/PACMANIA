import {grid, squares, width} from './grid';
import {
  bonusGhostEaten,
  bonusPowerPellet,
  changeClassArr,
  gameLost,
  isShortcut,
  sumScore,
} from './components';

let pacman = document.querySelector('div.pacman');

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

let ghosts = [];

const displayGhosts = () => {
  ghosts.forEach((ghost) => {
    squares[ghost.startIndex].classList.add('ghost');
    squares[ghost.startIndex].classList.add(ghost.className);
    console.log(squares.length);
  });
};

const moveGhost = (ghost) => {
  const directions = [-1, +1, -width, +width];
  let direction = directions[Math.floor(Math.random() * directions.length)];
  console.log(ghosts);
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
          true,
      );

      if (ghost.isScared) {
        squares[ghost.currentIndex].classList.add('scared');
      }
    } else {
      direction = directions[Math.floor(Math.random() * directions.length)];
    }
    pacmanEatPower();
    if (
        squares[ghost.currentIndex].className.includes('pacman') &&
        ghost.isScared
    ) {
      sumScore(bonusGhostEaten);
      changeClassArr(squares[ghost.currentIndex], [
        ghost.className,
        'ghost',
        'scared',
      ]);
      clearInterval(ghost.timerId);
    }
    if (document.querySelectorAll('.ghost').length <= 0) gameLost('win');
  }, ghost.speed);
};

const pacmanEatPower = () => {
  pacman = document.querySelector('div.pacman');
  if (pacman.classList.contains('power-pellet')) {
    squares[squares.indexOf(pacman)].classList.remove('power-pellet');
    grid.classList.add('shake');
    sumScore(bonusPowerPellet);
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

const startGhost = () => {
  ghosts = [
    new Ghost('blinky', 348, 250),
    new Ghost('pinky', 376, 400),
    new Ghost('inky', 351, 300),
    new Ghost('clyde', 379, 500),
  ];
  displayGhosts();
  ghosts.forEach(moveGhost);
};

export {moveGhost, ghosts, displayGhosts, ghostEatPacman, startGhost};
