// Global variable to store spells data
let spellsData = [];

// Fetch spells data from JSON file
async function loadSpellsData() {
    try {
        const response = await fetch('spells.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        spellsData = await response.json();

        const spellListDiv = document.getElementById('spell-list');
        spellListDiv.innerHTML = ''; // Clear loading message

        const list = document.createElement('ul');
        spellsData.forEach(spell => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="spell-item">
                    <strong>${spell.name}</strong>
                    <em>(${spell.level === "cantrip" ? "Cantrip" : "Level " + spell.level})</em>
                    <div class="spell-details">
                        <small>${spell.school} • ${spell.range}</small>
                        <p>${spell.description}</p>
                        <p><strong>Casting Time:</strong> ${spell.casting_time}</p>
                        <p><strong>Classes:</strong> ${spell.classes.join(', ')}</p>
                        <p><strong>Components:</strong> ${spell.components.raw}</p>
                    </div>
                    <div class="spell-actions">
                        <button class="add-known">+ Known</button>
                        <button class="add-prepared">+ Prepared</button>
                    </div>
                </div>
            `;

            // Add event listeners to the buttons
            li.querySelector(".add-known").addEventListener("click", () => {
                addSpellToList(spell, "known");
            });
            li.querySelector(".add-prepared").addEventListener("click", () => {
                addSpellToList(spell, "prepared");
            });

            list.appendChild(li);
        });

        spellListDiv.appendChild(list);

    } catch (error) {
        console.error('Error loading spells:', error);
        document.getElementById('spell-list').textContent = 'Error loading spells';
    }
}


function searchSpells() {
    const searchTerm = document.getElementById("spellSearchInput").value
        .toLowerCase()
        .trim();
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
        const tagsMatch = spell.tags && spell.tags.some(tag => tag.toLowerCase().includes(searchTerm));
        const componentsMatch = spell.components.raw.toLowerCase().includes(searchTerm);
        
        return (nameMatch || descMatch || tagsMatch || componentsMatch) && !existingSpells.has(spell.name.toLowerCase());
    });

    if (matches.length === 0) {
        resultsDiv.textContent = "...";
        return;
    }

    const list = document.createElement("ul");
    matches.forEach(spell => {
        const li = document.createElement("li");
        li.dataset.spellName = spell.name;

        // Highlight matched tags
        const highlightedTags = spell.tags.map(tag => {
            if (tag.toLowerCase().includes(searchTerm)) {
                return `<span class="highlighted-tag">${tag}</span>`;
            }
            return tag;
        }).join(", ");

        li.innerHTML = 
            '<div class="spell-result">' +
            '<strong>' + spell.name + '</strong> ' +
            '<em>(' + (spell.level === "cantrip" ? "Cantrip" : "Level " + spell.level) + ')</em> ' +
            '<button class="add-known">+ Known</button> ' +
            '<button class="add-prepared">+ Prepared</button>' +
            '</div>' +
            '<div class="spell-details">' +
            '<small>' + spell.school + ' • ' + spell.range + '</small>' +
            '<p>' + spell.description.substring(0, 100) + '...</p>' +
            '<p><strong>Casting Time:</strong> ' + spell.casting_time + '</p>' +
            '<p><strong>Classes:</strong> ' + spell.classes.join(', ') + '</p>' +
            '<p><strong>Components:</strong> ' + spell.components.raw + '</p>' +
            '<p><strong>Tags:</strong> ' + highlightedTags + '</p>' +
            '</div>';

        li.querySelector(".add-known").addEventListener("click", function() {
            addSpellToList(spell, "known");
        });
        li.querySelector(".add-prepared").addEventListener("click", function() {
            addSpellToList(spell, "prepared");
        });
        list.appendChild(li);
    });

    resultsDiv.appendChild(list);
    document.getElementById('spellSearchInput').focus();
}

function addSpellToList(spell, listType) {
    const listId = listType === "known" ? "knownSpellsList" : "preparedSpellsList";
    const list = document.getElementById(listId);
    
    if (Array.from(list.children).some(
        li => li.dataset.spellName.toLowerCase() === spell.name.toLowerCase()
    )) {
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
        '<button class="remove-spell">×</button>' +
        '</div>';
        
    li.querySelector(".remove-spell").addEventListener("click", function() {
        li.remove();
    });
    
    list.appendChild(li);
}

// Initialize everything after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load spells data
    loadSpellsData();

    // Add click event listener to search button
    document.getElementById('searchSpellsButton').addEventListener('click', searchSpells);

    // Add input event listener to search input for real-time searching
    document.getElementById('spellSearchInput').addEventListener('input', searchSpells);

    // Add click event listener to accordion button
    const accordionButton = document.querySelector('.accordion-button');
    accordionButton.addEventListener('click', function() {
        toggleAccordion(this);
    });
});
document.getElementById('spellSearchInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevents any default behavior like form submission
        searchSpells();         // Call your search function
    }
});