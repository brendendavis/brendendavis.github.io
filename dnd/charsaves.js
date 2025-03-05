/**********************************************************
 * Subclass Definitions (unchanged)
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
        // Populate with new subclass options
        subclassSelect.innerHTML = `<option value="">-- Select Subclass --</option>`;
        window.subclasses[selectedClass].forEach(subclass => {
            let option = document.createElement("option");
            option.value = subclass;
            option.textContent = subclass;
            subclassSelect.appendChild(option);
        });
        subclassSelect.style.display = "block"; // Show dropdown when a class has subclasses
    } else {
        subclassSelect.style.display = "none"; // Hide dropdown if no subclass is available
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
        characterName: document.getElementById('characterName').value,
        playerName: document.getElementById('playerName').value,
        characterClass: document.getElementById('characterClass').value,
        subclass: document.getElementById('characterSubclass').value,
        level: document.getElementById('level').value,
        race: document.getElementById('race').value,
        alignment: document.getElementById('alignment').value,
        background: document.getElementById('background').value,
        experience: document.getElementById('experience').value,

        // Ability Scores
        str: document.getElementById('str').value,
        dex: document.getElementById('dex').value,
        con: document.getElementById('con').value,
        int: document.getElementById('int').value,
        wis: document.getElementById('wis').value,
        cha: document.getElementById('cha').value,

        // Combat Stats
        armorClass: document.getElementById('armorClass').value,
        hitPoints: document.getElementById('hitPoints').value,
        speed: document.getElementById('speed').value,

        // Other Fields
        // NOTE: We remove "equipment: document.getElementById('equipment').value" 
        // because that ID doesn't exist. Instead, we gather table data below.
        featuresTraits: document.getElementById('featuresTraits').value,
        feats: (window.selectedFeats || []).map(f => f.name),
        personalityTraits: document.getElementById('personalityTraits').value,
        backstory: document.getElementById('backstory').value,
        otherProficiencies: document.getElementById('otherProficiencies').value,

        lastSaved: new Date().toISOString()
    };

    // -- 2) Gather Equipment Table Rows --> characterData.equipmentData --
    const equipmentTableBody = document.querySelector('#equipmentTable tbody');
    const equipmentRows = equipmentTableBody.querySelectorAll('tr');
    const equipmentData = [];

    equipmentRows.forEach((row) => {
        const cells = row.querySelectorAll('td');
        // Adjust indexes to match your columns:
        //   0: Item Name   | 1: Cost    | 2: Quantity
        //   3: Weight      | 4: Check?  | 5: Action btn
        const itemName  = cells[0].querySelector('input')?.value || "";
        const cost      = cells[1].querySelector('input')?.value || "";
        const quantity  = cells[2].querySelector('input')?.value || "";
        const weight    = cells[3].querySelector('input')?.value || "";
        const equipped  = cells[4].querySelector('input[type="checkbox"]')?.checked || false;

        equipmentData.push({ itemName, cost, quantity, weight, equipped });
    });
    characterData.equipmentData = equipmentData;

    // -- 3) Gather Weapons Table Rows --> characterData.weaponsData --
    const weaponsTable = document.getElementById('weaponsTable');
    // skip the header row (the first row)
    const weaponRows = weaponsTable.querySelectorAll('tr:not(:first-child)');
    const weaponsData = [];

    weaponRows.forEach((row) => {
        const cells = row.querySelectorAll('td');
        // Indices:
        //   0: Weapon Name | 1: Attack Bonus | 2: Damage | 3: Action
        const weaponName  = cells[0].querySelector('input')?.value || "";
        const attackBonus = cells[1].querySelector('input')?.value || "";
        const damage      = cells[2].querySelector('input')?.value || "";

        weaponsData.push({ weaponName, attackBonus, damage });
    });
    characterData.weaponsData = weaponsData;

    // -- 4) Save to localStorage --
    try {
        const savedCharacters = JSON.parse(localStorage.getItem('dndCharacters') || '[]');
        const existingIndex = savedCharacters.findIndex(char => char.characterName === characterData.characterName);

        if (existingIndex >= 0) {
            savedCharacters[existingIndex] = characterData;
        } else {
            savedCharacters.push(characterData);
        }

        localStorage.setItem('dndCharacters', JSON.stringify(savedCharacters));
        alert('Character saved successfully!');
    } catch (error) {
        alert('Error saving character: ' + error.message);
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
                if (element.tagName === "INPUT" || element.tagName === "SELECT" || element.tagName === "TEXTAREA") {
                    element.value = character[key] || ""; 
                }
            } else {
                // Not a direct field ID; might be table data or something else
                console.warn(`⚠️ Element with ID '${key}' not found in the HTML!`);
            }
        });

        // (B) Rebuild the equipment table from character.equipmentData
        const equipmentTableBody = document.querySelector('#equipmentTable tbody');
        equipmentTableBody.innerHTML = ""; // Clear old rows

        if (Array.isArray(character.equipmentData)) {
            character.equipmentData.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                  <td><input type="text" value="${item.itemName || ''}"></td>
                  <td><input type="text" value="${item.cost || ''}"></td>
                  <td><input type="number" value="${item.quantity || ''}" min="1"></td>
                  <td><input type="text" value="${item.weight || ''}"></td>
                  <td><input type="checkbox" ${item.equipped ? 'checked' : ''}></td>
                  <td><button type="button" onclick="removeEquipmentRow(this)">Remove</button></td>
                `;
                equipmentTableBody.appendChild(row);
            });
        }

        // (C) Rebuild the weapons table from character.weaponsData
        const weaponsTable = document.getElementById('weaponsTable');
        // Remove any existing weapon rows except the header
        weaponsTable.querySelectorAll('tr:not(:first-child)').forEach(row => row.remove());

        if (Array.isArray(character.weaponsData)) {
            character.weaponsData.forEach(weapon => {
                const row = document.createElement('tr');
                row.innerHTML = `
                  <td><input type="text" value="${weapon.weaponName || ''}"></td>
                  <td><input type="text" value="${weapon.attackBonus || ''}"></td>
                  <td><input type="text" value="${weapon.damage || ''}"></td>
                  <td><button type="button" onclick="removeWeaponRow(this)">Remove</button></td>
                `;
                weaponsTable.appendChild(row);
            });
        }

        // (D) Additional logic
        // - We re-run updateClass() so that the subclass field shows properly
        updateClass();
        document.getElementById("characterSubclass").value = character.subclass || "";

        // - If feats exist, load them
        if (character.feats && Array.isArray(character.feats)) {
            window.selectedFeats = character.feats.map(featName => {
                return window.feats.find(f => f.name === featName);
            }).filter(Boolean);
            renderSelectedFeats();
        }

        // - Recalculate stats
        recalc();

        alert('✅ Character loaded successfully!');
    } catch (error) {
        alert('❌ Error loading character: ' + error.message);
        console.error("❌ Load Error:", error);
    }
}

/**********************************************************
 * Utility for listing characters in localStorage
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
 * deleteCharacter()
 * Removes a character by name from localStorage
 **********************************************************/
