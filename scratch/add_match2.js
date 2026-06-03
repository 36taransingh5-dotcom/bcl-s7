const fs = require('fs');
let html = fs.readFileSync('/Users/taran/Desktop/EX-Desktop/minicw/bcl/index.html', 'utf8');

const seedStart = html.indexOf('const SEED = {');
const seedEnd = html.indexOf('\nlet DB', seedStart);
const seed = JSON.parse(html.slice(seedStart + 'const SEED = '.length, seedEnd).trim().replace(/;$/, ''));

// Update Match 2
const matchIndex = seed.results.findIndex(r => r.match === 2);
if (matchIndex !== -1) {
    seed.results[matchIndex].scorecard = {
        t1Inn: { // AA Batting (team1)
            bat: [
                { name: "David Warner",    dismissal: "c Sharma b Kumar",    runs: 26,  balls: 11 },
                { name: "Travis Head",     dismissal: "b Theekshana",        runs: 29,  balls: 12 },
                { name: "Quinton de Kock", dismissal: "not out",             runs: 134, balls: 53 },
                { name: "Will Jacks",      dismissal: "b Singh",             runs: 28,  balls: 16 },
                { name: "Ben Stokes",      dismissal: "c Theekshana b Singh",runs: 0,   balls: 2 },
                { name: "Evin Lewis",      dismissal: "c Singh b Bauer",     runs: 44,  balls: 24 },
                { name: "Tim David",       dismissal: "not out",             runs: 5,   balls: 3 },
                { name: "Aarav Roy",       dismissal: "did not bat",         runs: 0,   balls: 0 },
                { name: "Jasprit Bumrah",  dismissal: "did not bat",         runs: 0,   balls: 0 },
                { name: "Kuldeep Yadav",   dismissal: "did not bat",         runs: 0,   balls: 0 },
                { name: "Ravi Bishnoi",    dismissal: "did not bat",         runs: 0,   balls: 0 }
            ],
            fow: [],
            extras: 5,
            bowl: [
                { name: "Bhuvneshwar Kumar", overs: "4.0", dots: 0, runs: 53, wkts: 1 },
                { name: "Arshdeep Singh",    overs: "4.0", dots: 0, runs: 46, wkts: 2 },
                { name: "Marco Jansen",      overs: "4.0", dots: 0, runs: 56, wkts: 0 },
                { name: "Maheesh Theekshana",overs: "4.0", dots: 0, runs: 53, wkts: 1 },
                { name: "Axar Patel",        overs: "3.0", dots: 0, runs: 46, wkts: 0 },
                { name: "Grant Bauer",       overs: "1.0", dots: 0, runs: 13, wkts: 1 }
            ]
        },
        t2Inn: { // GB Batting (team2)
            bat: [
                { name: "Abhishek Sharma",  dismissal: "c de Kock b Bumrah", runs: 7,  balls: 5 },
                { name: "Ishan Kishan",     dismissal: "b Bumrah",           runs: 7,  balls: 4 },
                { name: "Smriti Mandhana",  dismissal: "b Bishnoi",          runs: 43, balls: 24 },
                { name: "Ellyse Perry",     dismissal: "lbw Jacks",          runs: 31, balls: 16 },
                { name: "Shashank Singh",   dismissal: "b Jacks",            runs: 11, balls: 10 },
                { name: "Grant Bauer",      dismissal: "b Yadav",            runs: 29, balls: 15 },
                { name: "Rishabh Pant",     dismissal: "c Bishnoi b Siraj",  runs: 26, balls: 15 },
                { name: "Axar Patel",       dismissal: "c de Kock b Bumrah", runs: 13, balls: 7 },
                { name: "Marco Jansen",     dismissal: "c de Kock b Siraj",  runs: 0,  balls: 1 },
                { name: "Bhuvneshwar Kumar",dismissal: "not out",            runs: 0,  balls: 0 },
                { name: "Maheesh Theekshana",dismissal: "b Bumrah",          runs: 0,  balls: 4 }
            ],
            fow: [],
            extras: 1,
            bowl: [
                { name: "Mohammed Siraj", overs: "4.0", dots: 0, runs: 38, wkts: 2 },
                { name: "Jasprit Bumrah", overs: "2.5", dots: 0, runs: 22, wkts: 4 },
                { name: "Kuldeep Yadav",  overs: "3.0", dots: 0, runs: 32, wkts: 1 },
                { name: "Will Jacks",     overs: "4.0", dots: 0, runs: 28, wkts: 2 },
                { name: "Ravi Bishnoi",   overs: "2.0", dots: 0, runs: 32, wkts: 1 },
                { name: "Ben Stokes",     overs: "1.0", dots: 0, runs: 15, wkts: 0 }
            ]
        }
    };
    console.log('Match 2 scorecard added.');
}

const newSeedStr = JSON.stringify(seed, null, 2);
html = html.slice(0, seedStart + 'const SEED = '.length) + newSeedStr + ';\n' + html.slice(seedEnd + 1);
fs.writeFileSync('/Users/taran/Desktop/EX-Desktop/minicw/bcl/index.html', html);
