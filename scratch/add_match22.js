const fs = require('fs');
let html = fs.readFileSync('/Users/taran/Desktop/EX-Desktop/minicw/bcl/index.html', 'utf8');

const seedStart = html.indexOf('const SEED = {');
const seedEnd = html.indexOf('\nlet DB', seedStart);
const seed = JSON.parse(html.slice(seedStart + 'const SEED = '.length, seedEnd).trim().replace(/;$/, ''));

// ── NEW MATCH: M22 AS vs HH ──────────────────────────────────────────────────
// AS batted first: 128/10 in 13.0
// HH chased: 129/4 in 13.3
// HH win by 6 wickets
// Venue: Rajiv Gandhi International Cricket Stadium
// MOM: Krunal Pandya (HH) — 26* off 22 & 5/31

const newMatch = {
  match: 22,
  team1: "AS",
  team2: "HH",
  venue: "Rajiv Gandhi International Cricket Stadium",
  score1: "128/10",
  overs1: "13.0",
  score2: "129/4",
  overs2: "13.3",
  winner: "HH",
  margin: "6 wickets",
  mom: "Krunal Pandya (HH) — 26 off 22 & 5/31",
  scorecard: {
    t1Inn: {  // AS batting
      bat: [
        { name: "Jordan Hermann",    dismissal: "c Dhawan b Jonassen", runs: 51, balls: 20 },
        { name: "Mitchell Marsh",    dismissal: "c Klaasen b Jonassen", runs: 11, balls: 4 },
        { name: "Josh Inglis",       dismissal: "c Klaasen b Pandya",  runs: 20, balls: 13 },
        { name: "Sophie Devine",     dismissal: "c Swepson b Pandya",  runs: 0,  balls: 1 },
        { name: "Michael Bracewell", dismissal: "c Klaasen b Pandya",  runs: 5,  balls: 7 },
        { name: "David Miller",      dismissal: "lbw Jonassen",        runs: 3,  balls: 4 },
        { name: "Alex Carey",        dismissal: "c Klaasen b Pandya",  runs: 3,  balls: 3 },
        { name: "Marcus Stoinis",    dismissal: "c Sundar b Pandya",   runs: 0,  balls: 2 },
        { name: "Arjun Potter",      dismissal: "lbw Farooqi",         runs: 20, balls: 9 },
        { name: "Ajit Agarkar",      dismissal: "b Swepson",           runs: 13, balls: 16 },
        { name: "Alana King",        dismissal: "not out",             runs: 0,  balls: 1 }
      ],
      fow: [26, 53, 53, 77, 90, 93, 93, 97, 128, 128],
      extras: 6,
      bowl: [  // HH bowling
        { name: "Fazalhaq Farooqi",  overs: "1.1", dots: 1, runs: 19, wkts: 1 },
        { name: "Jess Jonassen",     overs: "4.0", dots: 9, runs: 39, wkts: 3 },
        { name: "Krunal Pandya",     overs: "4.0", dots: 11, runs: 31, wkts: 5 },
        { name: "Washington Sundar", overs: "2.0", dots: 3, runs: 29, wkts: 0 },
        { name: "Mitchell Swepson",  overs: "2.0", dots: 7, runs: 9, wkts: 1 }
      ]
    },
    t2Inn: {  // HH batting
      bat: [
        { name: "Steve Smith",       dismissal: "lbw Bracewell", runs: 33, balls: 20 },
        { name: "Martin Guptill",    dismissal: "b King",        runs: 27, balls: 13 },
        { name: "Shikhar Dhawan",    dismissal: "c Inglis b King", runs: 10, balls: 5 },
        { name: "Harmanpreet Kaur",  dismissal: "c Inglis b Bracewell", runs: 0, balls: 1 },
        { name: "Krunal Pandya",     dismissal: "not out",       runs: 26, balls: 22 },
        { name: "Shubman Gill",      dismissal: "not out",       runs: 29, balls: 20 }
      ],
      fow: [47, 57, 68, 73],
      extras: 4,
      bowl: [  // AS bowling
        { name: "Ajit Agarkar",      overs: "1.0", dots: 1, runs: 10, wkts: 0 },
        { name: "Marcus Stoinis",    overs: "1.0", dots: 1, runs: 16, wkts: 0 },
        { name: "Yuzvendra Chahal",  overs: "2.3", dots: 4, runs: 29, wkts: 0 },
        { name: "Michael Bracewell", overs: "4.0", dots: 10, runs: 34, wkts: 2 },
        { name: "Alana King",        overs: "4.0", dots: 10, runs: 29, wkts: 2 },
        { name: "Sophie Devine",     overs: "1.0", dots: 1, runs: 7, wkts: 0 }
      ]
    }
  }
};

// Check if match already exists
seed.results = seed.results.filter(r => r.match !== 22);
seed.results.push(newMatch);
seed.results.sort((a, b) => (a.match || a.n) - (b.match || b.n));

// ── ADD NEW PLAYERS TO SQUADS IF NEEDED ──────────────────────────────────────
const htmlMatch = html.match(/const SQUADS = (\{[\s\S]*?\});/);
let squadsStr = htmlMatch[1];
// I'll manually modify the HTML for squads later, or I'll just rely on stats engine to handle it.
// Actually, it's better to just recalculate everything completely cleanly.

const newSeedStr = JSON.stringify(seed, null, 2);
html = html.slice(0, seedStart + 'const SEED = '.length) + newSeedStr + ';\n' + html.slice(seedEnd + 1);

fs.writeFileSync('/Users/taran/Desktop/EX-Desktop/minicw/bcl/index.html', html);
console.log('Added Match 22 data to seed.');
