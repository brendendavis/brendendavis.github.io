// Feats Data (Load from JSON or API)
let feats = [];

// Fetch feats data from uploaded JSON
fetch('feats.json')
  .then(response => response.json())
  .then(data => {
    // Flatten nested arrays
    feats = flattenFeats(data);
    populateFeatsDropdown();
  });

function flattenFeats(featsList) {
        const flattened = [];
      
        function helper(array) {
          array.forEach(item => {
            if (Array.isArray(item)) {
              // If this item is an array, recurse deeper
              helper(item);
            } else {
              // Otherwise, it's a feat object, so push it
              flattened.push(item);
            }
          });
        }
      
        helper(featsList);
        return flattened;
      }
// Populate Feat Selection Dropdown
function populateFeatsDropdown() {
    const featSelect = document.getElementById('featSelection');
    featSelect.innerHTML = '<option value="">-- Select a Feat --</option>';

    feats.forEach(feat => {
        let option = document.createElement('option');
        option.value = feat.name;
        option.textContent = feat.name;
        featSelect.appendChild(option);
    });
}

// Filter feats based on prerequisites
function filterFeatsByPrerequisites() {
    const characterRace = document.getElementById('race').value;
    const characterClass = document.getElementById('characterClass').value;
    
    const featSelect = document.getElementById('featSelection');
    featSelect.innerHTML = '<option value="">-- Select a Feat --</option>';
    
    feats.forEach(feat => {
        if (!feat.prerequisite || feat.prerequisite.includes(characterRace) || feat.prerequisite.includes(characterClass)) {
            let option = document.createElement('option');
            option.value = feat.name;
            option.textContent = feat.name;
            featSelect.appendChild(option);
        }
    });
}

// Display Feat Details when Selected
function displayFeatDetails() {
    const selectedFeat = document.getElementById('featSelection').value;
    const featDetailsContainer = document.getElementById('featDetails');
    
    if (!selectedFeat) {
        featDetailsContainer.innerHTML = '';
        return;
    }
    
    const feat = feats.find(f => f.name === selectedFeat);
    if (feat) {
        featDetailsContainer.innerHTML = `
            <h3>${feat.name}</h3>
            <p><strong>Source:</strong> ${feat.source}</p>
            <p><strong>Prerequisite:</strong> ${feat.prerequisite || 'None'}</p>
            <p><strong>Description:</strong> ${feat.description}</p>
            <ul>
                ${feat.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
            </ul>
        `;
    }
}
// Keep track of feats the user has selected in an array.
let selectedFeats = [];

// Called when user clicks the “Add Feat” button
function addFeat() {
  const featSelect = document.getElementById('featSelection');
  const selectedFeatName = featSelect.value;

  // If user didn't pick a feat, do nothing
  if (!selectedFeatName) return;

  // Find the corresponding feat object
  const featObj = feats.find(f => f.name === selectedFeatName);

  // If we found a feat and we don't already have it, store it
  if (featObj && !selectedFeats.some(f => f.name === featObj.name)) {
    selectedFeats.push(featObj);
  }

  // Re-render chosen feats
  renderSelectedFeats();

  // Optionally clear the dropdown selection
  featSelect.value = '';
}

function renderSelectedFeats() {
  const container = document.getElementById('selectedFeatsContainer');
  container.innerHTML = ''; // clear out old content

  // If no feats selected, show a message
  if (selectedFeats.length === 0) {
    container.innerHTML = '<p>No feats chosen yet.</p>';
    return;
  }

  // For each selected feat, create a div
  selectedFeats.forEach((feat, index) => {
    // IMPORTANT: Declare featDiv with let or const
    const featDiv = document.createElement('div');
    featDiv.className = 'feat-item';

    featDiv.innerHTML = `
      <strong>${feat.name}</strong> (<em>${feat.source}</em>)
      <button type="button" onclick="removeFeat(${index})">Remove</button>
      <br>
      <small>${feat.description}</small>
      <hr>
    `;

    container.appendChild(featDiv);
  });
}

// Remove a feat by index
function removeFeat(index) {
  selectedFeats.splice(index, 1);
  renderSelectedFeats();
}


// Let the user remove a feat by index
function removeFeat(index) {
  selectedFeats.splice(index, 1);
  renderSelectedFeats();
}



// Attach Event Listeners
document.getElementById('featSelection').addEventListener('change', displayFeatDetails);
document.getElementById('race').addEventListener('change', filterFeatsByPrerequisites);
document.getElementById('characterClass').addEventListener('change', filterFeatsByPrerequisites);
