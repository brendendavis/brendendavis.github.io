// class.js
export const classData = {
    "Barbarian": { saves: ["str", "con"], hitDice: "1d12", primary: "Strength", casterType: "none" },
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
  
  export const updateClass = () => {
    const cls = document.getElementById("characterClass").value;
    if (classData[cls]) {
      const saves = classData[cls].saves;
      ["str", "dex", "con", "int", "wis", "cha"].forEach(ability => {
        const checkbox = document.getElementById(ability + "SaveProf");
        if (checkbox) checkbox.checked = saves.includes(ability);
      });
      document.getElementById("hitDice").value = classData[cls].hitDice;
      // Optionally, trigger a spell slot update if needed.
      if (typeof window.updateSpellSlots === 'function') {
        window.updateSpellSlots();
      }
    }
  };