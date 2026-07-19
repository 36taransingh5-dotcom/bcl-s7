const fs = require('fs');

let currentHtml = fs.readFileSync('index.html', 'utf8');

const season9ResultsMatch = currentHtml.match(/MULTI_DB\.season9\.results = (\[[\s\S]*?\]);/);
if (!season9ResultsMatch) {
    console.error("Could not find MULTI_DB.season9.results array.");
    process.exit(1);
}

let season9Results = JSON.parse(season9ResultsMatch[1]);

if (season9Results.find(r => r.match === 7)) {
    console.log("Match 7 already exists. Removing it to re-add.");
    season9Results = season9Results.filter(r => r.match !== 7);
}

const match7Data = {
    match: 7,
    team1: "AS",
    team2: "HH",
    venue: "Providence Stadium",
    score1: "174/10",
    overs1: "18.2",
    score2: "178/7",
    overs2: "19.3",
    winner: "HH",
    margin: "3 wickets",
    mom: "Krunal Pandya (HH) — 20 & 2/33",
    scorecard: {
        t1Inn: {
            bat: [
                { name: "Jason Roy", dismissal: "b JONASSEN", runs: 53, balls: 31 },
                { name: "Arjun Potter", dismissal: "c & b HAZLEWOOD", runs: 0, balls: 1 },
                { name: "Josh Inglis", dismissal: "lbw JONASSEN", runs: 15, balls: 10 },
                { name: "Andrew Strauss", dismissal: "c RICKELTON b SWEPSON", runs: 30, balls: 14 },
                { name: "Joe Denly", dismissal: "b SWEPSON", runs: 4, balls: 2 },
                { name: "Nitish Reddy", dismissal: "c & b PATEL", runs: 17, balls: 8 },
                { name: "Rilee Rossouw", dismissal: "c DHAWAN b PANDYA", runs: 41, balls: 24 },
                { name: "Fabian Allen", dismissal: "b SWEPSON", runs: 7, balls: 6 },
                { name: "Blessing Muzarabani", dismissal: "c RICKELTON b PATEL", runs: 6, balls: 9 },
                { name: "Kuldeep Yadav", dismissal: "c JONASSEN b PANDYA", runs: 1, balls: 5 },
                { name: "Arshdeep Singh", dismissal: "not out", runs: 0, balls: 0 }
            ],
            bowl: [
                { name: "Josh Hazlewood", overs: "4.0", maidens: 0, runs: 30, wkts: 1 },
                { name: "Jess Jonassen", overs: "4.0", maidens: 0, runs: 41, wkts: 2 },
                { name: "Krunal Pandya", overs: "3.2", maidens: 0, runs: 33, wkts: 2 },
                { name: "Mitchell Swepson", overs: "4.0", maidens: 0, runs: 38, wkts: 3 },
                { name: "Axar Patel", overs: "3.0", maidens: 0, runs: 32, wkts: 2 }
            ],
            fow: "1-1, 2-34, 3-80, 4-84, 5-101, 6-156, 7-160, 8-172, 9-174, 10-174"
        },
        t2Inn: {
            bat: [
                { name: "Shikhar Dhawan", dismissal: "c & b MUZARABANI", runs: 15, balls: 6 },
                { name: "Sai Sudharsan", dismissal: "c INGLIS b MUZARABANI", runs: 21, balls: 12 },
                { name: "Steve Smith", dismissal: "c REDDY b YADAV", runs: 43, balls: 21 },
                { name: "Suryakumar Yadav", dismissal: "c MUZARABANI b CHAHAL", runs: 23, balls: 17 },
                { name: "Ryan Rickelton", dismissal: "not out", runs: 37, balls: 27 },
                { name: "Shubman Gill", dismissal: "lbw ALLEN", runs: 5, balls: 5 },
                { name: "Axar Patel", dismissal: "c REDDY b CHAHAL", runs: 2, balls: 6 },
                { name: "Krunal Pandya", dismissal: "b ALLEN", runs: 20, balls: 18 },
                { name: "Heinrich Klaasen", dismissal: "not out", runs: 8, balls: 6 },
                { name: "Jess Jonassen", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Josh Hazlewood", dismissal: "did not bat", runs: 0, balls: 0 }
            ],
            bowl: [
                { name: "Arshdeep Singh", overs: "3.3", maidens: 0, runs: 44, wkts: 0 },
                { name: "Blessing Muzarabani", overs: "4.0", maidens: 0, runs: 48, wkts: 2 },
                { name: "Kuldeep Yadav", overs: "4.0", maidens: 0, runs: 24, wkts: 1 },
                { name: "Y Chahal", overs: "4.0", maidens: 0, runs: 24, wkts: 2 },
                { name: "Fabian Allen", overs: "4.0", maidens: 0, runs: 35, wkts: 2 }
            ],
            fow: "1-29, 2-54, 3-100, 4-104, 5-120, 6-123, 7-161"
        }
    }
};

season9Results.push(match7Data);

currentHtml = currentHtml.replace(
    /MULTI_DB\.season9\.results = \[[\s\S]*?\];/,
    `MULTI_DB.season9.results = ${JSON.stringify(season9Results)};`
);

fs.writeFileSync('index.html', currentHtml);
console.log("Match 7 (Season 9) data successfully injected into index.html!");
