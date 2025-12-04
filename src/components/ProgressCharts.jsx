// ============================================================================
// FILE 14: src/components/ProgressCharts.jsx
// ============================================================================

import React from 'react';

export const ProgressCharts = ({ rewardHistory, successHistory }) => (
  <div className="mt-6 bg-white/10 backdrop-blur-lg rounded-xl p-6">
    <h3 className="text-2xl font-bold text-white mb-4">Learning Progress</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white/5 rounded-lg p-4">
        <h4 className="text-lg font-semibold text-white mb-3">Average Reward</h4>
        <div className="h-40 flex items-end gap-1">
          {rewardHistory.map((reward, i) => {
            const maxReward = Math.max(...rewardHistory, 1);
            const height = (reward / maxReward) * 100;
            return (
              <div
                key={i}
                className="flex-1 bg-gradient-to-t from-yellow-500 to-orange-500 rounded-t"
                style={{ height: `${Math.max(height, 5)}%` }}
                title={`Episode ${i * 50}: ${reward.toFixed(2)}`}
              />
            );
          })}
        </div>
      </div>
      <div className="bg-white/5 rounded-lg p-4">
        <h4 className="text-lg font-semibold text-white mb-3">Success Rate</h4>
        <div className="h-40 flex items-end gap-1">
          {successHistory.map((rate, i) => (
            <div
              key={i}
              className="flex-1 bg-gradient-to-t from-green-500 to-emerald-500 rounded-t"
              style={{ height: `${Math.max(rate, 5)}%` }}
              title={`Episode ${i * 50}: ${rate.toFixed(1)}%`}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);
