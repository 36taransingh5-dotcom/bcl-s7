const fs = require('fs');
let html = fs.readFileSync('/Users/taran/Desktop/EX-Desktop/minicw/bcl/index.html', 'utf8');

const seedStart = html.indexOf('const SEED = {');
const seedEnd = html.indexOf('\nlet DB', seedStart);
const seed = JSON.parse(html.slice(seedStart + 'const SEED = '.length, seedEnd).trim().replace(/;$/, ''));

// ── NEW MATCH: M36 AA vs TT ──────────────────────────────────────────────────
// AA batted first: 211/7 in 20.0 | TT chased: 203/9 in 20.0 | AA win by 8 runs
// Venue: Chinnaswammy | MOM: Will Jacks (AA) — 76 off 39 & 2/39

const newMatch = {
  match: 36,
  team1: "AA",
  team2: "TT",
  venue: "Chinnaswammy",
  score1: "211/7",
  overs1: "20.0",
  score2: "203/9",
  overs2: "20.0",
  winner: "AA",
  margin: "8 runs",
  mom: "Will Jacks (AA) — 76 off 39 & 2/39",
  scorecard: {
    t1Inn: {  // AA batting
      bat: [
        { name: "David Warner",          dismissal: "run out (Shami)",       runs: 35, balls: 20 },
        { name: "Travis Head",            dismissal: "b Yuvraj Singh",        runs: 3,  balls: 2  },
        { name: "Quinton de Kock",        dismissal: "c & b Pandya",          runs: 21, balls: 15 },
        { name: "Will Jacks",             dismissal: "c Pandya b Joseph",     runs: 76, balls: 39 },
        { name: "Ben Stokes",             dismissal: "c Brevis b Shami",      runs: 10, balls: 5  },
        { name: "Evin Lewis",             dismissal: "lbw Chakravarthy",      runs: 24, balls: 12 },
        { name: "Aarav Roy",              dismissal: "not out",               runs: 33, balls: 17 },
        { name: "Tim David",              dismissal: "b Joseph",              runs: 7,  balls: 4  },
        { name: "Jasprit Bumrah",         dismissal: "not out",               runs: 2,  balls: 6  },
        { name: "Kuldeep Yadav",          dismissal: "not out",               runs: 0,  balls: 0  },
        { name: "Ravi Bishnoi",           dismissal: "not out",               runs: 0,  balls: 0  }
      ],
      fow: [7, 56, 71, 99, 151, 185, 201],
      bowl: [  // TT bowling
        { name: "Yuvraj Singh",         overs: "4.0", dots: 7, runs: 36, wkts: 1 },
        { name: "Varun Chakravarthy",   overs: "4.0", dots: 5, runs: 55, wkts: 1 },
        { name: "Mohammed Shami",       overs: "4.0", dots: 5, runs: 35, wkts: 1 },
        { name: "Hardik Pandya",        overs: "4.0", dots: 9, runs: 43, wkts: 1 },
        { name: "Ravi Shastri",         overs: "1.0", dots: 1, runs: 18, wkts: 0 },
        { name: "Alzarri Joseph",       overs: "3.0", dots: 7, runs: 24, wkts: 2 }
      ]
    },
    t2Inn: {  // TT batting
      bat: [
        { name: "Sanju Samson",             dismissal: "c De Kock b Siraj",    runs: 21, balls: 17 },
        { name: "Laura Wolvaardt",          dismissal: "c De Kock b Siraj",    runs: 7,  balls: 3  },
        { name: "Yuvraj Singh",             dismissal: "b Kuldeep Yadav",      runs: 29, balls: 12 },
        { name: "Dewald Brevis",            dismissal: "b Jacks",              runs: 17, balls: 8  },
        { name: "Rassie van der Dussen",    dismissal: "c De Kock b Bishnoi",  runs: 29, balls: 16 },
        { name: "Vaibhav Suryavanshi",      dismissal: "b Jacks",              runs: 10, balls: 8  },
        { name: "Hardik Pandya",            dismissal: "b Bishnoi",            runs: 26, balls: 14 },
        { name: "Aiden Markram",            dismissal: "not out",              runs: 34, balls: 21 },
        { name: "Ravi Shastri",             dismissal: "lbw Bumrah",           runs: 19, balls: 11 },
        { name: "Mohammed Shami",           dismissal: "c De Kock b Bishnoi",  runs: 4,  balls: 9  },
        { name: "Varun Chakravarthy",       dismissal: "not out",              runs: 0,  balls: 2  }
      ],
      fow: [11, 56, 60, 92, 108, 126, 145, 183, 203],
      bowl: [  // AA bowling
        { name: "Mohammed Siraj",   overs: "4.0", dots: 6,  runs: 54, wkts: 2 },
        { name: "Jasprit Bumrah",   overs: "4.0", dots: 7,  runs: 30, wkts: 1 },
        { name: "Kuldeep Yadav",    overs: "4.0", dots: 9,  runs: 44, wkts: 1 },
        { name: "Will Jacks",       overs: "4.0", dots: 5,  runs: 39, wkts: 2 },
        { name: "Ravi Bishnoi",     overs: "4.0", dots: 9,  runs: 31, wkts: 3 }
      ]
    }
  }
};

