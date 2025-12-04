// ============================================================================
// FILE 4: src/core/QLearningAgent.js
// ============================================================================

export class QLearningAgent {
  constructor(stateSize, actionSize, learningRate = 0.1, discountFactor = 0.95, epsilonDecay = 0.9995) {
    this.stateSize = stateSize;
    this.actionSize = actionSize;
    this.learningRate = learningRate;
    this.discountFactor = discountFactor;
    this.qTable = Array(stateSize).fill(null).map(() => Array(actionSize).fill(0));
    this.epsilon = 1.0;
    this.epsilonMin = 0.01;
    this.epsilonDecay = epsilonDecay;
  }

  chooseAction(state) {
    if (Math.random() < this.epsilon) {
      return Math.floor(Math.random() * this.actionSize);
    }
    return this.qTable[state].indexOf(Math.max(...this.qTable[state]));
  }

  learn(state, action, reward, nextState) {
    const maxNextQ = Math.max(...this.qTable[nextState]);
    const currentQ = this.qTable[state][action];
    this.qTable[state][action] = currentQ + this.learningRate * 
      (reward + this.discountFactor * maxNextQ - currentQ);
  }

  decayEpsilon() {
    this.epsilon = Math.max(this.epsilonMin, this.epsilon * this.epsilonDecay);
  }

  getBestAction(state) {
    return this.qTable[state].indexOf(Math.max(...this.qTable[state]));
  }

  saveToJSON() {
    return {
      qTable: this.qTable,
      epsilon: this.epsilon,
      learningRate: this.learningRate,
      discountFactor: this.discountFactor
    };
  }

  loadFromJSON(data) {
    this.qTable = data.qTable;
    this.epsilon = data.epsilon;
    this.learningRate = data.learningRate;
    this.discountFactor = data.discountFactor;
  }
}
