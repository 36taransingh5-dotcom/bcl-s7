const fs = require('fs');
let html = fs.readFileSync('/Users/taran/Desktop/EX-Desktop/minicw/bcl/index.html', 'utf8');

const seedStart = html.indexOf('const SEED = {');
const seedEnd = html.indexOf('\nlet DB', seedStart);
const seed = JSON.parse(html.slice(seedStart + 'const SEED = '.length, seedEnd).trim().replace(/;$/, ''));

// Update Match 3
const matchIndex = seed.results.findIndex(r => r.match === 3);
if (matchIndex !== -1) {
    seed.results[matchIndex].scorecard = {
        t1Inn: { // VV Batting
            bat: [
                { name: "Rohit Sharma",     dismissal: "b Singh",               runs: 8,  balls: 4 },
                { name: "KL Rahul",         dismissal: "b Chakravarthy",        runs: 0,  balls: 1 },
                { name: "Virat Kohli",      dismissal: "b Shami",               runs: 71, balls: 33 },
                { name: "Yashasvi Jaiswal", dismissal: "c Samson b Chakravarthy", runs: 4,  balls: 3 },
                { name: "Joe Root",         dismissal: "lbw Shami",             runs: 56, balls: 21 },
                { name: "Vivaan Armstrong", dismissal: "c Joseph b Shami",      runs: 0,  balls: 1 },
                { name: "Rachin Ravindra",  dismissal: "c Chakravarthy b Pandya", runs: 20, balls: 14 },
                { name: "Alyssa Healy",     dismissal: "b Chakravarthy",        runs: 24, balls: 12 },
                { name: "Mitchell Santner", dismissal: "c Pandya b Singh",      runs: 17, balls: 13 },
                { name: "Kagiso Rabada",    dismissal: "not out",               runs: 9,  balls: 9 },
                { name: "Matt Henry",       dismissal: "not out",               runs: 5,  balls: 8 }
            ],
            fow: [],
            extras: 6,
            bowl: [
                { name: "Yuvraj Singh",       overs: "3.4", dots: 0, runs: 36, wkts: 2 },
                { name: "Varun Chakravarthy", overs: "4.0", dots: 0, runs: 48, wkts: 3 },
                { name: "Alzarri Joseph",     overs: "3.0", dots: 0, runs: 42, wkts: 0 },
                { name: "Ravi Shastri",       overs: "1.0", dots: 0, runs: 14, wkts: 0 },
                { name: "Mohammed Shami",     overs: "4.0", dots: 0, runs: 48, wkts: 3 },
                { name: "Hardik Pandya",      overs: "4.0", dots: 0, runs: 32, wkts: 1 }
            ]
        },
        t2Inn: { // TT Batting
            bat: [
                { name: "Sanju Samson",          dismissal: "lbw Rabada",       runs: 58, balls: 42 },
                { name: "Laura Wolvaardt",       dismissal: "c Boult b Henry",  runs: 29, balls: 19 },
                { name: "Yuvraj Singh",          dismissal: "lbw Ravindra",     runs: 16, balls: 10 },
                { name: "Aiden Markram",         dismissal: "c Healy b Rabada", runs: 26, balls: 11 },
                { name: "Rassie van der Dussen", dismissal: "lbw Henry",        runs: 53, balls: 24 },
                { name: "Hardik Pandya",         dismissal: "c Henry b Boult",  runs: 13, balls: 6 },
                { name: "Dewald Brevis",         dismissal: "c Healy b Santner",runs: 15, balls: 7 },
                { name: "Ravi Shastri",          dismissal: "not out",          runs: 4,  balls: 3 },
                { name: "Mohammed Shami",        dismissal: "not out",          runs: 2,  balls: 1 },
                { name: "Varun Chakravarthy",    dismissal: "did not bat",      runs: 0,  balls: 0 },
                { name: "Alzarri Joseph",        dismissal: "did not bat",      runs: 0,  balls: 0 }
            ],
            fow: [],
            extras: 3,
            bowl: [
                { name: "Rachin Ravindra",  overs: "4.0", dots: 0, runs: 43, wkts: 1 },
                { name: "Trent Boult",      overs: "4.0", dots: 0, runs: 35, wkts: 1 },
                { name: "Kagiso Rabada",    overs: "4.0", dots: 0, runs: 53, wkts: 2 },
                { name: "Matt Henry",       overs: "4.0", dots: 0, runs: 43, wkts: 2 },
                { name: "Mitchell Santner", overs: "4.0", dots: 0, runs: 45, wkts: 1 }
            ]
        }
    };
    console.log('Match 3 scorecard added.');
}

const newSeedStr = JSON.stringify(seed, null, 2);
html = html.slice(0, seedStart + 'const SEED = '.length) + newSeedStr + ';\n' + html.slice(seedEnd + 1);
fs.writeFileSync('/Users/taran/Desktop/EX-Desktop/minicw/bcl/index.html', html);
