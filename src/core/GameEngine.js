import LEVELS from '../constants/levels.js';
import REWARDS from '../constants/rewards.js';

export function getStartPos(level) {
  for (let r = 0; r < level.size; r++) {
    for (let c = 0; c < level.size; c++) {
      if (level.grid[r][c] === 'S') return { row: r, col: c };
    }
  }
  return { row: 0, col: 0 };
}

export function posToState(row, col, gridSize) {
  return row * gridSize + col;
}

export function getNextPos(level, row, col, action) {
  const gridSize = level.size;
  const tile = level.grid[row][col];
  let newRow = row, newCol = col;

  const isSlippery = tile === 'I' && Math.random() < 0.3;
  const actualAction = isSlippery ? Math.floor(Math.random() * 4) : action;

  switch(actualAction) {
    case 0: newRow = Math.max(0, row - 1); break; // up
    case 1: newRow = Math.min(gridSize - 1, row + 1); break; // down
    case 2: newCol = Math.max(0, col - 1); break; // left
    case 3: newCol = Math.min(gridSize - 1, col + 1); break; // right
  }

  return { row: newRow, col: newCol };
}

export function rewardForTile(tile) {
  return REWARDS[tile] ?? -0.1;
}
