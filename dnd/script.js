/*****************************
 *  GLOBAL VARIABLES / SETUP  *
 *****************************/

// Define currentRacialBonus in a broader scope
let currentRacialBonus = { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 };

// Define formatMod globally since it's used in recalc
const formatMod = mod => (mod >= 0 ? `+${mod}` : mod);

let lastClickedItem = null;

// Expose certain functions to global scope
window.rollAllAbilities = rollAllAbilities;
window.addWeaponRow = addWeaponRow;
window.removeEquipmentRow = removeEquipmentRow;
window.addEquipmentRow = addEquipmentRow;
window.rollDice = rollDice;
window.updateRace = updateRace;
window.updateClass = updateClass;
window.rollAllAbilities = rollAllAbilities;
window.updatePointBuyRemaining = updatePointBuyRemaining;
window.hideEquipmentContext = hideEquipmentContext;
window.toggleHandbook = toggleHandbook;
window.updateProgress = updateProgress;
 

/*************************
 *   CORE FUNCTIONALITY  *
 *************************/

/**
 * recalc()
 * Recalculates ability modifiers, saving throws, skills, and spell details.
 */
const recalc = () => {
  const abilities = ["str", "dex", "con", "int", "wis", "cha"];
  const mods = {};

  // Calculate ability modifiers
  abilities.forEach(ability => {
    const baseScore = parseInt(document.getElementById(ability).value) || 10;
    const racialBonus = currentRacialBonus[ability] || 0;
    const totalScore = baseScore + racialBonus;
    mods[ability] = Math.floor((totalScore - 10) / 2);

    const modElement = document.getElementById(ability + "Mod");
    if (modElement) modElement.value = formatMod(mods[ability]);
  });

  // Saving Throws
  const profBonus = parseInt(document.getElementById("proficiencyBonus").value) || 0;
  abilities.forEach(ability => {
    let mod = mods[ability];
    const checkbox = document.getElementById(ability + "SaveProf");
    if (checkbox && checkbox.checked) mod += profBonus;
    const saveElement = document.getElementById(ability + "Save");
    if (saveElement) saveElement.value = formatMod(mod);
  });

  // Skills
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
    const skillProf = document.getElementById(skill + "Prof");
    const isProficient = skillProf && skillProf.checked;
    const total = baseMod + (isProficient ? profBonus : 0);

    const skillElement = document.getElementById(skill);
    if (skillElement) skillElement.value = formatMod(total);
  }

  // Passive Perception
  const perceptionMod = parseInt(document.getElementById("perception").value) || 0;
  const passivePerceptionElement = document.getElementById("passivePerception");
  if (passivePerceptionElement) passivePerceptionElement.value = 10 + perceptionMod;

  // Initiative
  const initiativeElement = document.getElementById("initiative");
  if (initiativeElement) initiativeElement.value = formatMod(mods["dex"]);

  // Spellcasting
  const spellAbility = document.getElementById("spellcastingAbility")?.value;
  const spellMod = mods[spellAbility] || 0;
  const spellSaveDC = 8 + profBonus + spellMod;

  const spellSaveDCElement = document.getElementById("spellSaveDC");
  if (spellSaveDCElement) spellSaveDCElement.value = spellSaveDC;

  const spellAttackBonusElement = document.getElementById("spellAttackBonus");
  if (spellAttackBonusElement) {
    spellAttackBonusElement.value = formatMod(profBonus + spellMod);
  }
};

/**
 * saveState()
 * Saves the form data to localStorage.
 */
const saveState = () => {
  const form = document.querySelector('#characterForm'); 
  if (form) {
    const formData = new FormData(form);
    localStorage.setItem('characterData', JSON.stringify(Object.fromEntries(formData)));
  }
};

// Save changes whenever inputs update
document.querySelectorAll('input, select, textarea').forEach(el => {
  el.addEventListener('input', saveState);
});

/**
 * rollAllAbilities(event)
 * Rolls random ability scores (4d6 drop lowest).
 */
function rollAllAbilities(event) {
  event.preventDefault();
  ["str", "dex", "con", "int", "wis", "cha"].forEach(stat => {
    const elem = document.getElementById(stat);
    if (elem) elem.value = rollAbility();
  });
  recalc();
}

/**
 * rollAbility()
 * Utility for rolling 4d6 dropping the lowest.
 */
function rollAbility() {
  const rolls = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1);
  rolls.sort((a, b) => b - a);
  return rolls.slice(0, 3).reduce((sum, roll) => sum + roll, 0);
}

/**
 * rollDice(event)
 * Parses the dice formula and calculates the result.
 */
function rollDice(event) {
  event.preventDefault(); 
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
        const roll = Math.floor(Math.random() * sides) + 1;
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
}

/**********************************************
 *   LOAD WEAPONS / SPELLS / EQUIPMENT / ETC. *
 **********************************************/

let spellsData = [];
let weaponsData = [];

/**
 * loadSpellsData()
 * Loads spells from spells.json.
 */
function loadSpellsData() {
  fetch("spells.json")
    .then(response => {
      if (!response.ok) throw new Error("Failed to load spells.json");
      return response.json();
    })
    .then(data => {
      spellsData = data;
      console.log("Successfully loaded spells:", spellsData);
    })
    .catch(error => {
      console.error("Error loading spells:", error);
      spellsData = [];
    });
}

/**
 * loadWeaponsData()
 * Loads weapons from weapons.json.
 */
function loadWeaponsData() {
  fetch("weapons.json")
    .then(response => {
      if (!response.ok) throw new Error("Failed to load weapons.json");
      return response.json();
    })
    .then(data => {
      weaponsData = data;
      // Populate the <datalist> for weapons
      const datalist = document.getElementById("weaponsList");
      datalist.innerHTML = weaponsData
        .map(w => `<option value="${w.name}" data-damage="${w.damage}" data-properties="${w.properties}"></option>`)
        .join("");
    })
    .catch(error => console.error("Error loading weapons:", error));
}

/**
 * addWeaponRow()
 * Dynamically adds a new row to the weapons table.
 */