// Add match to results (sorted by match number)
seed.results.push(newMatch);
seed.results.sort((a, b) => (a.match || a.n) - (b.match || b.n));

// ── UPDATE BATTING STATS ──────────────────────────────────────────────────────
function updateBatter(seed, name, team, runs, notOut, fifties, hundreds, mom, catches) {
  const idx = seed.batting.findIndex(p => p.name === name && p.team === team);
  const isNotOut = notOut === true;
  if (idx >= 0) {
    const b = seed.batting[idx];
    const newInn = b.inn + 1;
    const newRuns = b.runs + runs;
    const newDismissals = (b.dismissals || 0) + (isNotOut ? 0 : 1);
    seed.batting[idx] = {
      ...b,
      inn: newInn,
      runs: newRuns,
      hs: Math.max(b.hs, runs),
      avg: newDismissals > 0 ? parseFloat((newRuns / newDismissals).toFixed(2)) : newRuns,
      fifties: b.fifties + (fifties || 0),
      hundreds: b.hundreds + (hundreds || 0),
      mom: b.mom + (mom || 0),
      catches: (b.catches || 0) + (catches || 0),
      dismissals: newDismissals
    };
  } else {
    const dismissals = isNotOut ? 0 : 1;
    seed.batting.push({
      name, team, inn: 1, runs, hs: runs,
      avg: dismissals > 0 ? runs : runs,
      sr: 0, fifties: fifties || 0, hundreds: hundreds || 0,
      mom: mom || 0, catches: catches || 0, dismissals
    });
  }
}

// AA batters (team AA)
updateBatter(seed, "David Warner",       "AA", 35, false);
updateBatter(seed, "Travis Head",        "AA", 3,  false);
updateBatter(seed, "Quinton de Kock",    "AA", 21, false);
updateBatter(seed, "Will Jacks",         "AA", 76, false, 1, 0, 1);  // MOM + 50
updateBatter(seed, "Ben Stokes",         "AA", 10, false);
updateBatter(seed, "Evin Lewis",         "AA", 24, false);
updateBatter(seed, "Aarav Roy",          "AA", 33, true);
updateBatter(seed, "Tim David",          "AA", 7,  false);
updateBatter(seed, "Jasprit Bumrah",     "AA", 2,  true);
updateBatter(seed, "Kuldeep Yadav",      "AA", 0,  true);
updateBatter(seed, "Ravi Bishnoi",       "AA", 0,  true);

// TT batters (team TT)
updateBatter(seed, "Sanju Samson",           "TT", 21, false);
updateBatter(seed, "Laura Wolvaardt",        "TT", 7,  false);
updateBatter(seed, "Yuvraj Singh",           "TT", 29, false);
updateBatter(seed, "Dewald Brevis",          "TT", 17, false);
updateBatter(seed, "Rassie van der Dussen",  "TT", 29, false);
updateBatter(seed, "Vaibhav Suryavanshi",    "TT", 10, false);
updateBatter(seed, "Hardik Pandya",          "TT", 26, false);
updateBatter(seed, "Aiden Markram",          "TT", 34, true);
updateBatter(seed, "Ravi Shastri",           "TT", 19, false);
updateBatter(seed, "Mohammed Shami",         "TT", 4,  false);
updateBatter(seed, "Varun Chakravarthy",     "TT", 0,  true);

