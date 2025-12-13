// Path: src/components/ControlBar.jsx

import React from 'react';
import { Settings, Save, Upload, Info } from 'lucide-react';

export const ControlBar = ({ 
  showSettings, setShowSettings,
  showInfo, setShowInfo,
  saveAgent, loadAgent,
  isTraining, episode
}) => (
  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 mb-6 flex flex-wrap gap-3 items-center justify-between">
    <div className="flex gap-3 flex-wrap">
      <button
        onClick={() => setShowSettings(!showSettings)}
        className="flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-semibold transition-all"
      >
        <Settings className="w-5 h-5" />
        Settings
      </button>
      <button
        onClick={saveAgent}
        disabled={isTraining || episode === 0}
        className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-all"
      >
        <Save className="w-5 h-5" />
        Save
      </button>
      <button
        onClick={loadAgent}
        disabled={isTraining}
        className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-all"
      >
        <Upload className="w-5 h-5" />
        Load
      </button>
      <button
        onClick={() => setShowInfo(!showInfo)}
        className="flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-semibold transition-all"
      >
        <Info className="w-5 h-5" />
        Info
      </button>
    </div>
  </div>
);