function addWeaponRow() {
  const table = document.getElementById("weaponsTable");
  const row = table.insertRow(-1);
  row.className = "weapon-row";

  const nameCell = row.insertCell(0);
  const nameInput = document.createElement("input");
  nameInput.setAttribute("list", "weaponsList");
  nameInput.setAttribute("placeholder", "Search weapons...");
  nameCell.appendChild(nameInput);

  const attackCell = row.insertCell(1);
  attackCell.innerHTML = '<input type="text" placeholder="+MOD">';

  const damageCell = row.insertCell(2);
  damageCell.innerHTML = '<input type="text" readonly>';

  const propCell = row.insertCell(3);
  const propInput = document.createElement("input");
  propInput.readOnly = true;
  propCell.appendChild(propInput);

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => deleteWeaponRow(deleteButton));
  propCell.appendChild(deleteButton);

  // On name input, fill in damage & properties
  nameInput.addEventListener("input", function () {
    const weapon = weaponsData.find(w => w.name.toLowerCase() === this.value.toLowerCase());
    if (weapon) {
      damageCell.querySelector("input").value = weapon.damage;
      propInput.value = weapon.properties;
    }
  });
}

/**
 * deleteWeaponRow(btn)
 * Removes a weapon row from the table.
 */
function deleteWeaponRow(btn) {
  const row = btn.closest("tr");
  if (row) row.remove();
}

/****************************************************
 *   RACE / CLASS / SPELL SLOTS / POINT BUY LOGIC   *
 ****************************************************/

