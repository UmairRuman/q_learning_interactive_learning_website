// Path: src/components/ControlBar.jsx

import React from 'react';
import { Settings, Info, BookOpen } from 'lucide-react';

export const ControlBar = ({ 
  showSettings, setShowSettings,
  showInfo, setShowInfo,
  showDocs, setShowDocs,
  isTraining
}) => (
  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 mb-6 flex flex-wrap gap-3 items-center">
    <button
      onClick={() => setShowSettings(!showSettings)}
      className="flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-semibold transition-all"
    >
      <Settings className="w-5 h-5" />
      <span className="hidden sm:inline">Parameters Setting</span>
    </button>
    
    <button
      onClick={() => setShowDocs(!showDocs)}
      className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-all"
    >
      <BookOpen className="w-5 h-5" />
      <span className="hidden sm:inline">Documentation</span>
    </button>
    
    <button
      onClick={() => setShowInfo(!showInfo)}
      className="flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-semibold transition-all"
    >
      <Info className="w-5 h-5" />
      <span className="hidden sm:inline">Quick Info</span>
    </button>
  </div>
);