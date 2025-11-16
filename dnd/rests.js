/*
  createCharacterFromForm():
  - Reads the user’s input from the form (name, class, level, ability scores, etc.)
  - Builds or updates the 'character' object
  - Calls setInitialHP if the user is level 1, or sets initial HP + calls levelUp as needed
  - Optionally updates the form fields (like #hitPoints, #hitDice) to reflect changes
*/
function getActiveProfileIdForCharacter() {
  return window.PROFILE_ID || 'dm';
}

function getActiveProfileCharacter(createIfMissing = true) {
  window.profileCharacters = window.profileCharacters || {};
  const profileId = getActiveProfileIdForCharacter();
  if (!window.profileCharacters[profileId] && createIfMissing) {
    window.profileCharacters[profileId] = { profileId };
  }
  return window.profileCharacters[profileId];
}

function reflectVitalsToForm(character) {
  if (!character) return;
  const hpField = document.getElementById('hitPoints');
  const hitDiceField = document.getElementById('hitDice');
  if (hpField && typeof character.currentHitPoints !== 'undefined') {
    hpField.value = character.currentHitPoints;
    dispatchFormUpdate(hpField);
  }
  if (hitDiceField && typeof character.totalHitDice !== 'undefined' && character.hitDieType) {
    hitDiceField.value = `${character.totalHitDice}${character.hitDieType}`;
    dispatchFormUpdate(hitDiceField);
  }
}

