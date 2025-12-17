// ============================================================================
// FILE: src/App.jsx (UPDATED - WITH DOCUMENTATION)
// ============================================================================

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Zap, Trophy, Brain } from 'lucide-react';
import { AnimatedBackground } from './components/AnimatedBackground';
import { SettingsPanel } from './components/SettingsPanel';
import { InfoPanel } from './components/InfoPanel';
import { Documentation } from './components/Documentation';
import { GameGrid } from './components/GameGrid';
import { StatsPanel } from './components/StatsPanel';
import { Legend } from './components/Legend';
import { QTableHeatmap } from './components/QTableHeatmap';
import { ProgressCharts } from './components/ProgressCharts';
import { ControlBar } from './components/ControlBar';
import { QLearningAgent } from './core/QLearningAgent';
import { LEVELS } from './constants/levels';
import { REWARDS } from './constants/rewards';
import { LearningProcessModal } from './components/LearningProcessModal';
import { getStartPos, posToState, getNextPos } from './utils/gridUtils';
import { Logo } from './components/Logo';

export default function QLearningQuest() {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [isTraining, setIsTraining] = useState(false);
  const [episode, setEpisode] = useState(0);
  const [totalReward, setTotalReward] = useState(0);
  const [successRate, setSuccessRate] = useState(0);
  const [avgSteps, setAvgSteps] = useState(0);
  const [agentPos, setAgentPos] = useState({ row: 0, col: 0 });
  const [showDemo, setShowDemo] = useState(false);
  const [rewardHistory, setRewardHistory] = useState([]);
  const [successHistory, setSuccessHistory] = useState([]);
  const [showQTable, setShowQTable] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showDocs, setShowDocs] = useState(false);
  const [demoSpeed, setDemoSpeed] = useState(300);
  
  const [learningRate, setLearningRate] = useState(0.1);
  const [discountFactor, setDiscountFactor] = useState(0.95);
  const [epsilonDecay, setEpsilonDecay] = useState(0.9995);
  const [maxEpisodes, setMaxEpisodes] = useState(5000);
  const [maxStepsPerEpisode, setMaxStepsPerEpisode] = useState(200);
  const [showLearningProcess, setShowLearningProcess] = useState(false);
  
  const agentRef = useRef(null);
  const trainingIntervalRef = useRef(null);
  const demoIntervalRef = useRef(null);

  // Define level and gridSize
  const level = LEVELS[currentLevel];
  const gridSize = level.size;
  const stateSize = gridSize * gridSize;
  const actionSize = 4;

  useEffect(() => {
    if (!agentRef.current) {
      agentRef.current = new QLearningAgent(stateSize, actionSize, learningRate, discountFactor, epsilonDecay);
    }
  }, [stateSize, actionSize, learningRate, discountFactor, epsilonDecay]);

  const trainEpisode = () => {
    const agent = agentRef.current;
    let pos = getStartPos(level);
    let episodeReward = 0;
    let steps = 0;
    let success = false;

    while (steps < maxStepsPerEpisode) {
      const state = posToState(pos.row, pos.col, gridSize);
      const action = agent.chooseAction(state);
      const nextPos = getNextPos(pos.row, pos.col, action, level);
      const nextTile = level.grid[nextPos.row][nextPos.col];
      
      let reward = REWARDS[nextTile] || -0.1;
      const nextState = posToState(nextPos.row, nextPos.col, gridSize);
      
      agent.learn(state, action, reward, nextState);
      episodeReward += reward;
      pos = nextPos;
      steps++;

      if (nextTile === 'G') {
        success = true;
        break;
      }
      if (nextTile === '#') {
        break;
      }
    }

    agent.decayEpsilon();
    return { reward: episodeReward, success, steps };
  };

  const startTraining = () => {
    setIsTraining(true);
    setEpisode(0);
    setRewardHistory([]);
    setSuccessHistory([]);
    
    let episodeCount = 0;
    let recentRewards = [];
    let recentSuccesses = [];
    let recentSteps = [];

    trainingIntervalRef.current = setInterval(() => {
      const result = trainEpisode();
      episodeCount++;
      
      recentRewards.push(result.reward);
      recentSuccesses.push(result.success ? 1 : 0);
      recentSteps.push(result.steps);
      
      if (recentRewards.length > 100) {
        recentRewards.shift();
        recentSuccesses.shift();
        recentSteps.shift();
      }

      if (episodeCount % 10 === 0) {
        const avgReward = recentRewards.reduce((a, b) => a + b, 0) / recentRewards.length;
        const successRateCalc = recentSuccesses.reduce((a, b) => a + b, 0) / recentSuccesses.length * 100;
        const avgStepsCalc = recentSteps.reduce((a, b) => a + b, 0) / recentSteps.length;
        
        setEpisode(episodeCount);
        setTotalReward(avgReward.toFixed(2));
        setSuccessRate(successRateCalc.toFixed(1));
        setAvgSteps(avgStepsCalc.toFixed(1));
        
        if (episodeCount % 50 === 0) {
          setRewardHistory(prev => [...prev, avgReward]);
          setSuccessHistory(prev => [...prev, successRateCalc]);
        }
      }

      if (episodeCount >= maxEpisodes) {
        stopTraining();
      }
    }, 1);
  };

  const stopTraining = () => {
    setIsTraining(false);
    if (trainingIntervalRef.current) {
      clearInterval(trainingIntervalRef.current);
    }
  };

  const runDemo = () => {
    setShowDemo(true);
    let pos = getStartPos(level);
    setAgentPos(pos);
    let steps = 0;

    demoIntervalRef.current = setInterval(() => {
      const state = posToState(pos.row, pos.col, gridSize);
      const action = agentRef.current.getBestAction(state);
      const nextPos = getNextPos(pos.row, pos.col, action, level);
      const nextTile = level.grid[nextPos.row][nextPos.col];
      
      pos = nextPos;
      setAgentPos(pos);
      steps++;

      if (nextTile === 'G' || nextTile === '#' || steps >= maxStepsPerEpisode) {
        stopDemo();
      }
    }, demoSpeed);
  };

  const stopDemo = () => {
    setShowDemo(false);
    if (demoIntervalRef.current) {
      clearInterval(demoIntervalRef.current);
    }
  };

  const resetAgent = () => {
    stopTraining();
    stopDemo();
    
    // Create new agent with current level's correct dimensions
    agentRef.current = new QLearningAgent(
      stateSize, 
      actionSize, 
      learningRate, 
      discountFactor, 
      epsilonDecay
    );
    
    setEpisode(0);
    setTotalReward(0);
    setSuccessRate(0);
    setAvgSteps(0);
    setRewardHistory([]);
    setSuccessHistory([]);
    setShowQTable(false);
    setAgentPos(getStartPos(level));
  };

  const changeLevel = (newLevel) => {
    stopTraining();
    stopDemo();
    setCurrentLevel(newLevel);
    
    // Get the new level's dimensions
    const newLevelData = LEVELS[newLevel];
    const newGridSize = newLevelData.size;
    const newStateSize = newGridSize * newGridSize;
    
    // Create a NEW agent with the correct size for the new level
    agentRef.current = new QLearningAgent(
      newStateSize, 
      actionSize, 
      learningRate, 
      discountFactor, 
      epsilonDecay
    );
    
    // Reset all states
    setEpisode(0);
    setTotalReward(0);
    setSuccessRate(0);
    setAvgSteps(0);
    setRewardHistory([]);
    setSuccessHistory([]);
    setShowQTable(false);
    setAgentPos(getStartPos(newLevelData));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-2 sm:p-4 md:p-8 relative overflow-hidden">
      <AnimatedBackground />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
       
<div className="text-center mb-4 sm:mb-8">
  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 flex items-center justify-center gap-2 sm:gap-3">
    <Logo size={48} className="sm:w-12 sm:h-12" />
    <span className="hidden sm:inline">The Q-Learning Quest</span>
    <span className="sm:hidden">Q-Learning</span>
  </h1>
  <p className="text-sm sm:text-base md:text-lg text-purple-200">Master the Art of Reinforcement Learning</p>
</div>

        {/* Control Bar */}
        <ControlBar 
          showSettings={showSettings} 
          setShowSettings={setShowSettings}
          showInfo={showInfo} 
          setShowInfo={setShowInfo}
          showDocs={showDocs}
          setShowDocs={setShowDocs}
          isTraining={isTraining}
        />

        {/* Documentation Panel */}
        {showDocs && <Documentation />}

        {/* Settings Panel */}
        {showSettings && (
          <SettingsPanel 
            learningRate={learningRate} setLearningRate={setLearningRate}
            discountFactor={discountFactor} setDiscountFactor={setDiscountFactor}
            epsilonDecay={epsilonDecay} setEpsilonDecay={setEpsilonDecay}
            maxEpisodes={maxEpisodes} setMaxEpisodes={setMaxEpisodes}
            maxStepsPerEpisode={maxStepsPerEpisode} setMaxStepsPerEpisode={setMaxStepsPerEpisode}
            demoSpeed={demoSpeed} setDemoSpeed={setDemoSpeed}
            isTraining={isTraining}
          />
        )}

        {/* Info Panel */}
        {showInfo && <InfoPanel />}

        {/* Level Selection */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="hidden sm:inline">Select Level</span>
              <span className="sm:hidden">Level</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {[1, 2, 3, 4].map(lvl => (
              <button
                key={lvl}
                onClick={() => changeLevel(lvl)}
                disabled={isTraining}
                className={`p-3 sm:p-4 rounded-lg font-semibold transition-all text-sm sm:text-base ${
                  currentLevel === lvl
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900'
                    : 'bg-white/20 text-white hover:bg-white/30'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <div className="text-xs sm:text-sm">Level {lvl}</div>
                <div className="text-xs mt-1 hidden sm:block">{LEVELS[lvl].name}</div>
              </button>
            ))}
          </div>
        </div>

      {/* Game Grid and Q-Table Section */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
  <div className="lg:col-span-2">
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 sm:p-6">
      {/* Header with level name and BOTH buttons */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <h2 className="text-xl sm:text-2xl font-bold text-white">{level.name}</h2>
        
        {/* Button Group - Add this div to group both buttons */}
        <div className="flex gap-2">
          {/* NEW: "How It Learns" Button */}
          <button
            onClick={() => setShowLearningProcess(true)}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-semibold transition-all text-xs sm:text-sm"
          >
            <Zap className="w-4 h-4" />
            <span className="hidden sm:inline">How It Learns</span>
            <span className="sm:hidden">Learn</span>
          </button>

          {/* EXISTING: "Show Q-Table" Button */}
          <button
            onClick={() => setShowQTable(!showQTable)}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold transition-all text-xs sm:text-sm"
          >
            <Brain className="w-4 h-4" />
            <span className="hidden sm:inline">{showQTable ? 'Show Game' : 'Show Q-Table'}</span>
            <span className="sm:hidden">{showQTable ? 'Game' : 'Q-Table'}</span>
          </button>
        </div>
      </div>
      
      {/* Conditional rendering: Show EITHER Game Grid OR Q-Table */}
      {!showQTable ? (
        <>
          <GameGrid 
            level={level} 
            agentPos={agentPos} 
            showDemo={showDemo} 
            gridSize={gridSize}
          />

          <div className="mt-4 sm:mt-6 flex flex-wrap gap-2 sm:gap-3">
            <button
              onClick={isTraining ? stopTraining : startTraining}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all text-sm sm:text-base ${
                isTraining ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
              } text-white flex-1 sm:flex-none justify-center`}
            >
              {isTraining ? <Pause className="w-4 h-4 sm:w-5 sm:h-5" /> : <Play className="w-4 h-4 sm:w-5 sm:h-5" />}
              <span className="hidden sm:inline">{isTraining ? 'Stop Training' : 'Start Training'}</span>
              <span className="sm:hidden">{isTraining ? 'Stop' : 'Train'}</span>
            </button>
            
            <button
              onClick={showDemo ? stopDemo : runDemo}
              disabled={isTraining || episode === 0}
              className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-all text-sm sm:text-base flex-1 sm:flex-none justify-center"
            >
              <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">{showDemo ? 'Stop Demo' : 'Watch AI Play'}</span>
              <span className="sm:hidden">{showDemo ? 'Stop' : 'Demo'}</span>
            </button>
            
            <button
              onClick={resetAgent}
              disabled={isTraining}
              className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-all text-sm sm:text-base flex-1 sm:flex-none justify-center"
            >
              <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Reset Agent</span>
              <span className="sm:hidden">Reset</span>
            </button>
          </div>
        </>
      ) : (
        /* Q-Table Display when toggled */
        agentRef.current && (
          <div className="min-h-[300px] sm:min-h-[400px]">
            <QTableHeatmap agent={agentRef.current} level={level} gridSize={gridSize} />
          </div>
        )
      )}
    </div>
  </div>

  <div className="space-y-4 sm:space-y-6">
    <StatsPanel 
      episode={episode} totalReward={totalReward} successRate={successRate} 
      avgSteps={avgSteps} agent={agentRef.current} 
    />
    <Legend />
  </div>
</div>

{/* MOVE THIS MODAL OUTSIDE - Place it at the very end before closing main div */}
{/* This should be AFTER the entire grid section, not inside it */}
<LearningProcessModal 
  isOpen={showLearningProcess} 
  onClose={() => setShowLearningProcess(false)} 
/>

        {/* Progress Charts */}
        {rewardHistory.length > 0 && (
          <ProgressCharts rewardHistory={rewardHistory} successHistory={successHistory} />
        )}
      </div>
    </div>
  );
}