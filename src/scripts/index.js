import '../styles/index.scss';
import {createGrid} from './grid';
import {startGhost} from './ghosts';

if (process.env.NODE_ENV === 'development') {
  require('../index.html');
}

createGrid();
startGhost();
