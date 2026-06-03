const fs = require('fs');
const html = fs.readFileSync('/Users/taran/Desktop/EX-Desktop/minicw/bcl/index.html', 'utf8');

// Extract SQUADS (team rosters) — these are the ground truth
// SQUADS is defined as: const SQUADS = { TT:[...], AA:[...], ... };
const squadsMatch = html.match(/const SQUADS\s*=\s*(\{[\s\S]*?\});\s*\nconst SCHEDULE/);
if (!squadsMatch) { console.error('SQUADS not found'); process.exit(1); }
const squadsRaw = squadsMatch[1];

// Parse squads manually
const SQUADS = {};
const teamMatches = squadsRaw.matchAll(/(\w+):\s*\[([\s\S]*?)\](?=,\s*\n\s*\w+:|,?\s*\n?\})/g);
for (const m of teamMatches) {
  const teamId = m[1];
  const playersRaw = m[2];
  SQUADS[teamId] = [];
  const pMatches = playersRaw.matchAll(/p:"([^"]+)"/g);
  for (const pm of pMatches) {
    SQUADS[teamId].push(pm[1]);
  }
}

// Build reverse map: player name -> correct team
const playerTeam = {};
for (const [team, players] of Object.entries(SQUADS)) {
  for (const p of players) {
    playerTeam[p] = team;
  }
}

console.log('SQUADS loaded:');
for (const [team, players] of Object.entries(SQUADS)) {
  console.log(`  ${team}: ${players.join(', ')}`);
}

console.log('\nPlayer-to-team map sample:');
Object.entries(playerTeam).slice(0, 10).forEach(([p, t]) => console.log(`  ${p} -> ${t}`));