const racialData = {
  "Dragonborn": {
    abilityBonuses: { str: 2, dex: 0, con: 0, int: 0, wis: 0, cha: 1 },
    speed: 30,
    languages: ["Common", "Draconic"],
    traits: "Breath Weapon, Damage Resistance",
    proficiencies: "None"
  },
  "Drow": {
    abilityBonuses: { str: 0, dex: 2, con: 0, int: 0, wis: 0, cha: 1 },
    speed: 30,
    languages: ["Common", "Elvish"],
    traits: "Darkvision, Fey Ancestry, Drow Magic",
    proficiencies: "None"
  },
  "Dwarf": {
    base: {
      abilityBonuses: { str: 0, dex: 0, con: 2, int: 0, wis: 0, cha: 0 },
      speed: 25,
      languages: ["Common", "Dwarvish"],
      traits: "Darkvision, Dwarven Resilience, Stonecunning",
      proficiencies: "Battleaxe, Handaxe, Light Hammer, Warhammer"
    },
    subraces: {
      "Hill Dwarf": {
        abilityBonuses: { wis: 1 },
        traits: "Dwarven Toughness"
      },
      "Mountain Dwarf": {
        abilityBonuses: { str: 2 },
        traits: "Armor Proficiency"
      }
    }
  },
  "Duergar": {
    abilityBonuses: { str: 2, dex: 0, con: 1, int: 0, wis: 0, cha: 0 },
    speed: 25,
    languages: ["Common", "Dwarvish", "Undercommon"],
    traits: "Darkvision, Duergar Resilience, Duergar Magic",
    proficiencies: "Battleaxe, Handaxe, Light Hammer, Warhammer"
  },
  "Elf": {
    abilityBonuses: { str: 0, dex: 2, con: 0, int: 0, wis: 0, cha: 0 },
    speed: 30,
    languages: ["Common", "Elvish"],
    traits: "Keen Senses, Fey Ancestry, Trance",
    proficiencies: "Longsword, Shortsword, Shortbow, Longbow"
  },
  "Eladrin": {
    abilityBonuses: { str: 0, dex: 2, con: 0, int: 1, wis: 0, cha: 0 },
    speed: 30,
    languages: ["Common", "Elvish"],
    traits: "Fey Step, Darkvision, Fey Ancestry",
    proficiencies: "None"
  },
  "Gnome": {
    abilityBonuses: { str: 0, dex: 0, con: 0, int: 2, wis: 0, cha: 0 },
    speed: 25,
    languages: ["Common", "Gnomish"],
    traits: "Darkvision, Gnome Cunning",
    proficiencies: "None"
  },
  "Svirfneblin": {
    abilityBonuses: { str: 0, dex: 2, con: 0, int: 1, wis: 0, cha: 0 },
    speed: 25,
    languages: ["Undercommon", "Deep Speech"],
    traits: "Superior Darkvision, Gnome Cunning",
    proficiencies: "None"
  },
  "Half-Elf": {
    abilityBonuses: { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 2 },
    speed: 30,
    languages: ["Common", "Elvish"],
    traits: "Darkvision, Fey Ancestry, Skill Versatility",
    proficiencies: "None"
  },
  "Half-Orc": {
    abilityBonuses: { str: 2, dex: 0, con: 1, int: 0, wis: 0, cha: 0 },
    speed: 30,
    languages: ["Common", "Orc"],
    traits: "Darkvision, Relentless Endurance, Savage Attacks",
    proficiencies: "None"
  },
  "Halfling": {
    abilityBonuses: { str: 0, dex: 2, con: 0, int: 0, wis: 0, cha: 0 },
    speed: 25,
    languages: ["Common"],
    traits: "Lucky, Brave, Halfling Nimbleness",
    proficiencies: "None"
  },
  "Ghostwise Halfling": {
    abilityBonuses: { str: 0, dex: 2, con: 0, int: 0, wis: 1, cha: 0 },
    speed: 25,
    languages: ["Common"],
    traits: "Lucky, Brave, Halfling Nimbleness",
    proficiencies: "None"
  },
  "Human": {
    abilityBonuses: { str: 1, dex: 1, con: 1, int: 1, wis: 1, cha: 1 },
    speed: 30,
    languages: ["Common", "One Extra Language"],
    traits: "Versatile",
    proficiencies: "None"
  },
  "Tiefling": {
    abilityBonuses: { str: 0, dex: 0, con: 0, int: 1, wis: 0, cha: 2 },
    speed: 30,
    languages: ["Common", "Infernal"],
    traits: "Darkvision, Hellish Resistance, Infernal Legacy",
    proficiencies: "None"
  },
  "Tiefling (Feral)": {
    abilityBonuses: { str: 0, dex: 2, con: 0, int: 1, wis: 0, cha: 0 },
    speed: 30,
    languages: ["Common", "Infernal"],
    traits: "Darkvision, Hellish Resistance, Infernal Legacy",
    proficiencies: "None"
  },
  "Aasimar": {
    abilityBonuses: { str: 0, dex: 0, con: 0, int: 0, wis: 1, cha: 2 },
    speed: 30,
    languages: ["Common", "Celestial"],
    traits: "Darkvision, Celestial Resistance, Healing Hands",
    proficiencies: "None"
  },
  "Firbolg": {
    abilityBonuses: { str: 2, dex: 0, con: 0, int: 0, wis: 1, cha: 0 },
    speed: 30,
    languages: ["Common", "Elvish"],
    traits: "Firbolg Magic, Hidden Step",
    proficiencies: "None"
  },
  "Goliath": {
    abilityBonuses: { str: 2, dex: 0, con: 1, int: 0, wis: 0, cha: 0 },
    speed: 30,
    languages: ["Common", "Giant"],
    traits: "Stone's Endurance, Powerful Build",
    proficiencies: "None"
  },
  "Kenku": {
    abilityBonuses: { str: 0, dex: 2, con: 0, int: 0, wis: 1, cha: 0 },
    speed: 30,
    languages: ["Common", "Auran"],
    traits: "Mimicry, Kenku Training",
    proficiencies: "None"
  },
  "Lizardfolk": {
    abilityBonuses: { str: 0, dex: 0, con: 2, int: 0, wis: 1, cha: 0 },
    speed: 30,
    languages: ["Common", "Draconic"],
    traits: "Bite, Hold Breath, Hungry Jaws",
    proficiencies: "None"
  },
  "Tabaxi": {
    abilityBonuses: { str: 0, dex: 2, con: 0, int: 0, wis: 0, cha: 1 },
    speed: 30,
    languages: ["Common", "Tabaxi"],
    traits: "Feline Agility, Cat's Claws",
    proficiencies: "None"
  },
  "Triton": {
    abilityBonuses: { str: 1, dex: 0, con: 1, int: 0, wis: 0, cha: 1 },
    speed: 30,
    languages: ["Common", "Primordial"],
    traits: "Amphibious, Control Air and Water",
    proficiencies: "None"
  },
  "Bugbear": {
    abilityBonuses: { str: 2, dex: 1, con: 0, int: 0, wis: 0, cha: 0 },
    speed: 30,
    languages: ["Common", "Goblin"],
    traits: "Long-Limbed, Powerful Build, Surprise Attack",
    proficiencies: "None"
  },
  "Goblin": {
    abilityBonuses: { str: 0, dex: 2, con: 1, int: 0, wis: 0, cha: 0 },
    speed: 30,
    languages: ["Common", "Goblin"],
    traits: "Nimble Escape",
    proficiencies: "None"
  },
  "Hobgoblin": {
    abilityBonuses: { str: 0, dex: 0, con: 2, int: 1, wis: 0, cha: 0 },
    speed: 30,
    languages: ["Common", "Goblin"],
    traits: "Martial Training, Saving Face",
    proficiencies: "None"
  },
  "Kobold": {
    abilityBonuses: { str: 0, dex: 2, con: 0, int: 0, wis: 0, cha: 0 },
    speed: 30,
    languages: ["Common", "Draconic"],
    traits: "Grovel, Cower, and Beg",
    proficiencies: "None"
  },
  "Orc": {
    abilityBonuses: { str: 2, dex: 0, con: 1, int: 0, wis: 0, cha: 0 },
    speed: 30,
    languages: ["Common", "Orc"],
    traits: "Aggressive, Menacing",
    proficiencies: "None"
  },
  "Yuan-Ti Pureblood": {
    abilityBonuses: { str: 0, dex: 0, con: 0, int: 1, wis: 0, cha: 2 },
    speed: 30,
    languages: ["Common", "Infernal"],
    traits: "Innate Spellcasting, Magic Resistance",
    proficiencies: "None"
  },
  "Githyanki": {
    abilityBonuses: { str: 2, dex: 0, con: 0, int: 1, wis: 0, cha: 0 },
    speed: 30,
    languages: ["Common", "Abyssal"],
    traits: "Martial Prodigy, Githyanki Psionics",
    proficiencies: "None"
  },
  "Githzerai": {
    abilityBonuses: { str: 0, dex: 0, con: 0, int: 1, wis: 2, cha: 0 },
    speed: 30,
    languages: ["Common"],
    traits: "Monastic Tradition, Githzerai Discipline",
    proficiencies: "None"
  },
  "Changeling": {
    abilityBonuses: { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 2 },
    speed: 30,
    languages: ["Common"],
    traits: "Shapechanger; choose one ability to increase by +1",
    proficiencies: "None"
  },
  "Kalashtar": {
    abilityBonuses: { str: 0, dex: 0, con: 0, int: 0, wis: 2, cha: 1 },
    speed: 30,
    languages: ["Common"],
    traits: "Dual Mind, Mind Link",
    proficiencies: "None"
  },
  "Shifter": {
    base: {
      abilityBonuses: { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 },
      speed: 30,
      languages: ["Common"],
      traits: "Shifting",
      proficiencies: "None"
    },
    subraces: {
      "Beasthide": {
        abilityBonuses: { str: 1, dex: 0, con: 2, int: 0, wis: 0, cha: 0 },
        traits: "Beasthide features"
      },
      "Longtooth/Swiftstride": {
        abilityBonuses: { str: 1, dex: 2, con: 0, int: 0, wis: 0, cha: 0 },
        traits: "Longtooth/Swiftstride features"
      },
      "Wildhunt": {
        abilityBonuses: { str: 0, dex: 0, con: 2, int: 0, wis: 1, cha: 0 },
        traits: "Wildhunt features"
      }
    }
  },
  "Warforged": {
    abilityBonuses: { str: 0, dex: 0, con: 2, int: 0, wis: 0, cha: 0 },
    speed: 30,
    languages: ["Common"],
    traits: "Integrated Protection; choose one ability to increase by +1",
    proficiencies: "None"
  },
  "Centaur": {
    abilityBonuses: { str: 2, dex: 0, con: 0, int: 0, wis: 1, cha: 0 },
    speed: 40,
    languages: ["Common"],
    traits: "Charge, Hooves",
    proficiencies: "None"
  },
  "Loxodon": {
    abilityBonuses: { str: 0, dex: 0, con: 2, int: 0, wis: 1, cha: 0 },
    speed: 30,
    languages: ["Common", "Loxodon"],
    traits: "Powerful Build, Calm Demeanor",
    proficiencies: "None"
  },
  "Minotaur": {
    abilityBonuses: { str: 2, dex: 0, con: 1, int: 0, wis: 0, cha: 0 },
    speed: 40,
    languages: ["Common"],
    traits: "Horns, Goring Rush",
    proficiencies: "None"
  },
  "Simic Hybrid": {
    abilityBonuses: { str: 0, dex: 0, con: 2, int: 0, wis: 0, cha: 0 },
    speed: 30,
    languages: ["Common"],
    traits: "Animal Enhancements; choose one ability to increase by +1",
    proficiencies: "None"
  },
  "Vedalken": {
    abilityBonuses: { str: 0, dex: 0, con: 0, int: 2, wis: 1, cha: 0 },
    speed: 30,
    languages: ["Common", "Vedalken"],
    traits: "Vedalken Dispassion, Tireless Precision",
    proficiencies: "None"
  },
  "Leonin": {
    abilityBonuses: { str: 1, dex: 0, con: 2, int: 0, wis: 0, cha: 0 },
    speed: 35,
    languages: ["Common"],
    traits: "Roar, Powerful Build",
    proficiencies: "None"
  },
  "Satyr": {
    abilityBonuses: { str: 0, dex: 1, con: 0, int: 0, wis: 0, cha: 2 },
    speed: 35,
    languages: ["Common", "Sylvan"],
    traits: "Mirthful Leaps, Panpipes",
    proficiencies: "None"
  },
  "Tortle": {
    abilityBonuses: { str: 2, dex: 0, con: 0, int: 0, wis: 1, cha: 0 },
    speed: 30,
    languages: ["Common"],
    traits: "Natural Armor, Shell Defense",
    proficiencies: "None"
  },
  "Verdan": {
    abilityBonuses: { str: 0, dex: 2, con: 0, int: 0, wis: 0, cha: 1 },
    speed: 30,
    languages: ["Common"],
    traits: "Adaptive, Resourceful",
    proficiencies: "None"
  }
};

