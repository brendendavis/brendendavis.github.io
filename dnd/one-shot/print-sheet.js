const skillAbilities = {
  Acrobatics: 1, 'Animal Handling': 4, Arcana: 3, Athletics: 0, Deception: 5, History: 3,
  Insight: 4, Intimidation: 5, Investigation: 3, Medicine: 4, Nature: 3, Perception: 4,
  Performance: 5, Persuasion: 5, Religion: 3, 'Sleight of Hand': 1, Stealth: 1, Survival: 4
};

function skillModifier(hero, skill) {
  const proficiency = hero.className === 'Rogue' && skill === 'Stealth' ? 4 : 2;
  return hero.mods[skillAbilities[skill]] + (hero.skills.includes(skill) ? proficiency : 0);
}

async function fillPrintSheet(template, hero) {
  const pdf = await PDFLib.PDFDocument.load(template);
  const font = await pdf.embedFont(PDFLib.StandardFonts.Helvetica);
  const bold = await pdf.embedFont(PDFLib.StandardFonts.HelveticaBold);

  // The coordinates are measured from the top left of the supplied sheet.
  function writer(page) {
    const scaleX = page.getWidth() / 723;
    const scaleY = page.getHeight() / 935;
    return {
      text(value, x, baseline, size = 12, options = {}) {
        const face = options.bold ? bold : font;
        const text = String(value);
        const width = face.widthOfTextAtSize(text, size);
        page.drawText(text, {
          x: (x - (options.center ? width / 2 : 0)) * scaleX,
          y: page.getHeight() - baseline * scaleY,
          size: size * scaleX,
          font: face
        });
      },
      block(value, x, baseline, maxWidth, size = 11) {
        let row = '';
        for (const word of value.split(/\s+/)) {
          const next = row ? row + ' ' + word : word;
          if (row && font.widthOfTextAtSize(next, size) > maxWidth) {
            this.text(row, x, baseline, size);
            baseline += size * 1.3;
            row = word;
          } else {
            row = next;
          }
        }
        if (row) this.text(row, x, baseline, size);
        return baseline + size * 1.7;
      },
      dot(x, y) {
        page.drawCircle({ x: x * scaleX, y: page.getHeight() - y * scaleY, size: 2 * scaleX });
      }
    };
  }

  const [mainPage, bioPage, magicPage] = pdf.getPages();
  const main = writer(mainPage);
  const job = classes[hero.className];
  const center = { center: true, bold: true };
  main.text(hero.name, 64, 92, 21, { bold: true });
  main.text(hero.className + ' ' + hero.level, 319, 71);
  main.text(hero.background.name, 453, 71);
  main.text(hero.raceName, 319, 101);
  main.text('+2', 129, 214, 12, center);
  hero.scores.forEach((score, index) => {
    const offset = index * 84.5;
    main.text(signed(hero.mods[index]), 67, 207 + offset, 23, center);
    main.text(score, 67, 232 + offset, 12, center);
    const save = abilities[index];
    main.text(signed(hero.mods[index] + (job.saves.includes(save) ? 2 : 0)), 141, 252 + index * 16, 9, { center: true });
    if (job.saves.includes(save)) main.dot(123, 249 + index * 16);
  });
  Object.keys(skillAbilities).forEach((skill, index) => {
    main.text(signed(skillModifier(hero, skill)), 141, 388 + index * 16, 9, { center: true });
    if (hero.skills.includes(skill)) main.dot(123, 385 + index * 16);
  });
  main.text(hero.ac, 293, 193, 19, center);
  main.text(signed(hero.mods[1]), 358, 193, 19, center);
  main.text(hero.speed + ' ft.', 428, 193, 16, center);
  main.text(hero.hp, 349, 243, 11);
  main.text(hero.hp, 361, 278, 23, center);
  main.text(hero.level + 'd' + job.die, 305, 385, 11);
  main.text(10 + skillModifier(hero, 'Perception'), 51, 712, 12, center);

  const [weapon, ability, dice, damageType] = job.weapon;
  main.text(weapon, 267, 476, 10);
  main.text(signed(hero.mods[ability] + 2), 362, 476, 10, { center: true });
  main.text(dice + signed(hero.mods[ability] + (job.damageBonus || 0)) + ' ' + damageType, 390, 476, 8);
  if (hero.magic) {
    main.block('Spell attack ' + hero.magic.attack + '. Spell save DC ' + hero.magic.dc + '.', 270, 552, 183);
  }
  main.block(hero.background.hook, 499, 181, 170);
  let gearLine = 716;
  const gear = [hero.armor, weapon, 'Adventuring pack', hero.background.gear];
  const classGear = { Rogue: 'Thieves’ tools', Cleric: 'Holy symbol', Wizard: 'Spellbook and component pouch' };
  if (classGear[hero.className]) gear.push(classGear[hero.className]);
  for (const item of gear) gearLine = main.block(item, 321, gearLine, 132, 10);

  let featureLine = main.block(hero.trait, 491, 469, 184);
  for (const feature of hero.features) featureLine = main.block(feature, 491, featureLine, 184);

  const bio = writer(bioPage);
  bio.text(hero.name, 64, 97, 21, { bold: true });
  const backgroundLine = bio.block('Background: ' + hero.background.name, 46, 477, 184);
  bio.block(hero.background.hook, 46, backgroundLine, 184);

  if (hero.magic || hero.raceName === 'High Elf') {
    const magic = writer(magicPage);
    magic.text(hero.magic ? hero.className : hero.raceName, 66, 96, 20, { bold: true });
    magic.text(hero.magic ? abilities[job.casting] : 'INT', 373, 88, 18, center);
    magic.text(hero.magic ? hero.magic.dc : 10 + hero.mods[3], 491, 88, 18, center);
    magic.text(hero.magic ? hero.magic.attack : signed(2 + hero.mods[3]), 615, 88, 18, center);
    const cantrips = hero.magic ? hero.magic.cantrips.split(', ') : [];
    if (hero.raceName === 'High Elf') cantrips.push('Light (ancestry)');
    cantrips.forEach((name, index) => magic.text(name, 42, 216 + index * 16.5, 11));
    if (hero.magic) {
      magic.text([2, 3, 4][hero.level - 1], 89, 388, 16, center);
      if (hero.level === 3) magic.text(2, 89, 655, 16, center);
      const secondLevel = new Set([...job.second, ...(job.domain?.[1] || [])]);
      const spells = hero.magic.spellbook || hero.magic.prepared;
      for (const [level, baseline] of [[1, 419], [2, 686]]) {
        spells.filter(name => secondLevel.has(name) === (level === 2)).forEach((name, index) => {
          const y = baseline + index * 16.5;
          magic.text(name, 51, y, 11);
          if (hero.magic.prepared.includes(name)) magic.dot(42, y - 3);
        });
      }
    }
  } else {
    pdf.removePage(2);
  }

  pdf.setTitle(hero.name + ' - Character Sheet');
  return pdf.save();
}

async function openPrintSheet(hero) {
  const preview = window.open('', '_blank');
  const status = document.getElementById('print-status');
  status.textContent = 'Preparing the printable PDF…';
  try {
    const response = await fetch('../dnd%20character%20sheet.pdf');
    if (!response.ok) throw new Error('Template unavailable');
    const bytes = await fillPrintSheet(await response.arrayBuffer(), hero);
    const url = URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' }));
    if (preview && !preview.closed) {
      preview.opener = null;
      preview.location.replace(url);
    } else {
      const link = document.createElement('a');
      link.href = url;
      link.textContent = 'Open printable PDF';
      status.replaceChildren(link);
      return;
    }
    status.textContent = 'Use the print control in the PDF preview.';
  } catch {
    preview?.close();
    status.textContent = 'The printable PDF could not be loaded. Check that the template is still in the project folder and open Quest Table through Live Server.';
  }
}
