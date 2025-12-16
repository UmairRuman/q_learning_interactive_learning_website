// Path: src/components/GameGrid.jsx

import React from 'react';
import { TILE_COLORS, TILE_EMOJI } from '../constants/tiles';

export const GameGrid = ({ level, agentPos, showDemo, gridSize }) => (
  <div 
    className="grid gap-0.5 sm:gap-1 mx-auto bg-gray-900/50 p-2 sm:p-4 rounded-lg"
    style={{ 
      gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
      maxWidth: '600px',
      width: '100%'
    }}
  >
    {level.grid.map((row, r) =>
      row.map((cell, c) => (
        <div
          key={`${r}-${c}`}
          className={`aspect-square flex items-center justify-center font-bold rounded ${TILE_COLORS[cell]} relative transition-all`}
          style={{ 
            fontSize: gridSize > 12 ? 'clamp(0.5rem, 2vw, 0.75rem)' : 
                     gridSize > 8 ? 'clamp(0.75rem, 2.5vw, 1rem)' : 
                     'clamp(1rem, 3vw, 1.5rem)'
          }}
        >
          {TILE_EMOJI[cell]}
          {showDemo && agentPos.row === r && agentPos.col === c && (
            <div className="absolute inset-0 flex items-center justify-center animate-bounce">
              🤖
            </div>
          )}
        </div>
      ))
    )}
  </div>
);