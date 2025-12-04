// ============================================================================
// FILE 6: src/utils/colorUtils.js
// ============================================================================

export const getQValueColor = (value) => {
  const max = 100;
  const min = -10;
  const normalized = (value - min) / (max - min);
  const hue = normalized * 120; // 0 (red) to 120 (green)
  return `hsl(${hue}, 70%, 50%)`;
};
