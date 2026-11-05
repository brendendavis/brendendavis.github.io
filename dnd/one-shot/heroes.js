const abilities = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'];
const races = {
  Human: { bonus: [1, 1, 1, 1, 1, 1], speed: 30, trait: 'Common and one extra language.' },
  'Hill Dwarf': { bonus: [0, 0, 2, 0, 1, 0], speed: 25, trait: 'Darkvision 60 ft., poison resistance and advantage on saves against poison. +1 maximum HP per level.', extraHP: 1 },
  'High Elf': { bonus: [0, 2, 0, 1, 0, 0], speed: 30, trait: 'Darkvision 60 ft., Perception proficiency, advantage against charm, and four-hour trance. You know the Light cantrip.' },
  'Lightfoot Halfling': { bonus: [0, 2, 0, 0, 0, 1], speed: 25, trait: 'Reroll natural 1s on d20 rolls, take advantage against fear, and move through larger creatures’ spaces.' },
  'Half-Orc': { bonus: [2, 0, 1, 0, 0, 0], speed: 30, trait: 'Darkvision 60 ft., Intimidation proficiency, one extra weapon die on melee crits, and once per long rest drop to 1 HP instead of 0 when eligible.' },
  'Rock Gnome': { bonus: [0, 0, 1, 2, 0, 0], speed: 25, trait: 'Darkvision 60 ft. and advantage on INT, WIS, and CHA saves against magic. You can build tiny clockwork devices.' }
};

const classes = {
  Fighter: {
    order: [0, 2, 1, 4, 5, 3], die: 10, saves: ['STR', 'CON'], skills: ['Athletics', 'Perception'],
    armor: 'Chain mail and shield', ac: () => 18, weapon: ['Longsword', 0, '1d8', 'slashing'],
    features: [
      'Dueling adds +2 to your longsword damage. Second Wind lets you heal 1d10 + your level as a bonus action once per short or long rest.',
      'Action Surge gives you an extra action on your turn once per short or long rest.',
      'Champion. Your weapon attacks score a critical hit on a natural 19 or 20.'
    ],
    damageBonus: 2
  },
  Rogue: {
    order: [1, 2, 3, 4, 5, 0], die: 8, saves: ['DEX', 'INT'], skills: ['Stealth', 'Investigation', 'Acrobatics', 'Sleight of Hand'],
    armor: 'Leather armor', ac: dex => 11 + dex, weapon: ['Rapier', 1, '1d8', 'piercing'],
    features: [
      'Expertise doubles proficiency for Stealth and thieves’ tools. You know Thieves’ Cant.',
      'Cunning Action lets you Dash, Disengage, or Hide as a bonus action.',
      'Thief. Use an object, pick a lock, disarm a trap, or make a Sleight of Hand check as a bonus action. Climbing costs no extra movement.'
    ]
  },
  Cleric: {
    order: [4, 2, 0, 1, 5, 3], die: 8, saves: ['WIS', 'CHA'], skills: ['Insight', 'Medicine'],
    armor: 'Scale mail and shield (disadvantage on Stealth)', ac: dex => 16 + Math.min(2, dex), weapon: ['Mace', 0, '1d6', 'bludgeoning'],
    features: [
      'Life Domain. When you heal with a leveled spell, add 2 + the spell level to the healing.',
      'Channel Divinity once per short or long rest. Turn nearby undead or use Preserve Life to divide up to 5 × your level in healing among creatures within 30 ft., up to half their maximum HP.',
      'Second-level spells are available.'
    ],
    casting: 4, cantrips: 'Guidance, Sacred Flame, Thaumaturgy',
    first: ['Healing Word', 'Guiding Bolt', 'Sanctuary', 'Command', 'Protection from Evil and Good'],
    second: ['Aid'],
    domain: [['Bless', 'Cure Wounds'], ['Lesser Restoration', 'Spiritual Weapon']]
  },
  Wizard: {
    order: [3, 1, 2, 4, 5, 0], die: 6, saves: ['INT', 'WIS'], skills: ['Arcana', 'History'],
    armor: 'Travel clothes', ac: dex => 10 + dex, weapon: ['Dagger', 1, '1d4', 'piercing'],
    features: [
      'Arcane Recovery. After one short rest each day, recover spell slots totaling up to half your wizard level, rounded up. You can cast ritual spells from your spellbook.',
      'School of Evocation. When an evocation spell affects allies, you can protect a number equal to 1 + the spell’s level. They automatically pass its save and take no damage if a passed save normally halves it.',
      'Second-level spells are available.'
    ],
    casting: 3, cantrips: 'Fire Bolt, Mage Hand, Minor Illusion',
    first: ['Mage Armor', 'Magic Missile', 'Shield', 'Sleep', 'Detect Magic', 'Find Familiar', 'Burning Hands', 'Feather Fall'],
    second: ['Misty Step', 'Scorching Ray']
  }
};

