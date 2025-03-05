// dice.js
import { recalc } from './character.js';

export const rollDie = sides => Math.floor(Math.random() * sides) + 1;

export const rollAbility = () => {
  const rolls = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1);
  rolls.sort((a, b) => b - a);
  return rolls.slice(0, 3).reduce((sum, roll) => sum + roll, 0);
};


export const roll4d6DropLowest = () => {
  const rolls = Array.from({ length: 4 }, () => rollDie(6));
  rolls.sort((a, b) => a - b);
  return rolls[1] + rolls[2] + rolls[3];
};

export const rollAllAbilities = () => {
  ["str", "dex", "con", "int", "wis", "cha"].forEach(stat => {
    const elem = document.getElementById(stat);
    if (elem) elem.value = rollAbility();
  });
  recalc();
};

export const rollDice = () => {
  const formula = document.getElementById('diceFormula').value.trim();
  if (!formula) {
    document.getElementById('diceResults').innerHTML = 'Please enter a dice formula.';
    return;
  }

  let total = 0;
  let rollOutput = '';
  const diceRegex = /([+-]?)(\d*)d(\d+)|([+-]?)(\d+)/g;
  let match;

  while ((match = diceRegex.exec(formula)) !== null) {
    if (match[3]) {
      const sign = match[1] === '-' ? -1 : 1;
      const numDice = match[2] ? parseInt(match[2]) : 1;
      const sides = parseInt(match[3]);
      let sum = 0;
      let rolls = [];
      for (let i = 0; i < numDice; i++) {
        const roll = rollDie(sides);
        rolls.push(roll);
        sum += roll;
      }
      total += sign * sum;
      rollOutput += `<div>${sign === 1 ? '' : '-'}${numDice}d${sides} [${rolls.join(', ')}] = ${sum}</div>`;
    } else if (match[5]) {
      const sign = match[4] === '-' ? -1 : 1;
      const value = parseInt(match[5]);
      total += sign * value;
      rollOutput += `<div>${sign === 1 ? '+' : '-'}${value}</div>`;
    }
  }
  rollOutput += `<div><strong>Total: ${total}</strong></div>`;
  document.getElementById('diceResults').innerHTML = rollOutput;
};