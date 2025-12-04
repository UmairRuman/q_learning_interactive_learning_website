// ============================================================================
// FILE 5: src/utils/gridUtils.js
// ============================================================================

export const getStartPos = (level) => {
  const gridSize = level.size;
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      if (level.grid[r][c] === 'S') return { row: r, col: c };
    }
  }
  return { row: 0, col: 0 };
};

export const posToState = (row, col, gridSize) => row * gridSize + col;

export const getNextPos = (row, col, action, level) => {
  const gridSize = level.size;
  const tile = level.grid[row][col];
  let newRow = row, newCol = col;
  
  // Ice tiles are slippery - 30% chance of sliding
  const isSlippery = tile === 'I' && Math.random() < 0.3;
  const actualAction = isSlippery ? Math.floor(Math.random() * 4) : action;
  
  switch(actualAction) {
    case 0: newRow = Math.max(0, row - 1); break; // up
    case 1: newRow = Math.min(gridSize - 1, row + 1); break; // down
    case 2: newCol = Math.max(0, col - 1); break; // left
    case 3: newCol = Math.min(gridSize - 1, col + 1); break; // right
  }
  
  return { row: newRow, col: newCol };
};