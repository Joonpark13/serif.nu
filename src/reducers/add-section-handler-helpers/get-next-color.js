export default function getNextColor(colorUses) {
  // Find the color that hasn't been used yet
  const nextColor = colorUses.findKey(count => count === 0);
  if (nextColor) return nextColor;
  // If all colors have been used, use the color with the least uses
  const leastUsedCount = colorUses.min();
  return colorUses.findKey(count => count === leastUsedCount);
}
