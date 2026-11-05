const adventures = {
  lantern: {
    title: 'The Last Lantern',
    pitch: 'Rescue a missing lamplighter before the river takes the ferry town.',
    duration: 'Plan for 35–55 min · Levels 1–2 · 3–5 players',
    brief: 'Budget 5–8 minutes for the ferry landing, 8–12 for the crossing, 8–12 for the tower, and 12–20 for the rescue and aftermath. With two heroes or a party new to combat, start the reed hound at 9 HP and the bell warden at 12 HP. For a shorter game, skip the salvage loft and give the lantern puzzle hint immediately.',
    scenes: {
      start: {
        title: 'Fog at the ferry', phase: '1 / The job',
        text: 'The ferry rope pulls taut by itself. Across the water, the town’s last lantern blinks out. A girl in an oversized coat grips the mooring post. “Can you bring my teacher back before the third bell?”',
        npc: 'Nessa, the lamplighter’s apprentice, offers 10 gp per hero from the lamplighters’ box. She last saw Marek take the brass bell key and a rescue rope toward the tower. If asked why, she admits he heard someone calling for help inside the bell.',
        notes: [
          'Ask each player what their hero is doing at the landing and which piece of gear they bring out first.',
          'Show the route choices in the fiction. The ferry is fast but exposed. The bank is sheltered but the water has covered parts of the path. Give Nessa’s information freely if players ask.'
        ],
        choices: [['Ask Orlo for passage on the ferry', 'market'], ['Take the towpath into the reeds', 'bank']]
      },
      market: {
        title: 'The ferryman’s bargain', phase: '2 / Cross the river',
        text: 'Orlo braces one boot against the ferry rail. A red bundle drifts past. Something inside it knocks twice on the hull.',
        npc: 'Orlo wants the crossing kept open through winter. He saw Marek place a lantern in a dry alcove under the tower and can show you the landing. He asks the party to bring the ferry’s old brass nameplate back if they find it.',
        notes: ['Give the party a moment to decide who handles the pole and who watches the water. The bundle is Marek’s spare coat. Its pockets contain a spool of dry wick, which can help with the tower lamps.'],
        choices: [['Secure the ferry with a line and land at the stair', 'landing', 'Athletics', 11, 'washed'], ['Take the towpath with Orlo’s directions', 'bank']]
      },
      bank: {
        title: 'Tracks in the reeds', phase: '2 / Cross the river',
        text: 'Bootprints end at a brass floodgate. Through its bars you can see a stone stair. A line of reeds on your side bends against the current as if something were stalking you.',
        notes: ['Players who inspect the gate find that its counterweight has snagged on a root. Cutting the root from dry ground opens it without a roll. Fish or a thrown ration can draw the creature away. A noisy attempt brings it to the path.'],
        choices: [['Free the counterweight or distract the creature', 'landing'], ['Wade to the gate and lift it by hand', 'landing', 'Athletics', 12, 'drift'], ['Confront whatever is in the reeds', 'drift']]
      },
      washed: {
        title: 'The ferry breaks loose', phase: '2 / Cross the river',
        text: 'The mooring gives with a crack. The ferry slews sideways and grounds under the tower stair. Orlo is in the shallows, tangled in the trailing line.',
        notes: ['Ask one hero to keep the ferry from shifting and another to free Orlo. If the group uses a rope, pole, or clever spell, they succeed. Otherwise the rescuer takes 1d4 bludgeoning damage as the hull bumps the stair. Orlo stays behind to secure the boat.'],
        choices: [['Get Orlo to safety and climb to the landing', 'landing']]
      },
      drift: {
        title: 'The reed hound', phase: '2 / Cross the river',
        text: 'A hound woven from wet reeds rises onto the towpath. A torn red sleeve is caught in its teeth. It lowers its head between you and the gate.',
        encounter: { name: 'Reed hound', ac: 12, hp: 13, attack: '+3 to hit · 1d6 + 1 piercing', tactics: 'Roll initiative with +1 for the hound. It rushes the nearest creature who steps toward the gate. It gives ground if offered food and backs into the river at 3 HP if left a clear route.' },
        notes: ['Show players the gate lever, a dry stone ledge, and the loose tow rope. On their turns, let players use those objects instead of attacking. If the party retreats, they can regroup with Orlo.'],
        choices: [['The way is clear. Enter the tower', 'landing'], ['Retreat to the ferry', 'market']]
      },
      landing: {
        title: 'The keeper’s landing', phase: '3 / Explore the tower',
        text: 'A wet boot hangs over the rail above. The lower stair ends at a sealed lamp door, and a ladder leads to a salvage loft. From somewhere overhead, the bell tolls a second time.',
        notes: ['Marek’s rescue rope is knotted to the stair rail. Let the party take it or leave it anchored for the rescue. Explain that the loft will cost time in the fiction, but may contain something useful.'],
        choices: [['Search the salvage loft', 'loft'], ['Examine the sealed lamp door', 'lamps']]
      },
      loft: {
        title: 'The salvage loft', phase: '3 / Explore the tower',
        text: 'Crates of river salvage crowd the loft. A black iron hook pins a ferry nameplate to the wall. Under it lies an oilskin ledger, open to a page where three winters have been scratched out.',
        notes: ['The ferry nameplate belongs to Orlo. The hook is a boat hook long enough to snag Marek’s harness from the platform. The ledger records that the town once lit a shrine each winter and stopped three winters ago. Give all three discoveries freely if the players search.'],
        choices: [['Gather what you need and head to the lamp door', 'lamps']]
      },
      lamps: {
        title: 'Three lamps, one door', phase: '3 / Explore the tower',
        text: 'Three unlit lamps sit in a row under the sealed door. They bear the marks of a window, a ferry, and a shrine. Each has a working wick.',
        handout: ['The window lights the way to the ferry.', 'The shrine is tended after the crossing.', 'Light them in the order a traveler would see them.'],
        notes: ['Ask for the order before showing the outcome buttons. The answer is window, ferry, shrine. If the players stall, Nessa’s chalk arrow runs from the window lamp toward the river. A wrong order releases hot steam for 1d4 fire damage to the nearest hero and resets the lamps. A DC 12 Investigation check can identify the reset lever and open the door from the side.'],
        choices: [['The party gives the correct order', 'bell'], ['Bypass the mechanism from the side', 'bell', 'Investigation', 12, 'steam'], ['Force the door or proceed after a wrong order', 'steam']]
      },
      steam: {
        title: 'The emergency latch', phase: '3 / Explore the tower',
        text: 'Steam bursts from the doorframe. As the cloud thins you see a red latch behind the hinge. Pulling it swings the door open, but the iron stair beyond is slick.',
        notes: ['The nearest hero takes 1d4 fire damage from the burst, if they haven’t already. Let the party cross safely with their rope or proceed slowly. Keep this consequence to one roll of damage.'],
        choices: [['Climb to the bell platform', 'bell']]
      },
      bell: {
        title: 'The drowned bell', phase: '4 / Rescue Marek',
        text: 'Marek hangs from a beam above the bell, the brass key looped around his wrist. Water crawls up the stones in thin silver veins. A face gathers in the surface. “Who will keep the light when winter comes?”',
        npc: 'Marek took the key after the council refused to relight the shrine. The river spirit wants a concrete pledge and proof someone understands the old custom. It will offer safe passage if a hero names who will tend the shrine and how the town will keep it lit.',
        notes: ['Ask two different players what they contribute. They can negotiate, secure a line, distract the spirit, or try to move Marek. If they saw the ledger, mention that it names the old obligation. A sincere, specific offer works without a roll. A rope and boat hook make a secured rescue possible.'],
        choices: [['Offer a specific pledge and return the key', 'pledge'], ['Rig a line to pull Marek off the beam', 'rescueLine'], ['Take the key by force', 'warden']]
      },
      pledge: {
        title: 'Keep the lantern lit', phase: '4 / Rescue Marek',
        text: 'The silver face holds out an empty hand. Marek can almost reach the platform. The bell’s clapper begins to rise.',
        notes: ['Ask who makes the promise, what they offer as a first sign of good faith, and who catches Marek. If the offer is concrete, the spirit holds the bell and accepts. If the party changes its mind, use the rescue line or have the warden rise.'],
        choices: [['Seal the promise and catch Marek', 'peace'], ['Switch to a rope rescue', 'rescueLine'], ['Break off the bargain and seize the key', 'warden']]
      },
      rescueLine: {
        title: 'A rope over the bell', phase: '4 / Rescue Marek',
        text: 'The beam tilts. Marek can move one hand at a time, and each swing brings him closer to the lip of the bell.',
        notes: ['Ask where the line is anchored, who gets it to Marek, and who pulls. An anchored rope and the boat hook make the rescue automatic. For a risky grab, have one hero roll with advantage if another can steady them. A miss saves Marek but costs the ferry its landing.'],
        choices: [['Pull him clear with a secured rig', 'rescue'], ['Make a risky grab across the bell', 'rescue', 'Athletics', 12, 'escape']]
      },
      warden: {
        title: 'The bell warden', phase: '4 / Rescue Marek',
        text: 'The river face vanishes. The chain below the clapper rises like a spine and drags a dripping iron figure onto the platform.',
        encounter: { name: 'Bell warden', ac: 13, hp: 20, attack: '+3 to hit · 1d6 + 2 bludgeoning', tactics: 'Initiative +0. It strikes once per turn, favoring anyone holding the key. A hero can spend an action wedging the clapper with a sturdy object. While the wedge holds, the warden stays by the bell instead of pursuing fleeing heroes.' },
        notes: ['Keep Marek’s rescue visible during combat. A hero can spend a turn securing him while others draw the warden away. If the party gets Marek clear, they can leave the fight without defeating the warden.'],
        choices: [['The warden is down. Haul Marek clear', 'rescue'], ['Leave under cover with the rescued Marek', 'escape'], ['Stop fighting and offer the shrine pledge', 'pledge']]
      },
      peace: { title: 'A light on the river', phase: '5 / Aftermath', text: 'The spirit sets Marek on the stair. At dawn the ferry runs again, and Nessa hangs the first shrine lantern.', notes: ['Nessa pays 10 gp each. Orlo returns the party’s kindness with free crossings if they brought back his nameplate. Ask each player what their hero does when the lantern is lit.'] },
      rescue: { title: 'The silent tower', phase: '5 / Aftermath', text: 'The bell sinks without a sound. Marek comes home wrapped in Orlo’s coat. The town celebrates under a line of hand-carried lanterns.', notes: ['Nessa pays 10 gp each. Ask whether anyone tells the council about the ledger and the old promise. Marek offers to show the party where the next river shrine lies.'] },
      escape: { title: 'The long swim', phase: '5 / Aftermath', text: 'The bell drops early. Everyone reaches shore, but the ferry landing splits apart. Marek is the first to pick up a hammer at dawn.', notes: ['Nessa pays the agreed reward for Marek’s return. Ask each hero what they contribute to the new crossing. Orlo names its first plank after the hero who helped him.'] }
    }
  },
  glass: {
    title: 'The Glass Orchard',
    pitch: 'Find a stolen seed and decide which village gets the water that keeps it alive.',
    duration: 'Plan for 40–60 min · Levels 2–3 · 3–5 players',
    brief: 'Budget 5–8 minutes for the job, 8–12 for the investigation, 10–15 for the greenhouse approach, and 15–20 for the negotiation and finale. For two heroes, start the pruning frame at 14 HP and the spillway root at 15 HP. If time is short, let the party read the gate instructions clearly and run the finale as a cooperative rescue.',
    scenes: {
      start: {
        title: 'Apples at midnight', phase: '1 / The job',
        text: 'Glass apples chime in the wind. One drops, turns white, and breaks into powder before it hits the ground. Keeper Ivo hurries toward you holding an empty copper basket. “Someone took the heartseed. By sunrise we’ll have nothing left to sell.”',
        npc: 'Ivo offers 15 gp per hero to retrieve the heartseed alive. He saw a masked figure heading toward the greenhouse. He claims the orchard is watered by a spring on his land.',
        notes: ['Ask what brought each hero to the orchard tonight. The gatehouse lamp is lit, and sparkling mud marks a trail between the rows. Let the group choose where to start.'],
        choices: [['Question Ivo at the gatehouse', 'keeper'], ['Investigate the trail between the trees', 'trail']]
      },
      keeper: {
        title: 'A debt at the gate', phase: '2 / Investigate',
        text: 'A wooden gauge on the gatehouse wall shows a full orchard channel and an empty village branch. Ivo closes a ledger before you can read the last entry.',
        npc: 'Ivo diverted the hamlet’s water to save his trees. He fears losing the harvest and the wages it pays. If pressed, he admits that the old gate can serve both channels, but claims nobody knows how to set it anymore.',
        notes: ['The ledger shows a canceled maintenance payment to Lark, a gardener from the hamlet. Show it freely if a player asks to examine the records. An honest promise to hear both villages out gets Ivo’s cooperation.'],
        choices: [['Look for evidence along the dry channel', 'ditch'], ['Follow the trail through the orchard', 'trail']]
      },
      trail: {
        title: 'The broken sapling', phase: '2 / Investigate',
        text: 'A fresh break in a sapling glows white in the dark. A wet scrap of green cloth hangs from it. The muddy tracks split at the dry irrigation ditch.',
        notes: ['One track is a person in work boots. The other is the straight groove of an iron wheel. The figure took the ditch route and the wheel belongs to the greenhouse guard. A careful search reveals a maintenance badge engraved with the name Lark.'],
        choices: [['Search the tracks and look for the badge', 'ditch', 'Investigation', 12, 'spill'], ['Follow the dry ditch directly', 'ditch']]
      },
      spill: {
        title: 'The drop into the ditch', phase: '2 / Investigate',
        text: 'The bank slumps. A shelf of loose glass skids down ahead of you and catches on a fallen branch.',
        notes: ['The searching hero makes a DC 10 Dexterity save, taking 1d4 slashing damage on a miss. Another hero can pull them back with a rope and avoid the save. At the bottom, the broken branch points toward a worker’s alcove.'],
        choices: [['Continue to the worker’s alcove', 'ditch']]
      },
      ditch: {
        title: 'The worker’s alcove', phase: '2 / Investigate',
        text: 'Inside an old tool niche sits a child’s cup and a row of dry seed packets. The newest note reads, “Third day without water. Lark, please ask him again.” Above you, shears scrape against the greenhouse door.',
        notes: ['A hooked pole can hold the greenhouse window open and can also brace a sluice wheel later. The empty cup and note are enough to establish what happened in the hamlet. Ask what the party wants to do with that information.'],
        choices: [['Work out how to stop the guard using the gate', 'sluice'], ['Approach the greenhouse window', 'window'], ['Confront the guard at the door', 'guardian']]
      },
      sluice: {
        title: 'The three handles', phase: '3 / Enter the greenhouse',
        text: 'A bronze plate hangs beside three handles. One shows a wheel, one a fruit tree, and one a house. Water rattles inside the wall, and the pruning frame twitches with each pulse.',
        handout: ['Wheel — powers the pruning frame.', 'Tree — feeds the glass orchard.', 'House — feeds the hamlet.', 'Closing either branch sends all remaining flow down the other.'],
        notes: ['To stop the guard without depriving either village, close the wheel handle and leave the tree and house branches open. Give players a chance to describe the setting. If they misread the plate, the frame sounds a warning and rolls over to investigate. They can also walk away and try the window.'],
        choices: [['The party sets the handles correctly', 'greenhouse'], ['The frame comes to investigate', 'guardian'], ['Leave the handles alone and try the window', 'window']]
      },
      window: {
        title: 'A crack in the wall', phase: '3 / Enter the greenhouse',
        text: 'Warm mist spills from the cracked window. The latch is reachable through the gap, but a strip of hanging glass will ring if the sash bumps it.',
        notes: ['A hero can pad the hanging glass with a cloak and hold the sash with the hooked pole. If the party describes a quiet solution, let it work. Otherwise have the person opening the window roll once for the group.'],
        choices: [['Pad the glass and prop the sash', 'greenhouse'], ['Slip through without making a sound', 'greenhouse', 'Stealth', 12, 'guardian']]
      },
      guardian: {
        title: 'The pruning frame', phase: '3 / Enter the greenhouse',
        text: 'Iron shears snap shut. The frame turns its single wheel across the entrance and raises a painted arm marked “KEEP CLEAR.”',
        encounter: { name: 'Pruning frame', ac: 14, hp: 22, attack: '+4 to hit · 1d8 + 2 slashing', tactics: 'Initiative +0. It makes one attack on the closest hero who enters its reach. It cannot fit through the window or leave the stone track. A hero can spend an action blocking its track with a pole or crate. Shutting the wheel handle stops it.' },
        notes: ['Point out the track, gate controls, and stacked crates before initiative. The party can fight, distract it while others enter, or shut it off.'],
        choices: [['The frame is stopped or blocked. Enter the greenhouse', 'greenhouse'], ['Get clear and use the gate controls', 'sluice']]
      },
      greenhouse: {
        title: 'The seed keeper', phase: '4 / Choose a future',
        text: 'The masked figure lowers her scarf. A copper basin on the bench holds the heartseed, already rooted through the drain. The room shivers when Lark moves her hand toward it.',
        npc: 'Lark used to maintain the gate. She took the seed to force Ivo to listen, then realized the roots would tear if moved dry. She’ll help replant it if the hamlet gets water and a say in how the gate is run.',
        notes: ['Ask each player who they trust and what outcome they want. Lark can divide the sprout if the party keeps both cut ends wet. Ivo can be summoned to negotiate a schedule. If the party takes the entire sprout, Lark opens the hamlet branch herself and leaves.'],
        choices: [['Invite Ivo and negotiate a shared gate schedule', 'parley'], ['Help Lark divide the sprout between the villages', 'cutting'], ['Take the whole sprout back to Ivo', 'spillwayReturn']]
      },
      parley: {
        title: 'Two keys for the gate', phase: '4 / Choose a future',
        text: 'Ivo and Lark face one another over the basin. Behind them the pipes knock three times. Ivo places the only gate key on the table.',
        notes: ['Ask who gets a key, who pays for upkeep, and how to split water in a dry week. Both accept a plan that gives each village access and makes the schedule visible. If the players can’t agree, Lark offers to divide the seed. Then the pipe beneath the bench bursts.'],
        choices: [['Both sides accept the terms. Save the shared channel', 'spillway'], ['Divide the seed instead', 'cutting']]
      },
      cutting: {
        title: 'Two cuttings', phase: '4 / Choose a future',
        text: 'Lark slides a clean knife under the stem. The second root has curled tight around the drain. One basin is ready. The other is empty.',
        notes: ['Ask who fills the empty basin and who steadies the cutting. A clever tool or spell that keeps both roots wet can earn advantage. If the cut goes wrong, a fragment washes into the ditch. The party can still save it there.'],
        choices: [['Make the cut and catch both roots', 'divide', 'Nature', 12, 'spillwayWild'], ['Let the roots take hold in the ditch', 'spillwayWild']]
      },
      spillway: {
        title: 'Water over the sill', phase: '5 / The spillway',
        text: 'Water shoots over the sill. The greenhouse door slams open, and both villagers grab the basin as it starts to slide.',
        notes: ['Ask for two complementary actions, such as someone bracing the wheel while another steadies the basin. Let a workable plan succeed. If a root breaks loose and blocks the channel, run the spillway encounter.'],
        choices: [['Brace the gate and save the shared channel', 'accord'], ['Clear the root that blocks the outlet', 'root']]
      },
      spillwayReturn: {
        title: 'The walk back', phase: '5 / The spillway',
        text: 'Ivo waits beside the orchard bed. A sudden surge sends glass fruit spilling over the path. Lark is knee-deep in water, struggling to keep the hamlet channel open.',
        notes: ['Ask who carries the seed and who, if anyone, helps Lark. A hero can brace her handle without giving up the seed. If the party chooses to reopen talks, return to the negotiation.'],
        choices: [['Deliver the seed to Ivo and clear the path', 'ivo'], ['Bring both sides back to the table', 'parley'], ['Follow the water down to the ditch', 'spillwayWild']]
      },
      spillwayWild: {
        title: 'The low ditch', phase: '5 / The spillway',
        text: 'A glowing root races ahead of the flood. It lodges at a fork between the two villages. Beyond it you hear someone shouting from a footbridge.',
        notes: ['Ask whether the party prioritizes the person on the bridge, the root, or the blocked flow. A pole can guide the root into the ditch bed while another hero leads the villager to safety. If they disturb the root without securing it, it lashes out.'],
        choices: [['Secure the footbridge and let the root settle', 'wild'], ['Confront the root in the spillway', 'root']]
      },
      root: {
        title: 'The spillway root', phase: '5 / The spillway',
        text: 'A bright root lashes across the spillway. Water sprays from both channels and the footbridge begins to twist.',
        encounter: { name: 'Spillway root', ac: 12, hp: 24, attack: '+4 to hit · 1d6 + 2 bludgeoning', tactics: 'Initiative +1. It lashes once at anyone beside the outlet. A hero can use an action to brace the footbridge or turn one of the branch handles. Once the branches are balanced, the root stops attacking.' },
        notes: ['Give each player a visible job if they want one. One can protect the bridge, another work a handle, another draw the root away. The fight ends if the party balances the flow or cuts the root back.'],
        choices: [['Direct the flow to the shared orchard', 'accord'], ['Settle the remaining root in the ditch', 'wild']]
      },
      accord: { title: 'A common harvest', phase: '6 / Aftermath', text: 'The villages post the gate schedule on both roads. They share the first baskets, and green shoots show between the glass trees.', notes: ['Ivo pays the agreed reward. Ask who keeps the second key and what the heroes tell the first person who doubts the bargain.'] },
      divide: { title: 'Twin orchards', phase: '6 / Aftermath', text: 'Both cuttings take root. The apples grow smaller, but both villages have fruit by the next market.', notes: ['Lark gives the party a glass cutting as a keepsake. Ask each player which village their hero visits first when the new fruit is ready.'] },
      wild: { title: 'The new grove', phase: '6 / Aftermath', text: 'By dawn the root is a line of saplings along the ditch. No fence surrounds it, and both roads lead there.', notes: ['The rescued villager offers a meal and a place to stay. Ask who claims the new grove, and what the party tells them.'] },
      ivo: { title: 'Ivo’s harvest', phase: '6 / Aftermath', text: 'The glass apples survive. Lark goes home to report what happened at the gate, and the hamlet sends a delegation the next morning.', notes: ['Ivo pays 15 gp each. If the party kept the hamlet branch open, its first trickle arrives before the delegation. Ask whether the heroes stay to speak at the meeting.'] }
    }
  }
};
