// ============================================================================
// FILE 13: src/components/QTableHeatmap.jsx
// ============================================================================

import React from 'react';
import { getQValueColor } from '../utils/colorUtils';
import { posToState } from '../utils/gridUtils';

export const QTableHeatmap = ({ agent, level, gridSize }) => (
  <div className="mb-6 bg-white/10 backdrop-blur-lg rounded-xl p-6">
    <h2 className="text-2xl font-bold text-white mb-4">Q-Table Heatmap</h2>
    <p className="text-purple-200 text-sm mb-4">Showing maximum Q-value for each state (red = low, green = high)</p>
    <div 
      className="grid gap-1 mx-auto bg-gray-900/50 p-4 rounded-lg"
      style={{ 
        gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
        maxWidth: '600px'
      }}
    >
      {level.grid.map((row, r) =>
        row.map((cell, c) => {
          const state = posToState(r, c, gridSize);
          const maxQ = Math.max(...agent.qTable[state]);
          const color = getQValueColor(maxQ);
          return (
            <div
              key={`${r}-${c}`}
              className="aspect-square flex items-center justify-center text-xs font-bold rounded relative"
              style={{ 
                backgroundColor: color,
                fontSize: gridSize > 12 ? '0.5rem' : '0.75rem'
              }}
              title={`State ${state}: Q=${maxQ.toFixed(2)}`}
            >
              <span className="text-white drop-shadow-lg">{maxQ.toFixed(1)}</span>
            </div>
          );
        })
      )}
    </div>
  </div>
);