const classData = {
  "Barbarian": { saves: ["str", "con"], hitDice: "1d12", primary: "Strength", casterType: "none" }, // Removed duplicate
  "Bard": { saves: ["dex", "cha"], hitDice: "1d8", primary: "Charisma", casterType: "full" },
  "Cleric": { saves: ["wis", "cha"], hitDice: "1d8", primary: "Wisdom", casterType: "full" },
  "Druid": { saves: ["int", "wis"], hitDice: "1d8", primary: "Wisdom", casterType: "full" },
  "Fighter": { saves: ["str", "con"], hitDice: "1d10", primary: "Strength", casterType: "none" },
  "Monk": { saves: ["str", "dex"], hitDice: "1d8", primary: "Dexterity", casterType: "none" },
  "Paladin": { saves: ["wis", "cha"], hitDice: "1d10", primary: "Charisma", casterType: "half" },
  "Ranger": { saves: ["str", "dex"], hitDice: "1d10", primary: "Dexterity", casterType: "half" },
  "Rogue": { saves: ["dex", "int"], hitDice: "1d8", primary: "Dexterity", casterType: "none" },
  "Sorcerer": { saves: ["con", "cha"], hitDice: "1d6", primary: "Charisma", casterType: "full" },
  "Warlock": { saves: ["wis", "cha"], hitDice: "1d8", primary: "Charisma", casterType: "pact" },
  "Wizard": { saves: ["int", "wis"], hitDice: "1d6", primary: "Intelligence", casterType: "full" }
};


/**
 * updateRace()
 * Updates the UI based on selected race/subrace.
 */
function updateRace() {
  const selectedRace = document.getElementById("race").value;
  const raceInfo = racialData[selectedRace];
  const subraceSelect = document.getElementById("subraceSelect");
  const subraceLabel = document.getElementById("subraceLabel");
  
  let totalBonus = { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 };
  let speed = 30;
  let languages = "Common";
  let traits = "None";
  let proficiencies = "None";

  if (raceInfo) {
    if (raceInfo.hasOwnProperty("base")) {
      // Race has a base + subrace
      subraceSelect.style.display = "inline-block";
      subraceLabel.style.display = "inline-block";
      subraceSelect.innerHTML = "";

      // Populate subrace dropdown
      for (const subrace in raceInfo.subraces) {
        const opt = document.createElement("option");
        opt.value = subrace;
        opt.text = subrace;
        subraceSelect.appendChild(opt);
      }

      // Pick subrace or default to first
      const selectedSubrace = subraceSelect.value || Object.keys(raceInfo.subraces)[0];
      const baseBonuses = raceInfo.base.abilityBonuses;
      const subraceBonuses = raceInfo.subraces[selectedSubrace].abilityBonuses;

      // Merge base + subrace bonuses
      for (const ability in totalBonus) {
        totalBonus[ability] = (baseBonuses[ability] || 0) + (subraceBonuses[ability] || 0);
      }

      // Merge other details
      speed = raceInfo.base.speed;
      languages = raceInfo.base.languages.join(", ");
      traits = raceInfo.base.traits;
      if (raceInfo.subraces[selectedSubrace].traits) {
        traits += "; " + raceInfo.subraces[selectedSubrace].traits;
      }
      proficiencies = raceInfo.base.proficiencies;

    } else {
      // Race with no subrace
      subraceSelect.style.display = "none";
      subraceLabel.style.display = "none";

      totalBonus = raceInfo.abilityBonuses;
      speed = raceInfo.speed;
      languages = raceInfo.languages.join(", ");
      traits = raceInfo.traits;
      proficiencies = raceInfo.proficiencies;
    }
  }

  // Update global racial bonus
  currentRacialBonus = totalBonus;

  // Display the bonuses
  let bonusText = "";
  for (const ability of ["STR", "DEX", "CON", "INT", "WIS", "CHA"]) {
    const key = ability.toLowerCase();
    const bonusValue = totalBonus[key] || 0;
    if (bonusValue !== 0) {
      bonusText += `${ability}: ${formatMod(bonusValue)}  `;
    }
  }
  if (!bonusText) bonusText = "None";

  document.getElementById("racialAbilityBonuses").innerText = bonusText;
  document.getElementById("racialSpeed").innerText = `${speed} ft.`;
  document.getElementById("racialLanguages").innerText = languages;
  document.getElementById("racialTraits").innerText = traits;
  document.getElementById("racialProficiencies").innerText = proficiencies;

  // Show each ability's bonus in table
  for (const ability of ["str", "dex", "con", "int", "wis", "cha"]) {
    document.getElementById(ability + "Bonus").value = formatMod(totalBonus[ability] || 0);
  }

  recalc();
  updateClassFeatures();
}

