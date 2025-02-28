// weapons.js
let weaponsData = [];

export const loadWeaponsData = () => {
  fetch("weapons.json")
    .then(response => {
      if (!response.ok) throw new Error("Failed to load weapons.json");
      return response.json();
    })
    .then(data => {
      weaponsData = data;
      const datalist = document.getElementById("weaponsList");
      datalist.innerHTML = weaponsData
        .map(w => `<option value="${w.name}" data-damage="${w.damage}" data-properties="${w.properties}"></option>`)
        .join("");
    })
    .catch(error => console.error("Error loading weapons:", error));
};

export const addWeaponRow = () => {
  const table = document.getElementById("weaponsTable");
  const row = table.insertRow(-1);
  row.className = "weapon-row";

  const nameCell = row.insertCell(0);
  const nameInput = document.createElement("input");
  nameInput.setAttribute("list", "weaponsList");
  nameInput.setAttribute("placeholder", "Search weapons...");
  nameCell.appendChild(nameInput);

  const attackCell = row.insertCell(1);
  attackCell.innerHTML = '<input type="text" placeholder="+MOD">';

  const damageCell = row.insertCell(2);
  damageCell.innerHTML = '<input type="text" readonly>';

  const propCell = row.insertCell(3);
  const propInput = document.createElement("input");
  propInput.readOnly = true;
  propCell.appendChild(propInput);
  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => deleteWeaponRow(deleteButton));
  propCell.appendChild(deleteButton);

  nameInput.addEventListener("input", function () {
    const weapon = weaponsData.find(w => w.name.toLowerCase() === this.value.toLowerCase());
    if (weapon) {
      damageCell.querySelector("input").value = weapon.damage;
      propInput.value = weapon.properties;
    }
  });
};

export const deleteWeaponRow = btn => {
  const row = btn.closest("tr");
  if (row) row.remove();
};