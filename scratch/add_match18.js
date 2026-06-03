const fs = require('fs');
let html = fs.readFileSync('/Users/taran/Desktop/EX-Desktop/minicw/bcl/index.html', 'utf8');

const seedStart = html.indexOf('const SEED = {');
const seedEnd = html.indexOf('\nlet DB', seedStart);
const seed = JSON.parse(html.slice(seedStart + 'const SEED = '.length, seedEnd).trim().replace(/;$/, ''));

// ── NEW MATCH: M18 VV vs AA ──────────────────────────────────────────────────
// VV batted first: 179/10 in 18.5
// AA chased: 141/10 in 18.1
// VV win by 38 runs
// Venue: Bay Oval
// MOM: Will Jacks (AA) — 27 off 17 & 4/28

const newMatch = {
  match: 18,
  team1: "VV",
  team2: "AA",
  venue: "Bay Oval",
  score1: "179/10",
  overs1: "18.5",
  score2: "141/10",
  overs2: "18.1",
  winner: "VV",
  margin: "38 runs",
  mom: "Will Jacks (AA) — 27 off 17 & 4/28",
  scorecard: {
    t1Inn: {  // VV batting
      bat: [
        { name: "Rohit Sharma",     dismissal: "c Bumrah b Yadav",  runs: 22, balls: 14 },
        { name: "KL Rahul",         dismissal: "lbw Bumrah",        runs: 15, balls: 11 },
        { name: "Virat Kohli",      dismissal: "b Siraj",           runs: 5,  balls: 5 },
        { name: "Joe Root",         dismissal: "lbw Jacks",         runs: 34, balls: 14 },
        { name: "Vivaan Armstrong", dismissal: "c De Kock b Jacks", runs: 19, balls: 8 },
        { name: "Rachin Ravindra",  dismissal: "c De Kock b Jacks", runs: 7,  balls: 5 },
        { name: "Mitchell Santner", dismissal: "c Stokes b Jacks",  runs: 22, balls: 14 },
        { name: "Alyssa Healy",     dismissal: "lbw Bumrah",        runs: 33, balls: 24 },
        { name: "Yashasvi Jaiswal", dismissal: "not out",           runs: 20, balls: 10 },
        { name: "Kagiso Rabada",    dismissal: "c De Kock b Stokes",runs: 0,  balls: 2 },
        { name: "Matt Henry",       dismissal: "c De Kock b Bumrah",runs: 1,  balls: 7 }
      ],
      fow: [34, 43, 47, 74, 88, 117, 132, 169, 172, 179],
      extras: 1,
      bowl: [  // AA bowling
        { name: "Mohammed Siraj", overs: "4.0", dots: 4,  runs: 49, wkts: 1 },
        { name: "Jasprit Bumrah", overs: "4.0", dots: 12, runs: 16, wkts: 3 },
        { name: "Kuldeep Yadav",  overs: "3.0", dots: 2,  runs: 47, wkts: 1 },
        { name: "Will Jacks",     overs: "4.0", dots: 11, runs: 28, wkts: 4 },
        { name: "Ravi Bishnoi",   overs: "3.0", dots: 8,  runs: 33, wkts: 0 },
        { name: "Ben Stokes",     overs: "1.0", dots: 3,  runs: 5,  wkts: 1 }
      ]
    },
    t2Inn: {  // AA batting
      bat: [
        { name: "David Warner",   dismissal: "c Henry b Rabada",   runs: 12, balls: 7 },
        { name: "Travis Head",    dismissal: "b Boult",            runs: 1,  balls: 4 },
        { name: "Quinton de Kock",dismissal: "b Boult",            runs: 27, balls: 12 },
        { name: "Will Jacks",     dismissal: "c Jaiswal b Ravindra",runs: 27, balls: 17 },
        { name: "Ben Stokes",     dismissal: "b Ravindra",         runs: 8,  balls: 10 },
        { name: "Evin Lewis",     dismissal: "b Rabada",           runs: 31, balls: 23 },
        { name: "Aarav Roy",      dismissal: "c Kohli b Henry",    runs: 9,  balls: 6 },
        { name: "Tim David",      dismissal: "lbw Ravindra",       runs: 14, balls: 12 },
        { name: "Jasprit Bumrah", dismissal: "c Jaiswal b Henry",  runs: 5,  balls: 9 },
        { name: "Kuldeep Yadav",  dismissal: "c Boult b Santner",  runs: 5,  balls: 9 },
        { name: "Ravi Bishnoi",   dismissal: "not out",            runs: 0,  balls: 0 }
      ],
      fow: [6, 20, 48, 64, 95, 107, 125, 131, 141, 141],
      extras: 2,
      bowl: [  // VV bowling
        { name: "Rachin Ravindra",  overs: "4.0", dots: 8,  runs: 31, wkts: 3 },
        { name: "Trent Boult",      overs: "4.0", dots: 8,  runs: 36, wkts: 2 },
        { name: "Kagiso Rabada",    overs: "4.0", dots: 8,  runs: 36, wkts: 2 },
        { name: "Mitchell Santner", overs: "4.0", dots: 10, runs: 29, wkts: 1 },
        { name: "Matt Henry",       overs: "2.1", dots: 8,  runs: 9,  wkts: 2 }
      ]
    }
  }
};

// Filter out if exists
seed.results = seed.results.filter(r => r.match !== 18);
seed.results.push(newMatch);
seed.results.sort((a, b) => (a.match || a.n) - (b.match || b.n));

const newSeedStr = JSON.stringify(seed, null, 2);
html = html.slice(0, seedStart + 'const SEED = '.length) + newSeedStr + ';\n' + html.slice(seedEnd + 1);

fs.writeFileSync('/Users/taran/Desktop/EX-Desktop/minicw/bcl/index.html', html);
console.log('Added Match 18 data to index.html.');
