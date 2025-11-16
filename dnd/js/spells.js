// spells.js
import { classData } from './class.js';

export const spellSlotData = {
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

export const updateSpellSlots = () => {
  const cls = document.getElementById("characterClass").value;
  const level = parseInt(document.getElementById("level").value) || 1;
  const casterType = classData[cls]?.casterType;
  const container = document.getElementById("spellSlotsContainer");
  container.innerHTML = "";

  if (!casterType || casterType === "none") {
    container.textContent = "No spell slots available.";
    return;
  }

  let slots = {};
  if (casterType === "pact") {
    const slotLevel = level >= 5 ? 3 : level >= 3 ? 2 : 1;
    slots = { [slotLevel]: level >= 2 ? 2 : 1 };
  } else {
    slots = spellSlotData[casterType][Math.min(level, 5)] || {};
  }

  Object.entries(slots).forEach(([spellLevel, max]) => {
    const div = document.createElement("div");
    div.className = "spell-slot-entry";
    div.innerHTML = `
      <label>Level ${spellLevel}:</label>
      <input type="number" name="spellSlots-${spellLevel}" value="${max}" min="0" max="${max}" onchange="saveState()">
      <span>/ ${max}</span>
    `;
    container.appendChild(div);
  });
};

// Spell data and search functions
let spellsData = [];

export const loadSpellsData = () => {
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
};

export const searchSpells = () => {
  const searchTerm = document.getElementById("spellSearchInput").value.toLowerCase().trim();
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
    return (nameMatch || descMatch) && !existingSpells.has(spell.name.toLowerCase());
  });

  if (matches.length === 0) {
    resultsDiv.textContent = " ";
    return;
  }

  const list = document.createElement("ul");
  matches.forEach(spell => {
    const li = document.createElement("li");
    li.dataset.spellName = spell.name;
    li.innerHTML = `
      <div class="spell-result">
        <strong>${spell.name}</strong> <em>(${spell.level === "cantrip" ? "Cantrip" : "Level " + spell.level})</em>
        <button class="add-known">+ Known</button>
        <button class="add-prepared">+ Prepared</button>
      </div>
      <div class="spell-details">
        <small>${spell.school} • ${spell.range}</small>
        <p>${spell.description.substring(0, 100)}...</p>
      </div>
    `;
    li.querySelector(".add-known").addEventListener("click", () => addSpellToList(spell, "known"));
    li.querySelector(".add-prepared").addEventListener("click", () => addSpellToList(spell, "prepared"));
    list.appendChild(li);
  });
  resultsDiv.appendChild(list);
};

export const addSpellToList = (spell, listType) => {
  const listId = listType === "known" ? "knownSpellsList" : "preparedSpellsList";
  const list = document.getElementById(listId);

  if (Array.from(list.children).some(li => li.dataset.spellName.toLowerCase() === spell.name.toLowerCase())) {
    alert(`${spell.name} is already in ${listType} spells!`);
    return;
  }

  const li = document.createElement("li");
  li.dataset.spellName = spell.name;
  li.innerHTML = `
    <div class="spell-item">
      ${spell.name} <small>(${spell.level === "cantrip" ? "Cantrip" : "Level " + spell.level})</small>
      <button class="remove-spell">×</button>
    </div>
  `;
  li.querySelector(".remove-spell").addEventListener("click", () => li.remove());
  list.appendChild(li);
};