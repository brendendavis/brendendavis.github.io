
// Check if subclasses is already defined in the global scope
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

// Function to update subclasses based on class selection
function updateClass() {
    const classSelect = document.getElementById("characterClass");
    const subclassSelect = document.getElementById("characterSubclass");
    const selectedClass = classSelect.value;

    // Clear previous subclass options
    subclassSelect.innerHTML = "";

    if (subclasses[selectedClass]) {
        // Populate with new subclass options
        subclassSelect.innerHTML = `<option value="">-- Select Subclass --</option>`;
        subclasses[selectedClass].forEach(subclass => {
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

// Function to save the current character state
function saveCharacter() {
    // Get all form inputs
    const characterData = {
        // Basic Info
        characterName: document.getElementById('characterName').value,
        playerName: document.getElementById('playerName').value,
        characterClass: document.getElementById('characterClass').value,
        subclass: document.getElementById("characterSubclass").value, // Save subclass
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
        equipment: document.getElementById('equipment').value,
        featuresTraits: document.getElementById('featuresTraits').value,
        feats: selectedFeats.map(f => f.name), // or store the entire objects
        personalityTraits: document.getElementById('personalityTraits').value,
        backstory: document.getElementById('backstory').value,
        otherProficiencies: document.getElementById('otherProficiencies').value,

        // Save the date for reference
        lastSaved: new Date().toISOString()
    };

    try {
        // Get existing characters or initialize empty array
        const savedCharacters = JSON.parse(localStorage.getItem('dndCharacters') || '[]');

        // Add new character or update existing one
        const characterName = characterData.characterName;
        const existingIndex = savedCharacters.findIndex(char => char.characterName === characterName);

        if (existingIndex >= 0) {
            savedCharacters[existingIndex] = characterData;
        } else {
            savedCharacters.push(characterData);
        }

        // Save back to localStorage
        localStorage.setItem('dndCharacters', JSON.stringify(savedCharacters));
        alert('Character saved successfully!');
    } catch (error) {
        alert('Error saving character: ' + error.message);
    }
}

// Function to load a character
function loadCharacter(characterName) {
    try {
        const savedCharacters = JSON.parse(localStorage.getItem('dndCharacters') || '[]');
        const character = savedCharacters.find(char => char.characterName === characterName);

        if (!character) {
            alert('Character not found!');
            return;
        }

        console.log("🚀 Loading Character Data:", character); // Debugging log

        Object.keys(character).forEach(key => {
            const element = document.getElementById(key);

            if (element) {
                console.log(`Updating field: ${key} → ${character[key]}`); // Debugging log
                if (element.tagName === "INPUT" || element.tagName === "SELECT" || element.tagName === "TEXTAREA") {
                    element.value = character[key] || ""; // Ensure empty fields are handled
                }
            } else {
                console.warn(`⚠️ Element with ID '${key}' not found in the HTML!`);
            }
        });

        // Ensure subclasses update when a class is loaded
        updateClass();
        document.getElementById("characterSubclass").value = character.subclass || "";

        // Debugging log to check if subclass was properly set
        console.log(`Updated subclass to: ${character.subclass}`);

        // Ensure Feats are reloaded properly
        if (character.feats && Array.isArray(character.feats)) {
            selectedFeats = character.feats.map(featName => {
                return feats.find(f => f.name === featName);
            }).filter(Boolean);
            renderSelectedFeats();
        }

        // Ensure recalculations (e.g., ability modifiers)
        recalc();

        alert('✅ Character loaded successfully!');
    } catch (error) {
        alert('❌ Error loading character: ' + error.message);
        console.error("❌ Load Error:", error);
    }
}



  

// Function to list all saved characters
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

// Function to delete a character
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

// Function to populate the character list in the load dropdown
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

// Initialize character list when page loads
document.addEventListener('DOMContentLoaded', populateCharacterList);
document.addEventListener('DOMContentLoaded', recalc);
window.saveCharacter = saveCharacter;
window.recalc = recalc;
window.updateClass = updateClass;

document.addEventListener('DOMContentLoaded', () => {
    const select = document.getElementById('loadCharacterSelect');
    if (select) {
        select.addEventListener('change', function() {
            console.log("📌 Dropdown Changed (Manual Fix):", this.value);
            loadCharacter(this.value);
        });
    }
});
