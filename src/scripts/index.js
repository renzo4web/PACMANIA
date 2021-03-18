import '../styles/index.scss';
import { createGrid } from './grid';
import { handleKey, gameStart } from './components';

if (process.env.NODE_ENV === 'development') {
  require('../index.html');
}

createGrid();

window.addEventListener('keydown', handleKey);

