// main.js
import { recalc, saveState } from './character.js';
import { updateScoreMethod } from './score.js';
import { updateRace } from './race.js';
import { updateClass } from './class.js';
import { updateSpellSlots, loadSpellsData, searchSpells } from './spells.js';
import { rollAllAbilities, rollDice } from './dice.js';
import { loadWeaponsData, addWeaponRow } from './weapons.js';
import { debounce } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
  updateScoreMethod();
  updateRace();
  recalc();
  loadSpellsData();
  loadWeaponsData();

  // Attach global input event listener to save state
  document.querySelectorAll('input, select, textarea').forEach(el => {
    el.addEventListener('input', saveState);
  });

  // Level change triggers spell slot updates
  const levelInput = document.getElementById("level");
  if (levelInput) {
    levelInput.addEventListener("change", updateSpellSlots);
    levelInput.addEventListener("input", updateSpellSlots);
  }

  // Dice rolling
  document.getElementById("rollDiceButton").addEventListener("click", rollDice);

  // Score method change event
  const scoreMethodSelect = document.getElementById('scoreMethod');
  scoreMethodSelect.addEventListener('change', () => {
    updateScoreMethod();
    saveState();
  });

  // Spell search with debounce
  document.getElementById('spellSearchInput').addEventListener('input', debounce(searchSpells, 300));
});

// Optionally, expose some functions globally if needed
window.recalc = recalc;
window.rollAbilities = rollAllAbilities;
window.addWeaponRow = addWeaponRow;
window.rollDice = rollDice;
window.updateRace = updateRace;
window.updateClass = updateClass;
