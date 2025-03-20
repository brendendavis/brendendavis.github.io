// TOP OF FILE (only declare once)
let equipmentData = [
  { name: "Abacus", cost: "2 gp", weight: "2 lb." },
  { name: "Acid (vial)", cost: "25 gp", weight: "1 lb." },
  { name: "Alchemist's fire (flask)", cost: "50 gp", weight: "1 lb." },
  { name: "Amber (gemstone)", cost: "100 gp", weight: "—" },
  { name: "*Ammunition*", cost: "", weight: "" },
  { name: "Arrows (20)", cost: "1 gp", weight: "1 lb." },
  { name: "Blowgun needles (50)", cost: "1 gp", weight: "1 lb." },
  { name: "Crossbow bolts (20)", cost: "1 gp", weight: "1½ lb." },
  { name: "Sling bullets (20)", cost: "4 cp", weight: "1½ lb." },
  { name: "Antitoxin (vial)", cost: "50 gp", weight: "—" },
  { name: "*Arcane focus*", cost: "", weight: "" },
  { name: "Crystal", cost: "10 gp", weight: "1 lb." },
  { name: "Orb", cost: "20 gp", weight: "3 lb." },
  { name: "Rod", cost: "10 gp", weight: "2 lb." },
  { name: "Staff", cost: "5 gp", weight: "4 lb." },
  { name: "Wand", cost: "10 gp", weight: "1 lb." },
  { name: "Backpack", cost: "2 gp", weight: "5 lb." },
  { name: "Ball bearings (bag of 1,000)", cost: "1 gp", weight: "2 lb." },
  { name: "Barrel", cost: "2 gp", weight: "70 lb." },
  { name: "Basket", cost: "4 sp", weight: "2 lb." },
  { name: "Bedroll", cost: "1 gp", weight: "7 lb." },
  { name: "Bell", cost: "1 gp", weight: "—" },
  { name: "Blanket", cost: "5 gp", weight: "3 lb." },
  { name: "Block and tackle", cost: "1 gp", weight: "5 lb." },
  { name: "Book", cost: "25 gp", weight: "5 lb." },
  { name: "Bottle, glass", cost: "2 gp", weight: "2 lb." },
  { name: "Bucket", cost: "5 cp", weight: "2 lb." },
  { name: "Caltrops (bag of 20)", cost: "1 gp", weight: "2 lb." },
  { name: "Candle", cost: "1 cp", weight: "—" },
  { name: "Case, crossbow bolt", cost: "1 gp", weight: "1 lb." },
  { name: "Case, map or scroll", cost: "1 gp", weight: "1 lb." },
  { name: "Chain (10 feet)", cost: "5 gp", weight: "10 lb." },
  { name: "Chalk (1 piece)", cost: "1 cp", weight: "—" },
  { name: "Chest", cost: "5 gp", weight: "25 lb." },
  { name: "Climber's kit", cost: "25 gp", weight: "12 lb." },
  { name: "Clothes, common", cost: "5 sp", weight: "3 lb." },
  { name: "Clothes, costume", cost: "5 gp", weight: "4 lb." },
  { name: "Clothes, fine", cost: "15 gp", weight: "6 lb." },
  { name: "Clothes, traveler's", cost: "2 gp", weight: "4 lb." },
  { name: "Component pouch", cost: "25 gp", weight: "2 lb." },
  { name: "Crowbar", cost: "2 gp", weight: "5 lb." },
  { name: "*Druidic focus*", cost: "", weight: "" },
  { name: "Sprig of mistletoe", cost: "1 gp", weight: "—" },
  { name: "Totem", cost: "1 gp", weight: "—" },
  { name: "Wooden staff", cost: "5 gp", weight: "10 lb." },
  { name: "Yew wand", cost: "5 gp", weight: "3 lb." },
  { name: "Fishing tackle", cost: "1 gp", weight: "—" },
  { name: "Flask or tankard", cost: "2 cp", weight: "1 lb." },
  { name: "Grappling hook", cost: "2 gp", weight: "—" },
  { name: "Hammer", cost: "1 gp", weight: "25 lb." },
  { name: "Hammer, sledge", cost: "2 gp", weight: "7 lb." },
  { name: "Healer's kit", cost: "5 gp", weight: "2 lb." },
  { name: "*Holy symbol*", cost: "", weight: "" },
  { name: "Amulet", cost: "1 sp", weight: "—" },
  { name: "Emblem", cost: "5 sp", weight: "—" },
  { name: "Reliquary", cost: "10 gp", weight: "—" },
  { name: "Holy water (flask)", cost: "5 gp", weight: "—" },
  { name: "Hourglass", cost: "5 gp", weight: "—" },
  { name: "Hunting trap", cost: "5 gp", weight: "25 lb." },
  { name: "Ink (1 ounce bottle)", cost: "2 gp", weight: "1 lb." },
  { name: "Ink pen", cost: "5 cp", weight: "—" },
  { name: "Jug or pitcher", cost: "100 gp", weight: "1 lb." },
  { name: "Ladder (10-foot)", cost: "5 cp", weight: "5 lb." },
  { name: "Lamp", cost: "2 gp", weight: "2 lb." },
  { name: "Lantern, bullseye", cost: "5 sp", weight: "5 lb." },
  { name: "Lantern, hooded", cost: "10 gp", weight: "10 lb." },
  { name: "Lock", cost: "1 gp", weight: "2 lb." },
  { name: "Magnifying glass", cost: "4 gp", weight: "—" },
  { name: "Manacles", cost: "5 sp", weight: "—" },
  { name: "Mess kit", cost: "10 gp", weight: "4 lb." },
  { name: "Mirror, steel", cost: "1 cp", weight: "1/4 lb." },
  { name: "Oil (flask)", cost: "5 gp", weight: "—" },
  { name: "Paper (one sheet)", cost: "5 sp", weight: "—" },
  { name: "Parchment (one sheet)", cost: "1 gp", weight: "—" },
  { name: "Perfume (vial)", cost: "1 cp", weight: "—" },
  { name: "Pick, miner's", cost: "5 gp", weight: "—" },
  { name: "Piton", cost: "5 sp", weight: "—" },
  { name: "Poison, basic (vial)", cost: "10 gp", weight: "—" },
  { name: "Pole (10-foot)", cost: "5 gp", weight: "—" },
  { name: "Pot, iron", cost: "10 gp", weight: "—" },
  { name: "Potion of healing", cost: "50 gp", weight: "1/4 lb." },
  { name: "Pouch", cost: "2 gp", weight: "—" },
  { name: "Quiver", cost: "5 sp", weight: "—" },
  { name: "Ram, portable", cost: "1 cp", weight: "—" },
  { name: "Rations (1 day)", cost: "5 gp", weight: "—" },
  { name: "Robes", cost: "5 sp", weight: "—" },
  { name: "Rope, hempen (50 feet)", cost: "2 gp", weight: "—" },
  { name: "Rope, silk (50 feet)", cost: "5 cp", weight: "—" },
  { name: "Sack", cost: "2 gp", weight: "—" },
  { name: "Scale, merchant's", cost: "0 gp", weight: "3" },
  { name: "Sealing wax", cost: "5 sp", weight: "—" },
  { name: "Shovel", cost: "1 gp", weight: "—" },
  { name: "Signal whistle", cost: "4 gp", weight: "—" },
  { name: "Signet ring", cost: "5 sp", weight: "—" },
  { name: "Soap", cost: "1 gp", weight: "—" },
  { name: "Spellbook", cost: "1 gp", weight: "—" },
  { name: "Spikes, iron (10)", cost: "1 cp", weight: "—" },
  { name: "Spyglass", cost: "5 gp", weight: "—" },
  { name: "Tent, two-person", cost: "5 sp", weight: "—" },
  { name: "Tinderbox", cost: "2 gp", weight: "—" },
  { name: "Torch", cost: "5 cp", weight: "—" },
  { name: "Vial", cost: "1 gp", weight: "—" },
  { name: "Waterskin", cost: "2 sp", weight: "—" },
  { name: "Whetstone", cost: "1 cp", weight: "—" }
]; // Global declaration

