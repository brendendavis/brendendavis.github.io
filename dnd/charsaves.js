/**********************************************************
 * Fallback Weapons Data (if not loaded from weapons.json)
 **********************************************************/
if (!weaponsData || !weaponsData.length) {
    weaponsData = [
        { name: "Club", damage: "1d4 bludgeoning", properties: "Light" },
        { name: "Dagger", damage: "1d4 piercing", properties: "Finesse, light, thrown (range 20/60)" },
        { name: "Greatclub", damage: "1d8 bludgeoning", properties: "Two-handed" },
        { name: "Handaxe", damage: "1d6 slashing", properties: "Light, thrown (range 20/60)" },
        { name: "Javelin", damage: "1d6 piercing", properties: "Thrown (range 30/120)" },
        { name: "Light hammer", damage: "1d4 bludgeoning", properties: "Light, thrown (range 20/60)" },
        { name: "Mace", damage: "1d6 bludgeoning", properties: "" },
        { name: "Quarterstaff", damage: "1d6 bludgeoning", properties: "Versatile (1d8)" },
        { name: "Sickle", damage: "1d4 slashing", properties: "Light" },
        { name: "Spear", damage: "1d6 piercing", properties: "Thrown (range 20/60), versatile (1d8)" },
        { name: "Crossbow, light", damage: "1d8 piercing", properties: "Ammunition (range 80/320), loading, two-handed" },
        { name: "Dart", damage: "1d4 piercing", properties: "Finesse, thrown (range 20/60)" },
        { name: "Shortbow", damage: "1d6 piercing", properties: "Ammunition (range 80/320), two-handed" },
        { name: "Sling", damage: "1d4 bludgeoning", properties: "Ammunition (range 30/120)" },
        { name: "Battleaxe", damage: "1d8 slashing", properties: "Versatile (1d10)" },
        { name: "Flail", damage: "1d8 bludgeoning", properties: "" },
        { name: "Glaive", damage: "1d10 slashing", properties: "Heavy, reach, two-handed" },
        { name: "Greataxe", damage: "1d12 slashing", properties: "Heavy, two-handed" },
        { name: "Greatsword", damage: "2d6 slashing", properties: "Heavy, two-handed" },
        { name: "Halberd", damage: "1d10 slashing", properties: "Heavy, reach, two-handed" },
        { name: "Lance", damage: "1d12 piercing", properties: "Reach, special" },
        { name: "Longsword", damage: "1d8 slashing", properties: "Versatile (1d10)" },
        { name: "Maul", damage: "2d6 bludgeoning", properties: "Heavy, two-handed" },
        { name: "Morningstar", damage: "1d8 piercing", properties: "" },
        { name: "Pike", damage: "1d10 piercing", properties: "Heavy, reach, two-handed" },
        { name: "Rapier", damage: "1d8 piercing", properties: "Finesse" },
        { name: "Scimitar", damage: "1d6 slashing", properties: "Finesse, light" },
        { name: "Shortsword", damage: "1d6 piercing", properties: "Finesse, light" },
        { name: "Trident", damage: "1d6 piercing", properties: "Thrown (range 20/60), versatile (1d8)" },
        { name: "War pick", damage: "1d8 piercing", properties: "Versatile (1d10)" },
        { name: "Warhammer", damage: "1d8 bludgeoning", properties: "Versatile (1d10)" },
        { name: "Whip", damage: "1d4 slashing", properties: "Finesse, reach" },
        { name: "Blowgun", damage: "1 piercing", properties: "Ammunition (range 25/100), loading" },
        { name: "Crossbow, hand", damage: "1d6 piercing", properties: "Ammunition (range 30/120), light, loading" },
        { name: "Crossbow, heavy", damage: "1d10 piercing", properties: "Ammunition (range 100/400), heavy, loading, two-handed" },
        { name: "Longbow", damage: "1d8 piercing", properties: "Ammunition (range 150/600), heavy, two-handed" },
        { name: "Net", damage: "", properties: "Special, thrown (range 5/15)" }
    ];
}

/**********************************************************
 * (Optional) Fallback Equipment Data
 * Uncomment and edit the following if you want to use fallback
 * data when equipment.json isn’t available.
 **********************************************************/
