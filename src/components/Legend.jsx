// ============================================================================
// FILE 12: src/components/Legend.jsx
// ============================================================================

import React from 'react';

export const Legend = () => (
  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
    <h3 className="text-xl font-bold text-white mb-4">Tile Legend</h3>
    <div className="space-y-2 text-sm">
      <div className="flex items-center gap-3">
        <span className="text-2xl">🏁</span>
        <span className="text-white">Start Position</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-2xl">🏆</span>
        <span className="text-white">Goal (+100)</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-2xl">💎</span>
        <span className="text-white">Treasure (+5)</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-2xl">🧱</span>
        <span className="text-white">Wall (-10, terminal)</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-2xl">❄️</span>
        <span className="text-white">Ice (slippery!)</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-2xl">💩</span>
        <span className="text-white">Mud (-0.5 penalty)</span>
      </div>
    </div>
  </div>
);
