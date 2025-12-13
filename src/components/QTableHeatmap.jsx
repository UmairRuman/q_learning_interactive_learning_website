// Path: src/components/QTableHeatmap.jsx

import React from 'react';
import { getQValueColor } from '../utils/colorUtils';
import { posToState } from '../utils/gridUtils';

export const QTableHeatmap = ({ agent, level, gridSize }) => {
  if (!agent || !level) {
    return (
      <div className="text-white text-center p-8">
        <p>Loading Q-Table...</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h3 className="text-2xl font-bold text-white mb-2">Q-Table Heatmap</h3>
      <p className="text-purple-200 text-sm mb-4">
        Showing maximum Q-value for each state (Red = Low value, Green = High value)
      </p>
      
      {/* Responsive container for different grid sizes */}
      <div className="flex justify-center items-center">
        <div 
          className="grid gap-1 bg-gray-900/50 p-4 rounded-lg"
          style={{ 
            gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
            width: gridSize <= 8 ? '100%' : 'auto',
            maxWidth: gridSize <= 8 ? '600px' : gridSize <= 12 ? '700px' : '800px'
          }}
        >
          {level.grid.map((row, r) =>
            row.map((cell, c) => {
              const state = posToState(r, c, gridSize);
              const maxQ = Math.max(...agent.qTable[state]);
              const color = getQValueColor(maxQ);
              
              // Calculate responsive font size based on grid size
              const fontSize = gridSize <= 8 ? '0.75rem' : 
                              gridSize <= 12 ? '0.65rem' : '0.5rem';
              
              return (
                <div
                  key={`qtable-${r}-${c}`}
                  className="aspect-square flex items-center justify-center font-bold rounded relative border border-gray-700 hover:ring-2 hover:ring-white transition-all cursor-pointer"
                  style={{ 
                    backgroundColor: color,
                    fontSize: fontSize,
                    minWidth: '30px',
                    minHeight: '30px'
                  }}
                  title={`Position: (${r},${c}) | State: ${state} | Max Q-Value: ${maxQ.toFixed(3)}`}
                >
                  <span className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-semibold">
                    {maxQ.toFixed(1)}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Legend for Q-Table */}
      <div className="mt-6 bg-white/10 rounded-lg p-4">
        <h4 className="text-white font-semibold mb-3">Q-Value Scale:</h4>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-8 rounded" 
               style={{ background: 'linear-gradient(to right, hsl(0, 70%, 50%), hsl(60, 70%, 50%), hsl(120, 70%, 50%))' }}>
          </div>
        </div>
        <div className="flex justify-between text-xs text-purple-200 mt-2">
          <span>-10 (Low)</span>
          <span>~45 (Medium)</span>
          <span>100 (High)</span>
        </div>
        <p className="text-xs text-purple-300 mt-3">
          💡 Tip: Higher values (green) indicate better states. Lower values (red) indicate states to avoid.
          Hover over any cell to see detailed information.
        </p>
      </div>
    </div>
  );
};