if (!equipmentData || !equipmentData.length) {
    equipmentData = [
        { name: "Abacus", cost: "2 gp", weight: "2 lb." },
        { name: "Acid (vial)", cost: "25 gp", weight: "1 lb." },
        { name: "Alchemist’s fire (flask)", cost: "50 gp", weight: "1 lb." },
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
        { name: "Climber’s kit", cost: "25 gp", weight: "12 lb." },
        { name: "Clothes, common", cost: "5 sp", weight: "3 lb." },
        { name: "Clothes, costume", cost: "5 gp", weight: "4 lb." },
        { name: "Clothes, fine", cost: "15 gp", weight: "6 lb." },
        { name: "Clothes, traveler’s", cost: "2 gp", weight: "4 lb." },
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
        { name: "Healer’s kit", cost: "5 gp", weight: "2 lb." },
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
        { name: "Pick, miner’s", cost: "5 gp", weight: "—" },
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
        { name: "Scale, merchant’s", cost: "0 gp", weight: "3" },
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
    ];
}

/**********************************************************
 * Subclass Definitions (optional, unchanged)
 **********************************************************/
if (typeof window.subclasses === "undefined") {
    window.subclasses = {
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
}

/**********************************************************
 * updateClass()
 * Populates the subclass dropdown based on selected class
 **********************************************************/
function updateClass() {
    const classSelect = document.getElementById("characterClass");
    const subclassSelect = document.getElementById("characterSubclass");
    const selectedClass = classSelect.value;

    // Clear previous subclass options
    subclassSelect.innerHTML = "";

    if (window.subclasses[selectedClass]) {
        subclassSelect.innerHTML = `<option value="">-- Select Subclass --</option>`;
        window.subclasses[selectedClass].forEach(subclass => {
            let option = document.createElement("option");
            option.value = subclass;
            option.textContent = subclass;
            subclassSelect.appendChild(option);
        });
        subclassSelect.style.display = "block"; 
    } else {
        subclassSelect.style.display = "none"; 
    }
}

/**********************************************************
 * saveCharacter()
 * Gathers all fields (including dynamic table rows) and saves
 * to localStorage.
 **********************************************************/
function saveCharacter() {
    // -- 1) Gather basic fields from your form --
    const characterData = {
        // Basic Info
        characterName: document.getElementById('characterName')?.value || "",
        playerName: document.getElementById('playerName')?.value || "",
        characterClass: document.getElementById('characterClass')?.value || "",
        subclass: document.getElementById('characterSubclass')?.value || "",
        level: document.getElementById('level')?.value || "",
        race: document.getElementById('race')?.value || "",
        alignment: document.getElementById('alignment')?.value || "",
        background: document.getElementById('background')?.value || "",
        experience: document.getElementById('experience')?.value || "",

        // Ability Scores
        str: document.getElementById('str')?.value || "",
        dex: document.getElementById('dex')?.value || "",
        con: document.getElementById('con')?.value || "",
        int: document.getElementById('int')?.value || "",
        wis: document.getElementById('wis')?.value || "",
        cha: document.getElementById('cha')?.value || "",

        // Combat Stats
        armorClass: document.getElementById('armorClass')?.value || "",
        hitPoints: document.getElementById('hitPoints')?.value || "",
        speed: document.getElementById('speed')?.value || "",

        // Other Fields
        featuresTraits: document.getElementById('featuresTraits')?.value || "",
        feats: (window.selectedFeats || []).map(f => f.name),
        personalityTraits: document.getElementById('personalityTraits')?.value || "",
        backstory: document.getElementById('backstory')?.value || "",
        otherProficiencies: document.getElementById('otherProficiencies')?.value || "",

        lastSaved: new Date().toISOString()
    };

    // -- 2) Gather Equipment Table Rows --> characterData.equipmentData --
    const equipmentTableBody = document.querySelector('#equipmentTable tbody');
    const equipmentRows = equipmentTableBody?.querySelectorAll('tr') || [];
    const equipmentData = [];

    console.log("Gathering equipment rows:", equipmentRows.length);

    equipmentRows.forEach((row, idx) => {
        const cells = row.querySelectorAll('td');
        // Indices: 
        // 0: Item Name | 1: Cost | 2: Quantity | 3: Weight | 4: Check? | 5: Action
        const itemName  = cells[0].querySelector('input')?.value || "";
        const cost      = cells[1].querySelector('input')?.value || "";
        const quantity  = cells[2].querySelector('input')?.value || "";
        const weight    = cells[3].querySelector('input')?.value || "";
        const equipped  = cells[4].querySelector('input[type="checkbox"]')?.checked || false;

        equipmentData.push({ itemName, cost, quantity, weight, equipped });
        console.log("Equipment row #", idx, { itemName, cost, quantity, weight, equipped });
    });
    characterData.equipmentData = equipmentData;
    console.log("Final equipmentData:", equipmentData);

    // -- 3) Gather Weapons Table Rows --> characterData.weaponsData --
    const weaponsTable = document.getElementById('weaponsTable');
    // Skip the header row (the first row)
    const weaponRows = weaponsTable?.querySelectorAll('tr:not(:first-child)') || [];
    const gatheredWeapons = [];

    console.log("Gathering weapon rows:", weaponRows.length);

    weaponRows.forEach((row, idx) => {
        const cells = row.querySelectorAll('td');
        // New indices:
        // 0: Weapon Name | 1: Attack Bonus | 2: Damage | 3: Properties & Remove Button
        const weaponName  = cells[0].querySelector('input')?.value || "";
        const attackBonus = cells[1].querySelector('input')?.value || "";
        const damage      = cells[2].querySelector('input')?.value || "";
        const properties  = cells[3].querySelector('input')?.value || "";

        gatheredWeapons.push({ weaponName, attackBonus, damage, properties });
        console.log("Weapon row #", idx, { weaponName, attackBonus, damage, properties });
    });
    characterData.weaponsData = gatheredWeapons;
    console.log("Final weaponsData:", gatheredWeapons);

    // -- 4) Save to localStorage --
    try {
        const savedCharacters = JSON.parse(localStorage.getItem('dndCharacters') || '[]');
        const existingIndex = savedCharacters.findIndex(
            char => char.characterName === characterData.characterName
        );

        if (existingIndex >= 0) {
            savedCharacters[existingIndex] = characterData;
        } else {
            savedCharacters.push(characterData);
        }

        localStorage.setItem('dndCharacters', JSON.stringify(savedCharacters));
        alert('Character saved successfully!');
    } catch (error) {
        alert('Error saving character: ' + error.message);
        console.error("Save Error:", error);
    }
}

/**********************************************************
 * loadCharacter()
 * Loads the character from localStorage by name, populates
 * fields, and rebuilds equipment/weapons tables.
 **********************************************************/
function loadCharacter(characterName) {
    try {
        const savedCharacters = JSON.parse(localStorage.getItem('dndCharacters') || '[]');
        const character = savedCharacters.find(char => char.characterName === characterName);

        if (!character) {
            alert('Character not found!');
            return;
        }
        console.log("🚀 Loading Character Data:", character);

        // (A) Fill out basic fields
        Object.keys(character).forEach(key => {
            const element = document.getElementById(key);
            if (element) {
                console.log(`Updating field: ${key} → ${character[key]}`);
                if (
                    element.tagName === "INPUT" ||
                    element.tagName === "SELECT" ||
                    element.tagName === "TEXTAREA"
                ) {
                    element.value = character[key] || ""; 
                }
            } else {
                console.warn(`⚠️ Element with ID '${key}' not found in the HTML!`);
            }
        });

        // (B) Rebuild the equipment table
        const equipmentTableBody = document.querySelector('#equipmentTable tbody');
        if (equipmentTableBody) {
            equipmentTableBody.innerHTML = ""; // Clear old rows
            if (Array.isArray(character.equipmentData)) {
                character.equipmentData.forEach(item => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                      <td><input type="text" value="${item.itemName || ''}" list="equipmentList" placeholder="Item name"></td>
                      <td><input type="text" value="${item.cost || ''}"></td>
                      <td><input type="number" value="${item.quantity || ''}" min="1"></td>
                      <td><input type="text" value="${item.weight || ''}"></td>
                      <td><input type="checkbox" ${item.equipped ? 'checked' : ''}></td>
                      <td><button type="button" onclick="removeEquipmentRow(this)">Remove</button></td>
                    `;
                    equipmentTableBody.appendChild(row);
                });
            }
        }

        // (C) Rebuild the weapons table with the new structure
        const weaponsTable = document.getElementById('weaponsTable');
        if (weaponsTable) {
            // Remove any existing weapon rows except the header
            weaponsTable.querySelectorAll('tr:not(:first-child)').forEach(row => row.remove());

            if (Array.isArray(character.weaponsData)) {
                character.weaponsData.forEach(weapon => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                      <td><input type="text" value="${weapon.weaponName || ''}" list="weaponsList" placeholder="Search weapons..."></td>
                      <td><input type="text" value="${weapon.attackBonus || ''}" placeholder="+MOD"></td>
                      <td><input type="text" value="${weapon.damage || ''}" readonly></td>
                      <td>
                        <input type="text" value="${weapon.properties || ''}" readonly>
                        <button type="button" onclick="removeWeaponRow(this)">Remove</button>
                      </td>
                    `;
                    weaponsTable.appendChild(row);
                });
            }
        }

        // (D) Additional logic
        updateClass();
        document.getElementById("characterSubclass").value = character.subclass || "";

        if (character.feats && Array.isArray(character.feats)) {
            window.selectedFeats = character.feats.map(featName => {
                return window.feats?.find(f => f.name === featName);
            }).filter(Boolean);
            if (typeof renderSelectedFeats === "function") {
                renderSelectedFeats();
            }
        }

        if (typeof recalc === "function") {
            recalc();
        }

        alert('✅ Character loaded successfully!');
    } catch (error) {
        alert('❌ Error loading character: ' + error.message);
        console.error("❌ Load Error:", error);
    }
}

