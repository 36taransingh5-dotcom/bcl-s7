const fs = require('fs');

let currentHtml = fs.readFileSync('index.html', 'utf8');

const season9ResultsMatch = currentHtml.match(/MULTI_DB\.season9\.results = (\[[\s\S]*?\]);/);
if (!season9ResultsMatch) {
    console.error("Could not find MULTI_DB.season9.results array.");
    process.exit(1);
}

let season9Results = JSON.parse(season9ResultsMatch[1]);

if (season9Results.find(r => r.match === 42)) {
    console.log("Match 42 already exists. Removing it to re-add.");
    season9Results = season9Results.filter(r => r.match !== 42);
}

const match42Data = {
    match: 42,
    team1: "HH",
    team2: "AS",
    venue: "Galle International Stadium",
    score1: "164/8",
    overs1: "20.0",
    score2: "172/10",
    overs2: "18.3",
    winner: "AS",
    margin: "1 wicket",
    mom: "Fabian Allen (AS) — 3/31",
    scorecard: {
        t1Inn: {
            bat: [
                { name: "Shikhar Dhawan", dismissal: "lbw SINGH", runs: 24, balls: 14 },
                { name: "Sai Sudharsan", dismissal: "lbw KRISHNA", runs: 13, balls: 14 },
                { name: "Steve Smith", dismissal: "b ALLEN", runs: 29, balls: 18 },
                { name: "Suryakumar Yadav", dismissal: "c & b CHAHAL", runs: 33, balls: 22 },
                { name: "Shubman Gill", dismissal: "c INGLIS b CHAHAL", runs: 11, balls: 7 },
                { name: "Ryan Rickelton", dismissal: "c INGLIS b ALLEN", runs: 2, balls: 4 },
                { name: "Axar Patel", dismissal: "c INGLIS b ALLEN", runs: 9, balls: 10 },
                { name: "Krunal Pandya", dismissal: "c INGLIS b KRISHNA", runs: 17, balls: 14 },
                { name: "Heinrich Klaasen", dismissal: "not out", runs: 17, balls: 15 },
                { name: "Jess Jonassen", dismissal: "not out", runs: 3, balls: 4 },
                { name: "Josh Hazlewood", dismissal: "did not bat", runs: 0, balls: 0 }
            ],
            bowl: [
                { name: "Arshdeep Singh", overs: "4.0", maidens: 0, runs: 32, wkts: 1 },
                { name: "Prasidh Krishna", overs: "4.0", maidens: 0, runs: 44, wkts: 2 },
                { name: "Kuldeep Yadav", overs: "4.0", maidens: 0, runs: 25, wkts: 0 },
                { name: "Y Chahal", overs: "4.0", maidens: 0, runs: 28, wkts: 2 },
                { name: "Fabian Allen", overs: "4.0", maidens: 0, runs: 31, wkts: 3 }
            ],
            fow: "1-31, 2-39, 3-89, 4-112, 5-113, 6-117, 7-131, 8-146"
        },
        t2Inn: {
            bat: [
                { name: "Josh Inglis", dismissal: "b HAZLEWOOD", runs: 0, balls: 6 },
                { name: "Jason Roy", dismissal: "lbw PANDYA", runs: 33, balls: 17 },
                { name: "Arjun Potter", dismissal: "c RICKELTON b SWEPSON", runs: 44, balls: 23 },
                { name: "Nitish Reddy", dismissal: "b PATEL", runs: 22, balls: 9 },
                { name: "Andrew Strauss", dismissal: "b PATEL", runs: 4, balls: 4 },
                { name: "Joe Denly", dismissal: "b SWEPSON", runs: 15, balls: 12 },
                { name: "Rilee Rossouw", dismissal: "lbw PATEL", runs: 25, balls: 12 },
                { name: "Fabian Allen", dismissal: "b JONASSEN", runs: 19, balls: 12 },
                { name: "Kuldeep Yadav", dismissal: "b SWEPSON", runs: 4, balls: 7 },
                { name: "Arshdeep Singh", dismissal: "not out", runs: 3, balls: 7 },
                { name: "Prasidh Krishna", dismissal: "b PANDYA", runs: 2, balls: 2 }
            ],
            bowl: [
                { name: "Josh Hazlewood", overs: "4.0", maidens: 0, runs: 18, wkts: 1 },
                { name: "Jess Jonassen", overs: "3.0", maidens: 0, runs: 36, wkts: 1 },
                { name: "Krunal Pandya", overs: "3.3", maidens: 0, runs: 46, wkts: 2 },
                { name: "Mitchell Swepson", overs: "4.0", maidens: 0, runs: 31, wkts: 3 },
                { name: "Axar Patel", overs: "4.0", maidens: 0, runs: 41, wkts: 3 }
            ],
            fow: "1-0, 2-54, 3-96, 4-103, 5-104, 6-140, 7-148, 8-164, 9-169, 10-172"
        }
    }
};

season9Results.push(match42Data);

currentHtml = currentHtml.replace(
    /MULTI_DB\.season9\.results = \[[\s\S]*?\];/,
    `MULTI_DB.season9.results = ${JSON.stringify(season9Results)};`
);

fs.writeFileSync('index.html', currentHtml);
console.log("Match 42 (Season 9) data successfully injected into index.html!");
