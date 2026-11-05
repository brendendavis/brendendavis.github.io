const byId = id => document.getElementById(id);
const generator = byId('generator');
const heroSheet = byId('hero');
const sceneView = byId('scene');
const parameters = new URLSearchParams(location.search);
const playerOnly = parameters.get('view') === 'player';
const heroKey = 'questTable.hero.v1';
const adventureKey = 'questTable.adventure.v1';

function element(tag, content, className) {
  const node = document.createElement(tag);
  if (content !== undefined) node.textContent = content;
  if (className) node.className = className;
  return node;
}

function button(text, onClick, className) {
  const node = element('button', text, className);
  node.type = 'button';
  node.addEventListener('click', onClick);
  return node;
}

function readSaved(key) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return null;
  }
}

function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

function line(parent, label, value) {
  const paragraph = element('p');
  paragraph.append(element('strong', label + ' · '), value);
  parent.append(paragraph);
}

let spellCatalog;
async function showSpellReference(panel, spellNames) {
  try {
    spellCatalog ||= fetch('../spells.json').then(response => {
      if (!response.ok) throw new Error();
      return response.json();
    });
    const spells = await spellCatalog;
    const list = element('div');
    for (const name of spellNames) {
      const spell = spells.find(entry => entry.name.toLowerCase() === name.toLowerCase());
      if (!spell) continue;
      list.append(element('h5', spell.name), element('p', [spell.casting_time, spell.range, spell.duration, spell.components.raw].join(' · '), 'note'),
        element('p', spell.description));
    }
    panel.replaceChildren(list);
  } catch {
    spellCatalog = null;
    panel.textContent = 'Spell details are unavailable. Open Quest Table through Live Server to load the spell reference.';
  }
}

let currentHero;
function renderHero(hero) {
  currentHero = hero;
  byId('print-status').replaceChildren();
  heroSheet.replaceChildren(element('h3', hero.name), element('p', 'Level ' + hero.level + ' · ' + hero.raceName + ' · ' + hero.className));
  const stats = element('ul', undefined, 'stats');
  const values = [['HP', hero.hp], ['AC', hero.ac], ['Speed', hero.speed + ' ft.'], ['Initiative', signed(hero.mods[1])]];
  abilities.forEach((ability, index) => values.push([ability, hero.scores[index] + ' (' + signed(hero.mods[index]) + ')']));
  for (const [label, value] of values) {
    const item = element('li', label);
    item.append(element('strong', value));
    stats.append(item);
  }
  heroSheet.append(stats);
  line(heroSheet, 'Attack', hero.attack);
  line(heroSheet, 'Gear', hero.armor + ', ' + classes[hero.className].weapon[0] + ', adventuring pack, and ' + hero.background.gear.toLowerCase() +
    ({ Rogue: ', and thieves’ tools', Cleric: ', and a holy symbol', Wizard: ', spellbook, and component pouch' }[hero.className] || ''));
  line(heroSheet, 'Saving throws', hero.saves.join(' · '));
  line(heroSheet, 'Trained skills', hero.skills.map(skill => skill + ' ' + signed(skillModifier(hero, skill))).join(' · '));
  const otherSkills = element('details');
  otherSkills.append(element('summary', 'Other skill modifiers'), element('p', Object.entries(skillAbilities)
    .filter(([skill]) => !hero.skills.includes(skill))
    .map(([skill]) => skill + ' ' + signed(skillModifier(hero, skill))).join(' · ')));
  heroSheet.append(otherSkills);
  line(heroSheet, 'Background', hero.background.name + '. ' + hero.background.hook);
  line(heroSheet, 'Ancestry traits', hero.trait);
  const features = element('ul');
  hero.features.forEach(feature => features.append(element('li', feature)));
  heroSheet.append(element('h4', 'Class features'), features);
  if (hero.magic) {
    line(heroSheet, 'Spellcasting', 'Attack ' + hero.magic.attack + ' · Save DC ' + hero.magic.dc + ' · Slots ' + hero.magic.slots);
    line(heroSheet, 'Cantrips', hero.magic.cantrips);
    line(heroSheet, 'Prepared spells', hero.magic.prepared.join(', '));
    if (hero.magic.spellbook) line(heroSheet, 'Spellbook', hero.magic.spellbook.join(', '));
  }
  const spellNames = hero.magic ? [...hero.magic.cantrips.split(', '), ...hero.magic.prepared, ...hero.magic.spellbook || []] : [];
  if (hero.raceName === 'High Elf') spellNames.push('Light');
  if (spellNames.length) {
    const reference = element('details');
    const descriptions = element('div', 'Loading spell details…');
    reference.append(element('summary', 'Spell reference'), descriptions);
    reference.addEventListener('toggle', () => {
      if (reference.open) showSpellReference(descriptions, new Set(spellNames));
    });
    heroSheet.append(reference);
  }
  const dieResult = element('span');
  dieResult.setAttribute('role', 'status');
  const diceControls = element('div', undefined, 'actions');
  diceControls.append(button('Roll d20', () => { dieResult.textContent = 'Rolled ' + roll(20); }), dieResult);
  heroSheet.append(diceControls);
  heroSheet.append(element('p', 'On your turn you can move and take an action. For an attack, roll a d20 and add the attack bonus. If the total meets the target’s AC, roll damage.', 'note'));
  heroSheet.hidden = false;
  byId('print').hidden = false;
}