function deleteCharacter(characterName) {
    try {
        const savedCharacters = JSON.parse(localStorage.getItem('dndCharacters') || '[]');
        const filteredCharacters = savedCharacters.filter(char => char.characterName !== characterName);
        localStorage.setItem('dndCharacters', JSON.stringify(filteredCharacters));
        alert('Character deleted successfully!');
    } catch (error) {
        alert('Error deleting character: ' + error.message);
    }
}

/**********************************************************
 * populateCharacterList()
 * Refreshes the dropdown with names from localStorage
 **********************************************************/
function populateCharacterList() {
    const select = document.getElementById('loadCharacterSelect');
    const characters = listCharacters();

    // Clear existing options except the first one
    while (select.options.length > 1) {
        select.remove(1);
    }

    // Add character options
    characters.forEach(char => {
        const option = document.createElement('option');
        option.value = char.name;
        option.text = `${char.name} (Level ${char.level} ${char.class})`;
        select.add(option);
    });
}

/**********************************************************
 * DOMContentLoaded
 * - populate dropdown
 * - attach recalc
 * - attach events
 **********************************************************/
document.addEventListener('DOMContentLoaded', populateCharacterList);
document.addEventListener('DOMContentLoaded', recalc);

// Expose needed functions in global scope
window.saveCharacter = saveCharacter;
window.loadCharacter = loadCharacter;
window.recalc = recalc;
window.updateClass = updateClass;

/**********************************************************
 *  Manual Fix for dropdown changing
 **********************************************************/
document.addEventListener('DOMContentLoaded', () => {
    const select = document.getElementById('loadCharacterSelect');
    if (select) {
        select.addEventListener('change', function() {
            console.log("📌 Dropdown Changed (Manual Fix):", this.value);
            loadCharacter(this.value);
        });
    }
});

/**********************************************************
 *  Helper functions for adding/removing rows
 **********************************************************/
function addEquipmentRow() {
    const equipmentTableBody = document.querySelector('#equipmentTable tbody');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><input type="text" placeholder="Item name"></td>
        <td><input type="text" placeholder="Cost"></td>
        <td><input type="number" value="1" min="1"></td>
        <td><input type="text" placeholder="Weight"></td>
        <td><input type="checkbox"></td>
        <td><button type="button" onclick="removeEquipmentRow(this)">Remove</button></td>
    `;
    equipmentTableBody.appendChild(row);
}

function removeEquipmentRow(button) {
    button.closest('tr').remove();
}

function addWeaponRow() {
    const weaponsTable = document.getElementById('weaponsTable');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><input type="text" placeholder="Weapon name"></td>
        <td><input type="text" placeholder="Attack Bonus"></td>
        <td><input type="text" placeholder="Damage"></td>
        <td><button type="button" onclick="removeWeaponRow(this)">Remove</button></td>
    `;
    weaponsTable.appendChild(row);
}

function removeWeaponRow(button) {
    button.closest('tr').remove();
}
