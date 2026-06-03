const fs = require('fs');
const html = fs.readFileSync('/Users/taran/Desktop/EX-Desktop/minicw/bcl/index.html', 'utf8');

// Extract the SEED JSON from between "const SEED = {" and the matching closing brace before "let DB"
const seedStart = html.indexOf('const SEED = {');
const seedEnd = html.indexOf('\nlet DB', seedStart);
const seedStr = html.slice(seedStart + 'const SEED = '.length, seedEnd).trim().replace(/;$/, '');

let seed;
try {
  seed = JSON.parse(seedStr);
} catch(e) {
  console.error('Failed to parse SEED:', e.message);
  process.exit(1);
}

const batting = seed.batting;

// Group by player name
const byName = {};
batting.forEach((p, idx) => {
  if (!byName[p.name]) byName[p.name] = [];
  byName[p.name].push({ ...p, _idx: idx });
});

// Find duplicates
const dups = Object.entries(byName).filter(([name, entries]) => entries.length > 1);

if (dups.length === 0) {
  console.log('No duplicate player names found in batting array!');
} else {
  console.log(`Found ${dups.length} players with multiple batting entries:\n`);
  dups.forEach(([name, entries]) => {
    console.log(`  ${name}:`);
    entries.forEach(e => {
      console.log(`    Team: ${e.team}, Inn: ${e.inn}, Runs: ${e.runs}, 100s: ${e.hundreds}`);
    });
  });
}

// Also check bowling
const bowling = seed.bowling;
const bowlByName = {};
bowling.forEach((p, idx) => {
  if (!bowlByName[p.name]) bowlByName[p.name] = [];
  bowlByName[p.name].push({ ...p, _idx: idx });
});

const bowlDups = Object.entries(bowlByName).filter(([name, entries]) => entries.length > 1);
if (bowlDups.length === 0) {
  console.log('\nNo duplicate player names in bowling array.');
} else {
  console.log(`\nFound ${bowlDups.length} players with multiple bowling entries:\n`);
  bowlDups.forEach(([name, entries]) => {
    console.log(`  ${name}:`);
    entries.forEach(e => {
      console.log(`    Team: ${e.team}, Inn: ${e.inn}, Wkts: ${e.wkts}`);
    });
  });
}
