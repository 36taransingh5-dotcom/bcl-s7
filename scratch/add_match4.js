const fs = require('fs');

let currentHtml = fs.readFileSync('index.html', 'utf8');

const season9ResultsMatch = currentHtml.match(/MULTI_DB\.season9\.results = (\[[\s\S]*?\]);/);
if (!season9ResultsMatch) {
    console.error("Could not find MULTI_DB.season9.results array.");
    process.exit(1);
}

let season9Results = JSON.parse(season9ResultsMatch[1]);

if (season9Results.find(r => r.match === 4)) {
    console.log("Match 4 already exists. Removing it to re-add.");
    season9Results = season9Results.filter(r => r.match !== 4);
}

const match4Data = {
    match: 4,
    team1: "AS",
    team2: "AA",
    venue: "Beausejour Cricket Ground",
    score1: "58/10",
    overs1: "9.1",
    score2: "59/1",
    overs2: "5.0",
    winner: "AA",
    margin: "9 wickets",
    mom: "Varun Chakravarthy (AA) — 4/3",
    scorecard: {
        t1Inn: {
            bat: [
                { name: "Jason Roy", dismissal: "run out HEAD", runs: 8, balls: 5 },
                { name: "Josh Inglis", dismissal: "b BUMRAH", runs: 3, balls: 4 },
                { name: "Arjun Potter", dismissal: "c DE KOCK b CHAKRAVARTHY", runs: 25, balls: 17 },
                { name: "Joe Denly", dismissal: "c DE KOCK b BUMRAH", runs: 0, balls: 1 },
                { name: "Andrew Strauss", dismissal: "lbw SIRAJ", runs: 1, balls: 2 },
                { name: "Nitish Reddy", dismissal: "b SCIVER", runs: 13, balls: 13 },
                { name: "Arshdeep Singh", dismissal: "b CHAKRAVARTHY", runs: 0, balls: 1 },
                { name: "Y Chahal", dismissal: "c STOKES b CHAKRAVARTHY", runs: 0, balls: 1 },
                { name: "Kuldeep Yadav", dismissal: "c MARSH b JACKS", runs: 6, balls: 5 },
                { name: "Fabian Allen", dismissal: "c DE KOCK b CHAKRAVARTHY", runs: 2, balls: 6 },
                { name: "Blessing Muzarabani", dismissal: "not out", runs: 0, balls: 0 }
            ],
            bowl: [
                { name: "Mohd Siraj", overs: "3.0", maidens: 0, runs: 32, wkts: 1 },
                { name: "Jasprit Bumrah", overs: "2.0", maidens: 0, runs: 6, wkts: 2 },
                { name: "Will Jacks", overs: "2.0", maidens: 0, runs: 17, wkts: 1 },
                { name: "Varun Chakravarthy", overs: "2.0", maidens: 0, runs: 3, wkts: 4 },
                { name: "Nat Sciver", overs: "0.1", maidens: 0, runs: 0, wkts: 1 }
            ],
            fow: "1-11, 2-12, 3-12, 4-13, 5-44, 6-44, 7-44, 8-55, 9-58, 10-58"
        },
        t2Inn: {
            bat: [
                { name: "Travis Head", dismissal: "c INGLIS b SINGH", runs: 2, balls: 4 },
                { name: "David Warner", dismissal: "not out", runs: 22, balls: 11 },
                { name: "Q de Kock", dismissal: "not out", runs: 34, balls: 16 },
                { name: "Mitchell Marsh", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Will Jacks", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Ben Stokes", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Tim David", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Nat Sciver", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Jasprit Bumrah", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Mohd Siraj", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Varun Chakravarthy", dismissal: "did not bat", runs: 0, balls: 0 }
            ],
            bowl: [
                { name: "Arshdeep Singh", overs: "2.0", maidens: 0, runs: 25, wkts: 1 },
                { name: "Blessing Muzarabani", overs: "1.0", maidens: 0, runs: 10, wkts: 0 },
                { name: "Andrew Strauss", overs: "1.0", maidens: 0, runs: 14, wkts: 0 },
                { name: "Josh Inglis", overs: "1.0", maidens: 0, runs: 10, wkts: 0 }
            ],
            fow: "1-2"
        }
    }
};

season9Results.push(match4Data);

currentHtml = currentHtml.replace(
    /MULTI_DB\.season9\.results = \[[\s\S]*?\];/,
    `MULTI_DB.season9.results = ${JSON.stringify(season9Results)};`
);

fs.writeFileSync('index.html', currentHtml);
console.log("Match 4 data successfully injected into index.html!");
