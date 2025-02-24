// race.js
import { state } from './state.js';
import { formatMod } from './utils.js';
import { recalc } from './character.js';

export const racialData = {
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
  // ... include all other races here ...
};

export const updateRace = () => {
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

  // Update shared state
  state.currentRacialBonus = totalBonus;

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