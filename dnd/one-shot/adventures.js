const adventures = {
  lantern: {
    title: 'The Last Lantern',
    pitch: 'Rescue a missing lamplighter before the river takes the ferry town.',
    duration: 'Plan for 35–55 min · Levels 1–2 · 3–5 players',
    brief: 'Budget 5–8 minutes for the ferry landing, 8–12 for the crossing, 8–12 for the tower, and 12–20 for the rescue and aftermath. With two heroes or a party new to combat, start the reed hound at 9 HP and the bell warden at 12 HP. For a shorter game, skip the salvage loft and give the lantern puzzle hint immediately.',
    scenes: {
      start: {
        title: 'Fog at the ferry', phase: '1 / The job',
        text: 'The ferry rope pulls taut by itself. Across the water, the bell tower’s lantern goes dark. Nessa, the lamplighter’s apprentice, grips the mooring post. “My teacher Marek went to the tower. Can you bring him back before the third bell?” She points to Orlo, the ferryman, who is holding his boat against the dock. A muddy towpath also follows the river into the reeds, where you can just make out a gate below the tower.',
        npc: 'Nessa, the lamplighter’s apprentice, offers 10 gp per hero from the lamplighters’ box. She last saw Marek take the brass bell key and a rescue rope toward the tower. If asked why, she admits he heard someone calling for help inside the bell.',
        notes: [
          'Ask each player what their hero is doing at the landing and which piece of gear they bring out first.',
          'Show the route choices in the fiction. The ferry is fast but exposed. The bank is sheltered but the water has covered parts of the path. Give Nessa’s information freely if players ask.'
        ],
        choices: [['Ask Nessa what happened to Marek', 'nessa'], ['Ask the ferryman to take you across', 'market'], ['Follow the towpath toward the gate', 'bank']]
      },
      nessa: {
        title: 'What Nessa saw', phase: '1 / The job',
        text: '“Marek heard someone calling from inside the bell,” Nessa says. “He took the brass key and a rescue rope. I watched him disappear into the reeds. Then the first bell rang, and the water rose over the bottom step.”',
        notes: ['If asked about the third bell, Nessa says each toll has brought the river higher. She fears the next one will flood the landing. She can show the party where Marek stepped onto the towpath or call Orlo over.'],
        choices: [['Ask Orlo to take you across', 'market'], ['Follow Marek’s route along the towpath', 'bank']]
      },
      market: {
        title: 'The ferryman’s bargain', phase: '2 / Cross the river',
        text: 'Orlo, the ferryman, braces a boot against the rail and points across the current. “I can put you ashore at the tower stair. Someone needs to get a line around that iron ring before the current turns us.” A coil of rope lies by his pole. A red bundle drifts close enough to hook aboard. Behind you, the muddy towpath is still passable.',
        npc: 'Orlo wants the crossing kept open through winter. He saw Marek place a lantern in a dry alcove under the tower and can show you the landing. He asks the party to bring the ferry’s old brass nameplate back if they find it.',
        notes: ['Give the party a moment to decide who handles the pole and who watches the water. The bundle is Marek’s spare coat. Its pockets contain a spool of dry wick, which can help with the tower lamps.'],
        choices: [['Secure the ferry with a line and land at the stair', 'landing', 'Athletics', 11, 'washed'], ['Take the towpath with Orlo’s directions', 'bank']]
      },
      bank: {
        title: 'Tracks in the reeds', phase: '2 / Cross the river',
        text: 'Marek’s bootprints stop at a brass floodgate. Beyond the bars a stair climbs to the tower. The gate’s chain runs from a lever on dry ground to a stone counterweight, where a thick root has caught it. Water only reaches your knees at the gate, but reeds bend against the current beside it. Something is moving toward you.',
        notes: ['Players who inspect the gate find that its counterweight has snagged on a root. Cutting the root from dry ground opens it without a roll. Fish or a thrown ration can draw the creature away. A noisy attempt brings it to the path.'],
        choices: [['Free the counterweight or distract the creature', 'landing'], ['Wade to the gate and lift it by hand', 'landing', 'Athletics', 12, 'drift'], ['Confront whatever is in the reeds', 'drift']]
      },
      washed: {
        title: 'The ferry breaks loose', phase: '2 / Cross the river',
        text: 'The landing line slips free. The ferry swings hard against the tower steps and grounds there, close enough to climb off. Orlo falls into the shallows, and the loose line tightens around his boot. The ferry pole is wedged under a bench. The hull shifts a little every time a wave comes in.',
        notes: ['Ask one hero to keep the ferry from shifting and another to free Orlo. If the group uses a rope, pole, or clever spell, they succeed. Otherwise the rescuer takes 1d4 bludgeoning damage as the hull bumps the stair. Orlo stays behind to secure the boat.'],
        choices: [['Get Orlo to safety and climb to the landing', 'landing']]
      },
      drift: {
        title: 'The reed hound', phase: '2 / Cross the river',
        text: 'A dog-shaped tangle of wet reeds steps out of the water, a scrap of red cloth in its teeth. It crouches between you and the gate. A stone ledge runs along the bank to your left, with a loose tow rope draped over it. The gate lever is just past the creature. Behind you, the path back to the ferry is clear.',
        encounter: { name: 'Reed hound', ac: 12, hp: 13, attack: '+3 to hit · 1d6 + 1 piercing', tactics: 'Roll initiative with +1 for the hound. It rushes the nearest creature who steps toward the gate. It gives ground if offered food and backs into the river at 3 HP if left a clear route.' },
        notes: ['Show players the gate lever, a dry stone ledge, and the loose tow rope. On their turns, let players use those objects instead of attacking. If the party retreats, they can regroup with Orlo.'],
        choices: [['The way is clear. Enter the tower', 'landing'], ['Retreat to the ferry', 'market']]
      },
      landing: {
        title: 'The keeper’s landing', phase: '3 / Explore the tower',
        text: 'You reach a stone landing at the foot of the bell tower. A wet boot sits beside a rescue rope knotted to the rail. To your left, a ladder leads to a loft crowded with crates. Straight ahead, three cold lamps flank a sealed door. The second bell tolls overhead. When it stops, water is lapping at the step below you.',
        notes: ['Marek’s rescue rope is knotted to the stair rail. Let the party take it or leave it anchored for the rescue. Explain that the loft will cost time in the fiction, but may contain something useful.'],
        choices: [['Search the salvage loft', 'loft'], ['Examine the sealed lamp door', 'lamps']]
      },
      loft: {
        title: 'The salvage loft', phase: '3 / Explore the tower',
        text: 'The ladder creaks as you climb. Waterlogged crates fill the low loft. On the far wall a long boat hook pins a brass nameplate stamped ORLO’S FERRY. An oilskin ledger sits on the crate below. Its last three winter entries have been struck through. From the ladder you can still see the sealed lamp door.',
        notes: ['The ferry nameplate belongs to Orlo. The hook is a boat hook long enough to snag Marek’s harness from the platform. The ledger records that the town once lit a shrine each winter and stopped three winters ago. Give all three discoveries freely if the players search.'],
        choices: [['Gather what you need and head to the lamp door', 'lamps']]
      },
      lamps: {
        title: 'Three lamps, one door', phase: '3 / Explore the tower',
        text: 'The door has no handle. Beside it are three oil lamps stamped with a window, a ferry, and a shrine, each with a dry wick. An inscription is cut into the stone above them. A seam runs down the hinge side of the door, and there are old scorch marks where the seam meets the frame.',
        handout: ['The window lights the way to the ferry.', 'The shrine is tended after the crossing.', 'Light them in the order a traveler would see them.'],
        notes: ['Ask for the order before showing the outcome buttons. The answer is window, ferry, shrine. If the players stall, Nessa’s chalk arrow runs from the window lamp toward the river. A wrong order releases hot steam and exposes the emergency latch. Resolve the damage in the next scene. A DC 12 Investigation check can identify the reset lever and open the door from the side.'],
        choices: [['Light the lamps in the order the party worked out', 'bell'], ['Inspect the seam for a bypass', 'bell', 'Investigation', 12, 'steam'], ['Force the door or resolve a wrong order', 'steam']]
      },
      steam: {
        title: 'The emergency latch', phase: '3 / Explore the tower',
        text: 'Steam hisses from the hinge and fills the landing. When it clears, a red latch sticks out from the doorframe. Pulling it opens the door onto a slick iron stair. The stair has a rail you can run a rope along, and you can hear a man calling from the top.',
        notes: ['The nearest hero takes 1d4 fire damage from the burst. Let the party cross safely with their rope or proceed slowly. Keep this consequence to one roll of damage.'],
        choices: [['Climb to the bell platform', 'bell']]
      },
      bell: {
        title: 'The drowned bell', phase: '4 / Rescue Marek',
        text: 'The stairs end on a narrow platform around a bronze bell. Marek hangs from a beam just beyond the rail, a brass key looped around his wrist. A stone post on the platform could hold a rope. As water climbs toward his boots, a silver face gathers in it. “The town left my shrine dark three winters running. Tell me who will keep the light, and I’ll let him go. The key comes back to me.”',
        npc: 'Marek took the key after the council refused to relight the shrine. The river spirit wants a concrete pledge and proof someone understands the old custom. It will offer safe passage if a hero names who will tend the shrine and how the town will keep it lit.',
        notes: ['Ask two different players what they contribute. They can negotiate, secure a line, distract the spirit, or try to move Marek. If they saw the ledger, mention that it names the old obligation. A sincere, specific offer works without a roll. A rope and boat hook make a secured rescue possible.'],
        choices: [['Offer a specific pledge and return the key', 'pledge'], ['Rig a line to pull Marek off the beam', 'rescueLine'], ['Take the key by force', 'warden']]
      },
      pledge: {
        title: 'Keep the lantern lit', phase: '4 / Rescue Marek',
        text: 'The spirit holds out an empty hand toward the brass key on Marek’s wrist. The beam dips until Marek is nearly within reach of the platform. Above him, the clapper starts to rise. “Name the keeper and tell me how the shrine will stay lit.” The rope post is still within reach.',
        notes: ['Ask who makes the promise, what they offer as a first sign of good faith, and who catches Marek. If the offer is concrete, the spirit holds the bell and accepts. If the party changes its mind, use the rescue line or have the warden rise.'],
        choices: [['Seal the promise and catch Marek', 'peace'], ['Switch to a rope rescue', 'rescueLine'], ['Break off the bargain and seize the key', 'warden']]
      },
      rescueLine: {
        title: 'A rope over the bell', phase: '4 / Rescue Marek',
        text: 'Marek can see you now. “Get a line under my arms,” he calls. The beam is about six feet beyond the rail. A stone post gives you a place to anchor a rope, and Marek can reach with one hand if someone gets the line close enough. Each swing brings his boots nearer the rim of the bell.',
        notes: ['Ask where the line is anchored, who gets it to Marek, and who pulls. An anchored rope and the boat hook make the rescue automatic. For a risky grab, have one hero roll with advantage if another can steady them. A miss saves Marek but costs the ferry its landing.'],
        choices: [['Pull him clear with a secured rig', 'rescue'], ['Make a risky grab across the bell', 'rescue', 'Athletics', 12, 'escape']]
      },
      warden: {
        title: 'The bell warden', phase: '4 / Rescue Marek',
        text: 'The silver face slips beneath the water. A chain climbs out of the bell and pulls itself into an iron figure with a clapper for a fist. It plants itself between you and Marek. Behind it, the bell’s clapper swings through a narrow gap that a sturdy wedge could jam. The stair behind you still leads down to the landing.',
        encounter: { name: 'Bell warden', ac: 13, hp: 20, attack: '+3 to hit · 1d6 + 2 bludgeoning', tactics: 'Initiative +0. It strikes once per turn, favoring anyone holding the key. A hero can spend an action wedging the clapper with a sturdy object. While the wedge holds, the warden stays by the bell instead of pursuing fleeing heroes.' },
        notes: ['Keep Marek’s rescue visible during combat. A hero can spend a turn securing him while others draw the warden away. If the party gets Marek clear, they can leave the fight without defeating the warden.'],
        choices: [['The warden is down. Haul Marek clear', 'rescue'], ['Leave under cover with the rescued Marek', 'escape'], ['Stop fighting and offer the shrine pledge', 'pledge']]
      },
      peace: { title: 'A light on the river', phase: '5 / Aftermath', text: 'The spirit closes its hand around the key. The water drops far enough for Marek to swing onto the stair. By dawn Orlo is carrying passengers again. Nessa sets a lantern at the river shrine and asks who would like to light the first wick.', notes: ['Nessa pays 10 gp each. Orlo returns the party’s kindness with free crossings if they brought back his nameplate. Ask each player what their hero does when the lantern is lit.'] },
      rescue: { title: 'The silent tower', phase: '5 / Aftermath', text: 'The bell drops into the river. Marek makes it down the tower stair with the party, soaked and shivering. By morning neighbors are waiting on the bank with blankets and lanterns. Marek asks what you want the council to hear about the shrine.', notes: ['Nessa pays 10 gp each. If they found the ledger, ask whether anyone shows it to the council. Marek offers to show the party where the next river shrine lies.'] },
      escape: { title: 'The long swim', phase: '5 / Aftermath', text: 'The bell drops before you can clear the landing. The shock splits the dock and sweeps the party into the shallows with Marek. You scramble onto the muddy bank together. At sunrise Marek brings a hammer and asks who will help him set the first plank of a new crossing.', notes: ['Nessa pays the agreed reward for Marek’s return. Ask each hero what they contribute to the new crossing. Orlo names its first plank after the hero who helped him.'] }
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
        text: 'Glass apples chime in the wind. One drops, turns white, and breaks into powder before it hits the ground. Ivo, the orchard keeper, hurries out of the lit gatehouse with an empty copper basket. “Someone took the heartseed. By sunrise we’ll have nothing left to sell.” Behind him, fresh bootprints glitter with wet soil between the rows.',
        npc: 'Ivo offers 15 gp per hero to retrieve the heartseed alive. He saw a masked figure heading toward the greenhouse. He claims the orchard is watered by a spring on his land.',
        notes: ['Ask what brought each hero to the orchard tonight. The gatehouse lamp is lit, and sparkling mud marks a trail between the rows. Let the group choose where to start.'],
        choices: [['Question Ivo at the gatehouse', 'keeper'], ['Investigate the trail between the trees', 'trail']]
      },
      keeper: {
        title: 'A debt at the gate', phase: '2 / Investigate',
        text: 'A wooden gauge on the gatehouse wall has two marks, ORCHARD and HAMLET. The orchard float is near the top. The hamlet float rests on the bottom. Ivo shuts a maintenance ledger as you step in. From the doorway you can follow either the muddy bootprints through the trees or the dry channel beside the gatehouse.',
        npc: 'Ivo diverted the hamlet’s water to save his trees. He fears losing the harvest and the wages it pays. If pressed, he admits that the old gate can serve both channels, but claims nobody knows how to set it anymore.',
        notes: ['The ledger shows a canceled maintenance payment to Lark, a gardener from the hamlet. Show it freely if a player asks to examine the records. An honest promise to hear both villages out gets Ivo’s cooperation.'],
        choices: [['Look for evidence along the dry channel', 'ditch'], ['Follow the trail through the orchard', 'trail']]
      },
      trail: {
        title: 'The broken sapling', phase: '2 / Investigate',
        text: 'A broken sapling glows white where its bark has split. A wet scrap of green cloth hangs from the branch. Bootprints and a thin wheel groove cross the same patch of mud, then split at a dry irrigation ditch. A small brass glint catches your eye near the loose edge of the bank.',
        notes: ['One track is a person in work boots. The other is the straight groove of an iron wheel. The figure took the ditch route and the wheel belongs to the greenhouse guard. A careful search reveals a maintenance badge engraved with the name Lark.'],
        choices: [['Search the tracks and look for the badge', 'ditch', 'Investigation', 12, 'spill'], ['Follow the dry ditch directly', 'ditch']]
      },
      spill: {
        title: 'The drop into the ditch', phase: '2 / Investigate',
        text: 'The bank crumbles under the searcher’s feet. Loose glass slides down toward a fallen branch. Anyone still above the bank has firm ground to brace a rescue line. At the bottom, stone steps cut into the ditch lead to a tool alcove.',
        notes: ['The searching hero makes a DC 10 Dexterity save, taking 1d4 slashing damage on a miss. Another hero can pull them back with a rope and avoid the save. At the bottom, the broken branch points toward a worker’s alcove.'],
        choices: [['Continue to the worker’s alcove', 'ditch']]
      },
      ditch: {
        title: 'The worker’s alcove', phase: '2 / Investigate',
        text: 'A tin cup and empty seed packets sit in a tool niche beside a hooked maintenance pole. A note says, “Third day without water. Lark, please ask him again.” Stone steps rise to the greenhouse. From here you can see a cracked side window, three gate handles under a bronze plate, and iron shears moving past the front door.',
        notes: ['A hooked pole can hold the greenhouse window open and can also brace a sluice wheel later. The empty cup and note are enough to establish what happened in the hamlet. Ask what the party wants to do with that information.'],
        choices: [['Work out how to stop the guard using the gate', 'sluice'], ['Approach the greenhouse window', 'window'], ['Confront the guard at the door', 'guardian']]
      },
      sluice: {
        title: 'The three handles', phase: '3 / Enter the greenhouse',
        text: 'Three handles protrude from a pipe manifold. One shows a wheel, one a fruit tree, and one a house. A bronze plate explains what each handle controls. Water knocks inside the pipes in time with the pruning frame’s movements. The cracked window is a short walk along the wall.',
        handout: ['Wheel — powers the pruning frame.', 'Tree — feeds the glass orchard.', 'House — feeds the hamlet.', 'Closing either branch sends all remaining flow down the other.'],
        notes: ['To stop the guard without depriving either village, close the wheel handle and leave the tree and house branches open. Give players a chance to describe the setting. If they misread the plate, the frame sounds a warning and rolls over to investigate. They can also walk away and try the window.'],
        choices: [['The party sets the handles correctly', 'greenhouse'], ['The frame comes to investigate', 'guardian'], ['Leave the handles alone and try the window', 'window']]
      },
      window: {
        title: 'A crack in the wall', phase: '3 / Enter the greenhouse',
        text: 'Warm mist spills through the cracked window. You can reach the latch through a gap. A strip of broken glass hangs directly above it and will ring if the sash bumps it. There is room to slip a cloak over the glass and prop the window open from the ditch side. The iron guard’s track ends several feet short of the window.',
        notes: ['A hero can pad the hanging glass with a cloak and hold the sash with the hooked pole. If the party describes a quiet solution, let it work. Otherwise have the person opening the window roll once for the group.'],
        choices: [['Pad the glass and prop the sash', 'greenhouse'], ['Slip through without making a sound', 'greenhouse', 'Stealth', 12, 'guardian']]
      },
      guardian: {
        title: 'The pruning frame', phase: '3 / Enter the greenhouse',
        text: 'The pruning frame rolls across the doorway on a groove cut into the stone. Its iron shears snap shut, and its painted arm reads KEEP CLEAR. Stacked crates sit close enough to tip onto the track. The gate handles are off to one side beyond its reach, and you can still back away into the ditch.',
        encounter: { name: 'Pruning frame', ac: 14, hp: 22, attack: '+4 to hit · 1d8 + 2 slashing', tactics: 'Initiative +0. It makes one attack on the closest hero who enters its reach. It cannot fit through the window or leave the stone track. A hero can spend an action blocking its track with a pole or crate. Shutting the wheel handle stops it.' },
        notes: ['Point out the track, gate controls, and stacked crates before initiative. The party can fight, distract it while others enter, or shut it off.'],
        choices: [['The frame is stopped or blocked. Enter the greenhouse', 'greenhouse'], ['Get clear and use the gate controls', 'sluice']]
      },
      greenhouse: {
        title: 'The seed keeper', phase: '4 / Choose a future',
        text: 'The masked figure lowers her scarf. “I’m Lark. I used to keep that gate running.” She points to a copper basin where the stolen heartseed has sprouted through the drain. “Pull it out dry and it dies. I can divide it if you help. Or bring Ivo here and get him to open our channel. If you mean to carry the whole thing back, we’ll need to free its roots under water.”',
        npc: 'Lark used to maintain the gate. She took the seed to force Ivo to listen, then realized the roots would tear if moved dry. She’ll help replant it if the hamlet gets water and a say in how the gate is run.',
        notes: ['Ask each player who they trust and what outcome they want. Lark can divide the sprout if the party keeps both cut ends wet. Ivo can be summoned to negotiate a schedule. If the party takes the entire sprout, Lark opens the hamlet branch herself and leaves.'],
        choices: [['Invite Ivo and negotiate a shared gate schedule', 'parley'], ['Help Lark divide the sprout between the villages', 'cutting'], ['Take the whole sprout back to Ivo', 'spillwayReturn']]
      },
      parley: {
        title: 'Two keys for the gate', phase: '4 / Choose a future',
        text: 'Ivo and Lark stand on either side of the basin. “The trees need water at dawn,” Ivo says. Lark answers, “And our wells need it before then.” Ivo lays the gate key on the table. A blank maintenance slate hangs beside it, and water starts dripping from a pipe joint below the bench.',
        notes: ['Ask who gets a key, who pays for upkeep, and how to split water in a dry week. Both accept a plan that gives each village access and makes the schedule visible. If the players can’t agree, Lark offers to divide the seed. Then the pipe beneath the bench bursts.'],
        choices: [['Both sides accept the terms. Save the shared channel', 'spillway'], ['Divide the seed instead', 'cutting']]
      },
      cutting: {
        title: 'Two cuttings', phase: '4 / Choose a future',
        text: 'Lark slides a clean knife under the stem. A second root has curled around the drain. One copper basin is full of water and the other is empty. A tap above the bench still runs. Outside, a shallow ditch carries overflow down past both villages.',
        notes: ['Ask who fills the empty basin and who steadies the cutting. A clever tool or spell that keeps both roots wet can earn advantage. If the cut goes wrong, a fragment washes into the ditch. The party can still save it there.'],
        choices: [['Make the cut and catch both roots', 'divide', 'Nature', 12, 'spillwayWild'], ['Let the roots take hold in the ditch', 'spillwayWild']]
      },
      spillway: {
        title: 'Water over the sill', phase: '5 / The spillway',
        text: 'A pipe bursts beneath the bench. Ivo and Lark catch the basin as it slides toward the open door. Outside, the sluice wheel spins loose. A pale root has caught in the outlet grate, and water is already rising toward the floorboards. Farther down the spillway, a villager clings to a footbridge that has started to shift.',
        notes: ['Ask for two complementary actions, such as someone bracing the wheel while another steadies the basin. Let a workable plan succeed. If a root breaks loose and blocks the channel, run the spillway encounter.'],
        choices: [['Brace the gate and save the shared channel', 'accord'], ['Clear the root that blocks the outlet', 'root']]
      },
      spillwayReturn: {
        title: 'The walk back', phase: '5 / The spillway',
        text: 'You carry the heartseed in its basin toward the orchard bed, where Ivo waits. A surge spills glass fruit across the path. To your left, Lark is knee-deep in water, trying to hold the hamlet’s channel open. Beyond her, the overflow runs downhill into the ditch. Ivo looks from the basin to the handle and asks where you need him.',
        notes: ['Ask who carries the seed and who, if anyone, helps Lark. A hero can brace her handle without giving up the seed. If the party chooses to reopen talks, return to the negotiation.'],
        choices: [['Deliver the seed to Ivo and clear the path', 'ivo'], ['Bring both sides back to the table', 'parley'], ['Follow the water down to the ditch', 'spillwayWild']]
      },
      spillwayWild: {
        title: 'The low ditch', phase: '5 / The spillway',
        text: 'A glowing root rushes down the ditch and wedges itself where the village channels meet. A villager grips the rail of a footbridge downstream. One end of the bridge has already lifted off its support. You can reach the root from the bank with a long pole, or reach the villager by crossing the remaining span.',
        notes: ['Ask whether the party prioritizes the person on the bridge, the root, or the blocked flow. A pole can guide the root into the ditch bed while another hero leads the villager to safety. If they disturb the root without securing it, it lashes out.'],
        choices: [['Secure the footbridge and let the root settle', 'wild'], ['Confront the root in the spillway', 'root']]
      },
      root: {
        title: 'The spillway root', phase: '5 / The spillway',
        text: 'A bright root lashes across the spillway every time the water hits it. The footbridge twists downstream. Two branch handles stand on opposite banks, each within reach from dry ground. Beyond the root you can see two places to guide the remaining growth, the orchard channel and the muddy ditch.',
        encounter: { name: 'Spillway root', ac: 12, hp: 24, attack: '+4 to hit · 1d6 + 2 bludgeoning', tactics: 'Initiative +1. It lashes once at anyone beside the outlet. A hero can use an action to brace the footbridge or turn one of the branch handles. Once the branches are balanced, the root stops attacking.' },
        notes: ['Give each player a visible job if they want one. One can protect the bridge, another work a handle, another draw the root away. The fight ends if the party balances the flow or cuts the root back.'],
        choices: [['Direct the flow to the shared orchard', 'accord'], ['Settle the remaining root in the ditch', 'wild']]
      },
      accord: { title: 'A common harvest', phase: '6 / Aftermath', text: 'The two villages post a shared gate schedule where their roads meet. At the first harvest, Ivo brings out two baskets and hands one to Lark. She sets a second gate key on the table and asks who should keep it.', notes: ['Ivo pays the agreed reward. Ask who keeps the second key and what the heroes tell the first person who doubts the bargain.'] },
      divide: { title: 'Twin orchards', phase: '6 / Aftermath', text: 'Lark plants one cutting beside the hamlet well and Ivo plants the other under the orchard’s oldest tree. The first apples are small enough to close in one hand. By the next market, both villages bring baskets.', notes: ['Lark gives the party a glass cutting as a keepsake. Ask each player which village their hero visits first when the new fruit is ready.'] },
      wild: { title: 'The new grove', phase: '6 / Aftermath', text: 'By dawn the root has sent up a line of saplings along the ditch. The villager from the footbridge walks down with a meal for the party. People from both roads stop at the new grove and begin asking who it belongs to.', notes: ['The villager from the footbridge offers a place to stay. Ask who claims the new grove, and what the party tells them.'] },
      ivo: { title: 'Ivo’s harvest', phase: '6 / Aftermath', text: 'The glass apples keep their color as the sun rises. Ivo counts out the reward beside the orchard bed. Across the channel, Lark walks home to explain what happened. By morning a delegation from the hamlet is waiting at the gatehouse.', notes: ['Ivo pays 15 gp each. If the party kept the hamlet branch open, its first trickle arrives before the delegation. Ask whether the heroes stay to speak at the meeting.'] }
    }
  }
};
