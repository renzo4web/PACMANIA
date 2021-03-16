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
  nextEl = nextEl + -steps;
  if (!squares[nextEl].classList.contains('wall')) {
    console.log('dd');
    squares[pacPosition].classList.remove('pacman');
    squares[nextEl].classList.remove('pac-dot');
    squares[nextEl].classList.add('pacman');
  }else{
    squares[pacPosition-nextEl].classList.add("pacmac");
  }


};