function populateCharacterList() {
    const select = document.getElementById('loadCharacterSelect');
    if (!select) return;

    while (select.options.length > 1) {
        select.remove(1);
    }

    const savedCharacters = JSON.parse(localStorage.getItem('dndCharacters') || '[]');
    savedCharacters.forEach(char => {
        const option = document.createElement('option');
        option.value = char.characterName;
        option.textContent = `${char.characterName} (${char.characterClass} Lvl ${char.level})`;
        select.add(option);
    });
}

/**********************************************************
 * listCharacters()
 * Returns an array of { name, class, level, lastSaved }
 **********************************************************/
function listCharacters() {
    try {
        const savedCharacters = JSON.parse(localStorage.getItem('dndCharacters') || '[]');
        return savedCharacters.map(char => ({
            name: char.characterName,
            class: char.characterClass,
            level: char.level,
            lastSaved: new Date(char.lastSaved).toLocaleDateString()
        }));
    } catch (error) {
        console.error('Error listing characters:', error);
        return [];
    }
}

/**********************************************************
 * Additional Helper Functions
 **********************************************************/

/**
 * loadEquipmentData()
 * Fetches the equipment list from a JSON file and populates the <datalist>.
 */
/// Normalize equipment names (trim and lowercase)
function normalizeEquipmentName(name) {
  return name.trim().toLowerCase();
}

