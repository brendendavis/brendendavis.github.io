

// Function to save the current character state
function saveCharacter() {
    // Get all form inputs
    const characterData = {
        // Basic Info
        characterName: document.getElementById('characterName').value,
        playerName: document.getElementById('playerName').value,
        characterClass: document.getElementById('characterClass').value,
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

        // Load all the saved values back into the form
        Object.keys(character).forEach(key => {
            const element = document.getElementById(key);
            if (element && key !== 'lastSaved') {
                element.value = character[key];
            }
        });
        
        // Trigger recalculations
        recalc();
        alert('Character loaded successfully!');
    } catch (error) {
        alert('Error loading character: ' + error.message);
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