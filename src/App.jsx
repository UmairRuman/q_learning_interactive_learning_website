// ============================================================================
// FILE 16: src/App.jsx (MAIN FILE) - CORRECTED
// ============================================================================

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Zap, Trophy, Brain } from 'lucide-react';
import { AnimatedBackground } from './components/AnimatedBackground';
import { SettingsPanel } from './components/SettingsPanel';
import { InfoPanel } from './components/InfoPanel';
import { GameGrid } from './components/GameGrid';
import { StatsPanel } from './components/StatsPanel';
import { Legend } from './components/Legend';
import { QTableHeatmap } from './components/QTableHeatmap';
import { ProgressCharts } from './components/ProgressCharts';
import { ControlBar } from './components/ControlBar';
import { QLearningAgent } from './core/QLearningAgent';
import { LEVELS } from './constants/levels';
import { REWARDS } from './constants/rewards';
import { getStartPos, posToState, getNextPos } from './utils/gridUtils';
import { useStepByStep } from './hooks/useStepByStep';
import { StepByStepControls } from './components/StepByStepControls';
import { QUpdateDisplay } from './components/QUpdateDisplay';
import { StepHistory } from './components/StepHistory';

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
  const [demoSpeed, setDemoSpeed] = useState(300);
  
  const [learningRate, setLearningRate] = useState(0.1);
  const [discountFactor, setDiscountFactor] = useState(0.95);
  const [epsilonDecay, setEpsilonDecay] = useState(0.9995);
  const [maxEpisodes, setMaxEpisodes] = useState(5000);
  const [maxStepsPerEpisode, setMaxStepsPerEpisode] = useState(200);

  // Step-by-step mode
  const [stepByStepPos, setStepByStepPos] = useState({ row: 0, col: 0 });
  const [stepByStepReward, setStepByStepReward] = useState(0);
  const [autoStepRunning, setAutoStepRunning] = useState(false);
  const [stepSpeed, setStepSpeed] = useState(500);
  
  const agentRef = useRef(null);
  const trainingIntervalRef = useRef(null);
  const demoIntervalRef = useRef(null);

  // IMPORTANT: Define level and gridSize BEFORE using them in hooks
  const level = LEVELS[currentLevel];
  const gridSize = level.size;
  const stateSize = gridSize * gridSize;
  const actionSize = 4;

  // NOW we can use the hook with level and gridSize defined
  const {
    isStepMode,
    setIsStepMode,
    episodeActive,
    currentStep,
    stepHistory,
    lastQUpdate,
    highlightedCell,
    startStepByStepEpisode,
    executeSingleStep,
    resetStepByStep,
    autoStepIntervalRef
  } = useStepByStep(level, gridSize, agentRef);

  const handleStartStepEpisode = () => {
    const startPos = startStepByStepEpisode();
    setStepByStepPos(startPos);
    setStepByStepReward(0);
    setIsStepMode(true);
  };

  const handleSingleStep = () => {
    const result = executeSingleStep(stepByStepPos, stepByStepReward);
    if (result) {
      setStepByStepPos(result.nextPos);
      setStepByStepReward(result.newTotalReward);
      if (result.episodeEnded) {
        setEpisode(prev => prev + 1);
      }
    }
  };

  const handleAutoStep = () => {
    setAutoStepRunning(true);
    autoStepIntervalRef.current = setInterval(() => {
      const result = executeSingleStep(stepByStepPos, stepByStepReward);
      if (result) {
        setStepByStepPos(result.nextPos);
        setStepByStepReward(result.newTotalReward);
        if (result.episodeEnded) {
          setEpisode(prev => prev + 1);
          setAutoStepRunning(false);
          clearInterval(autoStepIntervalRef.current);
        }
      }
    }, stepSpeed);
  };

  const handleStopAuto = () => {
    setAutoStepRunning(false);
    if (autoStepIntervalRef.current) {
      clearInterval(autoStepIntervalRef.current);
    }
  };

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
    agentRef.current = new QLearningAgent(stateSize, actionSize, learningRate, discountFactor, epsilonDecay);
    setEpisode(0);
    setTotalReward(0);
    setSuccessRate(0);
    setAvgSteps(0);
    setRewardHistory([]);
    setSuccessHistory([]);
  };

  const saveAgent = async () => {
    const data = agentRef.current.saveToJSON();
    const key = `qtable_level${currentLevel}`;
    try {
      await window.storage.set(key, JSON.stringify(data));
      alert('Agent saved successfully! 🎉');
    } catch (error) {
      console.error('Failed to save agent:', error);
      alert('Failed to save agent. Storage might be unavailable.');
    }
  };

  const loadAgent = async () => {
    const key = `qtable_level${currentLevel}`;
    try {
      const result = await window.storage.get(key);
      if (result && result.value) {
        const data = JSON.parse(result.value);
        agentRef.current.loadFromJSON(data);
        alert('Agent loaded successfully! 🚀');
      } else {
        alert('No saved agent found for this level.');
      }
    } catch (error) {
      console.error('Failed to load agent:', error);
      alert('No saved agent found for this level.');
    }
  };

  const changeLevel = (newLevel) => {
  stopTraining();
  stopDemo();
  setCurrentLevel(newLevel);
  
  // IMPORTANT: Get the new level's dimensions
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
  setShowQTable(false); // Hide Q-table when changing levels
  setIsStepMode(false);
  setStepByStepPos(getStartPos(newLevelData));
  setStepByStepReward(0);
  setAgentPos(getStartPos(newLevelData));
  
  // Reset step-by-step mode
  resetStepByStep();
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-8 relative overflow-hidden">
      <AnimatedBackground />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            <Brain className="w-12 h-12 animate-pulse" />
            The Q-Learning Quest
          </h1>
          <p className="text-purple-200 text-lg">Master the Art of Reinforcement Learning</p>
        </div>

        <ControlBar 
          showSettings={showSettings} setShowSettings={setShowSettings}
          showInfo={showInfo} setShowInfo={setShowInfo}
          showQTable={showQTable} setShowQTable={setShowQTable}
          saveAgent={saveAgent} loadAgent={loadAgent}
          isTraining={isTraining} episode={episode}
        />

        {/* Step-by-Step Controls */}
        <StepByStepControls 
          isStepMode={isStepMode}
          episodeActive={episodeActive}
          onStartEpisode={handleStartStepEpisode}
          onSingleStep={handleSingleStep}
          onAutoStep={handleAutoStep}
          onStopAuto={handleStopAuto}
          isAutoRunning={autoStepRunning}
          disabled={isTraining}
        />

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

        {showInfo && <InfoPanel />}

        {/* Level Selection with Show Q-Table button */}
<div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-6">
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
      <Trophy className="w-6 h-6" />
      Select Level
    </h2>
  </div>
  <div className="grid grid-cols-4 gap-3">
    {[1, 2, 3, 4].map(lvl => (
      <button
        key={lvl}
        onClick={() => changeLevel(lvl)}
        disabled={isTraining}
        className={`p-4 rounded-lg font-semibold transition-all ${
          currentLevel === lvl
            ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900'
            : 'bg-white/20 text-white hover:bg-white/30'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <div className="text-sm">Level {lvl}</div>
        <div className="text-xs mt-1">{LEVELS[lvl].name}</div>
      </button>
    ))}
  </div>
</div>

{/* Game Grid and Q-Table Section */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  <div className="lg:col-span-2">
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
      {/* Header with level name and Show Q-Table button */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white">{level.name}</h2>
        <button
          onClick={() => setShowQTable(!showQTable)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold transition-all text-sm"
        >
          <Brain className="w-4 h-4" />
          {showQTable ? 'Show Game' : 'Show Q-Table'}
        </button>
      </div>
      
      {/* Conditional rendering: Show EITHER Game Grid OR Q-Table */}
      {!showQTable ? (
        <>
          <GameGrid 
            level={level} 
            agentPos={isStepMode ? stepByStepPos : agentPos} 
            showDemo={showDemo || isStepMode} 
            gridSize={gridSize}
            highlightedCell={highlightedCell}
          />

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={isTraining ? stopTraining : startTraining}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                isTraining ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
              } text-white`}
            >
              {isTraining ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              {isTraining ? 'Stop Training' : 'Start Training'}
            </button>
            
            <button
              onClick={showDemo ? stopDemo : runDemo}
              disabled={isTraining || episode === 0}
              className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-all"
            >
              <Zap className="w-5 h-5" />
              {showDemo ? 'Stop Demo' : 'Watch AI Play'}
            </button>
            
            <button
              onClick={resetAgent}
              disabled={isTraining}
              className="flex items-center gap-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-all"
            >
              <RotateCcw className="w-5 h-5" />
              Reset Agent
            </button>
          </div>
        </>
      ) : (
        /* Q-Table Display when toggled */
        agentRef.current && (
          <div className="min-h-[400px]">
            <QTableHeatmap agent={agentRef.current} level={level} gridSize={gridSize} />
          </div>
        )
      )}
    </div>
  </div>

  <div className="space-y-6">
    <StatsPanel 
      episode={episode} totalReward={totalReward} successRate={successRate} 
      avgSteps={avgSteps} agent={agentRef.current} 
    />
    <Legend />
    
    {isStepMode && (
      <>
        <QUpdateDisplay lastQUpdate={lastQUpdate} currentStep={currentStep} />
        <StepHistory stepHistory={stepHistory} />
      </>
    )}
  </div>
</div>

        {rewardHistory.length > 0 && (
          <ProgressCharts rewardHistory={rewardHistory} successHistory={successHistory} />
        )}
      </div>
    </div>
  );
}