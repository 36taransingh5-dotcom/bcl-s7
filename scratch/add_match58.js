const fs = require('fs');

let currentHtml = fs.readFileSync('index.html', 'utf8');

const season9ResultsMatch = currentHtml.match(/MULTI_DB\.season9\.results = (\[[\s\S]*?\]);/);
if (!season9ResultsMatch) {
    console.error("Could not find MULTI_DB.season9.results array.");
    process.exit(1);
}

let season9Results = JSON.parse(season9ResultsMatch[1]);

if (season9Results.find(r => r.match === 58)) {
    console.log("Match 58 already exists. Removing it to re-add.");
    season9Results = season9Results.filter(r => r.match !== 58);
}

const match58Data = {
    match: 58,
    team1: "SM",
    team2: "AA",
    venue: "Narendra Modi Stadium",
    score1: "136/10",
    overs1: "15.0",
    score2: "130/3",
    overs2: "11.3",
    winner: "AA",
    margin: "DLS method",
    mom: "Travis Head (AA) — 74*",
    scorecard: {
        t1Inn: {
            bat: [
                { name: "Sanju Samson", dismissal: "lbw CHAKRAVARTHY", runs: 38, balls: 27 },
                { name: "Yashasvi Jaiswal", dismissal: "b SIRAJ", runs: 0, balls: 1 },
                { name: "Sunil Narine", dismissal: "c WARNER b SIRAJ", runs: 11, balls: 8 },
                { name: "Gautam Gambhir", dismissal: "lbw CHAKRAVARTHY", runs: 41, balls: 19 },
                { name: "Jason Holder", dismissal: "c BUMRAH b SCIVER", runs: 8, balls: 6 },
                { name: "Shivam Dube", dismissal: "c DE KOCK b STOKES", runs: 15, balls: 8 },
                { name: "Shreyas Iyer", dismissal: "not out", runs: 8, balls: 9 },
                { name: "Andre Russell", dismissal: "c DE KOCK b SCIVER", runs: 9, balls: 4 },
                { name: "Deandra Dottin", dismissal: "b BUMRAH", runs: 2, balls: 3 },
                { name: "Mitchell Starc", dismissal: "b CHAKRAVARTHY", runs: 2, balls: 2 },
                { name: "Tom Curran", dismissal: "run out WARNER", runs: 1, balls: 3 }
            ],
            bowl: [
                { name: "Mohd Siraj", overs: "3.0", maidens: 0, runs: 31, wkts: 2 },
                { name: "Jasprit Bumrah", overs: "3.0", maidens: 0, runs: 15, wkts: 1 },
                { name: "Ben Stokes", overs: "2.0", maidens: 0, runs: 23, wkts: 1 },
                { name: "Will Jacks", overs: "2.0", maidens: 0, runs: 27, wkts: 0 },
                { name: "Varun Chakravarthy", overs: "3.0", maidens: 0, runs: 19, wkts: 3 },
                { name: "Nat Sciver", overs: "2.0", maidens: 0, runs: 20, wkts: 2 }
            ],
            fow: "1-3, 2-15, 3-76, 4-93, 5-111, 6-113, 7-126, 8-131, 9-134, 10-136"
        },
        t2Inn: {
            bat: [
                { name: "Travis Head", dismissal: "not out", runs: 74, balls: 37 },
                { name: "David Warner", dismissal: "b NARINE", runs: 7, balls: 8 },
                { name: "Q de Kock", dismissal: "b HOLDER", runs: 8, balls: 4 },
                { name: "Mitchell Marsh", dismissal: "b RUSSELL", runs: 28, balls: 13 },
                { name: "Will Jacks", dismissal: "not out", runs: 10, balls: 8 },
                { name: "Nat Sciver", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Ben Stokes", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Tim David", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Jasprit Bumrah", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Varun Chakravarthy", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Mohd Siraj", dismissal: "did not bat", runs: 0, balls: 0 }
            ],
            bowl: [
                { name: "Sunil Narine", overs: "3.0", maidens: 0, runs: 34, wkts: 1 },
                { name: "Mitchell Starc", overs: "1.3", maidens: 0, runs: 19, wkts: 0 },
                { name: "Jason Holder", overs: "3.0", maidens: 0, runs: 39, wkts: 1 },
                { name: "Liam Dawson", overs: "1.0", maidens: 0, runs: 12, wkts: 0 },
                { name: "Andre Russell", overs: "2.0", maidens: 0, runs: 16, wkts: 1 },
                { name: "Tom Curran", overs: "1.0", maidens: 0, runs: 8, wkts: 0 }
            ],
            fow: "1-28, 2-37, 3-104"
        }
    }
};

season9Results.push(match58Data);

currentHtml = currentHtml.replace(
    /MULTI_DB\.season9\.results = \[[\s\S]*?\];/,
    `MULTI_DB.season9.results = ${JSON.stringify(season9Results)};`
);

fs.writeFileSync('index.html', currentHtml);
console.log("Match 58 (Eliminator, Season 9) data successfully injected into index.html!");
