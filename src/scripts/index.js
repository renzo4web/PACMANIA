import '../styles/index.scss';
import { createGrid, grid } from './grid';
import { handleKey, btnRestart, endGameScreen } from './components';

if (process.env.NODE_ENV === 'development') {
  require('../index.html');
}

createGrid();

window.addEventListener('keydown', handleKey);
