const fs = require('fs');
let html = fs.readFileSync('/Users/taran/Desktop/EX-Desktop/minicw/bcl/index.html', 'utf8');

// ── 1. Parse SQUADS to get correct team for each player ───────────────────────
const squadsLineMatch = html.match(/const SQUADS\s*=\s*\{([\s\S]*?)\};\s*\nconst SCHEDULE/);
if (!squadsLineMatch) { console.error('SQUADS not found'); process.exit(1); }
const squadsBlock = squadsLineMatch[1];

const SQUADS = {};
for (const m of squadsBlock.matchAll(/(\w+):\s*\[([\s\S]*?)\](?=\s*[,}])/g)) {
  const teamId = m[1];
  SQUADS[teamId] = [];
  for (const pm of m[2].matchAll(/p:"([^"]+)"/g)) {
    SQUADS[teamId].push(pm[1]);
  }
}

// Build player -> correct team map
const playerTeam = {};
for (const [team, players] of Object.entries(SQUADS)) {
  for (const p of players) {
    playerTeam[p] = team;
  }
}

// ── 2. Extract SEED JSON ──────────────────────────────────────────────────────
const seedStart = html.indexOf('const SEED = {');
const seedEnd = html.indexOf('\nlet DB', seedStart);
const seedStr = html.slice(seedStart + 'const SEED = '.length, seedEnd).trim().replace(/;$/, '');
const seed = JSON.parse(seedStr);

// ── 3. Fix batting duplicates ─────────────────────────────────────────────────
function mergeBattingEntries(entries) {
  // Merge all innings together into one entry using the correct team
  const correctTeam = playerTeam[entries[0].name] || entries.reduce((a, b) => 
    b.inn >= a.inn ? b : a).team; // fallback: most innings = most likely correct

  // Sort so we accumulate correctly
  let merged = null;
  for (const e of entries) {
    if (!merged) {
      merged = { ...e, team: correctTeam };
    } else {
      const newInn = merged.inn + e.inn;
      const newRuns = merged.runs + e.runs;
      const newDismissals = (merged.dismissals || 0) + (e.dismissals || 0);
      merged = {
        ...merged,
        team: correctTeam,
        inn: newInn,
        runs: newRuns,
        hs: Math.max(merged.hs, e.hs),
        avg: newDismissals > 0 ? parseFloat((newRuns / newDismissals).toFixed(2)) : newRuns,
        fifties: merged.fifties + e.fifties,
        hundreds: merged.hundreds + e.hundreds,
        mom: merged.mom + e.mom,
        catches: (merged.catches || 0) + (e.catches || 0),
        dismissals: newDismissals,
        sr: merged.sr // keep existing SR; it's usually 0 anyway
      };
    }
  }
  return merged;
}

const battingByName = {};
seed.batting.forEach(p => {
  if (!battingByName[p.name]) battingByName[p.name] = [];
  battingByName[p.name].push(p);
});

const newBatting = [];
const battingDone = new Set();
for (const p of seed.batting) {
  if (battingDone.has(p.name)) continue;
  battingDone.add(p.name);
  const entries = battingByName[p.name];
  if (entries.length === 1) {
    // Fix team if wrong
    const correct = playerTeam[p.name];
    newBatting.push(correct ? { ...p, team: correct } : p);
  } else {
    // Merge all entries
    newBatting.push(mergeBattingEntries(entries));
    console.log(`  BATTING merged: ${p.name} (${entries.map(e=>e.team).join('+')}) -> ${playerTeam[p.name]||'?'}, runs=${entries.map(e=>e.runs).join('+')}=${entries.reduce((a,b)=>a+b.runs,0)}`);
  }
}

// ── 4. Fix bowling duplicates ─────────────────────────────────────────────────
function mergeBowlingEntries(entries) {
  const correctTeam = playerTeam[entries[0].name] || entries.reduce((a, b) => b.inn >= a.inn ? b : a).team;
  let merged = null;
  for (const e of entries) {
    if (!merged) {
      merged = { ...e, team: correctTeam };
    } else {
      const newInn = merged.inn + e.inn;
      const newWkts = merged.wkts + e.wkts;
      const mWkts = parseInt((merged.bbi||'0/0').split('/')[0]) || 0;
      const eWkts = parseInt((e.bbi||'0/0').split('/')[0]) || 0;
      const newBbi = eWkts > mWkts ? e.bbi : merged.bbi;
      const newEcon = merged.econ > 0 && e.econ > 0 ? parseFloat(((merged.econ * merged.inn + e.econ * e.inn) / newInn).toFixed(2)) : (merged.econ || e.econ);
      const newAvg = merged.avg > 0 && e.avg > 0 ? parseFloat(((merged.avg * merged.inn + e.avg * e.inn) / newInn).toFixed(2)) : (merged.avg || e.avg);
      const newSr = merged.sr > 0 && e.sr > 0 ? parseFloat(((merged.sr * merged.inn + e.sr * e.inn) / newInn).toFixed(2)) : (merged.sr || e.sr);
      merged = {
        ...merged,
        team: correctTeam,
        inn: newInn,
        wkts: newWkts,
        bbi: newBbi,
        econ: newEcon,
        avg: newAvg,
        sr: newSr,
        fourW: (merged.fourW || 0) + (e.fourW || 0)
      };
    }
  }
  return merged;
}

const bowlingByName = {};
seed.bowling.forEach(p => {
  if (!bowlingByName[p.name]) bowlingByName[p.name] = [];
  bowlingByName[p.name].push(p);
});

const newBowling = [];
const bowlingDone = new Set();
for (const p of seed.bowling) {
  if (bowlingDone.has(p.name)) continue;
  bowlingDone.add(p.name);
  const entries = bowlingByName[p.name];
  if (entries.length === 1) {
    const correct = playerTeam[p.name];
    newBowling.push(correct ? { ...p, team: correct } : p);
  } else {
    newBowling.push(mergeBowlingEntries(entries));
    console.log(`  BOWLING merged: ${p.name} (${entries.map(e=>e.team).join('+')}) -> ${playerTeam[p.name]||'?'}, wkts=${entries.map(e=>e.wkts).join('+')}=${entries.reduce((a,b)=>a+b.wkts,0)}`);
  }
}

// ── 5. Write back ─────────────────────────────────────────────────────────────
seed.batting = newBatting;
seed.bowling = newBowling;

const newSeedStr = JSON.stringify(seed, null, 2);
const newHtml = html.slice(0, seedStart + 'const SEED = '.length) + newSeedStr + ';\n' + html.slice(seedEnd + 1);

fs.writeFileSync('/Users/taran/Desktop/EX-Desktop/minicw/bcl/index.html', newHtml, 'utf8');
console.log('\nDone! index.html written with merged batting/bowling data.');
console.log(`Batting entries: ${seed.batting.length} (was ${battingByName && Object.values(battingByName).flat().length})`);
console.log(`Bowling entries: ${seed.bowling.length}`);