/**
 * updateClass()
 * Sets saving throw proficiencies and hit dice based on class.
 */
const subclasses = {
  "Barbarian": ["Path of the Berserker", "Path of the Totem Warrior", "Path of the Zealot"],
  "Bard": ["College of Lore", "College of Valor", "College of Glamour"],
  "Cleric": ["Life Domain", "Light Domain", "Trickery Domain"],
  "Druid": ["Circle of the Land", "Circle of the Moon", "Circle of the Shepherd"],
  "Fighter": ["Champion", "Battle Master", "Eldritch Knight"],
  "Monk": ["Way of the Open Hand", "Way of Shadow", "Way of the Four Elements"],
  "Paladin": ["Oath of Devotion", "Oath of Vengeance", "Oath of the Ancients"],
  "Ranger": ["Hunter", "Beast Master", "Fey Wanderer"],
  "Rogue": ["Thief", "Assassin", "Arcane Trickster"],
  "Sorcerer": ["Draconic Bloodline", "Wild Magic", "Divine Soul"],
  "Warlock": ["The Archfey", "The Fiend", "The Great Old One"],
  "Wizard": ["School of Evocation", "School of Necromancy", "School of Illusion"]
};

function updateClass() {
  const classSelect = document.getElementById("characterClass");
  const subclassSelect = document.getElementById("characterSubclass");
  const selectedClass = classSelect.value;

  if (subclasses[selectedClass]) {
    subclassSelect.innerHTML = `<option value="">-- Select Subclass --</option>`;
    subclasses[selectedClass].forEach(subclass => {
      let option = document.createElement("option");
      option.value = subclass;
      option.textContent = subclass;
      subclassSelect.appendChild(option);
    });
    subclassSelect.style.display = "block";
  } else {
    subclassSelect.innerHTML = "";
    subclassSelect.style.display = "none";
  }
  updateClassFeatures();
}


/**
 * Spell slot data, based on caster progression
 */
const spellSlotData = {
  full: {
    1: { 1: 2 },
    2: { 1: 3 },
    3: { 1: 4, 2: 2 },
    4: { 1: 4, 2: 3 },
    5: { 1: 4, 2: 3, 3: 2 }
  },
  half: {
    2: { 1: 2 },
    3: { 1: 3 },
    4: { 1: 3 },
    5: { 1: 4, 2: 2 }
  },
  pact: {
    1: { 1: 1 },
    2: { 1: 2 },
    3: { 2: 2 },
    4: { 2: 2 },
    5: { 3: 2 }
  }
};

/**
 * updateSpellSlots()
 * Updates displayed spell slots based on class/level
 */
function updateSpellSlots() {
  const cls = document.getElementById("characterClass").value;
  const level = parseInt(document.getElementById("level").value) || 1;
  const casterType = classData[cls]?.casterType;
  const container = document.getElementById("spellSlotsContainer");

  container.innerHTML = "";

  // Non-casters
  if (!casterType || casterType === "none") {
    container.textContent = "No spell slots available.";
    return;
  }

  // Determine available slots
  let slots = {};
  if (casterType === "pact") {
    // Warlock "pact" progression
    const slotLevel = level >= 5 ? 3 : level >= 3 ? 2 : 1;
    slots = { [slotLevel]: level >= 2 ? 2 : 1 };
  } else {
    slots = spellSlotData[casterType][Math.min(level, 5)] || {};
  }

  // Render each slot
  Object.entries(slots).forEach(([spellLevel, max]) => {
    const div = document.createElement("div");
    div.className = "spell-slot-card";
    div.innerHTML = `
      <h4>Level ${spellLevel}</h4>
      <input type="number" name="spellSlots-${spellLevel}" 
             value="${max}" min="0" max="${max}" 
             class="spell-slot-input" 
             onchange="updateProgress(${spellLevel}, ${max})">
      <span>/ ${max} slots</span>
      <div class="spell-slot-progress">
        <div class="progress-bar" id="progress-bar-${spellLevel}" 
             style="width: 100%;"></div>
      </div>
    `;
    container.appendChild(div);
  });
}

/**
 * updateProgress(spellLevel, max)
 * Update the progress bar for the relevant slot level.
 */
function updateProgress(spellLevel, max) {
  const input = document.querySelector(`input[name="spellSlots-${spellLevel}"]`);
  const progressBar = document.getElementById(`progress-bar-${spellLevel}`);
  const value = parseInt(input.value) || 0;
  const percentage = (value / max) * 100;
  progressBar.style.width = `${percentage}%`;
}

/*****************************************
 *   ABILITY SCORE METHOD / POINT BUY    *
 *****************************************/

function updateScoreMethod() {
  const method = document.getElementById("scoreMethod").value;
  const rollDiceButton = document.getElementById("rollDiceButton");
  const remainingPointsDisplay = document.getElementById("remainingPointsDisplay");

  rollDiceButton.style.display = "none";
  remainingPointsDisplay.style.display = "none";

  // Reset all abilities to 8
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
}

function setStandardArray() {
  const standardArray = { str: 15, dex: 14, con: 13, int: 12, wis: 10, cha: 8 };
  Object.entries(standardArray).forEach(([stat, value]) => {
    const elem = document.getElementById(stat);
    if (elem) elem.value = value;
  });
}

function updatePointBuyRemaining() {
  let totalCost = 0;
  ["str", "dex", "con", "int", "wis", "cha"].forEach(ability => {
    const score = parseInt(document.getElementById(ability).value) || 8;
    totalCost += pointBuyCost(score);
  });
  const remaining = 27 - totalCost;
  document.getElementById("remainingPoints").innerText = remaining;
}

/**
 * pointBuyCost(score)
 * Returns how many points a given ability score costs in point buy.
 */
function pointBuyCost(score) {
  if (score < 8) return 999; // Not allowed
  if (score <= 13) return score - 8;
  if (score === 14) return 6;
  if (score === 15) return 8;
  return 999; 
}

/************************************
 *   EQUIPMENT / HANDBOOK / TABLES  *
 ************************************/

let equipmentData = [];
let equipmentContextMap = {};
let equipmentDataStore = {};

