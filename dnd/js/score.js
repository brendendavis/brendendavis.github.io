// score.js
import { recalc } from './character.js';

export const setStandardArray = () => {
  const standardArray = { str: 15, dex: 14, con: 13, int: 12, wis: 10, cha: 8 };
  Object.entries(standardArray).forEach(([stat, value]) => {
    const elem = document.getElementById(stat);
    if (elem) elem.value = value;
  });
};

export const pointBuyCost = score => {
  if (score < 8) return 999;
  if (score <= 13) return score - 8;
  if (score === 14) return 6;
  if (score === 15) return 8;
  return 999;
};

export const updatePointBuyRemaining = () => {
  let totalCost = 0;
  ["str", "dex", "con", "int", "wis", "cha"].forEach(ability => {
    const score = parseInt(document.getElementById(ability).value) || 8;
    totalCost += pointBuyCost(score);
  });
  const remaining = 27 - totalCost;
  document.getElementById("remainingPoints").innerText = remaining;
};

export const updateScoreMethod = () => {
  const method = document.getElementById("scoreMethod").value;
  const rollDiceButton = document.getElementById("rollDiceButton");
  const remainingPointsDisplay = document.getElementById("remainingPointsDisplay");

  // Reset visibility and score defaults
  rollDiceButton.style.display = "none";
  remainingPointsDisplay.style.display = "none";
  ["str", "dex", "con", "int", "wis", "cha"].forEach(stat => {
    const elem = document.getElementById(stat);
    if (elem) elem.value = 8;
  });

  switch (method) {
    case "Standard Array":
      setStandardArray();
      break;
    case "Point Buy":
      remainingPointsDisplay.style.display = "block";
      updatePointBuyRemaining();
      break;
    case "Roll Dice":
      rollDiceButton.style.display = "inline-block";
      break;
  }
  recalc();
};