function createCharacterFromForm() {
    // 1. Gather user inputs
    const charName = document.getElementById('characterName').value.trim();
    const playerName = document.getElementById('playerName').value.trim();
    const className = document.getElementById('characterClass').value;
    const levelVal = parseInt(document.getElementById('level').value, 10) || 1;
  
    // We'll use the Constitution from the ability score input #con
    // (If you store it in #conMod, then read from that. Adjust as needed.)
    const conScore = parseInt(document.getElementById('con').value, 10) || 10;
    // A simple formula: (conScore - 10) / 2, rounded down
    const conMod = Math.floor((conScore - 10) / 2);
  
    // 2. Construct or update the character object
    //    You can store it in a global var or pass it around
    const character = getActiveProfileCharacter(true);
    window.currentCharacter = character;
  
    // Basic info
    character.name = charName;
    character.playerName = playerName;
    character.className = className;
    character.level = levelVal;
    character.constitutionMod = conMod;
    
    // 3. If the user picked no class, skip the rest
    if (!className) {
      alert("Please select a class first!");
      return;
    }
  
    // If level = 1, do setInitialHP.
    // If >1, do setInitialHP once, then levelUp as needed
    if (levelVal === 1) {
      setInitialHP(character);
    } else {
      // Start from scratch if you prefer:
      setInitialHP(character);
      // Then do extra level-ups
      for (let i = 2; i <= levelVal; i++) {
        levelUp(character);
      }
    }
  
    // 4. Reflect changes in UI if you want
    // e.g. set the #hitPoints and #hitDice fields
    reflectVitalsToForm(character);
  
    alert(`Character updated!\nName: ${character.name}\nClass: ${character.className}\nLevel: ${character.level}\nHP: ${character.currentHitPoints}/${character.maxHitPoints}`);
    
    // You can add more logic for alignment, race, background, etc. here
  }
  
  // Example usage:
  // const myChar = createCharacterFromForm();
  // console.log(myChar); 
  // shortRest(myChar); 
  // longRest(myChar);
  
  
  // A reference map of each class's HD, first-level HP, and average HP gain
  const classHitDiceData = {
    Barbarian:  { hitDie: 'd12', firstLevelHP: 12, averageHP: 7 },
    Bard:       { hitDie: 'd8',  firstLevelHP: 8,  averageHP: 5 },
    Cleric:     { hitDie: 'd8',  firstLevelHP: 8,  averageHP: 5 },
    Druid:      { hitDie: 'd8',  firstLevelHP: 8,  averageHP: 5 },
    Fighter:    { hitDie: 'd10', firstLevelHP: 10, averageHP: 6 },
    Monk:       { hitDie: 'd8',  firstLevelHP: 8,  averageHP: 5 },
    Paladin:    { hitDie: 'd10', firstLevelHP: 10, averageHP: 6 },
    Ranger:     { hitDie: 'd10', firstLevelHP: 10, averageHP: 6 },
    Rogue:      { hitDie: 'd8',  firstLevelHP: 8,  averageHP: 5 },
    Sorcerer:   { hitDie: 'd6',  firstLevelHP: 6,  averageHP: 4 },
    Warlock:    { hitDie: 'd8',  firstLevelHP: 8,  averageHP: 5 },
    Wizard:     { hitDie: 'd6',  firstLevelHP: 6,  averageHP: 4 },
  };
  
  // Initializes HP at 1st level based on class and Constitution
  function setInitialHP(character) {
    const clsData = classHitDiceData[character.className];
    if (!clsData) return;
  
    // Calculate 1st-level HP
    const conMod = character.constitutionMod || 0;
    character.maxHitPoints = clsData.firstLevelHP + conMod;
    character.currentHitPoints = character.maxHitPoints;
  
    character.hitDieType = clsData.hitDie;
    character.level = 1;
    character.totalHitDice = 1;
    character.spentHitDice = 0;
  }
  
  // Level-up logic: roll or take average
  function levelUp(character) {
    const clsData = classHitDiceData[character.className];
    if (!clsData) return;
  
    const doRoll = confirm("Click OK to roll HP, or Cancel to take average?");
    let hpGained = 0;
    if (doRoll) {
      hpGained = rollDie(clsData.hitDie) + (character.constitutionMod || 0);
    } else {
      hpGained = clsData.averageHP + (character.constitutionMod || 0);
    }
    hpGained = Math.max(1, hpGained);
  
    character.maxHitPoints += hpGained;
    character.currentHitPoints += hpGained;
  
    character.level++;
    character.totalHitDice = character.level;
  }
  
  // Short Rest: spend HD to heal
  function shortRest() {
    const character = getActiveProfileCharacter(false);
    if (!character || !character.totalHitDice) {
      alert('Please build your character first.');
      return;
    }
    const availableHD = character.totalHitDice - character.spentHitDice;
    if (availableHD <= 0) {
      alert('No Hit Dice left to spend!');
      return;
    }
  
    // Prompt user how many HD to spend
    let hdToSpend = prompt(`You have ${availableHD} HD remaining. How many do you want to spend?`, '1');
    hdToSpend = parseInt(hdToSpend, 10);
  
    if (isNaN(hdToSpend) || hdToSpend <= 0) {
      alert('Cancelled spending Hit Dice.');
      return;
    }
  
    if (hdToSpend > availableHD) {
      alert(`You only have ${availableHD} HD left! Spending all available HD.`);
      hdToSpend = availableHD;
    }
  
    // For each HD spent
    let totalHealing = 0;
    for (let i = 0; i < hdToSpend; i++) {
      const roll = rollDie(character.hitDieType);
      const healing = roll + character.constitutionMod;
      totalHealing += Math.max(1, healing); // optional: minimum 1
      character.spentHitDice++;
    }
  
    // Apply healing
    character.currentHitPoints += totalHealing;
    if (character.currentHitPoints > character.maxHitPoints) {
      character.currentHitPoints = character.maxHitPoints;
    }
  
    alert(`Short Rest:\nRecovered ${totalHealing} HP.\n` +
          `Now at ${character.currentHitPoints}/${character.maxHitPoints} HP.\n` +
          `HD spent total: ${character.spentHitDice}/${character.totalHitDice}`);
    reflectVitalsToForm(character);
  }
  
  // Long Rest: fully heal, regain half your total HD (rounded down)
  function longRest() {
    const character = getActiveProfileCharacter(false);
    if (!character || !character.totalHitDice) {
      alert('Please build your character first.');
      return;
    }
    // 1) Fully restore HP
    character.currentHitPoints = character.maxHitPoints;
  
    // 2) Regain up to half your total HD
    const halfHD = Math.floor(character.totalHitDice / 2);
    const oldSpent = character.spentHitDice;
    character.spentHitDice = Math.max(0, oldSpent - halfHD);
  
    // 3) (Optional) remove 1 exhaustion
    // if (character.exhaustion && character.exhaustion > 0) {
    //   character.exhaustion--;
    // }
  
    alert(`Long Rest Complete!\nHP is fully restored (${character.currentHitPoints}).\n` +
          `Regained ${oldSpent - character.spentHitDice} HD.\n` +
          `HD left: ${character.totalHitDice - character.spentHitDice}/${character.totalHitDice}`);
    reflectVitalsToForm(character);
  }
  
  // Simple dice roller
function rollDie(dieString) {
    const sides = parseInt(dieString.replace('d',''), 10) || 6;
    return Math.floor(Math.random() * sides) + 1;
  }
  
function dispatchFormUpdate(field) {
  try {
    field.dispatchEvent(new Event('input', { bubbles: true }));
    field.dispatchEvent(new Event('change', { bubbles: true }));
  } catch (err) {
    // ignore if dispatch fails
  }
}
  
