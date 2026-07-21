const fs = require('fs');

let currentHtml = fs.readFileSync('index.html', 'utf8');

const season9ResultsMatch = currentHtml.match(/MULTI_DB\.season9\.results = (\[[\s\S]*?\]);/);
if (!season9ResultsMatch) {
    console.error("Could not find MULTI_DB.season9.results array.");
    process.exit(1);
}

let season9Results = JSON.parse(season9ResultsMatch[1]);

if (season9Results.find(r => r.match === 36)) {
    console.log("Match 36 already exists. Removing it to re-add.");
    season9Results = season9Results.filter(r => r.match !== 36);
}

const match36Data = {
    match: 36,
    team1: "AA",
    team2: "SM",
    venue: "Queen's Park Oval",
    score1: "182/8",
    overs1: "20.0",
    score2: "163/10",
    overs2: "16.4",
    winner: "AA",
    margin: "19 runs",
    mom: "Jasprit Bumrah (AA) — 3 wkts",
    scorecard: {
        t1Inn: {
            bat: [
                { name: "Travis Head", dismissal: "c SAMSON b NARINE", runs: 24, balls: 13 },
                { name: "David Warner", dismissal: "b HOLDER", runs: 46, balls: 18 },
                { name: "Q de Kock", dismissal: "lbw HOLDER", runs: 7, balls: 4 },
                { name: "Mitchell Marsh", dismissal: "lbw DAWSON", runs: 29, balls: 14 },
                { name: "Will Jacks", dismissal: "b NARINE", runs: 8, balls: 4 },
                { name: "Tim David", dismissal: "not out", runs: 37, balls: 29 },
                { name: "Aarav Roy", dismissal: "c SAMSON b NARINE", runs: 13, balls: 6 },
                { name: "Ben Stokes", dismissal: "c IYER b STARC", runs: 7, balls: 9 },
                { name: "Nat Sciver", dismissal: "b DAWSON", runs: 4, balls: 9 },
                { name: "Jasprit Bumrah", dismissal: "not out", runs: 4, balls: 14 },
                { name: "Varun Chakravarthy", dismissal: "did not bat", runs: 0, balls: 0 }
            ],
            bowl: [
                { name: "Mitchell Starc", overs: "4.0", maidens: 0, runs: 27, wkts: 1 },
                { name: "Tom Curran", overs: "2.0", maidens: 0, runs: 27, wkts: 0 },
                { name: "Jason Holder", overs: "4.0", maidens: 0, runs: 44, wkts: 2 },
                { name: "Andre Russell", overs: "2.0", maidens: 0, runs: 23, wkts: 0 },
                { name: "Sunil Narine", overs: "4.0", maidens: 0, runs: 41, wkts: 3 },
                { name: "Liam Dawson", overs: "4.0", maidens: 0, runs: 17, wkts: 2 }
            ],
            fow: "1-66, 2-77, 3-80, 4-115, 5-119, 6-136, 7-146, 8-157"
        },
        t2Inn: {
            bat: [
                { name: "Sanju Samson", dismissal: "c DE KOCK b SIRAJ", runs: 17, balls: 11 },
                { name: "Yashasvi Jaiswal", dismissal: "c DE KOCK b BUMRAH", runs: 18, balls: 13 },
                { name: "Shreyas Iyer", dismissal: "run out SCIVER", runs: 6, balls: 5 },
                { name: "Gautam Gambhir", dismissal: "b BUMRAH", runs: 70, balls: 43 },
                { name: "Jason Holder", dismissal: "lbw CHAKRAVARTHY", runs: 25, balls: 12 },
                { name: "Shivam Dube", dismissal: "c & b SCIVER", runs: 7, balls: 3 },
                { name: "Andre Russell", dismissal: "c HEAD b CHAKRAVARTHY", runs: 4, balls: 3 },
                { name: "Deandra Dottin", dismissal: "b SCIVER", runs: 1, balls: 2 },
                { name: "Sunil Narine", dismissal: "c DE KOCK b SIRAJ", runs: 4, balls: 3 },
                { name: "Mitchell Starc", dismissal: "not out", runs: 4, balls: 4 },
                { name: "Liam Dawson", dismissal: "c DE KOCK b BUMRAH", runs: 1, balls: 2 }
            ],
            bowl: [
                { name: "Mohd Siraj", overs: "4.0", maidens: 0, runs: 31, wkts: 2 },
                { name: "Jasprit Bumrah", overs: "2.4", maidens: 0, runs: 27, wkts: 3 },
                { name: "Ben Stokes", overs: "2.0", maidens: 0, runs: 25, wkts: 0 },
                { name: "Will Jacks", overs: "2.0", maidens: 0, runs: 30, wkts: 0 },
                { name: "Varun Chakravarthy", overs: "3.0", maidens: 0, runs: 18, wkts: 2 },
                { name: "Nat Sciver", overs: "3.0", maidens: 0, runs: 32, wkts: 2 }
            ],
            fow: "1-27, 2-37, 3-45, 4-96, 5-117, 6-135, 7-138, 8-149, 9-159, 10-163"
        }
    }
};

season9Results.push(match36Data);

currentHtml = currentHtml.replace(
    /MULTI_DB\.season9\.results = \[[\s\S]*?\];/,
    `MULTI_DB.season9.results = ${JSON.stringify(season9Results)};`
);

fs.writeFileSync('index.html', currentHtml);
console.log("Match 36 (Season 9) data successfully injected into index.html!");
