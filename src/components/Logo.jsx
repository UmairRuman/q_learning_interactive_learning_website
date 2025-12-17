// Path: src/components/Logo.jsx (Maze-themed)

import React from 'react';

export const Logo = ({ size = 48, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Maze-like grid background */}
    <rect x="10" y="10" width="80" height="80" rx="8" fill="url(#mazeGradient)" />
    
    {/* Grid lines */}
    <g stroke="#8B5CF6" strokeWidth="1.5" opacity="0.3">
      <line x1="30" y1="10" x2="30" y2="90" />
      <line x1="50" y1="10" x2="50" y2="90" />
      <line x1="70" y1="10" x2="70" y2="90" />
      <line x1="10" y1="30" x2="90" y2="30" />
      <line x1="10" y1="50" x2="90" y2="50" />
      <line x1="10" y1="70" x2="90" y2="70" />
    </g>
    
    {/* Path through maze (animated) */}
    <path
      d="M 20 20 L 40 20 L 40 40 L 60 40 L 60 60 L 80 60 L 80 80"
      stroke="#10B981"
      strokeWidth="4"
      fill="none"
      strokeLinecap="round"
      className="animate-dash"
      strokeDasharray="5 3"
    />
    
    {/* Start point */}
    <circle cx="20" cy="20" r="6" fill="#10B981" className="animate-pulse" />
    
    {/* End point (goal) */}
    <circle cx="80" cy="80" r="6" fill="#FCD34D" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
    
    {/* Q in center */}
    <circle cx="50" cy="50" r="18" fill="rgba(139, 92, 246, 0.9)" />
    <text
      x="50"
      y="58"
      fontSize="24"
      fontWeight="bold"
      fill="white"
      textAnchor="middle"
      fontFamily="Arial, sans-serif"
    >
      Q
    </text>
    
    {/* Gradients */}
    <defs>
      <linearGradient id="mazeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1E1B4B" />
        <stop offset="100%" stopColor="#581C87" />
      </linearGradient>
    </defs>
  </svg>
);