// ── UPDATE BOWLING STATS ──────────────────────────────────────────────────────
function updateBowler(seed, name, team, overs, runs, wkts, bbi) {
  const inn = 1;
  const econ = parseFloat((runs / parseFloat(overs)).toFixed(2));
  const sr = wkts > 0 ? parseFloat(((parseFloat(overs) * 6) / wkts).toFixed(1)) : 0;
  const avg = wkts > 0 ? parseFloat((runs / wkts).toFixed(2)) : 0;
  const fourW = wkts >= 4 ? 1 : 0;
  const idx = seed.bowling.findIndex(p => p.name === name && p.team === team);
  if (idx >= 0) {
    const b = seed.bowling[idx];
    const newInn = b.inn + inn;
    const newWkts = b.wkts + wkts;
    const existBbiWkts = parseInt((b.bbi||'0/0').split('/')[0]) || 0;
    const newBbi = wkts > existBbiWkts ? bbi : b.bbi;
    const newEcon = parseFloat(((b.econ * b.inn + econ * inn) / newInn).toFixed(2));
    const newAvg = b.avg > 0 && avg > 0 ? parseFloat(((b.avg * b.inn + avg * inn) / newInn).toFixed(2)) : (b.avg || avg);
    const newSr = b.sr > 0 && sr > 0 ? parseFloat(((b.sr * b.inn + sr * inn) / newInn).toFixed(1)) : (b.sr || sr);
    seed.bowling[idx] = {
      ...b, inn: newInn, wkts: newWkts, bbi: newBbi,
      econ: newEcon, avg: newAvg, sr: newSr,
      fourW: (b.fourW || 0) + fourW
    };
  } else {
    seed.bowling.push({ name, team, inn, wkts, bbi: bbi || `${wkts}/${runs}`, avg, econ, sr, fourW });
  }
}

// TT bowlers (bowling at AA)
updateBowler(seed, "Yuvraj Singh",        "TT", "4.0", 36, 1, "1/36");
updateBowler(seed, "Varun Chakravarthy",  "TT", "4.0", 55, 1, "1/55");
updateBowler(seed, "Mohammed Shami",      "TT", "4.0", 35, 1, "1/35");
updateBowler(seed, "Hardik Pandya",       "TT", "4.0", 43, 1, "1/43");
updateBowler(seed, "Ravi Shastri",        "TT", "1.0", 18, 0, "0/18");
updateBowler(seed, "Alzarri Joseph",      "TT", "3.0", 24, 2, "2/24");

// AA bowlers (bowling at TT)
updateBowler(seed, "Mohammed Siraj",  "AA", "4.0", 54, 2, "2/54");
updateBowler(seed, "Jasprit Bumrah",  "AA", "4.0", 30, 1, "1/30");
updateBowler(seed, "Kuldeep Yadav",   "AA", "4.0", 44, 1, "1/44");
updateBowler(seed, "Will Jacks",      "AA", "4.0", 39, 2, "2/39");
updateBowler(seed, "Ravi Bishnoi",    "AA", "4.0", 31, 3, "3/31");

// ── WRITE BACK ────────────────────────────────────────────────────────────────
const newSeedStr = JSON.stringify(seed, null, 2);
const newHtml = html.slice(0, seedStart + 'const SEED = '.length) + newSeedStr + ';\n' + html.slice(seedEnd + 1);
fs.writeFileSync('/Users/taran/Desktop/EX-Desktop/minicw/bcl/index.html', newHtml);

console.log('M36 AA vs TT added successfully!');
console.log('Total results now:', seed.results.length);
console.log('Will Jacks stats:', JSON.stringify(seed.batting.find(p=>p.name==='Will Jacks')));
console.log('Ravi Bishnoi bowl stats:', JSON.stringify(seed.bowling.find(p=>p.name==='Ravi Bishnoi')));
