// ============================================================================
// FILE 11: src/components/StatsPanel.jsx
// ============================================================================

import React from 'react';
import { TrendingUp } from 'lucide-react';

export const StatsPanel = ({ episode, totalReward, successRate, avgSteps, agent }) => (
  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
      <TrendingUp className="w-5 h-5" />
      Training Stats
    </h3>
    <div className="space-y-4">
      <div className="bg-white/10 rounded-lg p-4">
        <div className="text-sm text-purple-200 mb-1">Episodes</div>
        <div className="text-3xl font-bold text-white">{episode}</div>
      </div>
      <div className="bg-white/10 rounded-lg p-4">
        <div className="text-sm text-purple-200 mb-1">Avg Reward</div>
        <div className="text-3xl font-bold text-yellow-400">{totalReward}</div>
      </div>
      <div className="bg-white/10 rounded-lg p-4">
        <div className="text-sm text-purple-200 mb-1">Success Rate</div>
        <div className="text-3xl font-bold text-green-400">{successRate}%</div>
      </div>
      <div className="bg-white/10 rounded-lg p-4">
        <div className="text-sm text-purple-200 mb-1">Avg Steps</div>
        <div className="text-3xl font-bold text-blue-400">{avgSteps}</div>
      </div>
      <div className="bg-white/10 rounded-lg p-4">
        <div className="text-sm text-purple-200 mb-1">Exploration (ε)</div>
        <div className="text-3xl font-bold text-orange-400">
          {agent ? agent.epsilon.toFixed(3) : '1.000'}
        </div>
      </div>
    </div>
  </div>
);