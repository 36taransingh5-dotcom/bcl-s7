const fs = require('fs');
let html = fs.readFileSync('/Users/taran/Desktop/EX-Desktop/minicw/bcl/index.html', 'utf8');

const seedStart = html.indexOf('const SEED = {');
const seedEnd = html.indexOf('\nlet DB', seedStart);
const seed = JSON.parse(html.slice(seedStart + 'const SEED = '.length, seedEnd).trim().replace(/;$/, ''));

// Update Match 31
const newMatch = {
  match: 31,
  team1: "HH",
  team2: "TT",
  venue: "Arun Jaitley Stadium",
  score1: "123/10",
  overs1: "15.4",
  score2: "125/2",
  overs2: "14.0",
  winner: "TT",
  margin: "8 wickets",
  mom: "Mohd Shami (TT) — 3/33",
  scorecard: {
    t1Inn: { // HH Batting
      bat: [
        { name: "Steve Smith",       dismissal: "b Shami",           runs: 23, balls: 16 },
        { name: "Martin Guptill",    dismissal: "c Dussen b Shami",  runs: 6,  balls: 7 },
        { name: "Shikhar Dhawan",    dismissal: "b Shami",           runs: 4,  balls: 2 },
        { name: "Harmanpreet Kaur",  dismissal: "c Pandya b Chakravarthy", runs: 1, balls: 2 },
        { name: "Krunal Pandya",     dismissal: "b Chakravarthy",    runs: 0,  balls: 2 },
        { name: "Shubman Gill",      dismissal: "c Samson b Pandya", runs: 25, balls: 18 },
        { name: "Ruturaj Gaikwad",   dismissal: "b Joseph",          runs: 43, balls: 28 },
        { name: "Washington Sundar", dismissal: "c Samson b Joseph", runs: 12, balls: 7 },
        { name: "Heinrich Klaasen",  dismissal: "c Samson b Pandya", runs: 6,  balls: 4 },
        { name: "Jess Jonassen",     dismissal: "c Chakravarthy b Joseph", runs: 1, balls: 7 },
        { name: "Fazalhaq Farooqi",  dismissal: "not out",           runs: 1,  balls: 3 }
      ],
      fow: [23, 27, 28, 28, 48, 73, 95, 106, 122, 123],
      extras: 1,
      bowl: [
        { name: "Yuvraj Singh",       overs: "1.0", dots: 0, runs: 14, wkts: 0 },
        { name: "Varun Chakravarthy", overs: "4.0", dots: 8, runs: 21, wkts: 2 },
        { name: "Mohd Shami",         overs: "4.0", dots: 9, runs: 33, wkts: 3 },
        { name: "Alzarri Joseph",     overs: "2.5", dots: 10, runs: 18, wkts: 3 },
        { name: "Hardik Pandya",      overs: "3.0", dots: 8, runs: 23, wkts: 2 },
        { name: "Ravi Shastri",       overs: "1.0", dots: 2, runs: 14, wkts: 0 }
      ]
    },
    t2Inn: { // TT Batting
      bat: [
        { name: "Laura Wolvaardt",  dismissal: "not out",       runs: 54, balls: 41 },
        { name: "Sanju Samson",     dismissal: "b Pandya",      runs: 8,  balls: 7 },
        { name: "Yuvraj Singh",     dismissal: "lbw Pandya",    runs: 10, balls: 6 },
        { name: "Dewald Brevis",    dismissal: "not out",       runs: 51, balls: 30 },
        { name: "Aiden Markram",    dismissal: "did not bat",   runs: 0,  balls: 0 },
        { name: "RvD Dussen",       dismissal: "did not bat",   runs: 0,  balls: 0 },
        { name: "Hardik Pandya",    dismissal: "did not bat",   runs: 0,  balls: 0 },
        { name: "Ravi Shastri",     dismissal: "did not bat",   runs: 0,  balls: 0 },
        { name: "Varun Chakravarthy",dismissal: "did not bat",  runs: 0,  balls: 0 },
        { name: "Mohd Shami",       dismissal: "did not bat",   runs: 0,  balls: 0 },
        { name: "Alzarri Joseph",   dismissal: "did not bat",   runs: 0,  balls: 0 }
      ],
      fow: [17, 29],
      extras: 2,
      bowl: [
        { name: "Krunal Pandya",     overs: "4.0", dots: 7, runs: 27, wkts: 2 },
        { name: "Jess Jonassen",     overs: "4.0", dots: 8, runs: 25, wkts: 0 },
        { name: "Mitchell Swepson",  overs: "3.0", dots: 3, runs: 34, wkts: 0 },
        { name: "Washington Sundar", overs: "2.0", dots: 2, runs: 17, wkts: 0 },
        { name: "Fazalhaq Farooqi",  overs: "1.0", dots: 0, runs: 20, wkts: 0 }
      ]
    }
  }
};

seed.results = seed.results.filter(r => r.match !== 31);
seed.results.push(newMatch);
seed.results.sort((a, b) => (a.match || a.n) - (b.match || b.n));

const newSeedStr = JSON.stringify(seed, null, 2);
html = html.slice(0, seedStart + 'const SEED = '.length) + newSeedStr + ';\n' + html.slice(seedEnd + 1);

fs.writeFileSync('/Users/taran/Desktop/EX-Desktop/minicw/bcl/index.html', html);
console.log('Added Match 31 data to index.html.');
