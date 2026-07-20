const fs = require('fs');

let currentHtml = fs.readFileSync('index.html', 'utf8');

const season9ResultsMatch = currentHtml.match(/MULTI_DB\.season9\.results = (\[[\s\S]*?\]);/);
if (!season9ResultsMatch) {
    console.error("Could not find MULTI_DB.season9.results array.");
    process.exit(1);
}

let season9Results = JSON.parse(season9ResultsMatch[1]);

if (season9Results.find(r => r.match === 29)) {
    console.log("Match 29 already exists. Removing it to re-add.");
    season9Results = season9Results.filter(r => r.match !== 29);
}

const match29Data = {
    match: 29,
    team1: "AS",
    team2: "SM",
    venue: "Sheikh Zayed Stadium",
    score1: "144/10",
    overs1: "19.3",
    score2: "145/1",
    overs2: "9.2",
    winner: "SM",
    margin: "9 wickets",
    mom: "Andre Russell (SM) — 4/25",
    scorecard: {
        t1Inn: {
            bat: [
                { name: "Danni Wyatt", dismissal: "lbw RUSSELL", runs: 18, balls: 9 },
                { name: "Josh Philippe", dismissal: "c JAISWAL b RUSSELL", runs: 8, balls: 8 },
                { name: "Joe Denly", dismissal: "b RUSSELL", runs: 13, balls: 7 },
                { name: "Rory Burns", dismissal: "b CURRAN", runs: 35, balls: 27 },
                { name: "Mahipal Lomror", dismissal: "lbw RUSSELL", runs: 1, balls: 2 },
                { name: "Arjun Potter", dismissal: "c SAMSON b STARC", runs: 4, balls: 5 },
                { name: "Krishnappa Gowtham", dismissal: "lbw DAWSON", runs: 5, balls: 6 },
                { name: "Alex Carey", dismissal: "lbw DAWSON", runs: 19, balls: 14 },
                { name: "Ruturaj Gaikwad", dismissal: "not out", runs: 31, balls: 22 },
                { name: "Kuldeep Yadav", dismissal: "c JAISWAL b DAWSON", runs: 2, balls: 10 },
                { name: "Arshdeep Singh", dismissal: "c SAMSON b NARINE", runs: 3, balls: 8 }
            ],
            bowl: [
                { name: "Mitchell Starc", overs: "4.0", maidens: 0, runs: 19, wkts: 1 },
                { name: "Tom Curran", overs: "4.0", maidens: 0, runs: 38, wkts: 1 },
                { name: "Andre Russell", overs: "4.0", maidens: 0, runs: 25, wkts: 4 },
                { name: "Sunil Narine", overs: "2.3", maidens: 0, runs: 28, wkts: 1 },
                { name: "Liam Dawson", overs: "4.0", maidens: 0, runs: 22, wkts: 3 },
                { name: "Deandra Dottin", overs: "1.0", maidens: 0, runs: 8, wkts: 0 }
            ],
            fow: "1-26, 2-27, 3-44, 4-46, 5-59, 6-84, 7-94, 8-118, 9-122, 10-144"
        },
        t2Inn: {
            bat: [
                { name: "Yashasvi Jaiswal", dismissal: "c GOWTHAM b CHAHAL", runs: 62, balls: 23 },
                { name: "Sanju Samson", dismissal: "not out", runs: 74, balls: 30 },
                { name: "Gautam Gambhir", dismissal: "not out", runs: 7, balls: 3 },
                { name: "Shreyas Iyer", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Shivam Dube", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Deandra Dottin", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Andre Russell", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Sunil Narine", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Mitchell Starc", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Tom Curran", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Liam Dawson", dismissal: "did not bat", runs: 0, balls: 0 }
            ],
            bowl: [
                { name: "Arshdeep Singh", overs: "3.0", maidens: 0, runs: 45, wkts: 0 },
                { name: "Kuldeep Yadav", overs: "2.0", maidens: 0, runs: 44, wkts: 0 },
                { name: "Y Chahal", overs: "2.2", maidens: 0, runs: 26, wkts: 1 },
                { name: "Krishnappa Gowtham", overs: "1.0", maidens: 0, runs: 12, wkts: 0 },
                { name: "Mahipal Lomror", overs: "1.0", maidens: 0, runs: 16, wkts: 0 }
            ],
            fow: "1-108"
        }
    }
};

season9Results.push(match29Data);

currentHtml = currentHtml.replace(
    /MULTI_DB\.season9\.results = \[[\s\S]*?\];/,
    `MULTI_DB.season9.results = ${JSON.stringify(season9Results)};`
);

fs.writeFileSync('index.html', currentHtml);
console.log("Match 29 (Season 9) data successfully injected into index.html!");
