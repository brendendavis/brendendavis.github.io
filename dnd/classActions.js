
// script.js
function updateClassFeatures() {
    // Suppose you keep classActions in a global variable, or have imported it:
    // import classActions from './classActions.js';
  
    const selectedClass = document.getElementById("characterClass").value;
    const subclass = document.getElementById("characterSubclass").value;
    const level = parseInt(document.getElementById("level").value, 10) || 1;
  
    // Clear existing display
    const classFeatureList = document.getElementById("classFeatureList");
    classFeatureList.innerHTML = "";
  
    // If no class selected, bail out
    if (!selectedClass || !classActions[selectedClass]) return;
  
    // Get the array of actions for this class
    let features = classActions[selectedClass];
  
    // Filter by level, and if feature has a 'subclass' property, match that
    features = features.filter(feature => {
      // If the user’s level is lower than required, skip
      if (level < feature.levelRequired) {
        return false;
      }
      // If the feature is specifically for a certain subclass, skip if mismatched
      if (feature.subclass && feature.subclass !== subclass) {
        return false;
      }
      return true;
    });
  
    // Now create UI elements for each available feature
    features.forEach(feature => {
      const featureDiv = document.createElement("div");
      featureDiv.classList.add("class-feature");
  
      // e.g. "Rage — Bonus Action" or "Sneak Attack — Passive"
      const title = document.createElement("h4");
      title.textContent = `${feature.name} — ${feature.actionType}`;
      featureDiv.appendChild(title);
  
      // Description
      const desc = document.createElement("p");
      desc.innerHTML = feature.description.trim();
      featureDiv.appendChild(desc);
  
      classFeatureList.appendChild(featureDiv);
    });
  }
// classActions.js

