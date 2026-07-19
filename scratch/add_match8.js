const fs = require('fs');

let currentHtml = fs.readFileSync('index.html', 'utf8');

const season9ResultsMatch = currentHtml.match(/MULTI_DB\.season9\.results = (\[[\s\S]*?\]);/);
if (!season9ResultsMatch) {
    console.error("Could not find MULTI_DB.season9.results array.");
    process.exit(1);
}

let season9Results = JSON.parse(season9ResultsMatch[1]);

if (season9Results.find(r => r.match === 8)) {
    console.log("Match 8 already exists. Removing it to re-add.");
    season9Results = season9Results.filter(r => r.match !== 8);
}

const match8Data = {
    match: 8,
    team1: "HH",
    team2: "AA",
    venue: "HPCA Stadium",
    score1: "227/8",
    overs1: "19.5",
    score2: "226/7",
    overs2: "20.0",
    winner: "HH",
    margin: "1 run",
    mom: "Sai Sudharsan (HH) — 110 (52)",
    scorecard: {
        t1Inn: {
            bat: [
                { name: "Shikhar Dhawan", dismissal: "c ROY b BUMRAH", runs: 23, balls: 13 },
                { name: "Sai Sudharsan", dismissal: "c DE KOCK b SCIVER", runs: 110, balls: 52 },
                { name: "Steve Smith", dismissal: "c DE KOCK b BUMRAH", runs: 0, balls: 2 },
                { name: "Suryakumar Yadav", dismissal: "b BUMRAH", runs: 0, balls: 1 },
                { name: "Shubman Gill", dismissal: "b SIRAJ", runs: 3, balls: 3 },
                { name: "Axar Patel", dismissal: "c DE KOCK b JACKS", runs: 7, balls: 5 },
                { name: "Ryan Rickelton", dismissal: "c JACKS b SCIVER", runs: 36, balls: 20 },
                { name: "Heinrich Klaasen", dismissal: "not out", runs: 38, balls: 20 },
                { name: "Krunal Pandya", dismissal: "b SCIVER", runs: 0, balls: 1 },
                { name: "Jess Jonassen", dismissal: "not out", runs: 2, balls: 2 },
                { name: "Josh Hazlewood", dismissal: "did not bat", runs: 0, balls: 0 }
            ],
            bowl: [
                { name: "Mohd Siraj", overs: "4.0", maidens: 0, runs: 38, wkts: 1 },
                { name: "Jasprit Bumrah", overs: "4.0", maidens: 0, runs: 46, wkts: 3 },
                { name: "Will Jacks", overs: "4.0", maidens: 0, runs: 43, wkts: 1 },
                { name: "Varun Chakravarthy", overs: "4.0", maidens: 0, runs: 45, wkts: 0 },
                { name: "Nat Sciver", overs: "3.5", maidens: 0, runs: 47, wkts: 3 }
            ],
            fow: "1-37, 2-37, 3-37, 4-40, 5-49, 6-105, 7-224, 8-224"
        },
        t2Inn: {
            bat: [
                { name: "Travis Head", dismissal: "c DHAWAN b HAZLEWOOD", runs: 0, balls: 2 },
                { name: "David Warner", dismissal: "b JONASSEN", runs: 6, balls: 3 },
                { name: "Q de Kock", dismissal: "b PANDYA", runs: 77, balls: 42 },
                { name: "Mitchell Marsh", dismissal: "lbw HAZLEWOOD", runs: 51, balls: 28 },
                { name: "Will Jacks", dismissal: "c RICKELTON b SWEPSON", runs: 3, balls: 5 },
                { name: "Tim David", dismissal: "not out", runs: 47, balls: 21 },
                { name: "Aarav Roy", dismissal: "b SWEPSON", runs: 2, balls: 3 },
                { name: "Ben Stokes", dismissal: "c RICKELTON b SWEPSON", runs: 14, balls: 6 },
                { name: "Nat Sciver", dismissal: "not out", runs: 22, balls: 10 },
                { name: "Jasprit Bumrah", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Mohd Siraj", dismissal: "did not bat", runs: 0, balls: 0 }
            ],
            bowl: [
                { name: "Josh Hazlewood", overs: "4.0", maidens: 0, runs: 40, wkts: 2 },
                { name: "Jess Jonassen", overs: "4.0", maidens: 0, runs: 44, wkts: 1 },
                { name: "Mitchell Swepson", overs: "4.0", maidens: 0, runs: 46, wkts: 3 },
                { name: "Krunal Pandya", overs: "4.0", maidens: 0, runs: 31, wkts: 1 },
                { name: "Axar Patel", overs: "4.0", maidens: 0, runs: 62, wkts: 0 }
            ],
            fow: "1-0, 2-12, 3-119, 4-139, 5-139, 6-149, 7-183"
        }
    }
};

season9Results.push(match8Data);

currentHtml = currentHtml.replace(
    /MULTI_DB\.season9\.results = \[[\s\S]*?\];/,
    `MULTI_DB.season9.results = ${JSON.stringify(season9Results)};`
);

fs.writeFileSync('index.html', currentHtml);
console.log("Match 8 data successfully injected into index.html!");
