const fs = require('fs');

let currentHtml = fs.readFileSync('index.html', 'utf8');

const season9ResultsMatch = currentHtml.match(/MULTI_DB\.season9\.results = (\[[\s\S]*?\]);/);
if (!season9ResultsMatch) {
    console.error("Could not find MULTI_DB.season9.results array.");
    process.exit(1);
}

let season9Results = JSON.parse(season9ResultsMatch[1]);

if (season9Results.find(r => r.match === 25)) {
    console.log("Match 25 already exists. Removing it to re-add.");
    season9Results = season9Results.filter(r => r.match !== 25);
}

const match25Data = {
    match: 25,
    team1: "AS",
    team2: "AA",
    venue: "Rawalpindi Cricket Stadium",
    score1: "102/10",
    overs1: "13.4",
    score2: "103/4",
    overs2: "7.4",
    winner: "AA",
    margin: "6 wickets",
    mom: "Mohd Siraj (AA) — 3/16",
    scorecard: {
        t1Inn: {
            bat: [
                { name: "Jason Roy", dismissal: "c SCIVER b SIRAJ", runs: 16, balls: 17 },
                { name: "Josh Inglis", dismissal: "b SIRAJ", runs: 7, balls: 7 },
                { name: "Joe Denly", dismissal: "c HEAD b BUMRAH", runs: 5, balls: 3 },
                { name: "Andrew Strauss", dismissal: "c DE KOCK b SIRAJ", runs: 1, balls: 2 },
                { name: "Rilee Rossouw", dismissal: "c DE KOCK b JACKS", runs: 8, balls: 5 },
                { name: "Arjun Potter", dismissal: "b SCIVER", runs: 19, balls: 14 },
                { name: "Nitish Reddy", dismissal: "c BUMRAH b CHAKRAVARTHY", runs: 20, balls: 12 },
                { name: "Fabian Allen", dismissal: "c HEAD b CHAKRAVARTHY", runs: 19, balls: 9 },
                { name: "Blessing Muzarabani", dismissal: "c SIRAJ b BUMRAH", runs: 4, balls: 4 },
                { name: "Kuldeep Yadav", dismissal: "lbw JACKS", runs: 2, balls: 6 },
                { name: "Arshdeep Singh", dismissal: "not out", runs: 1, balls: 3 }
            ],
            bowl: [
                { name: "Mohd Siraj", overs: "3.0", maidens: 0, runs: 16, wkts: 3 },
                { name: "Jasprit Bumrah", overs: "2.4", maidens: 0, runs: 16, wkts: 2 },
                { name: "Will Jacks", overs: "3.0", maidens: 0, runs: 29, wkts: 2 },
                { name: "Varun Chakravarthy", overs: "3.0", maidens: 0, runs: 21, wkts: 2 },
                { name: "Nat Sciver", overs: "2.0", maidens: 0, runs: 20, wkts: 1 }
            ],
            fow: "1-15, 2-20, 3-29, 4-30, 5-44, 6-67, 7-91, 8-95, 9-100, 10-102"
        },
        t2Inn: {
            bat: [
                { name: "Travis Head", dismissal: "lbw SINGH", runs: 17, balls: 8 },
                { name: "David Warner", dismissal: "c INGLIS b SINGH", runs: 46, balls: 16 },
                { name: "Q de Kock", dismissal: "c ROSSOUW b SINGH", runs: 3, balls: 4 },
                { name: "Mitchell Marsh", dismissal: "not out", runs: 14, balls: 7 },
                { name: "Aarav Roy", dismissal: "c ALLEN b SINGH", runs: 22, balls: 10 },
                { name: "Ben Stokes", dismissal: "not out", runs: 1, balls: 1 },
                { name: "Will Jacks", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Tim David", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Nat Sciver", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Jasprit Bumrah", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Mohd Siraj", dismissal: "did not bat", runs: 0, balls: 0 }
            ],
            bowl: [
                { name: "Arshdeep Singh", overs: "4.0", maidens: 0, runs: 49, wkts: 4 },
                { name: "Blessing Muzarabani", overs: "1.0", maidens: 0, runs: 22, wkts: 0 },
                { name: "Y Chahal", overs: "1.0", maidens: 0, runs: 10, wkts: 0 },
                { name: "Kuldeep Yadav", overs: "1.4", maidens: 0, runs: 22, wkts: 0 }
            ],
            fow: "1-50, 2-60, 3-67, 4-97"
        }
    }
};

season9Results.push(match25Data);

currentHtml = currentHtml.replace(
    /MULTI_DB\.season9\.results = \[[\s\S]*?\];/,
    `MULTI_DB.season9.results = ${JSON.stringify(season9Results)};`
);

fs.writeFileSync('index.html', currentHtml);
console.log("Match 25 (Season 9) data successfully injected into index.html!");
