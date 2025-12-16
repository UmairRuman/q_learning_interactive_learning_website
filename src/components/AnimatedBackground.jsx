// Path: src/components/AnimatedBackground.jsx

import React from 'react';

export const AnimatedBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Base gradient layers */}
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950"></div>
    <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/30 via-transparent to-purple-900/30"></div>
    
    {/* Animated gradient orbs */}
    <div 
      className="absolute w-[500px] h-[500px] bg-gradient-radial from-purple-500/30 via-purple-500/10 to-transparent rounded-full blur-3xl animate-float-slow" 
      style={{ top: '10%', left: '10%', animationDuration: '20s', animationDelay: '0s' }}
    ></div>
    <div 
      className="absolute w-[600px] h-[600px] bg-gradient-radial from-blue-500/25 via-blue-500/10 to-transparent rounded-full blur-3xl animate-float-slow" 
      style={{ top: '60%', right: '5%', animationDuration: '25s', animationDelay: '5s' }}
    ></div>
    <div 
      className="absolute w-[450px] h-[450px] bg-gradient-radial from-pink-500/30 via-pink-500/10 to-transparent rounded-full blur-3xl animate-float-slow" 
      style={{ bottom: '10%', left: '50%', animationDuration: '22s', animationDelay: '10s' }}
    ></div>
    <div 
      className="absolute w-[400px] h-[400px] bg-gradient-radial from-cyan-500/25 via-cyan-500/10 to-transparent rounded-full blur-3xl animate-float-slow" 
      style={{ top: '40%', left: '70%', animationDuration: '18s', animationDelay: '7s' }}
    ></div>

    {/* Grid pattern overlay */}
    <div 
      className="absolute inset-0 opacity-10"
      style={{
        backgroundImage: `
          linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
          linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        animation: 'gridMove 20s linear infinite'
      }}
    ></div>

    {/* Floating particles */}
    {[...Array(30)].map((_, i) => (
      <div
        key={i}
        className="absolute w-2 h-2 bg-white/40 rounded-full animate-float-particle"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDuration: `${15 + Math.random() * 20}s`,
          animationDelay: `${Math.random() * 5}s`,
          opacity: Math.random() * 0.5 + 0.2
        }}
      ></div>
    ))}

    {/* Glowing stars */}
    {[...Array(50)].map((_, i) => (
      <div
        key={`star-${i}`}
        className="absolute bg-white rounded-full animate-twinkle"
        style={{
          width: `${Math.random() * 3 + 1}px`,
          height: `${Math.random() * 3 + 1}px`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDuration: `${2 + Math.random() * 3}s`,
          animationDelay: `${Math.random() * 5}s`
        }}
      ></div>
    ))}

    {/* Animated light rays */}
    <div 
      className="absolute inset-0 opacity-20"
      style={{
        background: `
          radial-gradient(ellipse at 20% 50%, rgba(99, 102, 241, 0.3) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 50%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)
        `,
        animation: 'pulseGlow 8s ease-in-out infinite alternate'
      }}
    ></div>

    {/* Digital rain effect (Matrix-style) */}
    {[...Array(15)].map((_, i) => (
      <div
        key={`rain-${i}`}
        className="absolute w-px bg-gradient-to-b from-transparent via-cyan-400/50 to-transparent animate-digital-rain"
        style={{
          left: `${Math.random() * 100}%`,
          height: `${Math.random() * 200 + 100}px`,
          animationDuration: `${3 + Math.random() * 4}s`,
          animationDelay: `${Math.random() * 5}s`
        }}
      ></div>
    ))}

    {/* Hexagon pattern overlay */}
    <div 
      className="absolute inset-0 opacity-5"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='50' height='43' viewBox='0 0 50 43' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M25 0l12.5 7.2v14.4L25 28.8 12.5 21.6V7.2L25 0z' fill='%23a78bfa' fill-opacity='1'/%3E%3C/svg%3E")`,
        backgroundSize: '50px 43px'
      }}
    ></div>

    {/* Scanning line effect */}
    <div 
      className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent animate-scan"
    ></div>

    {/* Corner accent lights */}
    <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-radial from-purple-500/20 to-transparent blur-2xl"></div>
    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-radial from-blue-500/20 to-transparent blur-2xl"></div>
    <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-radial from-pink-500/20 to-transparent blur-2xl"></div>
    <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-radial from-cyan-500/20 to-transparent blur-2xl"></div>

    {/* Vignette effect */}
    <div 
      className="absolute inset-0"
      style={{
        background: 'radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.4) 100%)'
      }}
    ></div>
  </div>
);