function toggleHandbook() {
  const handbookContainer = document.getElementById('equipmentHandbookContainer');
  if (handbookContainer.style.display === "none" || handbookContainer.style.display === "") {
    handbookContainer.style.display = "block";
    document.getElementById('toggleHandbookBtn').textContent = "Close Handbook";
  } else {
    handbookContainer.style.display = "none";
    document.getElementById('toggleHandbookBtn').textContent = "Open Equipment Handbook";
  }
}

/**
 * Normalizes item name by removing parentheses & special chars, converting to lowercase
 */
function normalizeEquipmentName(name) {
  return name.replace(/\(.*\)/, "").replace(/[^a-zA-Z0-9\s]/g, "").trim().toLowerCase();
}

/**
 * loadEquips.json, build data store, and process context
 */
document.addEventListener('DOMContentLoaded', function() {
  fetch('equips.json')
    .then(response => response.json())
    .then(data => {
      const equips = data[0];
      const adventuringGear = equips["Adventuring Gear"].table;

      equipmentData = adventuringGear.Item;
      populateEquipmentDatalist(equipmentData);

      // Initialize Equipment Data Store
      initializeEquipmentData(adventuringGear);

      // Process item context from content
      if (equips.content && Array.isArray(equips.content)) {
        equipmentContextMap = processEquipmentContext(equips.content);
      }
    })
    .catch(err => console.error('Error loading equips.json:', err));
});

/**
 * populateEquipmentDatalist(items)
 * Fills <datalist> #equipmentList with items.
 */
function populateEquipmentDatalist(items) {
  const datalist = document.getElementById('equipmentList');
  if (!datalist) return;
  datalist.innerHTML = '';
  items.forEach(item => {
    const option = document.createElement('option');
    option.value = item;
    datalist.appendChild(option);
  });
}

/**
 * initializeEquipmentData(adventuringGear)
 * Builds an object with cost/weight keyed by normalized item name.
 */
function initializeEquipmentData(adventuringGear) {
  // Process Adventuring Gear
  const items = adventuringGear.Item;
  const costs = adventuringGear.Cost;
  const weights = adventuringGear.Weight;

  items.forEach((item, index) => {
    const normalizedName = normalizeEquipmentName(item);
    equipmentDataStore[normalizedName] = {
      cost: costs[index] || "—",
      weight: weights[index] || "—"
    };
  });

  // Process Armor data if present
  if (window.equipsData?.Armor?.["Armor List"]) {
    const armorTypes = ["Light Armor", "Medium Armor", "Heavy Armor", "Shield"];
    armorTypes.forEach(type => {
      const armorTable = window.equipsData.Armor["Armor List"][type]?.table;
      if (armorTable) {
        armorTable.Armor.forEach((armor, index) => {
          const normalizedName = normalizeEquipmentName(armor);
          equipmentDataStore[normalizedName] = {
            cost: armorTable.Cost[index] || "—",
            weight: armorTable.Weight[index] || "—"
          };
        });
      }
    });
  }

  console.log("Updated Equipment Data Store:", equipmentDataStore);
}

/**
 * processEquipmentContext(contentArray)
 * Extracts ***Item.*** from the content and maps them for context info.
 */
function processEquipmentContext(contentArray) {
  const map = {};
  const regex = /\*\*\*(.+?)\.\*\*\*(.*?)(?=\*\*\*|$)/gs;
  contentArray.forEach(text => {
    let match;
    while ((match = regex.exec(text)) !== null) {
      let key = normalizeEquipmentName(match[1]);
      let description = match[2].trim();
      if (key) {
        map[key] = description;
      }
    }
  });
  console.log("Processed Equipment Context Map:", map);
  return map;
}

/**
 * addEquipmentRow()
 * Creates a row in #equipmentTable, allowing selection from #equipmentList
 */
function addEquipmentRow() {
  const tableBody = document.getElementById("equipmentTable").querySelector("tbody");
  const row = document.createElement("tr");

  // Item Name cell
  const nameCell = document.createElement("td");
  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.setAttribute("list", "equipmentList");
  nameInput.className = "equipment-name";
  nameInput.placeholder = "Item Name";
  nameCell.appendChild(nameInput);

  // Cost/Description cell
  const descriptionCell = document.createElement("td");
  const descriptionInput = document.createElement("input");
  descriptionInput.type = "text";
  descriptionInput.className = "equipment-description";
  descriptionInput.placeholder = "Description/Cost";
  descriptionInput.readOnly = true;
  descriptionCell.appendChild(descriptionInput);

  // Quantity cell
  const quantityCell = document.createElement("td");
  const quantityInput = document.createElement("input");
  quantityInput.type = "number";
  quantityInput.placeholder = "Quantity";
  quantityInput.min = "1";
  quantityInput.value = "1";
  quantityCell.appendChild(quantityInput);

  // Weight cell
  const weightCell = document.createElement("td");
  const weightInput = document.createElement("input");
  weightInput.type = "text";
  weightInput.className = "equipment-weight";
  weightInput.placeholder = "Weight";
  weightInput.readOnly = true;
  weightCell.appendChild(weightInput);

  // Equipped cell
  const equippedCell = document.createElement("td");
  equippedCell.style.textAlign = "center";
  const equippedInput = document.createElement("input");
  equippedInput.type = "checkbox";
  equippedInput.title = "Equipped?";
  equippedCell.appendChild(equippedInput);

  // Actions cell
  const actionsCell = document.createElement("td");
  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.textContent = "Remove";
  removeButton.addEventListener("click", function() {
    removeEquipmentRow(removeButton);
  });
  actionsCell.appendChild(removeButton);

  // Append cells to row
  row.appendChild(nameCell);
  row.appendChild(descriptionCell);
  row.appendChild(quantityCell);
  row.appendChild(weightCell);
  row.appendChild(equippedCell);
  row.appendChild(actionsCell);
  tableBody.appendChild(row);
}

/**
 * removeEquipmentRow(button)
 * Deletes the row containing this button from #equipmentTable
 */
function removeEquipmentRow(button) {
  const row = button.closest("tr");
  if (row) row.remove();
}

/*******************************
 *   EQUIPMENT ROW EVENT BIND  *
 ******************************/

