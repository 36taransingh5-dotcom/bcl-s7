const fs = require('fs');
let html = fs.readFileSync('/Users/taran/Desktop/EX-Desktop/minicw/bcl/index.html', 'utf8');

const seedStart = html.indexOf('const SEED = {');
const seedEnd = html.indexOf('\nlet DB', seedStart);
const seed = JSON.parse(html.slice(seedStart + 'const SEED = '.length, seedEnd).trim().replace(/;$/, ''));

// Update Match 1
const matchIndex = seed.results.findIndex(r => r.match === 1);
if (matchIndex !== -1) {
    seed.results[matchIndex].scorecard = {
        t1Inn: { // HH Batting (team1)
            bat: [
                { name: "Steve Smith",       dismissal: "c Inglis b Stoinis",     runs: 21, balls: 13 },
                { name: "Martin Guptill",    dismissal: "c&b Stoinis",            runs: 12, balls: 10 },
                { name: "Shubman Gill",      dismissal: "b Chahal",               runs: 5,  balls: 4 },
                { name: "Ruturaj Gaikwad",   dismissal: "run out Behrendorff",    runs: 58, balls: 27 },
                { name: "Shikhar Dhawan",    dismissal: "c Stoinis b King",       runs: 9,  balls: 8 },
                { name: "Harry Kraft",       dismissal: "b King",                 runs: 9,  balls: 7 },
                { name: "Krunal Pandya",     dismissal: "c Inglis b King",        runs: 28, balls: 14 },
                { name: "Heinrich Klaasen",  dismissal: "lbw Bracewell",          runs: 25, balls: 14 },
                { name: "Washington Sundar", dismissal: "not out",                runs: 29, balls: 17 },
                { name: "Jess Jonassen",     dismissal: "c Inglis b Marsh",       runs: 2,  balls: 3 },
                { name: "Fazalhaq Farooqi",  dismissal: "not out",                runs: 1,  balls: 3 }
            ],
            fow: [],
            extras: 2,
            bowl: [
                { name: "Jason Behrendorff", overs: "4.0", dots: 0, runs: 40, wkts: 0 },
                { name: "Marcus Stoinis",    overs: "4.0", dots: 0, runs: 40, wkts: 2 },
                { name: "Yuzvendra Chahal",  overs: "4.0", dots: 0, runs: 40, wkts: 1 },
                { name: "Alana King",        overs: "4.0", dots: 0, runs: 40, wkts: 3 },
                { name: "Michael Bracewell", overs: "2.0", dots: 0, runs: 20, wkts: 1 },
                { name: "Mitchell Marsh",    overs: "2.0", dots: 0, runs: 21, wkts: 1 }
            ]
        },
        t2Inn: { // AS Batting (team2)
            bat: [
                { name: "Mitchell Marsh",    dismissal: "lbw Farooqi",            runs: 2,  balls: 2 },
                { name: "Jordan Hermann",    dismissal: "c Gill b Swepson",       runs: 49, balls: 21 },
                { name: "Temba Bavuma",      dismissal: "lbw Pandya",             runs: 29, balls: 18 },
                { name: "Nicholas Pooran",   dismissal: "b Sundar",               runs: 10, balls: 6 },
                { name: "Josh Inglis",       dismissal: "b Swepson",              runs: 26, balls: 9 },
                { name: "David Miller",      dismissal: "c Guptill b Pandya",     runs: 6,  balls: 3 },
                { name: "Michael Bracewell", dismissal: "c Klaasen b Swepson",    runs: 0,  balls: 1 },
                { name: "Alex Carey",        dismissal: "lbw Sundar",             runs: 27, balls: 10 },
                { name: "Marcus Stoinis",    dismissal: "b Jonassen",             runs: 43, balls: 30 },
                { name: "Jason Behrendorff", dismissal: "lbw Pandya",             runs: 7,  balls: 17 },
                { name: "Alana King",        dismissal: "not out",                runs: 1,  balls: 2 }
            ],
            fow: [],
            extras: 4,
            bowl: [
                { name: "Fazalhaq Farooqi",  overs: "3.4", dots: 0, runs: 35, wkts: 1 },
                { name: "Jess Jonassen",     overs: "4.0", dots: 0, runs: 40, wkts: 1 },
                { name: "Washington Sundar", overs: "4.0", dots: 0, runs: 40, wkts: 2 },
                { name: "Krunal Pandya",     overs: "4.0", dots: 0, runs: 45, wkts: 3 },
                { name: "Mitchell Swepson",  overs: "4.0", dots: 0, runs: 44, wkts: 3 }
            ]
        }
    };
    
    // Also correctly assign MoM if needed, though the UI already shows it (let's keep the existing MoM).
    // Just looking at it, Jordan Hermann or Gaikwad were likely MoM.
    console.log('Match 1 scorecard added.');
}

const newSeedStr = JSON.stringify(seed, null, 2);
html = html.slice(0, seedStart + 'const SEED = '.length) + newSeedStr + ';\n' + html.slice(seedEnd + 1);
fs.writeFileSync('/Users/taran/Desktop/EX-Desktop/minicw/bcl/index.html', html);