const classActions = {
  Barbarian: [
    {
      name: "Rage",
      levelRequired: 1,
      actionType: "Bonus Action",
      description: `
        Enter a rage. While raging, you gain advantage on Strength checks and saves,
        add bonus damage to melee attacks using Strength, and have resistance to
        bludgeoning, piercing, and slashing damage. Rage lasts 1 minute and ends
        early if you’re knocked unconscious or if your turn ends and you haven't
        attacked a hostile creature since your last turn or taken damage.
      `
    },
    {
      name: "Frenzy (Berserker)",
      levelRequired: 3,
      subclass: "Path of the Berserker",
      actionType: "Bonus Action",
      description: `
        When you rage, you can choose to frenzy. You can make a single melee
        weapon attack as a bonus action on each of your turns after this one.
        When your rage ends, you suffer one level of exhaustion.
      `
    }
  ],

  Bard: [
    {
      name: "Bardic Inspiration",
      levelRequired: 1,
      actionType: "Bonus Action",
      description: `
        Choose one creature other than yourself within 60 feet who can hear you.
        That creature gains one Bardic Inspiration die (a d6). For 10 minutes,
        the creature can add it to one ability check, attack roll, or saving throw.
        The die increases in size at higher levels (d8, d10, d12).
      `
    }
  ],

  Cleric: [
    {
      name: "Turn Undead",
      levelRequired: 2,
      actionType: "Action",
      description: `
        Channel Divinity: Turn Undead. As an action, present your holy symbol and
        speak a prayer to drive undead away. Affected undead must succeed on a
        Wisdom saving throw or be turned for 1 minute.
      `
    },
    {
      name: "Destroy Undead",
      levelRequired: 5,
      actionType: "Action",
      description: `
        When an undead creature fails its saving throw against your Turn Undead and
        its challenge rating is low enough, it is instantly destroyed.
      `
    }
  ],

  Druid: [
    {
      name: "Wild Shape",
      levelRequired: 2,
      actionType: "Action",
      description: `
        Transform into a beast you have seen before. You can use this feature twice
        per short rest. While in beast form, you retain your alignment, personality,
        and mental ability scores.
      `
    }
  ],

  Fighter: [
    {
      name: "Action Surge",
      levelRequired: 2,
      actionType: "Action",
      description: `
        Take one additional action on your turn. You can use this feature once per short rest.
      `
    },
    {
      name: "Second Wind",
      levelRequired: 1,
      actionType: "Bonus Action",
      description: `
        Regain hit points equal to 1d10 + your fighter level. You can use this feature once per short rest.
      `
    }
  ],

  Monk: [
    {
      name: "Flurry of Blows",
      levelRequired: 2,
      actionType: "Bonus Action",
      description: `
        After taking the Attack action, spend 1 ki point to make two unarmed strikes as a bonus action.
      `
    },
    {
      name: "Patient Defense",
      levelRequired: 2,
      actionType: "Bonus Action",
      description: `
        Spend 1 ki point to take the Dodge action as a bonus action on your turn.
      `
    },
    {
      name: "Step of the Wind",
      levelRequired: 2,
      actionType: "Bonus Action",
      description: `
        Spend 1 ki point to take the Disengage or Dash action as a bonus action. Your jump distance is doubled for the turn.
      `
    },
    {
      name: "Stunning Strike",
      levelRequired: 5,
      actionType: "Attack",
      description: `
        When you hit a creature with a melee weapon attack, spend 1 ki point to attempt a stunning strike.
        The target must succeed on a Constitution saving throw or be stunned until the end of your next turn.
      `
    }
  ],

  Paladin: [
    {
      name: "Divine Smite",
      levelRequired: 2,
      actionType: "Action",
      description: `
        When you hit a creature with a melee weapon attack, you can expend a spell slot to deal radiant damage
        in addition to the weapon's damage. The extra damage is 2d8 for a 1st-level spell slot, plus 1d8
        for each spell slot level higher than 1st.
      `
    },
    {
      name: "Lay on Hands",
      levelRequired: 1,
      actionType: "Action",
      description: `
        Touch a creature to restore a number of hit points equal to your paladin level multiplied by 5.
        You can also expend any number of points from this pool to cure diseases or neutralize poisons.
      `
    }
  ],

  RangerPHB: [
    {
      name: "Hunter's Mark",
      levelRequired: 1,
      actionType: "Bonus Action",
      description: `
        Mark a creature as your quarry. Until the spell ends, you deal extra damage to the target
        whenever you hit it with a weapon attack. The spell lasts up to 1 hour and requires concentration.
      `
    },
    {
      name: "Natural Explorer",
      levelRequired: 1,
      actionType: "Passive",
      description: `
        You are adept at traveling and surviving in a specific natural environment.
        This grants benefits like enhanced navigation, foraging, and tracking in that terrain.
      `
    }
  ],

  RangerUA: [
    {
      name: "Companion's Bond",
      levelRequired: 3,
      actionType: "Passive",
      description: `
        Your animal companion gains bonuses to AC and damage rolls, and you can command it as a bonus action.
        This bond enhances your combat effectiveness when working together.
      `
    }
  ],

  Rogue: [
    {
      name: "Sneak Attack",
      levelRequired: 1,
      actionType: "Passive",
      description: `
        Once per turn, add extra damage to one creature you hit with an attack if you have advantage
        on the attack roll or an ally is within 5 feet of the target.
      `
    },
    {
      name: "Cunning Action",
      levelRequired: 2,
      actionType: "Bonus Action",
      description: `
        You can take a bonus action on each of your turns in combat to Dash, Disengage, or Hide.
      `
    }
  ],

  Sorcerer: [
    {
      name: "Metamagic",
      levelRequired: 3,
      actionType: "Passive",
      description: `
        Manipulate your spells with Metamagic. Choose options from the sorcerer list to modify your spells as you cast them,
        such as extending their range or increasing damage.
      `
    },
    {
      name: "Sorcery Points",
      levelRequired: 1,
      actionType: "Passive",
      description: `
        You have a pool of sorcery points that can be used to fuel your Metamagic options or converted into additional spell slots.
      `
    }
  ],

  Warlock: [
    {
      name: "Eldritch Invocations",
      levelRequired: 2,
      actionType: "Passive",
      description: `
        Gain invocations that grant you new abilities and enhance your spells. Choose from the warlock invocation list
        to customize your powers.
      `
    },
    {
      name: "Pact Magic",
      levelRequired: 1,
      actionType: "Passive",
      description: `
        Cast spells using your Pact Magic feature. You regain spell slots after a short rest,
        and the slots are of a fixed level determined by your warlock level.
      `
    }
  ],

  Wizard: [
    {
      name: "Spellcasting",
      levelRequired: 1,
      actionType: "Action",
      description: `
        Cast spells from your spellbook. Prepare a number of spells equal to your Intelligence modifier plus your wizard level,
        offering a versatile array of magical effects.
      `
    },
    {
      name: "Arcane Recovery",
      levelRequired: 1,
      actionType: "Rest",
      description: `
        Once per day when you finish a short rest, you can recover expended spell slots with a combined level
        equal to half your wizard level (rounded up).
      `
    }
  ],

  BeastCompanion: [
    {
      name: "Beast Companion Actions",
      levelRequired: 1,
      actionType: "Passive",
      description: `
        Your animal companion acts on its own initiative using its own stat block.
        You can command it as a bonus action to attack or take other actions in combat.
      `
    }
  ]
};


  