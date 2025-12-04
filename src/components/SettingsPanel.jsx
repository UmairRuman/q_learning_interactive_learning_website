// ============================================================================
// FILE 8: src/components/SettingsPanel.jsx
// ============================================================================

import React from 'react';

export const SettingsPanel = ({ 
  learningRate, setLearningRate,
  discountFactor, setDiscountFactor,
  epsilonDecay, setEpsilonDecay,
  maxEpisodes, setMaxEpisodes,
  maxStepsPerEpisode, setMaxStepsPerEpisode,
  demoSpeed, setDemoSpeed,
  isTraining
}) => (
  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-6">
    <h2 className="text-2xl font-bold text-white mb-4">Hyperparameters</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div>
        <label className="text-white text-sm mb-2 block">Learning Rate (α): {learningRate}</label>
        <input type="range" min="0.01" max="1" step="0.01" value={learningRate}
          onChange={(e) => setLearningRate(parseFloat(e.target.value))}
          disabled={isTraining} className="w-full" />
      </div>
      <div>
        <label className="text-white text-sm mb-2 block">Discount Factor (γ): {discountFactor}</label>
        <input type="range" min="0.1" max="0.99" step="0.01" value={discountFactor}
          onChange={(e) => setDiscountFactor(parseFloat(e.target.value))}
          disabled={isTraining} className="w-full" />
      </div>
      <div>
        <label className="text-white text-sm mb-2 block">Epsilon Decay: {epsilonDecay}</label>
        <input type="range" min="0.99" max="0.9999" step="0.0001" value={epsilonDecay}
          onChange={(e) => setEpsilonDecay(parseFloat(e.target.value))}
          disabled={isTraining} className="w-full" />
      </div>
      <div>
        <label className="text-white text-sm mb-2 block">Max Episodes: {maxEpisodes}</label>
        <input type="number" min="100" max="50000" step="100" value={maxEpisodes}
          onChange={(e) => setMaxEpisodes(parseInt(e.target.value))}
          disabled={isTraining} className="w-full px-3 py-2 bg-white/20 text-white rounded-lg" />
      </div>
      <div>
        <label className="text-white text-sm mb-2 block">Max Steps/Episode: {maxStepsPerEpisode}</label>
        <input type="number" min="50" max="1000" step="10" value={maxStepsPerEpisode}
          onChange={(e) => setMaxStepsPerEpisode(parseInt(e.target.value))}
          disabled={isTraining} className="w-full px-3 py-2 bg-white/20 text-white rounded-lg" />
      </div>
      <div>
        <label className="text-white text-sm mb-2 block">Demo Speed (ms): {demoSpeed}</label>
        <input type="range" min="50" max="1000" step="50" value={demoSpeed}
          onChange={(e) => setDemoSpeed(parseInt(e.target.value))}
          className="w-full" />
      </div>
    </div>
  </div>
);
