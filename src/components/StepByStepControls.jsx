// Path: src/components/StepByStepControls.jsx

import React from 'react';
import { Play, SkipForward, FastForward, StopCircle } from 'lucide-react';

export const StepByStepControls = ({ 
  isStepMode,
  episodeActive,
  onStartEpisode,
  onSingleStep,
  onAutoStep,
  onStopAuto,
  isAutoRunning,
  disabled
}) => (
  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 mb-6">
    <h3 className="text-xl font-bold text-white mb-4">🎯 Step-by-Step Mode</h3>
    <div className="flex flex-wrap gap-3">
      <button
        onClick={onStartEpisode}
        disabled={disabled || episodeActive}
        className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-all"
      >
        <Play className="w-5 h-5" />
        Start New Episode
      </button>
      
      <button
        onClick={onSingleStep}
        disabled={disabled || !episodeActive || isAutoRunning}
        className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-all"
      >
        <SkipForward className="w-5 h-5" />
        Next Step
      </button>
      
      {!isAutoRunning ? (
        <button
          onClick={onAutoStep}
          disabled={disabled || !episodeActive}
          className="flex items-center gap-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-all"
        >
          <FastForward className="w-5 h-5" />
          Auto Step
        </button>
      ) : (
        <button
          onClick={onStopAuto}
          className="flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-all"
        >
          <StopCircle className="w-5 h-5" />
          Stop Auto
        </button>
      )}
    </div>
  </div>
);