// Event delegation for itemName -> show context
document.getElementById('equipmentTable').addEventListener('click', function(event) {
  if (event.target.classList.contains('equipment-name')) {
    const itemName = normalizeEquipmentName(event.target.value);
    if (equipmentContextMap[itemName]) {
      showEquipmentContext(equipmentContextMap[itemName], event.target);
    } else {
      hideEquipmentContext();
    }
  }
});

// Event Delegation for equipment data store (cost/weight)
document.getElementById('equipmentTable').addEventListener('input', function(event) {
  if (event.target.classList.contains('equipment-name')) {
    const row = event.target.closest('tr');
    const itemName = normalizeEquipmentName(event.target.value);
    const descriptionInput = row.querySelector('.equipment-description');
    const weightInput = row.querySelector('.equipment-weight');

    if (equipmentDataStore[itemName]) {
      const itemData = equipmentDataStore[itemName];
      descriptionInput.value = itemData.cost;
      weightInput.value = itemData.weight;
    } else {
      descriptionInput.value = "";
      weightInput.value = "";
    }
  }
});

/*********************************
 *   EQUIPMENT CONTEXT WINDOW    *
 *********************************/

/**
 * showEquipmentContext(details, targetElement)
 * Displays a small context window near the target input.
 */
// Define lastClickedItem in the global scope to ensure it's accessible everywhere


function showEquipmentContext(details, targetElement) {
  const contextDiv = document.getElementById("equipmentContext");
  const contextText = document.getElementById("equipmentContextText");
  
  if (lastClickedItem === targetElement) {
    if (contextDiv.style.display === "block") {
      hideEquipmentContext(false);
    } else {
      contextText.innerHTML = details;
      contextDiv.style.display = "block";
      contextDiv.style.opacity = 1;
    }
  } else {
    hideEquipmentContext(false);
    contextText.innerHTML = details;
    contextDiv.style.display = "block";
    contextDiv.style.opacity = 1;
    lastClickedItem = targetElement;
  }
  
  const rect = targetElement.getBoundingClientRect();
  contextDiv.style.top = `${rect.top + window.scrollY + targetElement.offsetHeight}px`;
  contextDiv.style.left = `${rect.left + window.scrollX}px`;
}

function hideEquipmentContext(resetClickedItem = true) {
  const contextDiv = document.getElementById("equipmentContext");
  contextDiv.style.opacity = 0;
  
  if (resetClickedItem) {
    lastClickedItem = null;
  }
  
  setTimeout(() => {
    contextDiv.style.display = "none";
  }, 10000); // Adjust the delay as needed
}

document.addEventListener('click', function(event) {
  const contextDiv = document.getElementById("equipmentContext");
  if (contextDiv.style.display === "block" && !contextDiv.contains(event.target) && lastClickedItem !== event.target) {
    hideEquipmentContext();
  }
});

/*******************************
 *  SEARCH SPELLS (DEBOUNCED)  *
 ******************************/

function debounce(func, delay) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

// Attach to #spellSearchInput if it exists
document.getElementById('spellSearchInput')?.addEventListener('input', debounce(searchSpells, 300));

/**
 * searchSpells()
 * Filters spellsData by search input & excludes known/prepared spells.
 */
function searchSpells() {
  const searchInput = document.getElementById("spellSearchInput");
  const searchTerm = searchInput.value.toLowerCase().trim();
  const resultsDiv = document.getElementById("spellSearchResults");

  // Save current scroll position
  const scrollY = window.scrollY;
  
  resultsDiv.innerHTML = "";
  if (!searchTerm) return;

  // Gather existing spells from the known and prepared lists
  const existingSpells = new Set(
    [...document.querySelectorAll("#knownSpellsList li, #preparedSpellsList li")]
      .map(li => li.dataset.spellName.toLowerCase())
  );

  // Filter spells
  const matches = spellsData.filter(spell =>
    (spell.name.toLowerCase().includes(searchTerm) ||
     spell.description.toLowerCase().includes(searchTerm)) &&
    !existingSpells.has(spell.name.toLowerCase())
  );

  if (matches.length === 0) return;

  const list = document.createElement("ul");
  matches.forEach(spell => {
    const li = document.createElement("li");
    li.dataset.spellName = spell.name;
    li.innerHTML = `
      <div class="spell-result">
        <strong>${spell.name}</strong> 
        <em>(${spell.level === "cantrip" ? "Cantrip" : "Level " + spell.level})</em> 
        <button type="button" class="add-known">+ Known</button>
        <button type="button" class="add-prepared">+ Prepared</button>
      </div>
      <div class="spell-details">
        <small>${spell.school} • ${spell.range}</small>
        <p>${spell.description.substring(0, 100)}...</p>
      </div>
    `;
    // Add to known spells
    li.querySelector(".add-known").addEventListener("click", (e) => {
      e.preventDefault();
      addSpellToList(spell, "known");
    });
    // Add to prepared spells
    li.querySelector(".add-prepared").addEventListener("click", (e) => {
      e.preventDefault();
      addSpellToList(spell, "prepared");
    });

    list.appendChild(li);
  });

  resultsDiv.appendChild(list);

  // Restore scroll position and refocus
  window.scrollTo(0, scrollY);
  searchInput.focus();
}

/**
 * addSpellToList(spell, listType)
 * Adds a spell to either knownSpellsList or preparedSpellsList.
 */
function addSpellToList(spell, listType) {
  const listId = listType === "known" ? "knownSpellsList" : "preparedSpellsList";
  const list = document.getElementById(listId);

  // Check for duplicates
  if (Array.from(list.children).some(li => li.dataset.spellName.toLowerCase() === spell.name.toLowerCase())) {
    alert(`${spell.name} is already in ${listType} spells!`);
    return;
  }

  // Create new LI
  const li = document.createElement("li");
  li.dataset.spellName = spell.name;
  li.innerHTML = `
    <div class="spell-item">
      ${spell.name} <small>(${spell.level === "cantrip" ? "Cantrip" : "Level " + spell.level})</small>
      <button type="button" class="remove-spell">×</button>
    </div>
  `;

  // Remove button
  li.querySelector(".remove-spell").addEventListener("click", (e) => {
    e.preventDefault();
    li.remove();
    saveState();
  });

  list.appendChild(li);
  saveState();
}

/*****************************************
 *   LOAD ARMOR OPTIONS (NO DUPLICATES)  *
 *****************************************/

