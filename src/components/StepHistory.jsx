// Path: src/components/StepHistory.jsx

import React from 'react';
import { History } from 'lucide-react';

export const StepHistory = ({ stepHistory }) => (
  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 max-h-96 overflow-y-auto">
    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
      <History className="w-5 h-5" />
      Episode History
    </h3>
    
    {stepHistory.length === 0 ? (
      <p className="text-purple-200">No steps taken yet...</p>
    ) : (
      <div className="space-y-2">
        {stepHistory.map((step, idx) => (
          <div key={idx} className="bg-white/10 rounded-lg p-3 text-sm">
            <div className="flex justify-between items-center mb-1">
              <span className="text-white font-bold">Step {step.step}</span>
              <span className={`font-bold ${step.reward > 0 ? 'text-green-400' : step.reward < 0 ? 'text-red-400' : 'text-gray-400'}`}>
                Reward: {step.reward?.toFixed(2)}
              </span>
            </div>
            <div className="text-purple-200 text-xs">
              Position: ({step.position.row}, {step.position.col})
              {step.tile && ` | Tile: ${step.tile}`}
              {step.action !== null && ` | Action: ${['↑','↓','←','→'][step.action]}`}
            </div>
            <div className="text-yellow-300 text-xs mt-1">
              Total Reward: {step.totalReward?.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);