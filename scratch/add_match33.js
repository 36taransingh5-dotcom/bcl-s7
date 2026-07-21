const fs = require('fs');

let currentHtml = fs.readFileSync('index.html', 'utf8');

const season9ResultsMatch = currentHtml.match(/MULTI_DB\.season9\.results = (\[[\s\S]*?\]);/);
if (!season9ResultsMatch) {
    console.error("Could not find MULTI_DB.season9.results array.");
    process.exit(1);
}

let season9Results = JSON.parse(season9ResultsMatch[1]);

if (season9Results.find(r => r.match === 33)) {
    console.log("Match 33 already exists. Removing it to re-add.");
    season9Results = season9Results.filter(r => r.match !== 33);
}

const match33Data = {
    match: 33,
    team1: "AA",
    team2: "HH",
    venue: "Arun Jaitley Stadium",
    score1: "229/7",
    overs1: "20.0",
    score2: "249/1",
    overs2: "20.0",
    winner: "HH",
    margin: "9 wickets",
    mom: "Sai Sudharsan (HH) — 158*",
    scorecard: {
        t1Inn: {
            bat: [
                { name: "Travis Head", dismissal: "b HAZLEWOOD", runs: 7, balls: 5 },
                { name: "David Warner", dismissal: "b JONASSEN", runs: 2, balls: 3 },
                { name: "Q de Kock", dismissal: "b SWEPSON", runs: 60, balls: 30 },
                { name: "Mitchell Marsh", dismissal: "c SWEPSON b JONASSEN", runs: 19, balls: 10 },
                { name: "Tim David", dismissal: "b SWEPSON", runs: 6, balls: 6 },
                { name: "Will Jacks", dismissal: "c RICKELTON b SWEPSON", runs: 0, balls: 1 },
                { name: "Aarav Roy", dismissal: "not out", runs: 86, balls: 43 },
                { name: "Ben Stokes", dismissal: "c SWEPSON b PANDYA", runs: 29, balls: 12 },
                { name: "Nat Sciver", dismissal: "not out", runs: 20, balls: 10 },
                { name: "Jasprit Bumrah", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Mohd Siraj", dismissal: "did not bat", runs: 0, balls: 0 }
            ],
            bowl: [
                { name: "Josh Hazlewood", overs: "4.0", maidens: 0, runs: 39, wkts: 1 },
                { name: "Jess Jonassen", overs: "4.0", maidens: 0, runs: 36, wkts: 2 },
                { name: "Krunal Pandya", overs: "4.0", maidens: 0, runs: 57, wkts: 1 },
                { name: "Mitchell Swepson", overs: "4.0", maidens: 0, runs: 44, wkts: 3 },
                { name: "Axar Patel", overs: "4.0", maidens: 0, runs: 53, wkts: 0 }
            ],
            fow: "1-8, 2-10, 3-70, 4-93, 5-93, 6-108, 7-184"
        },
        t2Inn: {
            bat: [
                { name: "Shikhar Dhawan", dismissal: "c MARSH b CHAKRAVARTHY", runs: 31, balls: 18 },
                { name: "Sai Sudharsan", dismissal: "not out", runs: 158, balls: 66 },
                { name: "Steve Smith", dismissal: "not out", runs: 59, balls: 36 },
                { name: "Suryakumar Yadav", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Ryan Rickelton", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Shubman Gill", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Axar Patel", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Krunal Pandya", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Heinrich Klaasen", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Jess Jonassen", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Mitchell Swepson", dismissal: "did not bat", runs: 0, balls: 0 }
            ],
            bowl: [
                { name: "Mohd Siraj", overs: "4.0", maidens: 0, runs: 36, wkts: 0 },
                { name: "Jasprit Bumrah", overs: "4.0", maidens: 0, runs: 58, wkts: 0 },
                { name: "Will Jacks", overs: "3.0", maidens: 0, runs: 39, wkts: 0 },
                { name: "Varun Chakravarthy", overs: "4.0", maidens: 0, runs: 45, wkts: 1 },
                { name: "Ben Stokes", overs: "3.0", maidens: 0, runs: 40, wkts: 0 },
                { name: "Nat Sciver", overs: "2.0", maidens: 0, runs: 30, wkts: 0 }
            ],
            fow: "1-74"
        }
    }
};

season9Results.push(match33Data);

currentHtml = currentHtml.replace(
    /MULTI_DB\.season9\.results = \[[\s\S]*?\];/,
    `MULTI_DB.season9.results = ${JSON.stringify(season9Results)};`
);

fs.writeFileSync('index.html', currentHtml);
console.log("Match 33 (Season 9) data successfully injected into index.html!");
