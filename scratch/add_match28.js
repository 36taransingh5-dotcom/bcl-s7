const fs = require('fs');

let currentHtml = fs.readFileSync('index.html', 'utf8');

const season9ResultsMatch = currentHtml.match(/MULTI_DB\.season9\.results = (\[[\s\S]*?\]);/);
if (!season9ResultsMatch) {
    console.error("Could not find MULTI_DB.season9.results array.");
    process.exit(1);
}

let season9Results = JSON.parse(season9ResultsMatch[1]);

if (season9Results.find(r => r.match === 28)) {
    console.log("Match 28 already exists. Removing it to re-add.");
    season9Results = season9Results.filter(r => r.match !== 28);
}

const match28Data = {
    match: 28,
    team1: "SM",
    team2: "HH",
    venue: "Bellerive Oval",
    score1: "250/7",
    overs1: "20.0",
    score2: "140/9",
    overs2: "20.0",
    winner: "SM",
    margin: "110 runs",
    mom: "Sunil Narine (SM) — 3/30",
    scorecard: {
        t1Inn: {
            bat: [
                { name: "Sunil Narine", dismissal: "lbw HAZLEWOOD", runs: 1, balls: 2 },
                { name: "Sanju Samson", dismissal: "b PATEL", runs: 54, balls: 22 },
                { name: "Yashasvi Jaiswal", dismissal: "c JONASSEN b HAZLEWOOD", runs: 38, balls: 15 },
                { name: "Gautam Gambhir", dismissal: "b PATEL", runs: 9, balls: 5 },
                { name: "Shivam Dube", dismissal: "lbw PATEL", runs: 52, balls: 22 },
                { name: "Shreyas Iyer", dismissal: "c SUDHARSAN b SWEPSON", runs: 16, balls: 10 },
                { name: "Jason Holder", dismissal: "run out DHAWAN", runs: 10, balls: 5 },
                { name: "Andre Russell", dismissal: "not out", runs: 35, balls: 21 },
                { name: "Deandra Dottin", dismissal: "not out", runs: 35, balls: 18 },
                { name: "Mitchell Starc", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Liam Dawson", dismissal: "did not bat", runs: 0, balls: 0 }
            ],
            bowl: [
                { name: "Josh Hazlewood", overs: "4.0", maidens: 0, runs: 41, wkts: 2 },
                { name: "Krunal Pandya", overs: "4.0", maidens: 0, runs: 60, wkts: 0 },
                { name: "Jess Jonassen", overs: "4.0", maidens: 0, runs: 57, wkts: 0 },
                { name: "Axar Patel", overs: "4.0", maidens: 0, runs: 46, wkts: 3 },
                { name: "Mitchell Swepson", overs: "4.0", maidens: 0, runs: 46, wkts: 1 }
            ],
            fow: "1-6, 2-64, 3-77, 4-106, 5-154, 6-180, 7-184"
        },
        t2Inn: {
            bat: [
                { name: "Shikhar Dhawan", dismissal: "lbw STARC", runs: 30, balls: 14 },
                { name: "Sai Sudharsan", dismissal: "b NARINE", runs: 15, balls: 8 },
                { name: "Suryakumar Yadav", dismissal: "b DAWSON", runs: 36, balls: 23 },
                { name: "Steve Smith", dismissal: "b NARINE", runs: 2, balls: 2 },
                { name: "Ryan Rickelton", dismissal: "c SAMSON b NARINE", runs: 0, balls: 2 },
                { name: "Shubman Gill", dismissal: "c IYER b HOLDER", runs: 8, balls: 4 },
                { name: "Krunal Pandya", dismissal: "b CURRAN", runs: 9, balls: 4 },
                { name: "Axar Patel", dismissal: "c SAMSON b CURRAN", runs: 1, balls: 2 },
                { name: "Jess Jonassen", dismissal: "not out", runs: 16, balls: 39 },
                { name: "Heinrich Klaasen", dismissal: "b DAWSON", runs: 12, balls: 6 },
                { name: "Josh Hazlewood", dismissal: "not out", runs: 8, balls: 16 }
            ],
            bowl: [
                { name: "Mitchell Starc", overs: "4.0", maidens: 0, runs: 36, wkts: 1 },
                { name: "Tom Curran", overs: "4.0", maidens: 0, runs: 32, wkts: 2 },
                { name: "Sunil Narine", overs: "4.0", maidens: 0, runs: 30, wkts: 3 },
                { name: "Jason Holder", overs: "2.0", maidens: 0, runs: 20, wkts: 1 },
                { name: "Liam Dawson", overs: "4.0", maidens: 0, runs: 12, wkts: 2 },
                { name: "Andre Russell", overs: "2.0", maidens: 0, runs: 7, wkts: 0 }
            ],
            fow: "1-29, 2-47, 3-50, 4-50, 5-65, 6-77, 7-79, 8-107, 9-119"
        }
    }
};

season9Results.push(match28Data);

currentHtml = currentHtml.replace(
    /MULTI_DB\.season9\.results = \[[\s\S]*?\];/,
    `MULTI_DB.season9.results = ${JSON.stringify(season9Results)};`
);

fs.writeFileSync('index.html', currentHtml);
console.log("Match 28 (Season 9) data successfully injected into index.html!");