const names = ['Aster', 'Briar', 'Corin', 'Ember', 'Fenn', 'Juniper', 'Mira', 'Rowan', 'Sable', 'Tamsin'];
const surnames = ['Ashbrook', 'Brightforge', 'Copperleaf', 'Dawnmere', 'Fernwatch', 'Stonewake'];
const backgrounds = [
  { name: 'Caravan scout', hook: 'You always offer to take the first watch.', skills: ['Survival', 'Animal Handling'], gear: 'Bedroll, mess kit, and a hand-drawn map' },
  { name: 'Village artisan', hook: 'You never leave a tool behind.', skills: ['Persuasion', 'Insight'], gear: 'Artisan’s tools, a trade token, and travel clothes' },
  { name: 'Archive apprentice', hook: 'You collect a story in every town.', skills: ['History', 'Investigation'], gear: 'Notebook, ink, and a letter from your mentor' }
];

const pick = list => list[Math.floor(Math.random() * list.length)];
const modifier = score => Math.floor((score - 10) / 2);
const signed = number => number < 0 ? String(number) : '+' + number;
const roll = sides => 1 + Math.floor(Math.random() * sides);

function generateHero(level, raceName, className) {
  raceName ||= pick(Object.keys(races));
  className ||= pick(Object.keys(classes));
  const race = races[raceName];
  const job = classes[className];
  const background = pick(backgrounds);
  const scores = [...race.bonus];
  job.order.forEach((ability, index) => scores[ability] += [15, 14, 13, 12, 10, 8][index]);
  const mods = scores.map(modifier);
  const [weapon, ability, dice, damageType] = job.weapon;
  const features = job.features.slice(0, level);
  if (className === 'Rogue') {
    features.unshift('Sneak Attack. Once per turn add ' + (level === 3 ? '2d6' : '1d6') +
      ' to a finesse or ranged hit when you have advantage, or an ally is next to the target and you have no disadvantage.');
  }
  const racialSkill = { 'High Elf': 'Perception', 'Half-Orc': 'Intimidation' }[raceName];
  const skills = [...job.skills];
  for (const skill of [racialSkill, ...background.skills].filter(Boolean)) {
    skills.push(skills.includes(skill) ? ['Nature', 'Deception', 'Performance'].find(replacement => !skills.includes(replacement)) : skill);
  }
  let magic = null;
  if (job.casting !== undefined) {
    const prepared = Math.max(1, level + mods[job.casting]);
    const second = level === 3 ? job.second : [];
    const domain = job.domain ? [...job.domain[0], ...(level === 3 ? job.domain[1] : [])] : [];
    const available = [...second, ...job.first.slice(0, 6 + 2 * (level - 1) - second.length)];
    magic = {
      attack: signed(2 + mods[job.casting]), dc: 10 + mods[job.casting],
      slots: ['2 first-level', '3 first-level', '4 first-level and 2 second-level'][level - 1],
      cantrips: job.cantrips, prepared: [...domain, ...available.slice(0, prepared)],
      spellbook: className === 'Wizard' ? available : null
    };
  }
  return {
    name: pick(names) + ' ' + pick(surnames), level, raceName, className, background,
    scores, mods, ac: job.ac(mods[1]), hp: job.die + (level - 1) * (job.die / 2 + 1) + level * (mods[2] + (race.extraHP || 0)),
    speed: race.speed, trait: race.trait, armor: job.armor, features, skills, magic,
    saves: abilities.map((key, index) => key + ' ' + signed(mods[index] + (job.saves.includes(key) ? 2 : 0))),
    attack: weapon + ' ' + signed(mods[ability] + 2) + ' to hit, ' + dice + signed(mods[ability] + (job.damageBonus || 0)) + ' ' + damageType
  };
}
