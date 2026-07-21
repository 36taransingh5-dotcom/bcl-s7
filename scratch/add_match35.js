const fs = require('fs');

let currentHtml = fs.readFileSync('index.html', 'utf8');

const season9ResultsMatch = currentHtml.match(/MULTI_DB\.season9\.results = (\[[\s\S]*?\]);/);
if (!season9ResultsMatch) {
    console.error("Could not find MULTI_DB.season9.results array.");
    process.exit(1);
}

let season9Results = JSON.parse(season9ResultsMatch[1]);

if (season9Results.find(r => r.match === 35)) {
    console.log("Match 35 already exists. Removing it to re-add.");
    season9Results = season9Results.filter(r => r.match !== 35);
}

const match35Data = {
    match: 35,
    team1: "AS",
    team2: "SM",
    venue: "Adelaide Oval",
    score1: "203/6",
    overs1: "20.0",
    score2: "170/10",
    overs2: "17.3",
    winner: "AS",
    margin: "33 runs",
    mom: "Blessing Muzarabani (AS) — 4/39",
    scorecard: {
        t1Inn: {
            bat: [
                { name: "Jason Roy", dismissal: "c SAMSON b HOLDER", runs: 53, balls: 33 },
                { name: "Josh Inglis", dismissal: "c GAMBHIR b RUSSELL", runs: 16, balls: 13 },
                { name: "Joe Denly", dismissal: "lbw RUSSELL", runs: 13, balls: 6 },
                { name: "Andrew Strauss", dismissal: "c SAMSON b DAWSON", runs: 34, balls: 18 },
                { name: "Rilee Rossouw", dismissal: "b HOLDER", runs: 29, balls: 14 },
                { name: "Arjun Potter", dismissal: "not out", runs: 44, balls: 24 },
                { name: "Nitish Reddy", dismissal: "lbw STARC", runs: 1, balls: 5 },
                { name: "Fabian Allen", dismissal: "not out", runs: 10, balls: 8 },
                { name: "Arshdeep Singh", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Y Chahal", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Kuldeep Yadav", dismissal: "did not bat", runs: 0, balls: 0 }
            ],
            bowl: [
                { name: "Mitchell Starc", overs: "4.0", maidens: 0, runs: 20, wkts: 1 },
                { name: "Jason Holder", overs: "4.0", maidens: 0, runs: 35, wkts: 2 },
                { name: "Tom Curran", overs: "3.0", maidens: 0, runs: 39, wkts: 0 },
                { name: "Andre Russell", overs: "4.0", maidens: 0, runs: 40, wkts: 2 },
                { name: "Liam Dawson", overs: "4.0", maidens: 0, runs: 54, wkts: 1 },
                { name: "Sunil Narine", overs: "1.0", maidens: 0, runs: 13, wkts: 0 }
            ],
            fow: "1-39, 2-53, 3-99, 4-135, 5-160, 6-165"
        },
        t2Inn: {
            bat: [
                { name: "Sanju Samson", dismissal: "b SINGH", runs: 0, balls: 1 },
                { name: "Yashasvi Jaiswal", dismissal: "c INGLIS b SINGH", runs: 4, balls: 2 },
                { name: "Sunil Narine", dismissal: "lbw MUZARABANI", runs: 10, balls: 5 },
                { name: "Gautam Gambhir", dismissal: "c POTTER b MUZARABANI", runs: 12, balls: 5 },
                { name: "Shreyas Iyer", dismissal: "c INGLIS b SINGH", runs: 11, balls: 4 },
                { name: "Jason Holder", dismissal: "c ROY b MUZARABANI", runs: 8, balls: 6 },
                { name: "Deandra Dottin", dismissal: "c REDDY b CHAHAL", runs: 42, balls: 21 },
                { name: "Andre Russell", dismissal: "not out", runs: 64, balls: 36 },
                { name: "Shivam Dube", dismissal: "c INGLIS b YADAV", runs: 5, balls: 4 },
                { name: "Mitchell Starc", dismissal: "lbw ALLEN", runs: 11, balls: 21 },
                { name: "Liam Dawson", dismissal: "c INGLIS b MUZARABANI", runs: 0, balls: 1 }
            ],
            bowl: [
                { name: "Arshdeep Singh", overs: "4.0", maidens: 0, runs: 39, wkts: 3 },
                { name: "Blessing Muzarabani", overs: "3.3", maidens: 0, runs: 39, wkts: 4 },
                { name: "Y Chahal", overs: "4.0", maidens: 0, runs: 34, wkts: 1 },
                { name: "Kuldeep Yadav", overs: "4.0", maidens: 0, runs: 39, wkts: 1 },
                { name: "Fabian Allen", overs: "2.0", maidens: 0, runs: 17, wkts: 1 }
            ],
            fow: "1-0, 2-5, 3-20, 4-37, 5-43, 6-46, 7-119, 8-124, 9-167, 10-170"
        }
    }
};

season9Results.push(match35Data);

currentHtml = currentHtml.replace(
    /MULTI_DB\.season9\.results = \[[\s\S]*?\];/,
    `MULTI_DB.season9.results = ${JSON.stringify(season9Results)};`
);

fs.writeFileSync('index.html', currentHtml);
console.log("Match 35 (Season 9) data successfully injected into index.html!");
