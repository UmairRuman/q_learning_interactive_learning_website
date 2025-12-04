// ============================================================================
// FILE 7: src/components/AnimatedBackground.jsx
// ============================================================================

import React from 'react';

export const AnimatedBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" 
         style={{ top: '10%', left: '10%', animationDuration: '4s' }}></div>
    <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" 
         style={{ top: '60%', right: '10%', animationDuration: '6s', animationDelay: '1s' }}></div>
    <div className="absolute w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" 
         style={{ bottom: '10%', left: '50%', animationDuration: '5s', animationDelay: '2s' }}></div>
  </div>
);