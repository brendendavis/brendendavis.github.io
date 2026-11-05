const adventures = {
  lantern: {
    title: 'The Last Lantern', pitch: 'A missing lamplighter and a bell tower full of river fog.',
    duration: '30–45 min · Levels 1–2',
    scenes: {
      start: {
        title: 'Fog at the ferry',
        text: 'The ferry rope pulls taut by itself. Across the water, the town’s last lantern blinks out. A girl in an oversized coat grips the mooring post.',
        npc: 'Nessa, the lamplighter’s apprentice, wants her mentor home. “He took the bell key. He said it was the only thing the river couldn’t swallow.”',
        choices: [['Ask Nessa about the key', 'market'], ['Follow the footprints along the bank', 'bank', 'Survival', 11, 'drift']]
      },
      market: {
        title: 'The ferryman’s bargain',
        text: 'An old ferryman offers you a seat if you promise to return the bell key to the river after dawn.',
        npc: 'Orlo knows the tower has a dry stair behind the floodgate. He fears another winter without safe crossings.',
        choices: [['Promise to return the key and use the dry stair', 'bell'], ['Refuse and cross the slippery bank', 'bank']]
      },
      bank: {
        title: 'Tracks in the reeds',
        text: 'The footprints end at a brass floodgate. A loose rope runs through the reeds. Something below is breathing in time with the current.',
        choices: [['Pull the floodgate open', 'bell', 'Athletics', 12, 'drift'], ['Ring a handbell to draw it out', 'drift']]
      },
      drift: {
        title: 'Reed hound',
        text: 'A hound woven from wet reeds climbs onto the path and lunges.',
        encounter: { name: 'Reed hound', ac: 12, hp: 13, attack: '+3 to hit · 1d6 + 1 piercing', tactics: 'It attacks the nearest hero. It retreats into the water at 3 HP if given room.' },
        choices: [['Drive it off and enter the tower', 'bell'], ['Fall back and ask Orlo for passage', 'market']]
      },
      bell: {
        title: 'The drowned bell',
        text: 'The lamplighter clings to a beam above the bell. The bell key rattles in his fist. He tells you he stole it to keep a river spirit from ringing the town underwater.',
        npc: 'The spirit will release the lamplighter in exchange for a promise to light the river shrine every winter.',
        choices: [['Make the promise and return the key', 'peace'], ['Cut the bell rope and pull him clear', 'rescue', 'Athletics', 12, 'escape']]
      },
      peace: { title: 'A light on the river', text: 'The spirit sets the lamplighter on the stair. At dawn the ferry runs again, and Nessa hangs the first shrine lantern.' },
      rescue: { title: 'The silent tower', text: 'The bell sinks without a sound. You bring the lamplighter home and the town celebrates under a line of hand-carried lanterns.' },
      escape: { title: 'The long swim', text: 'The bell drops early. Everyone reaches shore, but the ferry breaks loose. The lamplighter spends the morning helping the town build a new crossing.' }
    }
  },
  glass: {
    title: 'The Glass Orchard', pitch: 'A stolen seed and a choice about who gets to keep the harvest.',
    duration: '30–45 min · Levels 2–3',
    scenes: {
      start: {
        title: 'Apples at midnight',
        text: 'Glass apples chime in the wind. By morning they will turn to dust unless someone returns the orchard’s heartseed.',
        npc: 'Keeper Ivo saw a masked figure head toward the greenhouse. He offers the party a basket from the first harvest.',
        choices: [['Question Ivo about the orchard', 'keeper'], ['Search for a trail under the trees', 'trail', 'Investigation', 12, 'guardian']]
      },
      keeper: {
        title: 'A debt at the gate',
        text: 'Ivo admits he diverted water from a neighboring hamlet to grow his glass trees. He insists they would have died without it.',
        choices: [['Offer to negotiate a shared water supply', 'greenhouse'], ['Inspect the irrigation gate for another route', 'trail']]
      },
      trail: {
        title: 'A crack in the wall',
        text: 'A trail of sparkling mud leads to a broken window. An animated pruning frame patrols the greenhouse door.',
        choices: [['Slip through the window', 'greenhouse', 'Stealth', 12, 'guardian'], ['Distract the frame and confront it', 'guardian']]
      },
      guardian: {
        title: 'The pruning frame',
        text: 'Iron shears snap shut as the frame blocks the entrance.',
        encounter: { name: 'Pruning frame', ac: 14, hp: 22, attack: '+4 to hit · 1d8 + 2 slashing', tactics: 'It targets whoever comes nearest the greenhouse door. It stops if someone closes the irrigation gate.' },
        choices: [['Disable it and enter the greenhouse', 'greenhouse'], ['Retreat to the gate and talk to Ivo', 'keeper']]
      },
      greenhouse: {
        title: 'The seed keeper',
        text: 'The masked thief is a gardener named Lark. The heartseed sits in a basin and has already sprouted.',
        npc: 'Lark wants enough water to save the hamlet’s crops. She’ll help replant the seed if the hamlet gets a say in how the gate is run.',
        choices: [['Settle on a shared gate schedule', 'accord'], ['Ask Lark to divide the sprout', 'divide', 'Nature', 13, 'wild'], ['Take the whole seed back to Ivo', 'ivo']]
      },
      accord: { title: 'A common harvest', text: 'The two villages share the gate and the first baskets. For the first time, green shoots show between the glass trees.' },
      divide: { title: 'Twin orchards', text: 'Both halves take root. The apples grow smaller, but by the next market day both villages have fruit.' },
      wild: { title: 'The new grove', text: 'The sprout breaks and roots itself in the ditch. By dawn the villagers find a wild grove growing between their two roads.' },
      ivo: { title: 'Ivo’s harvest', text: 'The glass apples survive. Lark leaves with an empty basin, and the hamlet sends a delegation to demand a new water agreement.' }
    }
  }
};
