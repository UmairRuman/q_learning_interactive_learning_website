// Path: src/components/LearningProcessModal.jsx

import React from 'react';
import { X, Brain, TrendingUp, Zap, GitCompare } from 'lucide-react';

export const LearningProcessModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-purple-500/30">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-pink-600 p-6 flex justify-between items-center border-b border-white/10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
            <Brain className="w-8 h-8" />
            How Q-Learning Actually Works
          </h2>
          <button 
            onClick={onClose}
            className="text-white hover:bg-white/20 p-2 rounded-lg transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-8 text-white">
          
          {/* Section 1: The Learning Cycle */}
          <section>
            <h3 className="text-2xl font-bold text-yellow-300 mb-4 flex items-center gap-2">
              <TrendingUp className="w-6 h-6" />
              The Learning Cycle (How Values Update)
            </h3>
            
            <div className="bg-white/10 rounded-xl p-6 space-y-4">
              <p className="text-lg leading-relaxed">
                Every time the agent takes a step, it updates its Q-value using the <strong className="text-green-300">Bellman Equation</strong>:
              </p>
              
              <div className="bg-black/40 p-6 rounded-lg font-mono text-sm overflow-x-auto">
                <p className="text-green-300 mb-4">Q(s,a) ← Q(s,a) + α[R + γ·max(Q(s',a')) - Q(s,a)]</p>
                <div className="space-y-2 text-xs sm:text-sm">
                  <p><span className="text-blue-300">Q(s,a)</span> = Current estimate of value for taking action 'a' in state 's'</p>
                  <p><span className="text-green-300">α (alpha)</span> = Learning rate (how much to update)</p>
                  <p><span className="text-yellow-300">R</span> = Immediate reward received</p>
                  <p><span className="text-purple-300">γ (gamma)</span> = Discount factor (importance of future rewards)</p>
                  <p><span className="text-pink-300">max(Q(s',a'))</span> = Best Q-value in the next state</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 p-4 rounded-lg border border-blue-500/30">
                <p className="font-semibold text-blue-300 mb-2">💡 Intuition:</p>
                <p className="text-sm leading-relaxed">
                  The agent updates its belief about how good an action is based on:
                  <br/>1. The immediate reward it got
                  <br/>2. The best possible future reward from the new state
                  <br/>3. How wrong its previous estimate was
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Step-by-Step Example */}
          <section>
            <h3 className="text-2xl font-bold text-cyan-300 mb-4">📝 Step-by-Step Example</h3>
            
            <div className="bg-white/10 rounded-xl p-6 space-y-4">
              <p className="font-semibold text-yellow-300">Let's see ONE update in action:</p>
              
              <div className="space-y-4 text-sm sm:text-base">
                <div className="bg-green-900/30 border-l-4 border-green-500 p-4 rounded">
                  <p className="font-bold mb-2">🎯 Initial State:</p>
                  <p>Agent is at position (2,3) - State 19</p>
                  <p>Q-values for State 19: [0.5, 0.3, 0.2, 0.8]</p>
                  <p className="text-xs text-gray-300 mt-1">(for actions: Up, Down, Left, Right)</p>
                </div>

                <div className="bg-blue-900/30 border-l-4 border-blue-500 p-4 rounded">
                  <p className="font-bold mb-2">⚡ Action Taken:</p>
                  <p>Agent chooses "Right" (action 3) - Q-value = 0.8</p>
                  <p>Moves to position (2,4) - State 20</p>
                </div>

                <div className="bg-yellow-900/30 border-l-4 border-yellow-500 p-4 rounded">
                  <p className="font-bold mb-2">🎁 Reward Received:</p>
                  <p>The agent lands on a normal tile</p>
                  <p>Reward R = -0.1 (small penalty for each step)</p>
                </div>

                <div className="bg-purple-900/30 border-l-4 border-purple-500 p-4 rounded">
                  <p className="font-bold mb-2">🔮 Future Value:</p>
                  <p>Q-values for new State 20: [0.6, 0.4, 0.7, 0.9]</p>
                  <p>Best future value: max(Q(20,·)) = 0.9</p>
                </div>

                <div className="bg-pink-900/30 border-l-4 border-pink-500 p-4 rounded">
                  <p className="font-bold mb-2">🧮 Calculate Update:</p>
                  <div className="font-mono text-xs bg-black/30 p-3 rounded mt-2">
                    <p>Old Q(19, Right) = 0.8</p>
                    <p>α = 0.1, γ = 0.95</p>
                    <p className="mt-2 text-green-300">Q(19, Right) ← 0.8 + 0.1[-0.1 + 0.95×0.9 - 0.8]</p>
                    <p className="text-green-300">Q(19, Right) ← 0.8 + 0.1[-0.1 + 0.855 - 0.8]</p>
                    <p className="text-green-300">Q(19, Right) ← 0.8 + 0.1[-0.045]</p>
                    <p className="text-yellow-300 mt-2 text-base">New Q(19, Right) = 0.7955 ✨</p>
                  </div>
                </div>

                <div className="bg-green-900/30 border-l-4 border-green-500 p-4 rounded">
                  <p className="font-bold mb-2">📊 Result:</p>
                  <p>The Q-value decreased slightly because:</p>
                  <p className="text-xs mt-1">• We got a negative reward (-0.1)</p>
                  <p className="text-xs">• The future value (0.855) wasn't enough to offset it</p>
                  <p className="text-xs">• Over time, good paths will have HIGH Q-values, bad paths LOW</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: What the Heatmap Shows */}
          <section>
            <h3 className="text-2xl font-bold text-orange-300 mb-4 flex items-center gap-2">
              <Zap className="w-6 h-6" />
              Understanding the Q-Table Heatmap
            </h3>
            
            <div className="bg-white/10 rounded-xl p-6 space-y-4">
              <p className="leading-relaxed">
                Our Q-Table visualization shows the <strong className="text-yellow-300">MAXIMUM Q-value</strong> for each state (position on the grid).
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="bg-green-900/30 p-4 rounded-lg border border-green-500/50">
                  <p className="font-bold text-green-300 mb-2">🟢 High Values (Green)</p>
                  <p>States close to the goal or treasures. The agent has learned these are GOOD places to be.</p>
                </div>
                
                <div className="bg-red-900/30 p-4 rounded-lg border border-red-500/50">
                  <p className="font-bold text-red-300 mb-2">🔴 Low Values (Red)</p>
                  <p>States near walls or far from goal. The agent has learned these are BAD places to be.</p>
                </div>
              </div>

              <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-500/30">
                <p className="font-semibold text-blue-300 mb-2">🎯 Why Maximum?</p>
                <p className="text-sm">
                  Each state has 4 Q-values (one per action: ↑ ↓ ← →). We show the highest one because it represents the 
                  <strong className="text-yellow-300"> best possible action</strong> from that state. This gives you a quick view 
                  of which states are valuable overall!
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Q-Learning vs DQN */}
          <section>
            <h3 className="text-2xl font-bold text-pink-300 mb-4 flex items-center gap-2">
              <GitCompare className="w-6 h-6" />
              Q-Learning vs Deep Q-Network (DQN)
            </h3>
            
            <div className="bg-white/10 rounded-xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-bold text-blue-300 text-lg">📊 Q-Learning (Our Implementation)</h4>
                  <div className="bg-blue-900/30 p-4 rounded-lg space-y-2 text-sm">
                    <p>✅ Uses a <strong>table</strong> to store Q-values</p>
                    <p>✅ Works great for <strong>small state spaces</strong></p>
                    <p>✅ Each state-action pair has its own entry</p>
                    <p>✅ Easy to visualize and understand</p>
                    <p>❌ Doesn't scale to huge problems (like raw pixels)</p>
                    <p className="text-xs text-gray-300 mt-2">
                      Example: 8×8 grid = 64 states × 4 actions = 256 values
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-bold text-purple-300 text-lg">🧠 Deep Q-Network (DQN)</h4>
                  <div className="bg-purple-900/30 p-4 rounded-lg space-y-2 text-sm">
                    <p>✅ Uses a <strong>neural network</strong> instead of a table</p>
                    <p>✅ Can handle <strong>huge state spaces</strong> (images, complex games)</p>
                    <p>✅ Neural network approximates Q-values</p>
                    <p>✅ Learns patterns and generalizes</p>
                    <p>❌ Harder to interpret what it learned</p>
                    <p className="text-xs text-gray-300 mt-2">
                      Example: Atari games (raw pixels) = millions of possible states
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-gradient-to-r from-indigo-900/50 to-purple-900/50 p-4 rounded-lg border border-indigo-500/30">
                <p className="font-semibold text-indigo-300 mb-2">🔑 Key Difference:</p>
                <p className="text-sm leading-relaxed">
                  <strong>Q-Learning</strong> stores exact values for each state-action pair. 
                  <strong className="text-purple-300"> DQN</strong> uses a neural network to predict Q-values, 
                  allowing it to handle problems where storing all values would be impossible (like learning to play 
                  video games from pixels). Both use the same Bellman equation at their core!
                </p>
              </div>
            </div>
          </section>

          {/* Section 5: Convergence */}
          <section>
            <h3 className="text-2xl font-bold text-green-300 mb-4">🎯 How Does It Converge?</h3>
            
            <div className="bg-white/10 rounded-xl p-6 space-y-4">
              <p className="leading-relaxed">
                Over thousands of episodes, Q-values gradually stabilize:
              </p>
              
              <div className="space-y-3 text-sm">
                <div className="flex gap-3 items-start">
                  <span className="text-2xl">1️⃣</span>
                  <div>
                    <p className="font-semibold text-yellow-300">Early Episodes (High Exploration)</p>
                    <p>Q-values are random/zero. Agent explores randomly, values update wildly.</p>
                  </div>
                </div>
                
                <div className="flex gap-3 items-start">
                  <span className="text-2xl">2️⃣</span>
                  <div>
                    <p className="font-semibold text-orange-300">Mid Training (Learning Patterns)</p>
                    <p>Agent starts finding good paths. Values near goal increase, values near walls decrease.</p>
                  </div>
                </div>
                
                <div className="flex gap-3 items-start">
                  <span className="text-2xl">3️⃣</span>
                  <div>
                    <p className="font-semibold text-green-300">Late Training (Convergence)</p>
                    <p>Q-values stabilize. Agent consistently takes optimal path. Success rate approaches 100%.</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 p-4 rounded-lg border border-green-500/30 mt-4">
                <p className="font-semibold text-green-300 mb-2">💡 Watch for These Signs of Learning:</p>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li>Success rate increasing over episodes</li>
                  <li>Average steps to goal decreasing</li>
                  <li>Q-values around goal becoming bright green</li>
                  <li>Epsilon (exploration) decreasing toward minimum</li>
                </ul>
              </div>
            </div>
          </section>

        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gradient-to-r from-indigo-600 to-purple-600 p-4 border-t border-white/10">
          <button
            onClick={onClose}
            className="w-full bg-white/20 hover:bg-white/30 text-white font-bold py-3 rounded-lg transition-all"
          >
            Got it! Let me explore 🚀
          </button>
        </div>
      </div>
    </div>
  );
};