for (const [field, options] of [['race', races], ['heroClass', classes]]) {
  for (const name of Object.keys(options)) generator.elements[field].add(new Option(name, name));
}
for (const field of ['level', 'race', 'heroClass']) {
  const selected = parameters.get(field);
  const control = generator.elements[field];
  if ([...control.options].some(option => option.value === selected)) control.value = selected;
}

const previousHero = readSaved(heroKey);
if (previousHero && Object.hasOwn(classes, previousHero.className)) renderHero(previousHero);
generator.addEventListener('submit', event => {
  event.preventDefault();
  const { level, race, heroClass } = generator.elements;
  const hero = generateHero(Number(level.value), race.value, heroClass.value);
  renderHero(hero);
  const saved = save(heroKey, hero);
  byId('hero-status').textContent = hero.name + (saved ? ' is ready. Saved on this device.' : ' is ready. This browser could not save your sheet.');
});
byId('print').addEventListener('click', () => openPrintSheet(currentHero));

function updateInvite() {
  const qrView = byId('qr');
  const link = byId('join-link');
  const status = byId('qr-status');
  qrView.replaceChildren();
  link.hidden = true;
  status.textContent = '';
  try {
    const url = new URL(byId('join-base').value);
    if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) throw new Error();
    if (['localhost', '127.0.0.1', '[::1]', '0.0.0.0'].includes(url.hostname)) {
      status.textContent = 'Enter an address your players’ phones can reach.';
      return;
    }
    url.hash = '';
    url.search = '';
    url.searchParams.set('view', 'player');
    for (const field of ['level', 'race', 'heroClass']) {
      const value = generator.elements[field].value;
      if (value) url.searchParams.set(field, value);
    }
    link.href = url.href;
    link.hidden = false;
    const code = qrcode(0, 'M');
    code.addData(url.href);
    code.make();
    qrView.innerHTML = code.createSvgTag(5, 20);
    qrView.firstElementChild.setAttribute('role', 'img');
    qrView.firstElementChild.setAttribute('aria-label', 'Scan to open the player character generator');
  } catch {
    status.textContent = link.hidden ? 'Enter the full HTTP or HTTPS address for this page.' : 'Use the player link below. This address could not be encoded.';
  }
}

let session = readSaved(adventureKey);
if (!session || !Object.hasOwn(adventures, session.module) ||
    !Object.hasOwn(adventures[session.module].scenes, session.scene)) session = null;

function changeScene(moduleId, sceneId) {
  const encounter = adventures[moduleId].scenes[sceneId].encounter;
  session = { module: moduleId, scene: sceneId, hp: encounter?.hp ?? null };
  renderScene(save(adventureKey, session));
  sceneView.querySelector('h3').focus();
}

