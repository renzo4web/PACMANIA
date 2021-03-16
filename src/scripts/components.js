import { width, squares } from './grid';
const score = document.getElementById('score');

export const handleKey = (event) => {
  console.log(event.key);

  switch (event.key) {
    case 'ArrowUp':
      movePacman(-width);
      break;
    case 'ArrowDown':
      movePacman(width);
      break;
    case 'ArrowLeft':
      movePacman(-1);
      break;
    case 'ArrowRight':
      movePacman(1);
      break;
    default:
      return;
  }
};

const movePacman = (steps) => {
  const pacman = document.querySelector('div .pacman');
  const pacPosition = squares.indexOf(pacman);
  let nextEl = pacPosition;
  // TODO: check walls
  nextEl = nextEl +(-steps);
  squares[pacPosition].classList.remove('pacman');
  squares[nextEl].classList.add('pacman');
};
