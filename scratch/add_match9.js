const fs = require('fs');

let currentHtml = fs.readFileSync('index.html', 'utf8');

const season9ResultsMatch = currentHtml.match(/MULTI_DB\.season9\.results = (\[[\s\S]*?\]);/);
if (!season9ResultsMatch) {
    console.error("Could not find MULTI_DB.season9.results array.");
    process.exit(1);
}

let season9Results = JSON.parse(season9ResultsMatch[1]);

if (season9Results.find(r => r.match === 9)) {
    console.log("Match 9 already exists. Removing it to re-add.");
    season9Results = season9Results.filter(r => r.match !== 9);
}

const match9Data = {
    match: 9,
    team1: "AS",
    team2: "TT",
    venue: "Chinnaswammy",
    score1: "75/10",
    overs1: "9.2",
    score2: "77/1",
    overs2: "4.3",
    winner: "TT",
    margin: "9 wickets",
    mom: "Trevor Singh (TT) — 4/23 & 29*",
    scorecard: {
        t1Inn: {
            bat: [
                { name: "Jason Roy", dismissal: "lbw SCHUTT", runs: 5, balls: 5 },
                { name: "Josh Inglis", dismissal: "c SHASTRI b SINGH", runs: 24, balls: 11 },
                { name: "Joe Denly", dismissal: "b SINGH", runs: 3, balls: 5 },
                { name: "Andrew Strauss", dismissal: "c KING b SCHUTT", runs: 1, balls: 2 },
                { name: "Arjun Potter", dismissal: "lbw JOHNSON", runs: 21, balls: 11 },
                { name: "Nitish Reddy", dismissal: "c SEIFERT b SCHUTT", runs: 14, balls: 11 },
                { name: "Rilee Rossouw", dismissal: "c SCHUTT b JOHNSON", runs: 4, balls: 2 },
                { name: "Blessing Muzarabani", dismissal: "b JOHNSON", runs: 2, balls: 4 },
                { name: "Arshdeep Singh", dismissal: "b SINGH", runs: 0, balls: 2 },
                { name: "Y Chahal", dismissal: "lbw SINGH", runs: 0, balls: 2 },
                { name: "Kuldeep Yadav", dismissal: "not out", runs: 1, balls: 1 }
            ],
            bowl: [
                { name: "Mitchell Johnson", overs: "3.2", maidens: 0, runs: 25, wkts: 3 },
                { name: "Megan Schutt", overs: "3.0", maidens: 0, runs: 27, wkts: 3 },
                { name: "Trevor Singh", overs: "3.0", maidens: 0, runs: 23, wkts: 4 }
            ],
            fow: "1-9, 2-32, 3-33, 4-37, 5-58, 6-62, 7-72, 8-73, 9-73, 10-75"
        },
        t2Inn: {
            bat: [
                { name: "Tim Seifert", dismissal: "not out", runs: 48, balls: 15 },
                { name: "Dewald Brevis", dismissal: "b SINGH", runs: 0, balls: 1 },
                { name: "Trevor Singh", dismissal: "not out", runs: 29, balls: 11 },
                { name: "Laura Wolvaardt", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Hardik Pandya", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Jordan Hermann", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Aiden Markram", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Ravi Shastri", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Mitchell Johnson", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Megan Schutt", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Alana King", dismissal: "did not bat", runs: 0, balls: 0 }
            ],
            bowl: [
                { name: "Arshdeep Singh", overs: "1.0", maidens: 0, runs: 13, wkts: 1 },
                { name: "Andrew Strauss", overs: "1.0", maidens: 0, runs: 21, wkts: 0 },
                { name: "Joe Denly", overs: "1.3", maidens: 0, runs: 30, wkts: 0 },
                { name: "Josh Inglis", overs: "1.0", maidens: 0, runs: 13, wkts: 0 }
            ],
            fow: "1-1"
        }
    }
};

season9Results.push(match9Data);

currentHtml = currentHtml.replace(
    /MULTI_DB\.season9\.results = \[[\s\S]*?\];/,
    `MULTI_DB.season9.results = ${JSON.stringify(season9Results)};`
);

fs.writeFileSync('index.html', currentHtml);
console.log("Match 9 data successfully injected into index.html!");
