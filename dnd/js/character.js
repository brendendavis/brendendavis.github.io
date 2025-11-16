// character.js
import { formatMod } from './utils.js';
import { state } from './state.js';

export const recalc = () => {
  const abilities = ["str", "dex", "con", "int", "wis", "cha"];
  const mods = {};
  abilities.forEach(ability => {
    const baseScore = parseInt(document.getElementById(ability).value) || 10;
    const racialBonus = state.currentRacialBonus[ability] || 0;
    const totalScore = baseScore + racialBonus;
    mods[ability] = Math.floor((totalScore - 10) / 2);
    document.getElementById(ability + "Mod").value = formatMod(mods[ability]);
  });

  const profBonus = parseInt(document.getElementById("proficiencyBonus").value) || 0;
  abilities.forEach(ability => {
    let mod = mods[ability];
    const checkbox = document.getElementById(ability + "SaveProf");
    if (checkbox && checkbox.checked) mod += profBonus;
    document.getElementById(ability + "Save").value = formatMod(mod);
  });

  const skills = {
    acrobatics: "dex",
    animalHandling: "wis",
    arcana: "int",
    athletics: "str",
    deception: "cha",
    history: "int",
    insight: "wis",
    intimidation: "cha",
    investigation: "int",
    medicine: "wis",
    nature: "int",
    perception: "wis",
    performance: "cha",
    persuasion: "cha",
    religion: "int",
    sleightOfHand: "dex",
    stealth: "dex",
    survival: "wis"
  };

  for (const skill in skills) {
    const ability = skills[skill];
    const baseMod = mods[ability];
    const bonus = document.getElementById(skill + "Prof")?.checked ? profBonus : 0;
    const total = baseMod + bonus;
    document.getElementById(skill).value = formatMod(total);
  }

  const perceptionMod = parseInt(document.getElementById("perception").value) || 0;
  document.getElementById("passivePerception").value = 10 + perceptionMod;
  document.getElementById("initiative").value = formatMod(mods["dex"]);

  const spellAbility = document.getElementById("spellcastingAbility").value;
  const spellMod = mods[spellAbility] || 0;
  const spellSaveDC = 8 + profBonus + spellMod;
  document.getElementById("spellSaveDC").value = spellSaveDC;
  document.getElementById("spellAttackBonus").value = formatMod(profBonus + spellMod);
};

export const saveState = () => {
  const formData = new FormData(document.querySelector('form'));
  localStorage.setItem('characterData', JSON.stringify(Object.fromEntries(formData)));
};