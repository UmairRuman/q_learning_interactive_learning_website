// Path: src/components/QUpdateDisplay.jsx

import React from 'react';
import { TrendingUp } from 'lucide-react';

export const QUpdateDisplay = ({ lastQUpdate, currentStep }) => {
  if (!lastQUpdate) {
    return (
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Q-Learning Update
        </h3>
        <p className="text-purple-200">Take a step to see Q-value updates...</p>
      </div>
    );
  }

  const ACTION_NAMES = ['↑ Up', '↓ Down', '← Left', '→ Right'];

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <TrendingUp className="w-5 h-5" />
        Q-Learning Update (Step {currentStep})
      </h3>
      
      <div className="space-y-3 text-white">
        <div className="bg-white/10 rounded-lg p-4">
          <p className="text-sm text-purple-200 mb-1">State → Action</p>
          <p className="text-lg font-bold">State {lastQUpdate.state} → {ACTION_NAMES[lastQUpdate.action]}</p>
        </div>

        <div className="bg-white/10 rounded-lg p-4">
          <p className="text-sm text-purple-200 mb-1">Reward Received</p>
          <p className="text-2xl font-bold text-yellow-400">{lastQUpdate.reward}</p>
        </div>

        <div className="bg-white/10 rounded-lg p-4">
          <p className="text-sm text-purple-200 mb-2">Q-Value Update</p>
          <div className="flex items-center gap-2">
            <span className="text-red-400 font-mono">{lastQUpdate.oldQValue}</span>
            <span className="text-white">→</span>
            <span className="text-green-400 font-mono font-bold">{lastQUpdate.newQValue}</span>
          </div>
          <p className="text-xs text-purple-200 mt-2">
            Change: {(parseFloat(lastQUpdate.newQValue) - parseFloat(lastQUpdate.oldQValue)).toFixed(3)}
          </p>
        </div>

        <div className="bg-white/10 rounded-lg p-4">
          <p className="text-sm text-purple-200 mb-2">Bellman Equation</p>
          <div className="font-mono text-xs bg-black/30 p-3 rounded overflow-x-auto">
            <p>Q(s,a) = Q(s,a) + α[R + γ·max(Q(s',a')) - Q(s,a)]</p>
            <p className="mt-2 text-yellow-300">
              = {lastQUpdate.oldQValue} + {lastQUpdate.learningRate}[{lastQUpdate.reward} + {lastQUpdate.discountFactor}·{lastQUpdate.maxNextQ} - {lastQUpdate.oldQValue}]
            </p>
            <p className="mt-1 text-green-300">
              = {lastQUpdate.newQValue}
            </p>
          </div>
        </div>

        <div className="bg-white/10 rounded-lg p-4">
          <p className="text-sm text-purple-200 mb-1">TD Error</p>
          <p className="text-lg font-bold text-orange-400">{lastQUpdate.tdError}</p>
        </div>
      </div>
    </div>
  );
};