function renderScene(saved = true) {
  if (!session) return;
  const module = adventures[session.module];
  const scene = module.scenes[session.scene];
  const title = element('h3', scene.title);
  title.tabIndex = -1;
  sceneView.replaceChildren(element('p', module.title, 'eyebrow'), title, element('blockquote', scene.text));
  if (scene.npc) line(sceneView, 'NPC', scene.npc);
  if (scene.encounter) {
    const enemy = scene.encounter;
    line(sceneView, enemy.name, 'AC ' + enemy.ac + ' · ' + enemy.attack);
    line(sceneView, 'GM tactics', enemy.tactics);
    const controls = element('div', undefined, 'actions');
    const hp = element('p', 'Enemy HP ' + session.hp + ' / ' + enemy.hp);
    hp.setAttribute('aria-live', 'polite');
    const changeHP = amount => {
      session.hp = Math.max(0, Math.min(enemy.hp, session.hp + amount));
      hp.textContent = 'Enemy HP ' + session.hp + ' / ' + enemy.hp;
      if (!save(adventureKey, session)) persistence.textContent = 'This browser could not save adventure progress.';
    };
    const amount = element('input');
    amount.type = 'number';
    amount.min = '1';
    amount.value = '1';
    const amountLabel = element('label', 'HP to change');
    amountLabel.append(amount);
    const applyHP = sign => {
      if (amount.reportValidity() && Number.isInteger(amount.valueAsNumber)) changeHP(sign * amount.valueAsNumber);
    };
    controls.append(amountLabel, button('Apply damage', () => applyHP(-1)), button('Restore HP', () => applyHP(1)));
    sceneView.append(hp, controls);
  }
  const persistence = element('p', saved ? '' : 'This browser could not save adventure progress.', 'note');
  if (scene.choices) {
    const outcomes = element('p', '', 'note');
    outcomes.setAttribute('role', 'status');
    const actions = element('div', undefined, 'actions');
    for (const [label, success, skill, dc, failure] of scene.choices) {
      actions.append(button(label + (skill ? ' · ' + skill + ' DC ' + dc : ''), () => {
        if (!skill) {
          changeScene(session.module, success);
          return;
        }
        const pass = button('Check passed', () => changeScene(session.module, success));
        const fail = button('Check missed', () => changeScene(session.module, failure));
        outcomes.textContent = skill + ' check, DC ' + dc + '. Have a player roll a d20 and add their skill modifier.';
        result.replaceChildren(pass, fail);
        pass.focus();
      }));
    }
    const result = element('div', undefined, 'actions');
    sceneView.append(element('h4', 'What does the party do?'), actions, outcomes, result);
  } else {
    sceneView.append(element('p', 'Adventure complete.', 'eyebrow'), button('Play this adventure again', () => changeScene(session.module, 'start')));
  }
  sceneView.append(persistence);
  sceneView.hidden = false;
}

if (playerOnly) {
  document.body.classList.add('player-only');
  document.querySelector('h1').textContent = 'Meet your next hero.';
  document.querySelector('.intro > p:last-child').textContent = 'Choose your options, roll a character, and show the sheet to your GM.';
} else {
  byId('join-base').value = location.protocol === 'file:' ? '' : location.origin + location.pathname;
  byId('join-base').addEventListener('input', updateInvite);
  generator.addEventListener('change', updateInvite);
  updateInvite();
  for (const [id, module] of Object.entries(adventures)) {
    const card = element('div', undefined, 'module');
    card.append(element('h3', module.title), element('p', module.duration, 'note'), element('p', module.pitch),
      button('Start ' + module.title, () => {
        if (session && session.scene !== 'start' && adventures[session.module].scenes[session.scene].choices &&
            !window.confirm('Replace the adventure currently in progress?')) return;
        changeScene(id, 'start');
      }, 'primary'));
    byId('modules').append(card);
  }
  renderScene();
}
