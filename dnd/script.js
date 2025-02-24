// Define currentRacialBonus in a broader scope
let currentRacialBonus = { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 };

// Define formatMod globally since it's used in recalc
const formatMod = mod => (mod >= 0 ? `+${mod}` : mod);

// Define recalc function with null checks
const recalc = () => {
  const abilities = ["str", "dex", "con", "int", "wis", "cha"];
  const mods = {};
  abilities.forEach(ability => {
    const baseScore = parseInt(document.getElementById(ability).value) || 10;
    const racialBonus = currentRacialBonus[ability] || 0;
    const totalScore = baseScore + racialBonus;
    mods[ability] = Math.floor((totalScore - 10) / 2);
    const modElement = document.getElementById(ability + "Mod");
    if (modElement) modElement.value = formatMod(mods[ability]);
  });

  const profBonus = parseInt(document.getElementById("proficiencyBonus").value) || 0;
  abilities.forEach(ability => {
    let mod = mods[ability];
    const checkbox = document.getElementById(ability + "SaveProf");
    if (checkbox && checkbox.checked) mod += profBonus;
    const saveElement = document.getElementById(ability + "Save");
    if (saveElement) saveElement.value = formatMod(mod);
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
    const skillElement = document.getElementById(skill);
    if (skillElement) skillElement.value = formatMod(total);
  }

  const perceptionMod = parseInt(document.getElementById("perception").value) || 0;
  const passivePerceptionElement = document.getElementById("passivePerception");
  if (passivePerceptionElement) passivePerceptionElement.value = 10 + perceptionMod;

  const initiativeElement = document.getElementById("initiative");
  if (initiativeElement) initiativeElement.value = formatMod(mods["dex"]);

  const spellAbility = document.getElementById("spellcastingAbility")?.value;
  const spellMod = mods[spellAbility] || 0;
  const spellSaveDC = 8 + profBonus + spellMod;
  const spellSaveDCElement = document.getElementById("spellSaveDC");
  if (spellSaveDCElement) spellSaveDCElement.value = spellSaveDC;

  const spellAttackBonusElement = document.getElementById("spellAttackBonus");
  if (spellAttackBonusElement) spellAttackBonusElement.value = formatMod(profBonus + spellMod);
};

const saveState = () => {
  const form = document.querySelector('#characterForm'); // Use your form's ID
  if (form) {
    const formData = new FormData(form);
    localStorage.setItem('characterData', JSON.stringify(Object.fromEntries(formData)));
  }
};

document.querySelectorAll('input, select, textarea').forEach(el => {
  el.addEventListener('input', saveState);
});

(() => {
  let spellsData = [];
  let weaponsData = [];

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

  const updateRace = () => {
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
        subraceSelect.style.display = "inline-block";
        subraceLabel.style.display = "inline-block";
        subraceSelect.innerHTML = "";
        for (const subrace in raceInfo.subraces) {
          const opt = document.createElement("option");
          opt.value = subrace;
          opt.text = subrace;
          subraceSelect.appendChild(opt);
        }
        const selectedSubrace = subraceSelect.value || Object.keys(raceInfo.subraces)[0];
        const baseBonuses = raceInfo.base.abilityBonuses;
        const subraceBonuses = raceInfo.subraces[selectedSubrace].abilityBonuses;
        for (const ability in totalBonus) {
          totalBonus[ability] = (baseBonuses[ability] || 0) + (subraceBonuses[ability] || 0);
        }
        speed = raceInfo.base.speed;
        languages = raceInfo.base.languages.join(", ");
        traits = raceInfo.base.traits;
        if (raceInfo.subraces[selectedSubrace].traits) {
          traits += "; " + raceInfo.subraces[selectedSubrace].traits;
        }
        proficiencies = raceInfo.base.proficiencies;
      } else {
        subraceSelect.style.display = "none";
        subraceLabel.style.display = "none";
        totalBonus = raceInfo.abilityBonuses;
        speed = raceInfo.speed;
        languages = raceInfo.languages.join(", ");
        traits = raceInfo.traits;
        proficiencies = raceInfo.proficiencies;
      }
    }
  
    currentRacialBonus = totalBonus;
  
    let bonusText = "";
    for (const ability of ["STR", "DEX", "CON", "INT", "WIS", "CHA"]) {
      const key = ability.toLowerCase();
      const bonusValue = totalBonus[key] || 0;
      if (bonusValue !== 0) {
        bonusText += `${ability}: ${formatMod(bonusValue)}  `;
      }
    }
    if (bonusText === "") bonusText = "None";
  
    document.getElementById("racialAbilityBonuses").innerText = bonusText;
    document.getElementById("racialSpeed").innerText = `${speed} ft.`;
    document.getElementById("racialLanguages").innerText = languages;
    document.getElementById("racialTraits").innerText = traits;
    document.getElementById("racialProficiencies").innerText = proficiencies;
  
    for (const ability of ["str", "dex", "con", "int", "wis", "cha"]) {
      document.getElementById(ability + "Bonus").value = formatMod(totalBonus[ability] || 0);
    }
  
    recalc();
  };

  const updateClass = () => {
    const cls = document.getElementById("characterClass").value;
    if (classData[cls]) {
      const saves = classData[cls].saves;
      ["str", "dex", "con", "int", "wis", "cha"].forEach(ability => {
        const checkbox = document.getElementById(ability + "SaveProf");
        if (checkbox) {
          checkbox.checked = saves.includes(ability);
        }
      });
      document.getElementById("hitDice").value = classData[cls].hitDice;
      updateSpellSlots();
    }
  };

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

  const updateSpellSlots = () => {
    const cls = document.getElementById("characterClass").value;
    const level = parseInt(document.getElementById("level").value) || 1;
    const casterType = classData[cls]?.casterType;
    const container = document.getElementById("spellSlotsContainer");
    container.innerHTML = "";

    if (!casterType || casterType === "none") {
      container.textContent = "No spell slots available.";
      return;
    }

    let slots = {};
    if (casterType === "pact") {
      const slotLevel = level >= 5 ? 3 : level >= 3 ? 2 : 1;
      slots = { [slotLevel]: level >= 2 ? 2 : 1 };
    } else {
      slots = spellSlotData[casterType][Math.min(level, 5)] || {};
    }

    Object.entries(slots).forEach(([spellLevel, max]) => {
      const div = document.createElement("div");
      div.className = "spell-slot-entry";
      div.innerHTML = `
        <label>Level ${spellLevel}:</label>
        <input type="number" name="spellSlots-${spellLevel}" 
               value="${max}" min="0" max="${max}" 
               onchange="saveState()">
        <span>/ ${max}</span>
      `;
      container.appendChild(div);
    });
  };

  const updateScoreMethod = () => {
    const method = document.getElementById("scoreMethod").value;
    const rollDiceButton = document.getElementById("rollDiceButton");
    const remainingPointsDisplay = document.getElementById("remainingPointsDisplay");
    
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

  const setStandardArray = () => {
    const standardArray = { str: 15, dex: 14, con: 13, int: 12, wis: 10, cha: 8 };
    Object.entries(standardArray).forEach(([stat, value]) => {
      const elem = document.getElementById(stat);
      if (elem) elem.value = value;
    });
  };

  const rollAbility = () => {
    const rolls = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1);
    rolls.sort((a, b) => b - a);
    return rolls.slice(0, 3).reduce((sum, roll) => sum + roll, 0);
  };
  
  const rollAllAbilities = (event) => {
    event.preventDefault(); // Prevents page reload
    ["str", "dex", "con", "int", "wis", "cha"].forEach(stat => {
      const elem = document.getElementById(stat);
      if (elem) elem.value = rollAbility();
    });
    recalc();
  };
  
  // Expose to global scope
  window.rollAllAbilities = rollAllAbilities;
  
  // Existing DOMContentLoaded listener
  document.addEventListener("DOMContentLoaded", () => {
    updateRace();
    updateScoreMethod();
    recalc();
    loadSpellsData();
    loadWeaponsData();
  
    const levelInput = document.getElementById("level");
    if (levelInput) {
      levelInput.addEventListener("change", updateSpellSlots);
      levelInput.addEventListener("input", updateSpellSlots);
    }
  
    const scoreMethodSelect = document.getElementById('scoreMethod');
    if (scoreMethodSelect) {
      scoreMethodSelect.addEventListener('change', updateScoreMethod);
      scoreMethodSelect.dispatchEvent(new Event('change'));
    }
  
    const rollDiceButton = document.getElementById("rollDiceButton");
    if (rollDiceButton) {
      rollDiceButton.addEventListener("click", rollAllAbilities); // Using addEventListener
    }
  });

  const pointBuyCost = score => {
    if (score < 8) return 999;
    if (score <= 13) return score - 8;
    if (score === 14) return 6;
    if (score === 15) return 8;
    return 999;
  };

  const updatePointBuyRemaining = () => {
    let totalCost = 0;
    ["str", "dex", "con", "int", "wis", "cha"].forEach(ability => {
      const score = parseInt(document.getElementById(ability).value) || 8;
      totalCost += pointBuyCost(score);
    });
    const remaining = 27 - totalCost;
    document.getElementById("remainingPoints").innerText = remaining;
  };

  const rollDice = (event) => {
    event.preventDefault(); // Prevents form submission
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
};


  const loadWeaponsData = () => {
    fetch("weapons.json")
      .then(response => {
        if (!response.ok) throw new Error("Failed to load weapons.json");
        return response.json();
      })
      .then(data => {
        weaponsData = data;
        const datalist = document.getElementById("weaponsList");
        datalist.innerHTML = weaponsData
          .map(w => `<option value="${w.name}" data-damage="${w.damage}" data-properties="${w.properties}"></option>`)
          .join("");
      })
      .catch(error => console.error("Error loading weapons:", error));
  };

  const addWeaponRow = () => {
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

    nameInput.addEventListener("input", function () {
      const weapon = weaponsData.find(w => w.name.toLowerCase() === this.value.toLowerCase());
      if (weapon) {
        damageCell.querySelector("input").value = weapon.damage;
        propInput.value = weapon.properties;
      }
    });
  };

  const deleteWeaponRow = btn => {
    const row = btn.closest("tr");
    if (row) row.remove();
  };

  const loadSpellsData = () => {
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
  };

  function debounce(func, delay) {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), delay);
    };
  }

  document.getElementById('spellSearchInput')?.addEventListener('input', debounce(searchSpells, 300));

  function searchSpells() {
    const searchTerm = document.getElementById("spellSearchInput").value.toLowerCase().trim();
    const resultsDiv = document.getElementById("spellSearchResults");
    resultsDiv.innerHTML = "";
    
    if (!searchTerm) {
      resultsDiv.textContent = "Please enter a search term";
      return;
    }
    
    const existingSpells = new Set(
      [...document.querySelectorAll("#knownSpellsList li, #preparedSpellsList li")].map(
        li => li.dataset.spellName.toLowerCase()
      )
    );
    
    const matches = spellsData.filter(spell => {
      const nameMatch = spell.name.toLowerCase().includes(searchTerm);
      const descMatch = spell.description.toLowerCase().includes(searchTerm);
      return (nameMatch || descMatch) && !existingSpells.has(spell.name.toLowerCase());
    });
    
    if (matches.length === 0) {
      resultsDiv.textContent = " ";
      return;
    }
    
    const list = document.createElement("ul");
    matches.forEach(spell => {
      const li = document.createElement("li");
      li.dataset.spellName = spell.name;
      // In the searchSpells function, modify the button creation
li.innerHTML = 
'<div class="spell-result">' +
'<strong>' + spell.name + '</strong> ' +
'<em>(' + (spell.level === "cantrip" ? "Cantrip" : "Level " + spell.level) + ')</em> ' +
'<button type="button" class="add-known">+ Known</button> ' +  // Add type="button"
'<button type="button" class="add-prepared">+ Prepared</button>' +  // Add type="button"
'</div>' +
'<div class="spell-details">' +
'<small>' + spell.school + ' • ' + spell.range + '</small>' +
'<p>' + spell.description.substring(0, 100) + '...</p>' +
'</div>';
        
    // Update the event listeners for the buttons
li.querySelector(".add-known").addEventListener("click", (e) => {
  e.preventDefault();
  addSpellToList(spell, "known");
});

li.querySelector(".add-prepared").addEventListener("click", (e) => {
  e.preventDefault();
  addSpellToList(spell, "prepared");
});
    });
    
    resultsDiv.appendChild(list);
  }

 function addSpellToList(spell, listType) {
    const listId = listType === "known" ? "knownSpellsList" : "preparedSpellsList";
    const list = document.getElementById(listId);
    
    if (Array.from(list.children).some(li => li.dataset.spellName.toLowerCase() === spell.name.toLowerCase())) {
        alert(spell.name + " is already in " + listType + " spells!");
        return;
    }
    
    const li = document.createElement("li");
    li.dataset.spellName = spell.name;
    li.innerHTML = 
        '<div class="spell-item">' +
        spell.name + ' <small>(' + 
        (spell.level === "cantrip" ? "Cantrip" : "Level " + spell.level) + 
        ')</small>' +
        '<button type="button" class="remove-spell">×</button>' +
        '</div>';
        
    li.querySelector(".remove-spell").addEventListener("click", (event) => {
        event.preventDefault(); // Prevent form submission
        li.remove();
        saveState(); // Make sure to save state after removing
    });
    list.appendChild(li);
    saveState(); // Save state after adding
}

  window.rollAbilities = () => {
    ["str", "dex", "con", "int", "wis", "cha"].forEach(ability => {
      document.getElementById(ability).value = rollAbility();
    });
    recalc();
  };
  window.addWeaponRow = addWeaponRow;
  window.rollDice = rollDice;
  window.updateRace = updateRace;
  window.updateClass = updateClass;
  window.rollAllAbilities = rollAllAbilities;

  // Consolidated DOMContentLoaded listener
  document.addEventListener("DOMContentLoaded", () => {
    updateRace();
    updateScoreMethod();
    recalc();
    loadSpellsData();
    loadWeaponsData();

    const levelInput = document.getElementById("level");
    if (levelInput) {
      levelInput.addEventListener("change", updateSpellSlots);
      levelInput.addEventListener("input", updateSpellSlots);
    }

    const scoreMethodSelect = document.getElementById('scoreMethod');
    if (scoreMethodSelect) {
      scoreMethodSelect.addEventListener('change', updateScoreMethod);
      scoreMethodSelect.dispatchEvent(new Event('change'));
    }

    const rollDiceButton = document.getElementById("rollDiceButton");
    if (rollDiceButton) {
      rollDiceButton.addEventListener("click", rollAllAbilities);
    }
  });
})();
