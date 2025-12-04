// ============================================================================
// FILE 9: src/components/InfoPanel.jsx
// ============================================================================

import React from 'react';

export const InfoPanel = () => (
  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-6">
    <h2 className="text-2xl font-bold text-white mb-4">Q-Learning Explained</h2>
    <div className="text-white space-y-3">
      <p><strong className="text-yellow-300">Q-Learning</strong> is a model-free reinforcement learning algorithm that learns the value of actions in different states.</p>
      <div className="bg-white/10 p-4 rounded-lg">
        <p className="font-mono text-sm">Q(s,a) ← Q(s,a) + α[R + γ·max(Q(s',a')) - Q(s,a)]</p>
      </div>
      <ul className="space-y-2 text-sm">
        <li><strong className="text-blue-300">Learning Rate (α):</strong> How much new information overrides old (0-1)</li>
        <li><strong className="text-green-300">Discount Factor (γ):</strong> Importance of future rewards (0-1)</li>
        <li><strong className="text-orange-300">Epsilon (ε):</strong> Exploration vs exploitation balance</li>
        <li><strong className="text-purple-300">Epsilon Decay:</strong> How quickly we reduce exploration</li>
      </ul>
    </div>
  </div>
);