// Define alignment and background data globally
const alignmentData = {
  "Lawful Good": "Lawful Good characters believe in honor, truth, and justice. They follow rules, keep their word, and fight against evil. Examples: Paladins, honorable knights, and righteous judges.",
  "Neutral Good": "Neutral Good characters do what's best for others without bias for or against order. They help others according to their needs. Examples: Many healers, benevolent rulers, and helpful commoners.",
  "Chaotic Good": "Chaotic Good characters follow their conscience and help others freely. They believe in goodness but hate restrictions. Examples: Robin Hood-like heroes and free-spirited champions.",
  "Lawful Neutral": "Lawful Neutral characters believe in order above all. They follow rules without concern for good or evil. Examples: Judges who follow the law exactly, organized guild members.",
  "True Neutral": "True Neutral characters seek balance and avoid extremes. They act naturally without prejudice. Examples: Druids, many animals, and those who prefer not to take sides.",
  "Chaotic Neutral": "Chaotic Neutral characters follow their whims and value their own freedom above all else. Examples: Many rogues, free spirits, and unpredictable wanderers.",
  "Lawful Evil": "Lawful Evil characters use structure and rules to get what they want, without care for others' welfare. Examples: Tyrants, disciplined evil commanders, and corrupt officials.",
  "Neutral Evil": "Neutral Evil characters do whatever they can get away with to serve their own interests. Examples: Many evil creatures, mercenaries without scruples.",
  "Chaotic Evil": "Chaotic Evil characters act with arbitrary violence and destructive impulses. They do what they want with no regard for others. Examples: Demons, violent criminals, and destructive monsters."
};

const backgroundData = {
  "Acolyte": "You have spent your life in service to a temple, learning sacred rites and providing sacrifices to the gods. Features: Shelter of the Faithful, proficiency in Insight and Religion.",
  "Charlatan": "You're an expert in manipulation, with a talent for deception and creating false identities. Features: False Identity, proficiency in Deception and Sleight of Hand.",
  "Criminal": "Your criminal past and connections help you survive in the underworld. Features: Criminal Contact, proficiency in Deception and Stealth.",
  "Entertainer": "You thrive in front of an audience, telling stories, music, or drama. Features: By Popular Demand, proficiency in Acrobatics and Performance.",
  "Folk Hero": "You come from a humble background but are destined for greatness. Features: Rustic Hospitality, proficiency in Animal Handling and Survival.",
  "Guild Artisan": "You are a skilled craftsperson, with both talent and trade connections. Features: Guild Membership, proficiency in Insight and Persuasion.",
  "Hermit": "You lived in seclusion, either in a sheltered community or entirely alone. Features: Discovery, proficiency in Medicine and Religion.",
  "Noble": "You understand wealth, power, and privilege from your upper-class upbringing. Features: Position of Privilege, proficiency in History and Persuasion.",
  "Outlander": "You grew up in the wilds, learning to survive far from civilization. Features: Wanderer, proficiency in Athletics and Survival.",
  "Sage": "You spent years learning the lore of the multiverse. Features: Researcher, proficiency in Arcana and History.",
  "Sailor": "You sailed on a seagoing vessel for years, navigating the seas. Features: Ship's Passage, proficiency in Athletics and Perception.",
  "Soldier": "You trained as a soldier, learning warfare and military tactics. Features: Military Rank, proficiency in Athletics and Intimidation.",
  "Urchin": "You grew up on the streets, orphaned and alone. Features: City Secrets, proficiency in Sleight of Hand and Stealth.",
  "City Watch": "You served in the city's guard or police force. Features: Watcher's Eye, proficiency in Athletics and Insight.",
  "Clan Crafter": "You are a member of a dwarf clan known for skilled artisans. Features: Respect of the Stout Folk, proficiency in History and Insight.",
  "Cloistered Scholar": "You lived in a library or university, studying. Features: Library Access, proficiency in History and your choice of Arcana, Nature, or Religion.",
  "Courtier": "You navigated the intrigues of noble society. Features: Court Functionary, proficiency in Insight and Persuasion.",
  "Faction Agent": "You are part of a powerful political organization. Features: Safe Haven, proficiency in Insight and one Intelligence, Wisdom, or Charisma skill.",
  "Far Traveler": "You come from a distant land, making you exotic and unusual. Features: All Eyes on You, proficiency in Insight and Perception.",
  "Gladiator": "You fought in arenas for the entertainment of others. Features: By Popular Demand, proficiency in Acrobatics and Performance.",
  "Guild Merchant": "You are a member of a merchant guild, trading goods. Features: Guild Membership, proficiency in Insight and Persuasion.",
  "Knight": "You are a noble warrior sworn to a code of chivalry. Features: Retainers, proficiency in History and Persuasion.",
  "Mercenary Veteran": "You fought in armies for pay rather than loyalty. Features: Mercenary Life, proficiency in Athletics and Persuasion.",
  "Pirate": "You were a seafaring outlaw with a reputation for danger. Features: Bad Reputation, proficiency in Athletics and Perception.",
  "Spy": "You gathered information through stealth and subterfuge. Features: Spy Contact, proficiency in Deception and Stealth."
};

