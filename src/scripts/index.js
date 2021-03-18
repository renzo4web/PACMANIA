import '../styles/index.scss';
import {createGrid} from './grid';
import {handleKey, game} from './components';
import {displayGhosts, moveGhost, ghosts} from './ghosts';

if (process.env.NODE_ENV === 'development') {
  require('../index.html');
}

createGrid();
window.addEventListener('keydown', handleKey);
game('start');