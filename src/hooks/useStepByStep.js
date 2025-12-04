// Path: src/hooks/useStepByStep.js

import { useState, useRef } from 'react';
import { getStartPos, posToState, getNextPos } from '../utils/gridUtils';
import { REWARDS } from '../constants/rewards';

export const useStepByStep = (level, gridSize, agentRef) => {
  const [isStepMode, setIsStepMode] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [episodeActive, setEpisodeActive] = useState(false);
  const [stepHistory, setStepHistory] = useState([]);
  const [lastQUpdate, setLastQUpdate] = useState(null);
  const [highlightedCell, setHighlightedCell] = useState(null);
  const autoStepIntervalRef = useRef(null);

  const startStepByStepEpisode = () => {
    const startPos = getStartPos(level);
    setEpisodeActive(true);
    setCurrentStep(0);
    setStepHistory([{
      step: 0,
      position: startPos,
      reward: 0,
      totalReward: 0,
      action: null,
      qUpdate: null
    }]);
    return startPos;
  };

  const executeSingleStep = (currentPos, episodeReward) => {
    if (!agentRef.current || !episodeActive) return null;

    const agent = agentRef.current;
    const state = posToState(currentPos.row, currentPos.col, gridSize);
    const action = agent.chooseAction(state);
    const nextPos = getNextPos(currentPos.row, currentPos.col, action, level);
    const nextTile = level.grid[nextPos.row][nextPos.col];
    const reward = REWARDS[nextTile] || -0.1;
    const nextState = posToState(nextPos.row, nextPos.col, gridSize);

    // Store old Q-value before update
    const oldQValue = agent.qTable[state][action];
    
    // Perform Q-learning update
    agent.learn(state, action, reward, nextState);
    
    // Get new Q-value after update
    const newQValue = agent.qTable[state][action];
    const maxNextQ = Math.max(...agent.qTable[nextState]);

    const qUpdateInfo = {
      state,
      action,
      oldQValue: oldQValue.toFixed(3),
      newQValue: newQValue.toFixed(3),
      reward: reward.toFixed(2),
      maxNextQ: maxNextQ.toFixed(3),
      learningRate: agent.learningRate,
      discountFactor: agent.discountFactor,
      tdError: (reward + agent.discountFactor * maxNextQ - oldQValue).toFixed(3)
    };

    setLastQUpdate(qUpdateInfo);
    setHighlightedCell({ row: currentPos.row, col: currentPos.col, state });
    
    const newTotalReward = episodeReward + reward;
    const newStep = currentStep + 1;

    setStepHistory(prev => [...prev, {
      step: newStep,
      position: nextPos,
      reward: reward,
      totalReward: newTotalReward,
      action: action,
      qUpdate: qUpdateInfo,
      tile: nextTile
    }]);

    setCurrentStep(newStep);

    // Check if episode should end
    const episodeEnded = nextTile === 'G' || nextTile === '#';
    if (episodeEnded) {
      setEpisodeActive(false);
      agent.decayEpsilon();
    }

    return {
      nextPos,
      reward,
      newTotalReward,
      episodeEnded,
      success: nextTile === 'G'
    };
  };

  const resetStepByStep = () => {
    setIsStepMode(false);
    setEpisodeActive(false);
    setCurrentStep(0);
    setStepHistory([]);
    setLastQUpdate(null);
    setHighlightedCell(null);
    if (autoStepIntervalRef.current) {
      clearInterval(autoStepIntervalRef.current);
    }
  };

  return {
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
  };
};