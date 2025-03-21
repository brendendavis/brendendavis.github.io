// Global variable to store spells data
//let spellsData = []; // Commented out to avoid redeclaration error

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
            <button type="button" class="add-known">+ Known</button>
            <button type="button" class="add-prepared">+ Prepared</button>
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

    // Split search terms by space and filter out empty strings
    const searchTerms = searchTerm.split(/\s+/).filter(t => t);

    const matches = spellsData.filter(spell => {
        // Check if spell matches ALL terms
        const matchesAll = searchTerms.every(term => {
            // Handle level search (e.g., "level1")
            if (term.startsWith("level")) {
                const level = term.replace("level", "");
                return spell.level.toLowerCase() === level;
            }

            // Check other fields
            return [
                spell.name.toLowerCase(),
                spell.description.toLowerCase(),
                spell.components.raw.toLowerCase(),
                spell.classes.join(" ").toLowerCase(),
                spell.tags?.join(" ").toLowerCase() || ""
            ].some(field => field.includes(term));
        });

        return matchesAll && !existingSpells.has(spell.name.toLowerCase());
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
            '<button type="button" class="add-known">+ Known</button> ' +
            '<button type="button" class="add-prepared">+ Prepared</button>' +
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

// Fix: Move toggleAccordion here
function toggleAccordion(event) {
    const button = event.target;
    button.classList.toggle("active");
    const content = button.nextElementSibling;
    
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
}

// Initialize everything after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load spells data
    loadSpellsData();

    // Add click event listener to search button
    document.getElementById('searchSpellsButton').addEventListener('click', searchSpells);

    // Add input event listener to search input for real-time searching
    document.getElementById('spellSearchInput').addEventListener('input', searchSpells);

    // Fix: Add event listener to all accordion buttons
    document.querySelectorAll('.accordion-button').forEach(button => {
        button.addEventListener('click', toggleAccordion);
    });
});

document.getElementById('spellSearchInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevents any default behavior like form submission
        searchSpells();         // Call your search function
    }
});
 
