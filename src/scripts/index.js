import '../styles/index.scss';
import { createGrid } from './grid';
import {startGhost} from './ghosts';
import { startInputEvent } from './components';

if (process.env.NODE_ENV === 'development') {
  require('../index.html');
}

createGrid();
startGhost();
// startInputEvent;