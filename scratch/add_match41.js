const fs = require('fs');

let currentHtml = fs.readFileSync('index.html', 'utf8');

const season9ResultsMatch = currentHtml.match(/MULTI_DB\.season9\.results = (\[[\s\S]*?\]);/);
if (!season9ResultsMatch) {
    console.error("Could not find MULTI_DB.season9.results array.");
    process.exit(1);
}

let season9Results = JSON.parse(season9ResultsMatch[1]);

if (season9Results.find(r => r.match === 41)) {
    console.log("Match 41 already exists. Removing it to re-add.");
    season9Results = season9Results.filter(r => r.match !== 41);
}

const match41Data = {
    match: 41,
    team1: "SM",
    team2: "HH",
    venue: "Sophia Gardens",
    score1: "245/7",
    overs1: "20.0",
    score2: "216/9",
    overs2: "20.0",
    winner: "SM",
    margin: "29 runs",
    mom: "Yashasvi Jaiswal (SM) — 113*",
    scorecard: {
        t1Inn: {
            bat: [
                { name: "Yashasvi Jaiswal", dismissal: "not out", runs: 113, balls: 53 },
                { name: "Sanju Samson", dismissal: "c SUDHARSAN b HAZLEWOOD", runs: 4, balls: 2 },
                { name: "Sunil Narine", dismissal: "c RICKELTON b JONASSEN", runs: 25, balls: 13 },
                { name: "Gautam Gambhir", dismissal: "b SWEPSON", runs: 11, balls: 5 },
                { name: "Jason Holder", dismissal: "b SWEPSON", runs: 0, balls: 2 },
                { name: "Shreyas Iyer", dismissal: "b HAZLEWOOD", runs: 14, balls: 7 },
                { name: "Andre Russell", dismissal: "b HAZLEWOOD", runs: 21, balls: 9 },
                { name: "Shivam Dube", dismissal: "lbw PATEL", runs: 46, balls: 26 },
                { name: "Deandra Dottin", dismissal: "not out", runs: 9, balls: 4 },
                { name: "Mitchell Starc", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Liam Dawson", dismissal: "did not bat", runs: 0, balls: 0 }
            ],
            bowl: [
                { name: "Josh Hazlewood", overs: "4.0", maidens: 0, runs: 37, wkts: 3 },
                { name: "Jess Jonassen", overs: "4.0", maidens: 0, runs: 68, wkts: 1 },
                { name: "Krunal Pandya", overs: "4.0", maidens: 0, runs: 46, wkts: 0 },
                { name: "Axar Patel", overs: "4.0", maidens: 0, runs: 50, wkts: 1 },
                { name: "Mitchell Swepson", overs: "4.0", maidens: 0, runs: 43, wkts: 2 }
            ],
            fow: "1-5, 2-48, 3-81, 4-81, 5-104, 6-132, 7-220"
        },
        t2Inn: {
            bat: [
                { name: "Shikhar Dhawan", dismissal: "c IYER b CURRAN", runs: 1, balls: 4 },
                { name: "Sai Sudharsan", dismissal: "c SAMSON b STARC", runs: 12, balls: 8 },
                { name: "Steve Smith", dismissal: "c GAMBHIR b CURRAN", runs: 0, balls: 1 },
                { name: "Suryakumar Yadav", dismissal: "c SAMSON b HOLDER", runs: 8, balls: 9 },
                { name: "Ryan Rickelton", dismissal: "c SAMSON b RUSSELL", runs: 65, balls: 30 },
                { name: "Shubman Gill", dismissal: "c NARINE b STARC", runs: 53, balls: 19 },
                { name: "Heinrich Klaasen", dismissal: "b HOLDER", runs: 26, balls: 14 },
                { name: "Axar Patel", dismissal: "c SAMSON b RUSSELL", runs: 13, balls: 7 },
                { name: "Krunal Pandya", dismissal: "not out", runs: 33, balls: 20 },
                { name: "Jess Jonassen", dismissal: "c HOLDER b DAWSON", runs: 3, balls: 7 },
                { name: "Josh Hazlewood", dismissal: "not out", runs: 1, balls: 2 }
            ],
            bowl: [
                { name: "Mitchell Starc", overs: "4.0", maidens: 0, runs: 34, wkts: 2 },
                { name: "Tom Curran", overs: "4.0", maidens: 0, runs: 43, wkts: 2 },
                { name: "Jason Holder", overs: "4.0", maidens: 0, runs: 47, wkts: 2 },
                { name: "Liam Dawson", overs: "4.0", maidens: 0, runs: 52, wkts: 1 },
                { name: "Sunil Narine", overs: "1.0", maidens: 0, runs: 15, wkts: 0 },
                { name: "Andre Russell", overs: "3.0", maidens: 0, runs: 25, wkts: 2 }
            ],
            fow: "1-11, 2-11, 3-19, 4-30, 5-118, 6-147, 7-173, 8-181, 9-214"
        }
    }
};

season9Results.push(match41Data);

currentHtml = currentHtml.replace(
    /MULTI_DB\.season9\.results = \[[\s\S]*?\];/,
    `MULTI_DB.season9.results = ${JSON.stringify(season9Results)};`
);

fs.writeFileSync('index.html', currentHtml);
console.log("Match 41 (Season 9) data successfully injected into index.html!");
