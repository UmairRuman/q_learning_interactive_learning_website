// Path: src/components/Documentation.jsx

import React from 'react';
import { BookOpen, Brain, Lightbulb, TrendingUp, Target } from 'lucide-react';

export const Documentation = () => (
  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-6 max-h-[600px] overflow-y-auto">
    <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
      <BookOpen className="w-8 h-8" />
      Q-Learning Documentation
    </h2>

    {/* Prerequisites Section */}
    <div className="mb-8">
      <h3 className="text-2xl font-semibold text-yellow-300 mb-4 flex items-center gap-2">
        <Target className="w-6 h-6" />
        Prerequisites
      </h3>
      <div className="bg-white/5 rounded-lg p-4 space-y-3 text-white">
        <p><strong className="text-blue-300">Basic Probability:</strong> Understanding of probability distributions and expected values</p>
        <p><strong className="text-blue-300">Basic Calculus:</strong> Familiarity with derivatives and optimization concepts</p>
        <p><strong className="text-blue-300">Linear Algebra:</strong> Understanding of matrices and vectors</p>
        <p><strong className="text-blue-300">Python Programming:</strong> Basic knowledge of Python and NumPy</p>
      </div>
    </div>

    {/* What is Q-Learning */}
    <div className="mb-8">
      <h3 className="text-2xl font-semibold text-green-300 mb-4 flex items-center gap-2">
        <Brain className="w-6 h-6" />
        What is Q-Learning?
      </h3>
      <div className="bg-white/5 rounded-lg p-4 space-y-4 text-white">
        <p className="leading-relaxed">
          <strong>Q-Learning</strong> is a model-free reinforcement learning algorithm that learns the value of taking 
          actions in different states. The goal is to learn a policy that maximizes cumulative reward over time.
        </p>
        <div className="bg-purple-900/30 border border-purple-500 rounded-lg p-4">
          <p className="font-semibold mb-2 text-purple-200">Key Concepts:</p>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li><strong>State (s):</strong> Current situation of the agent</li>
            <li><strong>Action (a):</strong> Decision the agent can make</li>
            <li><strong>Reward (R):</strong> Immediate feedback from environment</li>
            <li><strong>Q-Value Q(s,a):</strong> Expected cumulative reward for taking action 'a' in state 's'</li>
            <li><strong>Policy (π):</strong> Strategy that maps states to actions</li>
          </ul>
        </div>
      </div>
    </div>

    {/* Mathematical Foundation */}
    <div className="mb-8">
      <h3 className="text-2xl font-semibold text-orange-300 mb-4 flex items-center gap-2">
        <TrendingUp className="w-6 h-6" />
        Mathematical Foundation
      </h3>
      <div className="bg-white/5 rounded-lg p-4 space-y-4 text-white">
        <div>
          <p className="font-semibold mb-2 text-yellow-200">The Bellman Equation:</p>
          <div className="bg-black/40 p-4 rounded-lg font-mono text-sm overflow-x-auto">
            <p className="text-green-300">Q(s,a) ← Q(s,a) + α[R + γ·max(Q(s',a')) - Q(s,a)]</p>
          </div>
        </div>

        <div className="space-y-3">
          <p className="font-semibold text-blue-200">Where:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="bg-blue-900/20 p-3 rounded">
              <strong className="text-blue-300">Q(s,a):</strong> Current Q-value estimate
            </div>
            <div className="bg-green-900/20 p-3 rounded">
              <strong className="text-green-300">α (alpha):</strong> Learning rate (0 to 1)
            </div>
            <div className="bg-yellow-900/20 p-3 rounded">
              <strong className="text-yellow-300">R:</strong> Immediate reward received
            </div>
            <div className="bg-purple-900/20 p-3 rounded">
              <strong className="text-purple-300">γ (gamma):</strong> Discount factor (0 to 1)
            </div>
            <div className="bg-pink-900/20 p-3 rounded">
              <strong className="text-pink-300">s':</strong> Next state after action
            </div>
            <div className="bg-orange-900/20 p-3 rounded">
              <strong className="text-orange-300">max(Q(s',a')):</strong> Best future Q-value
            </div>
          </div>
        </div>

        <div className="bg-indigo-900/30 border border-indigo-500 rounded-lg p-4">
          <p className="font-semibold mb-2 text-indigo-200">Intuition:</p>
          <p className="text-sm leading-relaxed">
            The new Q-value is the old estimate plus a learning rate times the "temporal difference error" 
            (the difference between what we expected and what we got). This gradually improves our estimates 
            of the value of each state-action pair.
          </p>
        </div>
      </div>
    </div>

    {/* Hyperparameters Explained */}
    <div className="mb-8">
      <h3 className="text-2xl font-semibold text-cyan-300 mb-4">Hyperparameters Explained</h3>
      <div className="bg-white/5 rounded-lg p-4 space-y-4 text-white text-sm">
        <div className="border-l-4 border-blue-500 pl-4">
          <p className="font-bold text-blue-300 mb-1">Learning Rate (α) - Range: 0.0 to 1.0</p>
          <p>Controls how much new information overrides old information.</p>
          <p className="text-xs text-gray-300 mt-1">• Low (0.01-0.1): Slow, stable learning</p>
          <p className="text-xs text-gray-300">• High (0.5-1.0): Fast but potentially unstable learning</p>
        </div>

        <div className="border-l-4 border-green-500 pl-4">
          <p className="font-bold text-green-300 mb-1">Discount Factor (γ) - Range: 0.0 to 1.0</p>
          <p>Determines importance of future rewards vs immediate rewards.</p>
          <p className="text-xs text-gray-300 mt-1">• Low (0.1-0.5): Short-sighted, values immediate rewards</p>
          <p className="text-xs text-gray-300">• High (0.9-0.99): Far-sighted, values long-term rewards</p>
        </div>

        <div className="border-l-4 border-purple-500 pl-4">
          <p className="font-bold text-purple-300 mb-1">Epsilon (ε) - Exploration vs Exploitation</p>
          <p>Probability of taking a random action (exploration) vs best known action (exploitation).</p>
          <p className="text-xs text-gray-300 mt-1">• Starts at 1.0 (100% exploration)</p>
          <p className="text-xs text-gray-300">• Decays to 0.01 (1% exploration, 99% exploitation)</p>
        </div>

        <div className="border-l-4 border-orange-500 pl-4">
          <p className="font-bold text-orange-300 mb-1">Epsilon Decay</p>
          <p>Rate at which exploration decreases over time.</p>
          <p className="text-xs text-gray-300 mt-1">• Higher (0.999): Slower decay, more exploration</p>
          <p className="text-xs text-gray-300">• Lower (0.99): Faster decay, quicker exploitation</p>
        </div>
      </div>
    </div>

    {/* Real-World Applications */}
    <div className="mb-8">
      <h3 className="text-2xl font-semibold text-pink-300 mb-4 flex items-center gap-2">
        <Lightbulb className="w-6 h-6" />
        Real-World Applications
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 rounded-lg p-4 border border-blue-500">
          <h4 className="font-bold text-blue-300 mb-2">🎮 Game AI</h4>
          <p className="text-sm text-white">
            AlphaGo, OpenAI's Dota 2 bot, and game-playing agents use Q-learning variants 
            to master complex games by learning optimal strategies through self-play.
          </p>
        </div>

        <div className="bg-gradient-to-br from-green-900/40 to-green-800/20 rounded-lg p-4 border border-green-500">
          <h4 className="font-bold text-green-300 mb-2">🤖 Robotics</h4>
          <p className="text-sm text-white">
            Robots learn manipulation tasks, navigation, and walking through trial and error, 
            improving their actions based on rewards for successful movements.
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/20 rounded-lg p-4 border border-purple-500">
          <h4 className="font-bold text-purple-300 mb-2">💰 Finance & Trading</h4>
          <p className="text-sm text-white">
            Algorithmic trading systems use RL to optimize portfolio management, 
            learning to buy/sell based on market conditions and maximizing returns.
          </p>
        </div>

        <div className="bg-gradient-to-br from-orange-900/40 to-orange-800/20 rounded-lg p-4 border border-orange-500">
          <h4 className="font-bold text-orange-300 mb-2">🚗 Autonomous Vehicles</h4>
          <p className="text-sm text-white">
            Self-driving cars use RL for decision-making in traffic, learning optimal 
            driving policies through simulation and real-world experience.
          </p>
        </div>

        <div className="bg-gradient-to-br from-pink-900/40 to-pink-800/20 rounded-lg p-4 border border-pink-500">
          <h4 className="font-bold text-pink-300 mb-2">📱 Recommendation Systems</h4>
          <p className="text-sm text-white">
            Netflix, YouTube, and Spotify use RL to learn user preferences and optimize 
            content recommendations for maximum engagement.
          </p>
        </div>

        <div className="bg-gradient-to-br from-cyan-900/40 to-cyan-800/20 rounded-lg p-4 border border-cyan-500">
          <h4 className="font-bold text-cyan-300 mb-2">⚡ Energy Management</h4>
          <p className="text-sm text-white">
            Smart grids use RL to optimize energy distribution, reduce costs, 
            and balance supply-demand in real-time.
          </p>
        </div>
      </div>
    </div>

    {/* Algorithm Steps */}
    <div className="mb-8">
      <h3 className="text-2xl font-semibold text-yellow-300 mb-4">Q-Learning Algorithm Steps</h3>
      <div className="bg-white/5 rounded-lg p-4">
        <ol className="space-y-3 text-white">
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center font-bold">1</span>
            <div>
              <strong>Initialize Q-table</strong> with zeros (or random small values)
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center font-bold">2</span>
            <div>
              <strong>Observe current state</strong> s
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center font-bold">3</span>
            <div>
              <strong>Choose action</strong> a using ε-greedy policy (explore or exploit)
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center font-bold">4</span>
            <div>
              <strong>Take action</strong> a, observe reward R and next state s'
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center font-bold">5</span>
            <div>
              <strong>Update Q-value</strong> using the Bellman equation
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center font-bold">6</span>
            <div>
              <strong>Repeat</strong> steps 2-5 until convergence or max episodes reached
            </div>
          </li>
        </ol>
      </div>
    </div>

    {/* Tips for Success */}
    <div>
      <h3 className="text-2xl font-semibold text-green-300 mb-4">💡 Tips for Success</h3>
      <div className="bg-white/5 rounded-lg p-4 space-y-2 text-white text-sm">
        <p>✅ Start with a high learning rate (0.1-0.3) and adjust based on convergence speed</p>
        <p>✅ Use a high discount factor (0.9-0.99) for tasks requiring long-term planning</p>
        <p>✅ Train for enough episodes - some problems need 10,000+ episodes to converge</p>
        <p>✅ Watch the success rate - if it plateaus, try adjusting hyperparameters</p>
        <p>✅ Monitor epsilon decay - agent should explore less as it learns more</p>
      </div>
    </div>
  </div>
);