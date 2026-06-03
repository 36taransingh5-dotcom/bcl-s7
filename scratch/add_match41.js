const fs = require('fs');
let html = fs.readFileSync('/Users/taran/Desktop/EX-Desktop/minicw/bcl/index.html', 'utf8');

const seedStart = html.indexOf('const SEED = {');
const seedEnd = html.indexOf('\nlet DB', seedStart);
const seed = JSON.parse(html.slice(seedStart + 'const SEED = '.length, seedEnd).trim().replace(/;$/, ''));

// ── NEW MATCH: M41 TT vs AS ──────────────────────────────────────────────────
// TT batted first: 183/5 in 20.0
// AS chased: 114/10 in 12.1
// TT win by 69 runs
// Venue: Bay Oval
// MOM: Mohammed Shami (TT) — 6/16

const newMatch = {
  match: 41,
  team1: "TT",
  team2: "AS",
  venue: "Bay Oval",
  score1: "183/5",
  overs1: "20.0",
  score2: "114/10",
  overs2: "12.1",
  winner: "TT",
  margin: "69 runs",
  mom: "Mohammed Shami (TT) — 6/16",
  scorecard: {
    t1Inn: {  // TT batting
      bat: [
        { name: "Sanju Samson",         dismissal: "c Inglis b Stoinis",     runs: 6,  balls: 8 },
        { name: "Laura Wolvaardt",      dismissal: "b Agarkar",              runs: 0,  balls: 2 },
        { name: "Yuvraj Singh",         dismissal: "c Inglis b Bracewell",   runs: 63, balls: 49 },
        { name: "Dewald Brevis",        dismissal: "b Agarkar",              runs: 5,  balls: 3 },
        { name: "Rassie van der Dussen",dismissal: "c Inglis b Stoinis",     runs: 11, balls: 12 },
        { name: "Vaibhav Suryavanshi",  dismissal: "not out",                runs: 58, balls: 37 },
        { name: "Hardik Pandya",        dismissal: "not out",                runs: 35, balls: 9 }
      ],
      fow: [1, 7, 12, 37, 140],
      extras: 5,
      bowl: [  // AS bowling
        { name: "Ajit Agarkar",      overs: "4.0", dots: 10, runs: 21, wkts: 2 },
        { name: "Marcus Stoinis",    overs: "4.0", dots: 6, runs: 30, wkts: 2 },
        { name: "Sophie Devine",     overs: "2.0", dots: 5, runs: 17, wkts: 0 },
        { name: "Michael Bracewell", overs: "2.0", dots: 3, runs: 34, wkts: 1 },
        { name: "Yuzvendra Chahal",  overs: "4.0", dots: 4, runs: 47, wkts: 0 },
        { name: "Alana King",        overs: "4.0", dots: 8, runs: 29, wkts: 0 }
      ]
    },
    t2Inn: {  // AS batting
      bat: [
        { name: "Jordan Hermann",    dismissal: "c Samson b Singh",           runs: 7,  balls: 5 },
        { name: "Mitchell Marsh",    dismissal: "b Chakravarthy",             runs: 7,  balls: 6 },
        { name: "Josh Inglis",       dismissal: "lbw Shami",                  runs: 25, balls: 12 },
        { name: "Sophie Devine",     dismissal: "lbw Chakravarthy",           runs: 16, balls: 7 },
        { name: "David Miller",      dismissal: "c Brevis b Shami",           runs: 24, balls: 12 },
        { name: "Michael Bracewell", dismissal: "c Samson b Shami",           runs: 0,  balls: 1 },
        { name: "Alex Carey",        dismissal: "c Singh b Shami",            runs: 9,  balls: 7 },
        { name: "Marcus Stoinis",    dismissal: "lbw Shami",                  runs: 2,  balls: 4 },
        { name: "Arjun Potter",      dismissal: "c Samson b Chakravarthy",    runs: 19, balls: 15 },
        { name: "Ajit Agarkar",      dismissal: "c Wolvaardt b Shami",        runs: 1,  balls: 5 },
        { name: "Alana King",        dismissal: "not out",                    runs: 0,  balls: 0 }
      ],
      fow: [8, 14, 42, 81, 81, 91, 92, 108, 114, 114],
      extras: 4,
      bowl: [  // TT bowling
        { name: "Yuvraj Singh",       overs: "2.0", dots: 2, runs: 35, wkts: 1 },
        { name: "Varun Chakravarthy", overs: "4.0", dots: 7, runs: 33, wkts: 3 },
        { name: "Ravi Shastri",       overs: "1.0", dots: 3, runs: 8, wkts: 0 },
        { name: "Mohammed Shami",     overs: "3.1", dots: 11, runs: 16, wkts: 6 },
        { name: "Alzarri Joseph",     overs: "2.0", dots: 4, runs: 19, wkts: 0 }
      ]
    }
  }
};

// Remove if it exists to avoid dupes
seed.results = seed.results.filter(r => r.match !== 41);
seed.results.push(newMatch);
seed.results.sort((a, b) => (a.match || a.n) - (b.match || b.n));

const newSeedStr = JSON.stringify(seed, null, 2);
html = html.slice(0, seedStart + 'const SEED = '.length) + newSeedStr + ';\n' + html.slice(seedEnd + 1);

fs.writeFileSync('/Users/taran/Desktop/EX-Desktop/minicw/bcl/index.html', html);
console.log('Added Match 41 data to index.html.');