// Global data store for equipment data
var equipmentDataStore = {};

/**
 * loadEquipmentData()
 * Fetches equipment data from equips.json, processes different response formats,
 * builds a dictionary keyed by normalized item names, and updates the datalist.
 */
function loadEquipmentData() {
  fetch("equips.json")
    .then(response => {
      if (!response.ok) throw new Error("Network error");
      return response.json();
    })
    .then(data => {
      console.log("Fetched equipment data:", data);
      // Check if data is in the format { Item: [...], Cost: [...], Weight: [...] }
      if (
        data &&
        data.Item &&
        data.Cost &&
        data.Weight &&
        Array.isArray(data.Item)
      ) {
        for (let i = 0; i < data.Item.length; i++) {
          let origName = data.Item[i];
          let normName = normalizeEquipmentName(origName);
          equipmentDataStore[normName] = {
            name: origName,
            cost: data.Cost[i] || "—",
            weight: data.Weight[i] || "—"
          };
        }
      }
      // Else if data is an array of objects (with keys: name, cost, weight)
      else if (Array.isArray(data)) {
        data.forEach(item => {
          if (item.name) {
            let normName = normalizeEquipmentName(item.name);
            equipmentDataStore[normName] = {
              name: item.name,
              cost: item.cost || "",
              weight: item.weight || ""
            };
          }
        });
      } else {
        // If data does not match expected formats, clear the store.
        equipmentDataStore = {};
      }
    })
    .catch(error => {
      console.error("Using fallback data:", error);
      // Fallback data
      equipmentDataStore = {};
      let fallback = [
        { name: "Abacus", cost: "2 gp", weight: "2 lb." },
        { name: "Acid (vial)", cost: "25 gp", weight: "1 lb." }
      ];
      fallback.forEach(item => {
        let normName = normalizeEquipmentName(item.name);
        equipmentDataStore[normName] = {
          name: item.name,
          cost: item.cost,
          weight: item.weight
        };
      });
    })
    .finally(() => {
      // Update datalist after both success and failure
      const datalist = document.getElementById("equipmentList");
      if (datalist) {
        const options = Object.values(equipmentDataStore)
          .map(item => `<option value="${item.name}">${item.name}</option>`)
          .join("");
        datalist.innerHTML = options;
      }
    });
}

  

