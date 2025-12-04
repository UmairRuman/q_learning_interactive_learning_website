// ============================================================================
// FILE 10: src/components/GameGrid.jsx
// ============================================================================

import React from 'react';
import { TILE_COLORS, TILE_EMOJI } from '../constants/tiles';


 
export const GameGrid = ({ level, agentPos, showDemo, gridSize, highlightedCell }) => (
  <div className="grid gap-1 mx-auto bg-gray-900/50 p-4 rounded-lg"
    style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`, maxWidth: '600px' }}>
    {level.grid.map((row, r) =>
      row.map((cell, c) => {
        const isHighlighted = highlightedCell && highlightedCell.row === r && highlightedCell.col === c;
        return (
          <div key={`${r}-${c}`}
            className={`aspect-square flex items-center justify-center text-2xl font-bold rounded ${TILE_COLORS[cell]} relative transition-all ${isHighlighted ? 'ring-4 ring-yellow-400' : ''}`}
            style={{ fontSize: gridSize > 12 ? '1rem' : '1.5rem' }}>
            {TILE_EMOJI[cell]}
            {showDemo && agentPos.row === r && agentPos.col === c && (
              <div className="absolute inset-0 flex items-center justify-center animate-bounce">
                🤖
              </div>
            )}
          </div>
        );
      })
    )}
  </div>
);