// Define currentRacialBonus in a broader scope
let currentRacialBonus = { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 };

// Define formatMod globally since it's used in recalc
const formatMod = mod => (mod >= 0 ? `+${mod}` : mod);

let contextDiv; // Declare globally
let contextText;
let lastClickedItem = null;

// Initialize after DOM loads
document.addEventListener('DOMContentLoaded', () => {
  contextDiv = document.getElementById("equipmentContext");
  contextText = document.getElementById("equipmentContextText");
  
  if (!contextDiv || !contextText) {
    console.error("Context elements missing from DOM!");
  }
});
// Expose certain functions to global scope
// Declare once on the global scope—if it's not already defined
window.equipmentDataStore = window.equipmentDataStore || {};
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
 
// Add this near other global function declarations
window.exportCharacterSheet = exportCharacterSheet;

function exportCharacterSheet() {
  // Create a temporary div for the export content
  const exportDiv = document.createElement('div');
  exportDiv.className = 'export-sheet';
  
  // Character Header
  const characterName = document.getElementById('characterName').value || 'Unnamed Character';
  const playerName = document.getElementById('playerName').value || 'Unknown Player';
  const characterClass = document.getElementById('characterClass').value;
  const level = document.getElementById('level').value || '1';
  const race = document.getElementById('race').value;
  const alignment = document.getElementById('alignment').value;
  const background = document.getElementById('background').value;

  // Basic Info Section
  const basicInfo = `
    <div class="export-section">
      <div class="character-header">
        <h1>${characterName}</h1>
        <p>Level ${level} ${race} ${characterClass}</p>
        <p>Player: ${playerName}</p>
        <p>Background: ${background} • Alignment: ${alignment}</p>
      </div>
    </div>
  `;

  // Ability Scores Section
  const abilities = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
  const abilityScores = abilities.map(ability => {
    const score = document.getElementById(ability).value;
    const mod = document.getElementById(ability + 'Mod').value;
    return `<div class="ability-score">
      <strong>${ability.toUpperCase()}</strong>: ${score} (${mod})
    </div>`;
  }).join('');

  // Combat Stats
  const ac = document.getElementById('armorClass').value;
  const hp = document.getElementById('hitPoints').value;
  const initiative = document.getElementById('initiative').value;
  const speed = document.getElementById('speed').value;

  const combatStats = `
    <div class="export-section">
      <h2>Combat Statistics</h2>
      <div class="combat-stats">
        <div class="combat-stat">
          <strong>${ac}</strong>
          <span>Armor Class</span>
        </div>
        <div class="combat-stat">
          <strong>${hp}</strong>
          <span>Hit Points</span>
        </div>
        <div class="combat-stat">
          <strong>${initiative}</strong>
          <span>Initiative</span>
        </div>
        <div class="combat-stat">
          <strong>${speed}</strong>
          <span>Speed (ft)</span>
        </div>
      </div>
    </div>
  `;

  // Weapons Section
  const weaponsTable = document.getElementById('weaponsTable');
  const weapons = Array.from(weaponsTable.querySelectorAll('tr')).slice(1).map(row => {
    const cells = row.querySelectorAll('td');
    if (cells.length >= 3) {
      const name = cells[0].querySelector('input')?.value || '';
      const bonus = cells[1].querySelector('input')?.value || '';
      const damage = cells[2].querySelector('input')?.value || '';
      return `<div class="weapon-entry">
        <strong>${name}</strong> | Attack: ${bonus} | Damage: ${damage}
      </div>`;
    }
    return '';
  }).join('');

  const weaponsSection = `
    <div class="export-section">
      <h2>Weapons</h2>
      ${weapons || '<p>No weapons equipped</p>'}
    </div>
  `;

  // Spells Section
  const knownSpellsList = document.getElementById('knownSpellsList');
  const preparedSpellsList = document.getElementById('preparedSpellsList');
  
  const knownSpells = Array.from(knownSpellsList?.querySelectorAll('li') || [])
    .map(li => li.textContent.replace('Remove', '').trim())
    .join(', ');
  
  const preparedSpells = Array.from(preparedSpellsList?.querySelectorAll('li') || [])
    .map(li => li.textContent.replace('Remove', '').trim())
    .join(', ');

  // Get spell slots
  const spellSlotsContainer = document.getElementById('spellSlotsContainer');
  const spellSlots = Array.from(spellSlotsContainer?.querySelectorAll('.spell-slot-level') || [])
    .map(level => {
      const levelNum = level.querySelector('span')?.textContent;
      const total = level.querySelector('input[type="number"]')?.value || '0';
      return `Level ${levelNum}: ${total}`;
    }).join(', ');

  const spellsSection = `
    <div class="export-section">
      <h2>Spellcasting</h2>
      <div class="spells-section">
        <h3>Spell Slots</h3>
        <div class="spell-slots">
          ${spellSlots ? spellSlots.split(', ').map(slot => 
            `<div class="spell-slot-item">${slot}</div>`
          ).join('') : 'No spell slots available'}
        </div>
        <h3>Known Spells</h3>
        <p>${knownSpells || 'None'}</p>
        <h3>Prepared Spells</h3>
        <p>${preparedSpells || 'None'}</p>
      </div>
    </div>
  `;

  // Skills Section
  const skills = {
    acrobatics: 'DEX', animalHandling: 'WIS', arcana: 'INT',
    athletics: 'STR', deception: 'CHA', history: 'INT',
    insight: 'WIS', intimidation: 'CHA', investigation: 'INT',
    medicine: 'WIS', nature: 'INT', perception: 'WIS',
    performance: 'CHA', persuasion: 'CHA', religion: 'INT',
    sleightOfHand: 'DEX', stealth: 'DEX', survival: 'WIS'
  };

  const skillsList = Object.entries(skills).map(([skill, ability]) => {
    const value = document.getElementById(skill)?.value || '+0';
    const isProficient = document.getElementById(skill + 'Prof')?.checked;
    return `<div class="skill">
      <span>${skill.replace(/([A-Z])/g, ' $1').trim()}</span>: ${value} ${isProficient ? '(P)' : ''}
    </div>`;
  }).join('');

  // Equipment Section
  const equipmentTable = document.getElementById('equipmentTable');
  const equipment = Array.from(equipmentTable.querySelectorAll('tbody tr')).map(row => {
    const name = row.querySelector('.equipment-name')?.value || '';
    const quantity = row.querySelector('input[type="number"]')?.value || '';
    return `${quantity}x ${name}`;
  }).join(', ');

  // Personality and Bio Section
  const physicalTraits = document.getElementById('physicalTraits')?.value || '';
  const personalityTraits = document.getElementById('personalityTraits')?.value || '';
  const backstory = document.getElementById('backstory')?.value || '';
  const notes = document.getElementById('featuresTraits')?.value || '';

  const personalitySection = `
    <div class="export-section">
      <h2>Personality & Biography</h2>
      <div class="bio-section">
        <h3>Physical Features</h3>
        <p>${physicalTraits || 'None recorded'}</p>
      </div>
      <div class="bio-section">
        <h3>Personality Traits, Ideals, Bonds, Flaws</h3>
        <p>${personalityTraits || 'None recorded'}</p>
      </div>
      <div class="bio-section">
        <h3>Backstory & Allies/Organizations</h3>
        <p>${backstory || 'None recorded'}</p>
      </div>
      <div class="bio-section">
        <h3>Notes</h3>
        <p>${notes || 'None recorded'}</p>
      </div>
    </div>
  `;

  // Combine all sections
  exportDiv.innerHTML = `
    <style>
      .export-sheet {
        font-family: 'Helvetica', Arial, sans-serif;
        max-width: 800px;
        margin: 20px auto;
        padding: 30px;
        background: #fff;
        color: #2c3e50;
      }
      .export-section {
        margin-bottom: 25px;
        border-bottom: 2px solid #ecf0f1;
        padding-bottom: 20px;
      }
      .export-section h1 {
        color: #2c3e50;
        font-size: 32px;
        margin-bottom: 10px;
        text-align: center;
        border-bottom: 3px solid #3498db;
        padding-bottom: 10px;
      }
      .export-section h2 {
        color: #34495e;
        font-size: 24px;
        margin: 20px 0 15px;
        padding-bottom: 8px;
        border-bottom: 2px solid #bdc3c7;
      }
      .export-section h3 {
        color: #7f8c8d;
        font-size: 18px;
        margin: 15px 0 10px;
      }
      .ability-score {
        display: inline-block;
        margin: 10px 20px 10px 0;
        padding: 10px 15px;
        background: #f8f9fa;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        min-width: 100px;
        text-align: center;
      }
      .ability-score strong {
        display: block;
        color: #2980b9;
        font-size: 18px;
      }
      .skill {
        display: inline-block;
        width: 45%;
        margin-bottom: 8px;
        padding: 5px 10px;
        background: #f8f9fa;
        border-radius: 3px;
      }
      .weapon-entry {
        margin-bottom: 12px;
        padding: 8px 12px;
        background: #f8f9fa;
        border-left: 4px solid #3498db;
        border-radius: 0 4px 4px 0;
      }
      .bio-section {
        margin-bottom: 20px;
        background: #f8f9fa;
        padding: 15px;
        border-radius: 5px;
      }
      .bio-section h3 {
        color: #2980b9;
        margin-bottom: 10px;
        font-size: 16px;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
      .bio-section p {
        white-space: pre-wrap;
        margin: 0;
        padding: 10px;
        background: #fff;
        border-radius: 3px;
        line-height: 1.6;
      }
      .character-header {
        text-align: center;
        margin-bottom: 30px;
      }
      .character-header p {
        margin: 5px 0;
        font-size: 16px;
        color: #7f8c8d;
      }
      .combat-stats {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        margin: 20px 0;
      }
      .combat-stat {
        text-align: center;
        padding: 10px 20px;
        background: #f8f9fa;
        border-radius: 5px;
        min-width: 100px;
        margin: 5px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }
      .combat-stat strong {
        display: block;
        color: #e74c3c;
        font-size: 20px;
      }
      .spells-section {
        background: #f8f9fa;
        padding: 15px;
        border-radius: 5px;
        margin-top: 20px;
      }
      .spell-slots {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-bottom: 15px;
      }
      .spell-slot-item {
        background: #fff;
        padding: 8px 12px;
        border-radius: 4px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      }
      .equipment-list {
        columns: 2;
        column-gap: 20px;
        margin: 10px 0;
      }
      .equipment-item {
        break-inside: avoid;
        margin-bottom: 8px;
        padding: 5px 0;
      }
      
      .spell-handbook {
        padding: 20px;
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }

      .class-section {
        margin-bottom: 30px;
        padding: 20px;
        background: #f8f9fa;
        border-radius: 6px;
        border-left: 4px solid #3498db;
      }

      .class-section h3 {
        color: #2c3e50;
        margin-bottom: 15px;
        padding-bottom: 8px;
        border-bottom: 2px solid #bdc3c7;
      }

      .class-section h4 {
        color: #34495e;
        margin: 15px 0 8px;
        font-size: 1.1em;
      }

      .spell-progression-table {
        width: 100%;
        border-collapse: collapse;
        margin: 15px 0;
        background: #fff;
        border-radius: 4px;
        overflow: hidden;
      }

      .spell-progression-table th,
      .spell-progression-table td {
        padding: 8px 12px;
        text-align: center;
        border: 1px solid #e1e1e1;
      }

      .spell-progression-table th {
        background: #3498db;
        color: #fff;
        font-weight: 600;
      }

      .spell-progression-table tr:nth-child(even) {
        background: #f8f9fa;
      }

      .spell-progression-table tr:hover {
        background: #edf2f7;
      }

      .spells-known,
      .cantrips-known,
      .spells-prepared {
        background: #fff;
        padding: 12px;
        margin: 10px 0;
        border-radius: 4px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.05);
      }

      .spells-known h4,
      .cantrips-known h4,
      .spells-prepared h4 {
        color: #2980b9;
        margin-bottom: 5px;
      }

      #spellHandbookContainer {
        display: none;
        margin: 20px 0;
        padding: 20px;
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }

      #toggleSpellHandbookBtn {
        background: #3498db;
        color: #fff;
        border: none;
        padding: 10px 20px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 1em;
        margin: 10px 0;
        transition: background 0.3s ease;
      }

      #toggleSpellHandbookBtn:hover {
        background: #2980b9;
      }
    </style>
    ${basicInfo}
    <div class="export-section">
      <h2>Ability Scores</h2>
      ${abilityScores}
    </div>
    ${combatStats}
    ${weaponsSection}
    ${spellsSection}
    <div class="export-section">
      <h2>Skills</h2>
      ${skillsList}
    </div>
    <div class="export-section">
      <h2>Equipment</h2>
      <div class="equipment-list">
        ${equipment.split(', ').map(item => 
          `<div class="equipment-item">• ${item}</div>`
        ).join('')}
      </div>
    </div>
    ${personalitySection}
  `;

  // PDF Generation options
  const opt = {
    margin: 1,
    filename: `${characterName.replace(/\s+/g, '_')}_character_sheet.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

  // Generate PDF
  html2pdf().set(opt).from(exportDiv).save();
}

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

function loadWeaponsData() {
  fetch("weapons.json")
    .then(response => {
      if (!response.ok) throw new Error("Failed to load weapons.json");
      return response.json();
    })
    .then(data => {
      weaponsData = data;
      // Populate the <datalist> with options for each weapon
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

  // 1) Weapon name cell with autocomplete
  const nameCell = row.insertCell(0);
  const nameInput = document.createElement("input");
  nameInput.setAttribute("list", "weaponsList");
  nameInput.setAttribute("placeholder", "Search weapons...");
  nameCell.appendChild(nameInput);

  // 2) Attack bonus cell
  const attackCell = row.insertCell(1);
  attackCell.innerHTML = '<input type="text" placeholder="+MOD">';

  // 3) Damage cell (read-only)
  const damageCell = row.insertCell(2);
  damageCell.innerHTML = '<input type="text" readonly>';

  // 4) Properties cell with auto-filled value and a delete button
  const propCell = row.insertCell(3);
  const propInput = document.createElement("input");
  propInput.readOnly = true;
  propCell.appendChild(propInput);

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => deleteWeaponRow(deleteButton));
  propCell.appendChild(deleteButton);
  
  // Create a button to roll the attack
  const rollAttackBtn = document.createElement("button");
  rollAttackBtn.type = "button"; // prevent form submission
  rollAttackBtn.textContent = "Roll Attack";
  rollAttackBtn.addEventListener("click", function() {
    // We will define rollWeaponAttack below
    // The attack bonus is in the second cell's input
    const attackInputValue = attackCell.querySelector("input").value;
    rollWeaponAttack(attackInputValue);
  });
  propCell.appendChild(rollAttackBtn);
  
  // Create a button to roll damage
  const rollDamageBtn = document.createElement("button");
  rollDamageBtn.type = "button"; // prevent form submission
  rollDamageBtn.textContent = "Roll Damage";
  rollDamageBtn.addEventListener("click", function() {
    // The damage is in the third cell's input
    const damageInputValue = damageCell.querySelector("input").value;
    rollWeaponDamage(damageInputValue);
  });
  propCell.appendChild(rollDamageBtn);

  // Event: When a weapon is selected, automatically fill in its damage and properties.
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

// Ensure that the weapons data is loaded once the DOM is fully ready.
document.addEventListener("DOMContentLoaded", loadWeaponsData);

function rollWeaponAttack(attackBonusString) {
  // if "+3" or whatever was typed
  let bonus = attackBonusString.trim();
  if (!bonus) {
    bonus = "+0";
  } else if(!bonus.startsWith("+") && !bonus.startsWith("-")) {
    bonus = "+" + bonus;
  }

  // Build formula like "1d20+3"
  const formula = "1d20" + bonus;
  rollDiceWithFormula(formula, "Attack Roll");
}

function rollWeaponDamage(damageDiceString) {
  // e.g. "1d8+2"
  let dice = damageDiceString.trim();
  if(!dice) {
    dice = "1d6"; // fallback
  }
  rollDiceWithFormula(dice, "Damage Roll");
}

function rollDiceWithFormula(diceFormula, label) {
  const diceFormulaInput = document.getElementById("diceFormula");
  diceFormulaInput.value = diceFormula;

  const diceResultsDiv = document.getElementById("diceResults");
  const attackDamageResultsDiv = document.getElementById("attackDamageResults");
// If no such element, do nothing (in case user didn't add it)
  if (attackDamageResultsDiv) {
    // Create a new div for this result
    const resultEl = document.createElement("div");
    resultEl.innerHTML = `<strong>${label}:</strong> Rolling <em>${diceFormula}</em>...`;

    // Append to the results container
    attackDamageResultsDiv.appendChild(resultEl);

    // Automatically remove after, e.g., 10 seconds
    setTimeout(() => {
      resultEl.remove();
    }, 10000);
  }
  diceResultsDiv.innerHTML += `<div><strong>${label}:</strong> Rolling <em>${diceFormula}</em>...</div>`;

  // Reuse the existing rollDice function
  rollDice({ preventDefault: () => {} });
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
  const regex = /\*\*\*(.+?)\*\*\*(.*?)(?=\*\*\*|$)/gs; // Removed the \. after .+?
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
// Updated Equipment Table Click Handler
document.getElementById('equipmentTable').addEventListener('click', function(event) {
  const target = event.target.closest('input.equipment-name');
  if (!target) return;
  
  const itemName = normalizeEquipmentName(target.value);
  if (!itemName) return;

  if (equipmentContextMap[itemName]) {
    showEquipmentContext(equipmentContextMap[itemName], target);
  } else {
    hideEquipmentContext();
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
  if (!contextDiv || !contextText) return; // Safety check

  console.log("Showing context for:", targetElement.value);
  
  // Position calculations
  const rect = targetElement.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const maxLeft = viewportWidth - contextDiv.offsetWidth - 20;

  contextDiv.style.top = `${rect.top + window.scrollY + targetElement.offsetHeight}px`;
  contextDiv.style.left = `${Math.min(rect.left + window.scrollX, maxLeft)}px`;

  // Content update
  contextText.innerHTML = details;
  contextDiv.style.display = "block";
  contextDiv.style.opacity = 1;
  lastClickedItem = targetElement;
}

function hideEquipmentContext(resetClickedItem = true) {
  if (!contextDiv) return; // Safety check
  
  contextDiv.style.opacity = 0;
  if (resetClickedItem) lastClickedItem = null;
  
  setTimeout(() => {
    contextDiv.style.display = "none";
  }, 300);
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
  e.preventDefault(); // Prevent default action
  addSpellToList(spell, "known");
});

// Add to prepared spells
li.querySelector(".add-prepared").addEventListener("click", (e) => {
  e.preventDefault(); // Prevent default action
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

    // Clear existing options for armor dropdown
    const armorSelection = document.getElementById("armorSelection");
    const shieldSelection = document.getElementById("shieldSelection");
    armorSelection.innerHTML = `<option value="None" data-ac="10">None</option>`;
    shieldSelection.innerHTML = `<option value="None" data-ac="0">None</option>`;
    
    const armorDatalist = document.getElementById("armorList");
    if (armorDatalist) armorDatalist.innerHTML = "";

    const armorData = data[0].Armor["Armor List"];
    const addedArmor = new Set();

    // Loop over Light, Medium, and Heavy Armor categories
    for (const category of ["Light Armor", "Medium Armor", "Heavy Armor"]) {
      if (armorData[category]) {
        const armorTable = armorData[category].table;
        armorTable.Item.forEach((armor, index) => {
          if (!addedArmor.has(armor)) {
            const acText = armorTable.properties["Armor Class (AC)"][index];
            const acMatch = acText.match(/\d+/);
            const option = document.createElement("option");
            option.value = armor;
            option.dataset.ac = acMatch ? parseInt(acMatch[0]) : 10;
            option.textContent = `${armor} (AC: ${acText})`;
            
            armorSelection.appendChild(option);
            
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
    if (armorData["Shield"]) {
      const shieldData = armorData["Shield"].table;
      const shieldOption = document.createElement("option");
      shieldOption.value = shieldData.Item[0];
      shieldOption.dataset.ac = 2; // Shields provide +2 AC
      shieldOption.textContent = `${shieldData.Item[0]} (AC: +2)`;
      
      shieldSelection.appendChild(shieldOption);
    }
  } catch (error) {
    console.error("Error loading armor data:", error);
  }
}

function updateArmorClass() {
  const armorSelection = document.getElementById("armorSelection");
  const shieldSelection = document.getElementById("shieldSelection");
  const selectedArmor = armorSelection.options[armorSelection.selectedIndex];
  const selectedShield = shieldSelection.options[shieldSelection.selectedIndex];

  let baseAC = parseInt(selectedArmor.dataset.ac) || 10; // default if no armor
  let dexModifier = Math.min(2, getDexModifier()); // max +2 for Medium
  let shieldBonus = parseInt(selectedShield.dataset.ac) || 0;

  // Light armor => full Dex mod
  if (selectedArmor.value.includes("Leather") || selectedArmor.value.includes("Padded")) {
      dexModifier = getDexModifier();
  }
  // Heavy armor => no Dex mod
  else if (selectedArmor.value.includes("Chain Mail") || selectedArmor.value.includes("Splint") || 
           selectedArmor.value.includes("Plate") || selectedArmor.value.includes("Ring Mail")) {
    dexModifier = 0;
  }

  document.getElementById("armorClass").value = baseAC + dexModifier + shieldBonus;
}

/**
 * getDexModifier()
 * Utility to read #dex and calculate the Dex mod.
 */
function getDexModifier() {
  let dexScore = parseInt(document.getElementById("dex").value) || 10;
  return Math.floor((dexScore - 10) / 2);
}

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

  // Add event listeners for alignment and background dropdowns
  const alignmentSelect = document.getElementById("alignment");
  const backgroundSelect = document.getElementById("background");

  if (alignmentSelect) {
    alignmentSelect.addEventListener("change", showAlignmentContext);
  }

  if (backgroundSelect) {
    backgroundSelect.addEventListener("change", showBackgroundContext);
  }

  // Add event listener for spell handbook button
  const spellHandbookBtn = document.getElementById('toggleSpellHandbookBtn');
  if (spellHandbookBtn) {
    spellHandbookBtn.addEventListener('click', toggleSpellHandbook);
  }
});

// Add these functions to handle context display
function showAlignmentContext(event) {
  const alignment = event.target.value;
  if (alignment && alignmentData[alignment]) {
    showContext(alignmentData[alignment], event.target);
  } else {
    hideEquipmentContext();
  }
}

function showBackgroundContext(event) {
  const background = event.target.value;
  if (background && backgroundData[background]) {
    showContext(backgroundData[background], event.target);
  } else {
    hideEquipmentContext();
  }
}

function showContext(details, targetElement) {
  if (!contextDiv || !contextText) return;

  const rect = targetElement.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const maxLeft = viewportWidth - contextDiv.offsetWidth - 20;

  contextDiv.style.top = `${rect.top + window.scrollY + targetElement.offsetHeight}px`;
  contextDiv.style.left = `${Math.min(rect.left + window.scrollX, maxLeft)}px`;

  contextText.innerHTML = details;
  contextDiv.style.display = "block";
  contextDiv.style.opacity = 1;
  lastClickedItem = targetElement;
}

// Add this near other global declarations
const spellcastingData = {
  "Wizard": {
    spellcastingAbility: "Intelligence",
    spellsKnown: "Spellbook based - can learn unlimited spells",
    cantripsKnown: {
      1: 3, 4: 4, 10: 5
    },
    spellsPrepared: "Intelligence modifier + Wizard level",
    spellProgression: {
      1: { slots: [2], cantrips: 3 },
      2: { slots: [3], cantrips: 3 },
      3: { slots: [4, 2], cantrips: 3 },
      4: { slots: [4, 3], cantrips: 4 },
      5: { slots: [4, 3, 2], cantrips: 4 },
      6: { slots: [4, 3, 3], cantrips: 4 },
      7: { slots: [4, 3, 3, 1], cantrips: 4 },
      8: { slots: [4, 3, 3, 2], cantrips: 4 },
      9: { slots: [4, 3, 3, 3, 1], cantrips: 4 },
      10: { slots: [4, 3, 3, 3, 2], cantrips: 5 }
    }
  },
  "Sorcerer": {
    spellcastingAbility: "Charisma",
    spellsKnown: {
      1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 7, 7: 8, 8: 9, 9: 10, 10: 11
    },
    cantripsKnown: {
      1: 4, 4: 5, 10: 6
    },
    spellProgression: {
      1: { slots: [2], cantrips: 4 },
      2: { slots: [3], cantrips: 4 },
      3: { slots: [4, 2], cantrips: 4 },
      4: { slots: [4, 3], cantrips: 5 },
      5: { slots: [4, 3, 2], cantrips: 5 },
      6: { slots: [4, 3, 3], cantrips: 5 },
      7: { slots: [4, 3, 3, 1], cantrips: 5 },
      8: { slots: [4, 3, 3, 2], cantrips: 5 },
      9: { slots: [4, 3, 3, 3, 1], cantrips: 5 },
      10: { slots: [4, 3, 3, 3, 2], cantrips: 6 }
    }
  },
  "Cleric": {
    spellcastingAbility: "Wisdom",
    spellsKnown: "Access to full spell list",
    cantripsKnown: {
      1: 3, 4: 4, 10: 5
    },
    spellsPrepared: "Wisdom modifier + Cleric level",
    spellProgression: {
      1: { slots: [2], cantrips: 3 },
      2: { slots: [3], cantrips: 3 },
      3: { slots: [4, 2], cantrips: 3 },
      4: { slots: [4, 3], cantrips: 4 },
      5: { slots: [4, 3, 2], cantrips: 4 },
      6: { slots: [4, 3, 3], cantrips: 4 },
      7: { slots: [4, 3, 3, 1], cantrips: 4 },
      8: { slots: [4, 3, 3, 2], cantrips: 4 },
      9: { slots: [4, 3, 3, 3, 1], cantrips: 4 },
      10: { slots: [4, 3, 3, 3, 2], cantrips: 5 }
    }
  },
  "Druid": {
    spellcastingAbility: "Wisdom",
    spellsKnown: "Access to full spell list",
    cantripsKnown: {
      1: 2, 4: 3, 10: 4
    },
    spellsPrepared: "Wisdom modifier + Druid level",
    spellProgression: {
      1: { slots: [2], cantrips: 2 },
      2: { slots: [3], cantrips: 2 },
      3: { slots: [4, 2], cantrips: 2 },
      4: { slots: [4, 3], cantrips: 3 },
      5: { slots: [4, 3, 2], cantrips: 3 },
      6: { slots: [4, 3, 3], cantrips: 3 },
      7: { slots: [4, 3, 3, 1], cantrips: 3 },
      8: { slots: [4, 3, 3, 2], cantrips: 3 },
      9: { slots: [4, 3, 3, 3, 1], cantrips: 3 },
      10: { slots: [4, 3, 3, 3, 2], cantrips: 4 }
    }
  },
  "Bard": {
    spellcastingAbility: "Charisma",
    spellsKnown: {
      1: 4, 2: 5, 3: 6, 4: 7, 5: 8, 6: 9, 7: 10, 8: 11, 9: 12, 10: 14
    },
    cantripsKnown: {
      1: 2, 4: 3, 10: 4
    },
    spellProgression: {
      1: { slots: [2], cantrips: 2 },
      2: { slots: [3], cantrips: 2 },
      3: { slots: [4, 2], cantrips: 2 },
      4: { slots: [4, 3], cantrips: 3 },
      5: { slots: [4, 3, 2], cantrips: 3 },
      6: { slots: [4, 3, 3], cantrips: 3 },
      7: { slots: [4, 3, 3, 1], cantrips: 3 },
      8: { slots: [4, 3, 3, 2], cantrips: 3 },
      9: { slots: [4, 3, 3, 3, 1], cantrips: 3 },
      10: { slots: [4, 3, 3, 3, 2], cantrips: 4 }
    }
  },
  "Warlock": {
    spellcastingAbility: "Charisma",
    spellsKnown: {
      1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 7, 7: 8, 8: 9, 9: 10, 10: 10
    },
    cantripsKnown: {
      1: 2, 4: 3, 10: 4
    },
    spellProgression: {
      1: { slots: 1, slotLevel: 1, cantrips: 2 },
      2: { slots: 2, slotLevel: 1, cantrips: 2 },
      3: { slots: 2, slotLevel: 2, cantrips: 2 },
      4: { slots: 2, slotLevel: 2, cantrips: 3 },
      5: { slots: 2, slotLevel: 3, cantrips: 3 },
      6: { slots: 2, slotLevel: 3, cantrips: 3 },
      7: { slots: 2, slotLevel: 4, cantrips: 3 },
      8: { slots: 2, slotLevel: 4, cantrips: 3 },
      9: { slots: 2, slotLevel: 5, cantrips: 3 },
      10: { slots: 2, slotLevel: 5, cantrips: 4 }
    }
  },
  "Paladin": {
    spellcastingAbility: "Charisma",
    spellsKnown: "Access to full spell list",
    spellsPrepared: "Charisma modifier + ½ Paladin level",
    spellProgression: {
      2: { slots: [2] },
      3: { slots: [3] },
      4: { slots: [3] },
      5: { slots: [4, 2] },
      6: { slots: [4, 2] },
      7: { slots: [4, 3] },
      8: { slots: [4, 3] },
      9: { slots: [4, 3, 2] },
      10: { slots: [4, 3, 2] }
    }
  },
  "Ranger": {
    spellcastingAbility: "Wisdom",
    spellsKnown: {
      2: 2, 3: 3, 4: 3, 5: 4, 6: 4, 7: 5, 8: 5, 9: 6, 10: 6
    },
    spellProgression: {
      2: { slots: [2] },
      3: { slots: [3] },
      4: { slots: [3] },
      5: { slots: [4, 2] },
      6: { slots: [4, 2] },
      7: { slots: [4, 3] },
      8: { slots: [4, 3] },
      9: { slots: [4, 3, 2] },
      10: { slots: [4, 3, 2] }
    }
  }
};

function toggleSpellHandbook(event) {
  if (event) {
    event.preventDefault();
  }
  
  const handbookContainer = document.getElementById('spellHandbookContainer');
  const toggleBtn = document.getElementById('toggleSpellHandbookBtn');
  
  if (handbookContainer.style.display === "none" || handbookContainer.style.display === "") {
    handbookContainer.style.display = "block";
    toggleBtn.textContent = "Close Spellcasting Handbook";
    
    // Generate handbook content
    let content = `
      <div class="spell-handbook">
        <div class="general-spellcasting">
          <h2>General Spellcasting Rules</h2>
          
          <div class="spell-components">
            <h3>Spell Components</h3>
            <ul>
              <li><strong>Verbal (V):</strong> Most spells require the chanting of mystic words</li>
              <li><strong>Somatic (S):</strong> Spellcasting gestures and movements</li>
              <li><strong>Material (M):</strong> Specific items needed to cast the spell</li>
            </ul>
          </div>

          <div class="schools-of-magic">
            <h3>Schools of Magic</h3>
            <ul>
              <li><strong>Abjuration:</strong> Protective spells, wards, and barriers</li>
              <li><strong>Conjuration:</strong> Transportation and summoning</li>
              <li><strong>Divination:</strong> Knowledge and information gathering</li>
              <li><strong>Enchantment:</strong> Mind affecting and charm spells</li>
              <li><strong>Evocation:</strong> Elemental and energy manipulation</li>
              <li><strong>Illusion:</strong> Deception and phantasms</li>
              <li><strong>Necromancy:</strong> Death and undeath related magic</li>
              <li><strong>Transmutation:</strong> Object and creature transformation</li>
            </ul>
          </div>

          <div class="ritual-casting">
            <h3>Ritual Casting</h3>
            <p>Spells with the ritual tag can be cast without using a spell slot, but take 10 minutes longer to cast. Classes with ritual casting:</p>
            <ul>
              <li><strong>Wizard:</strong> Can ritual cast any ritual spell in their spellbook</li>
              <li><strong>Cleric & Druid:</strong> Can ritual cast any prepared ritual spell</li>
              <li><strong>Bard:</strong> Can ritual cast any known ritual spell</li>
              <li><strong>Warlock (Book of Ancient Secrets):</strong> Can ritual cast any ritual spell in their Book of Shadows</li>
            </ul>
          </div>

          <div class="concentration">
            <h3>Concentration</h3>
            <p>Key rules for concentration spells:</p>
            <ul>
              <li>Can only concentrate on one spell at a time</li>
              <li>Concentration check required when taking damage (DC 10 or half damage, whichever is higher)</li>
              <li>Automatically ends if incapacitated or killed</li>
              <li>Can choose to end concentration at any time (no action required)</li>
            </ul>
          </div>

          <div class="multiclassing">
            <h3>Multiclass Spellcasting</h3>
            <p>Spell Slots: Add together all your levels in the following classes:</p>
            <ul>
              <li>Full casters (Bard, Cleric, Druid, Sorcerer, Wizard): Full level</li>
              <li>Half casters (Paladin, Ranger): Half level (rounded down)</li>
              <li>Third casters (Arcane Trickster, Eldritch Knight): Third of level (rounded down)</li>
              <li>Warlock levels are separate and don't combine with other classes</li>
            </ul>
          </div>
        </div>

        <div class="class-specific-spellcasting">
          <h2>Class-Specific Spellcasting</h2>`;

    // Add class-specific spellcasting information
    for (const [className, data] of Object.entries(spellcastingData)) {
      content += `
        <div class="class-section">
          <h3>${className}</h3>
          <p><strong>Spellcasting Ability:</strong> ${data.spellcastingAbility}</p>
          
          <div class="spells-known">
            <h4>Spells Known</h4>
            <p>${typeof data.spellsKnown === 'string' ? data.spellsKnown : 
              Object.entries(data.spellsKnown).map(([level, count]) => 
                `Level ${level}: ${count}`).join(', ')
            }</p>
          </div>
          
          ${data.cantripsKnown ? `
            <div class="cantrips-known">
              <h4>Cantrips Known</h4>
              <p>${Object.entries(data.cantripsKnown).map(([level, count]) =>
                `Level ${level}: ${count}`).join(', ')}</p>
            </div>
          ` : ''}
          
          ${data.spellsPrepared ? `
            <div class="spells-prepared">
              <h4>Spells Prepared</h4>
              <p>${data.spellsPrepared}</p>
            </div>
          ` : ''}
          
          <div class="spell-slots">
            <h4>Spell Slots by Level</h4>
            <table class="spell-progression-table">
              <tr>
                <th>Class Level</th>
                ${className === 'Warlock' ? '<th>Slot Level</th><th>Slots</th>' :
                  '<th>1st</th><th>2nd</th><th>3rd</th><th>4th</th><th>5th</th>'}
              </tr>
              ${Object.entries(data.spellProgression).map(([level, info]) => `
                <tr>
                  <td>${level}</td>
                  ${className === 'Warlock' ?
                    `<td>${info.slotLevel}</td><td>${info.slots}</td>` :
                    Array(5).fill(0).map((_, i) => 
                      `<td>${info.slots[i] || '-'}</td>`
                    ).join('')
                  }
                </tr>
              `).join('')}
            </table>
          </div>

          ${className === 'Warlock' ? `
            <div class="pact-magic">
              <h4>Pact Magic Special Rules</h4>
              <ul>
                <li>All spell slots are of the same level</li>
                <li>Spell slots recharge on a short rest</li>
                <li>Can cast spells using spell slots of any level</li>
              </ul>
            </div>
          ` : ''}
        </div>
      `;
    }
    
    content += `
        </div>
      </div>`;
    
    handbookContainer.innerHTML = content;
  } else {
    handbookContainer.style.display = "none";
    toggleBtn.textContent = "Open Spellcasting Handbook";
  }
}