/**
 * addEquipmentRow()
 * Dynamically adds a new row to the equipment table using a datalist
 * for item name autocomplete, and auto-fills cost and weight.
 */
function addEquipmentRow() {
    const equipmentTableBody = document.querySelector('#equipmentTable tbody');
    if (!equipmentTableBody) return;

    const row = document.createElement('tr');
    row.innerHTML = `
        <td><input type="text" placeholder="Item name" list="equipmentList"></td>
        <td><input type="text" placeholder="Cost"></td>
        <td><input type="number" value="1" min="1"></td>
        <td><input type="text" placeholder="Weight"></td>
        <td><input type="checkbox"></td>
        <td><button type="button" onclick="removeEquipmentRow(this)">Remove</button></td>
    `;
    equipmentTableBody.appendChild(row);

    // Auto-fill cost and weight based on the selected item from the datalist.
    const nameInput = row.querySelector("td input[list='equipmentList']");
    const costInput = row.cells[1].querySelector("input");
    const weightInput = row.cells[3].querySelector("input");

    nameInput.addEventListener("input", function() {
        const searchValue = this.value.trim().toLowerCase();
        console.log("Input value:", searchValue);
        const equipmentItem = equipmentData.find(item =>
            item.name && item.name.toLowerCase() === searchValue
        );
        console.log("Found item:", equipmentItem);
        if (equipmentItem) {
            costInput.value = equipmentItem.cost || "";
            weightInput.value = equipmentItem.weight || "";
        } else {
            costInput.value = "";
            weightInput.value = "";
        }
    });
}

/**
 * removeEquipmentRow()
 * Removes the equipment row that contains the given button.
 */
function removeEquipmentRow(button) {
    button.closest('tr')?.remove();
}

/**
 * addWeaponRow()
 * Dynamically adds a new row to the weapons table using a datalist
 * for weapon name autocomplete and auto‑fills damage and properties.
 **********************************************************/
function addWeaponRow() {
    const table = document.getElementById("weaponsTable");
    if (!table) return;

    const row = table.insertRow(-1);
    row.className = "weapon-row";

    // Weapon Name cell with autocomplete (using datalist)
    const nameCell = row.insertCell(0);
    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.setAttribute("list", "weaponsList");
    nameInput.placeholder = "Search weapons...";
    nameCell.appendChild(nameInput);

    // Attack Bonus cell
    const attackCell = row.insertCell(1);
    const attackInput = document.createElement("input");
    attackInput.type = "text";
    attackInput.placeholder = "+MOD";
    attackCell.appendChild(attackInput);

    // Damage cell (read-only)
    const damageCell = row.insertCell(2);
    const damageInput = document.createElement("input");
    damageInput.type = "text";
    damageInput.readOnly = true;
    damageCell.appendChild(damageInput);

    // Properties cell with read-only input and Remove button
    const propCell = row.insertCell(3);
    const propInput = document.createElement("input");
    propInput.type = "text";
    propInput.readOnly = true;
    propCell.appendChild(propInput);

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Remove";
    deleteButton.addEventListener("click", () => removeWeaponRow(deleteButton));
    propCell.appendChild(deleteButton);

    // When a weapon is selected, fill in damage and properties automatically.
    nameInput.addEventListener("input", function () {
        const weapon = weaponsData.find(w => w.name.toLowerCase() === this.value.toLowerCase());
        if (weapon) {
            damageInput.value = weapon.damage;
            propInput.value = weapon.properties;
        } else {
            damageInput.value = "";
            propInput.value = "";
        }
    });
}

function removeWeaponRow(button) {
    button.closest('tr')?.remove();
}

/**********************************************************
 * On Page Load
 **********************************************************/
document.addEventListener('DOMContentLoaded', () => {
    if (typeof populateCharacterList === "function") {
        populateCharacterList();
    }
    if (typeof recalc === "function") {
        recalc();
    }

    const select = document.getElementById('loadCharacterSelect');
    if (select) {
        select.addEventListener('change', function() {
            console.log("📌 Dropdown Changed (Manual Fix):", this.value);
            loadCharacter(this.value);
        });
    }
    // Populate the equipment datalist on DOM ready
    loadEquipmentData();
});

// Expose functions to window if needed
window.saveCharacter = saveCharacter;
window.loadCharacter = loadCharacter;
window.listCharacters = listCharacters;
window.addEquipmentRow = addEquipmentRow;
window.addWeaponRow = addWeaponRow;
window.removeEquipmentRow = removeEquipmentRow;
window.removeWeaponRow = removeWeaponRow;
window.updateClass = updateClass;
