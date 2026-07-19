const fs = require('fs');

let currentHtml = fs.readFileSync('index.html', 'utf8');

const season9ResultsMatch = currentHtml.match(/MULTI_DB\.season9\.results = (\[[\s\S]*?\]);/);
if (!season9ResultsMatch) {
    console.error("Could not find MULTI_DB.season9.results array.");
    process.exit(1);
}

let season9Results = JSON.parse(season9ResultsMatch[1]);

if (season9Results.find(r => r.match === 5)) {
    console.log("Match 5 already exists. Removing it to re-add.");
    season9Results = season9Results.filter(r => r.match !== 5);
}

const match5Data = {
    match: 5,
    team1: "AA",
    team2: "SM",
    venue: "Kabul International Stadium",
    score1: "208/8",
    overs1: "20.0",
    score2: "189/9",
    overs2: "20.0",
    winner: "AA",
    margin: "19 runs",
    mom: "Nat Sciver (AA) — 29* & 4/34",
    scorecard: {
        t1Inn: {
            bat: [
                { name: "Travis Head", dismissal: "c RUSSELL b HOLDER", runs: 5, balls: 3 },
                { name: "David Warner", dismissal: "c SAMSON b HOLDER", runs: 19, balls: 7 },
                { name: "Q de Kock", dismissal: "c SAMSON b STARC", runs: 21, balls: 12 },
                { name: "Mitchell Marsh", dismissal: "lbw STARC", runs: 4, balls: 2 },
                { name: "Will Jacks", dismissal: "c & b STARC", runs: 5, balls: 5 },
                { name: "Tim David", dismissal: "lbw RUSSELL", runs: 72, balls: 35 },
                { name: "Aarav Roy", dismissal: "b STARC", runs: 45, balls: 32 },
                { name: "Ben Stokes", dismissal: "c SAMSON b NARINE", runs: 3, balls: 4 },
                { name: "Nat Sciver", dismissal: "not out", runs: 29, balls: 18 },
                { name: "Jasprit Bumrah", dismissal: "not out", runs: 2, balls: 3 },
                { name: "Mohd Siraj", dismissal: "did not bat", runs: 0, balls: 0 }
            ],
            bowl: [
                { name: "Tom Curran", overs: "2.0", maidens: 0, runs: 27, wkts: 0 },
                { name: "Jason Holder", overs: "4.0", maidens: 0, runs: 44, wkts: 2 },
                { name: "Mitchell Starc", overs: "4.0", maidens: 0, runs: 29, wkts: 4 },
                { name: "Andre Russell", overs: "4.0", maidens: 0, runs: 48, wkts: 1 },
                { name: "Liam Dawson", overs: "3.0", maidens: 0, runs: 28, wkts: 0 },
                { name: "Sunil Narine", overs: "3.0", maidens: 0, runs: 30, wkts: 1 }
            ],
            fow: "1-20, 2-27, 3-36, 4-48, 5-55, 6-155, 7-164, 8-198"
        },
        t2Inn: {
            bat: [
                { name: "Yashasvi Jaiswal", dismissal: "b SCIVER", runs: 21, balls: 21 },
                { name: "Sanju Samson", dismissal: "lbw SIRAJ", runs: 15, balls: 8 },
                { name: "Gautam Gambhir", dismissal: "c WARNER b BUMRAH", runs: 11, balls: 7 },
                { name: "Shreyas Iyer", dismissal: "c DE KOCK b CHAKRAVARTHY", runs: 30, balls: 13 },
                { name: "Jason Holder", dismissal: "c JACKS b SCIVER", runs: 11, balls: 10 },
                { name: "Sunil Narine", dismissal: "c & b SCIVER", runs: 20, balls: 14 },
                { name: "Andre Russell", dismissal: "lbw CHAKRAVARTHY", runs: 41, balls: 24 },
                { name: "Deandra Dottin", dismissal: "not out", runs: 39, balls: 18 },
                { name: "Shivam Dube", dismissal: "c SCIVER b BUMRAH", runs: 0, balls: 1 },
                { name: "Mitchell Starc", dismissal: "c CHAKRAVARTHY b SCIVER", runs: 0, balls: 3 },
                { name: "Liam Dawson", dismissal: "not out", runs: 1, balls: 1 }
            ],
            bowl: [
                { name: "Mohd Siraj", overs: "4.0", maidens: 0, runs: 32, wkts: 1 },
                { name: "Jasprit Bumrah", overs: "4.0", maidens: 0, runs: 30, wkts: 2 },
                { name: "Will Jacks", overs: "4.0", maidens: 0, runs: 56, wkts: 0 },
                { name: "Varun Chakravarthy", overs: "4.0", maidens: 0, runs: 37, wkts: 2 },
                { name: "Nat Sciver", overs: "4.0", maidens: 0, runs: 34, wkts: 4 }
            ],
            fow: "1-19, 2-32, 3-71, 4-87, 5-104, 6-125, 7-172, 8-175, 9-186"
        }
    }
};

season9Results.push(match5Data);

currentHtml = currentHtml.replace(
    /MULTI_DB\.season9\.results = \[[\s\S]*?\];/,
    `MULTI_DB.season9.results = ${JSON.stringify(season9Results)};`
);

fs.writeFileSync('index.html', currentHtml);
console.log("Match 5 data successfully injected into index.html!");