// loadArmorOptions: fetches from equips.json, populates #armorSelection
async function loadArmorOptions() {
  try {
    const response = await fetch("equips.json");
    const data = await response.json();

    if (!data[0] || !data[0].Armor || !data[0].Armor["Armor List"]) {
      throw new Error("Armor data not found in JSON.");
    }

    // Clear existing options for both dropdown and datalist
    const armorSelection = document.getElementById("armorSelection");
    armorSelection.innerHTML = `<option value="None" data-ac="10">None</option>`;
    
    const armorDatalist = document.getElementById("armorList");
    if (armorDatalist) armorDatalist.innerHTML = "";

    const armorData = data[0].Armor["Armor List"];
    const addedArmor = new Set();

    // Loop over Light, Medium, and Heavy Armor categories
    for (const category of ["Light Armor", "Medium Armor", "Heavy Armor"]) {
      if (armorData[category]) {
        const armorTable = armorData[category].table;
        // Use armorTable.Item instead of armorTable.Armor
        armorTable.Item.forEach((armor, index) => {
          if (!addedArmor.has(armor)) {
            const acText = armorTable.properties["Armor Class (AC)"][index];
            const acMatch = acText.match(/\d+/);
            const option = document.createElement("option");
            option.value = armor;
            option.dataset.ac = acMatch ? parseInt(acMatch[0]) : 10;
            option.textContent = `${armor} (AC: ${acText})`;
            
            // Add option to the dropdown
            armorSelection.appendChild(option);
            
            // Also clone and add to the datalist if it exists
            if (armorDatalist) {
              const datalistOption = option.cloneNode(true);
              armorDatalist.appendChild(datalistOption);
            }
            
            addedArmor.add(armor);
          }
        });
      }
    }

    // Process Shield separately
    if (armorData["Shield"] && !addedArmor.has("Shield")) {
      const shieldData = armorData["Shield"].table;
      const shieldOption = document.createElement("option");
      shieldOption.value = shieldData.Item[0];
      shieldOption.dataset.ac = "+2";
      shieldOption.textContent = `${shieldData.Item[0]} (AC: ${shieldData.properties["Armor Class (AC)"][0]})`;
      
      armorSelection.appendChild(shieldOption);
      if (armorDatalist) {
        const datalistOption = shieldOption.cloneNode(true);
        armorDatalist.appendChild(datalistOption);
      }
      addedArmor.add("Shield");
    }
  } catch (error) {
    console.error("Error loading armor data:", error);
  }
}



/**
 * updateArmorClass()
 * Calculates final AC based on selected armor + Dex.
 */
function updateArmorClass() {
  const armorSelection = document.getElementById("armorSelection");
  const selectedArmor = armorSelection.options[armorSelection.selectedIndex];

  let baseAC = parseInt(selectedArmor.dataset.ac) || 10; // default if no armor
  let dexModifier = Math.min(2, getDexModifier()); // max +2 for Medium

  // Light armor => full Dex mod
  if (selectedArmor.value.includes("Leather") || selectedArmor.value.includes("Padded")) {
      dexModifier = getDexModifier();
  }

  // Shield => +2 AC
  if (selectedArmor.value === "Shield") {
      baseAC += 2;
  }

  document.getElementById("armorClass").value = baseAC + dexModifier;
}

/**
 * getDexModifier()
 * Utility to read #dex and calculate the Dex mod.
 */
function getDexModifier() {
  let dexScore = parseInt(document.getElementById("dex").value) || 10;
  return Math.floor((dexScore - 10) / 2);
}
function updateArmorClassFromSearch(selectedArmor) {
  // Look for an option in the armor datalist matching the input
  const armorOption = document.querySelector(`#armorList option[value="${selectedArmor}"]`);
  let baseAC = armorOption ? parseInt(armorOption.dataset.ac) : 10;
  
  // Determine which armor category is selected based on its name.
  // You can refine this logic as needed.
  let dexModifier = getDexModifier();
  const lowerArmor = selectedArmor.toLowerCase();

  // Assume heavy armor items do not allow adding Dex modifier.
  if (lowerArmor.includes("chain mail") || lowerArmor.includes("splint") || lowerArmor.includes("plate") || lowerArmor.includes("ring mail")) {
    dexModifier = 0;
  }
  // For medium armor, cap the Dex modifier to +2.
  else if (lowerArmor.includes("hide") || lowerArmor.includes("scale") || lowerArmor.includes("breastplate") || lowerArmor.includes("half plate")) {
    dexModifier = Math.min(2, getDexModifier());
  }
  // Light armor gets the full Dex modifier (e.g., Leather, Padded).

  // If a shield is selected, add +2 to the base AC.
  if (lowerArmor.includes("shield")) {
    baseAC += 2;
  }
  
  document.getElementById("armorClass").value = baseAC + dexModifier;
}

;


/****************************************
 *   CONSOLIDATED DOMContentLoaded INIT *
 ****************************************/

document.addEventListener("DOMContentLoaded", function () {
  // 1) Load base data
  loadArmorOptions();
  loadSpellsData();
  loadWeaponsData();

  // 2) Recalc race, method, AC, etc.
  updateRace();
  updateScoreMethod();
  recalc();
  updatePointBuyRemaining();

  // 3) Hook up level changes -> updateSpellSlots
  const levelInput = document.getElementById("level");
  if (levelInput) {
    levelInput.addEventListener("change", updateSpellSlots);
    levelInput.addEventListener("input", updateSpellSlots);
  }

  // 4) Hook up scoreMethod changes -> updateScoreMethod
  const scoreMethodSelect = document.getElementById('scoreMethod');
  if (scoreMethodSelect) {
    scoreMethodSelect.addEventListener('change', updateScoreMethod);
    scoreMethodSelect.dispatchEvent(new Event('change'));
  }

  // 5) Hook up rollDiceButton
  const rollDiceButton = document.getElementById("rollDiceButton");
  if (rollDiceButton) {
    rollDiceButton.addEventListener("click", rollAllAbilities);
  }

  // 6) Dex changes -> recalc AC
  const dexInput = document.getElementById("dex");
  if (dexInput) {
    dexInput.addEventListener("input", updateArmorClass);
  }

  // 7) Armor selection changes -> updateArmorClass
  const armorSel = document.getElementById("armorSelection");
  if (armorSel) {
    armorSel.addEventListener("change", updateArmorClass);
  }
});
