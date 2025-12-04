import { useRef, useState } from 'react';
import QLearningAgent from '../core/QLearningAgent.js';

export default function useTraining(gridSize, actionSize) {
  const agentRef = useRef(null);
  const [episode, setEpisode] = useState(0);

  if (!agentRef.current) {
    agentRef.current = new QLearningAgent(gridSize * gridSize, actionSize);
  }

  function resetAgent() {
    agentRef.current = new QLearningAgent(gridSize * gridSize, actionSize);
    setEpisode(0);
  }

  return { agentRef, episode, setEpisode, resetAgent };
}
