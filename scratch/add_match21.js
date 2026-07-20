const fs = require('fs');

let currentHtml = fs.readFileSync('index.html', 'utf8');

const season9ResultsMatch = currentHtml.match(/MULTI_DB\.season9\.results = (\[[\s\S]*?\]);/);
if (!season9ResultsMatch) {
    console.error("Could not find MULTI_DB.season9.results array.");
    process.exit(1);
}

let season9Results = JSON.parse(season9ResultsMatch[1]);

if (season9Results.find(r => r.match === 21)) {
    console.log("Match 21 already exists. Removing it to re-add.");
    season9Results = season9Results.filter(r => r.match !== 21);
}

const match21Data = {
    match: 21,
    team1: "AS",
    team2: "TT",
    venue: "Sydney Cricket Ground",
    score1: "101/10",
    overs1: "13.2",
    score2: "105/4",
    overs2: "6.4",
    winner: "TT",
    margin: "6 wickets",
    mom: "Alana King (TT) — 4/27",
    scorecard: {
        t1Inn: {
            bat: [
                { name: "Jason Roy", dismissal: "b SCHUTT", runs: 12, balls: 9 },
                { name: "Josh Inglis", dismissal: "c SEIFERT b JOHNSON", runs: 5, balls: 10 },
                { name: "Joe Denly", dismissal: "lbw KING", runs: 32, balls: 19 },
                { name: "Andrew Strauss", dismissal: "c SINGH b KING", runs: 26, balls: 16 },
                { name: "Rilee Rossouw", dismissal: "c PANDYA b KING", runs: 4, balls: 4 },
                { name: "Fabian Allen", dismissal: "c SEIFERT b SINGH", runs: 1, balls: 3 },
                { name: "Arjun Potter", dismissal: "lbw JOHNSON", runs: 7, balls: 6 },
                { name: "Nitish Reddy", dismissal: "c SHASTRI b KING", runs: 8, balls: 5 },
                { name: "Blessing Muzarabani", dismissal: "c SEIFERT b PANDYA", runs: 5, balls: 5 },
                { name: "Arshdeep Singh", dismissal: "not out", runs: 1, balls: 2 },
                { name: "Kuldeep Yadav", dismissal: "c HERMANN b PANDYA", runs: 0, balls: 1 }
            ],
            bowl: [
                { name: "Mitchell Johnson", overs: "3.0", maidens: 0, runs: 18, wkts: 2 },
                { name: "Megan Schutt", overs: "2.0", maidens: 0, runs: 8, wkts: 1 },
                { name: "Hardik Pandya", overs: "1.2", maidens: 0, runs: 14, wkts: 2 },
                { name: "Alana King", overs: "4.0", maidens: 0, runs: 27, wkts: 4 },
                { name: "Trevor Singh", overs: "3.0", maidens: 0, runs: 34, wkts: 1 }
            ],
            fow: "1-17, 2-17, 3-58, 4-79, 5-80, 6-80, 7-91, 8-99, 9-101, 10-101"
        },
        t2Inn: {
            bat: [
                { name: "Tim Seifert", dismissal: "c & b SINGH", runs: 16, balls: 9 },
                { name: "Dewald Brevis", dismissal: "c INGLIS b YADAV", runs: 36, balls: 12 },
                { name: "Trevor Singh", dismissal: "c INGLIS b MUZARABANI", runs: 14, balls: 5 },
                { name: "Laura Wolvaardt", dismissal: "lbw YADAV", runs: 8, balls: 4 },
                { name: "Aiden Markram", dismissal: "not out", runs: 5, balls: 2 },
                { name: "Jordan Hermann", dismissal: "not out", runs: 26, balls: 8 },
                { name: "Hardik Pandya", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Ravi Shastri", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Mitchell Johnson", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Megan Schutt", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Alana King", dismissal: "did not bat", runs: 0, balls: 0 }
            ],
            bowl: [
                { name: "Arshdeep Singh", overs: "2.0", maidens: 0, runs: 21, wkts: 1 },
                { name: "Blessing Muzarabani", overs: "2.4", maidens: 0, runs: 59, wkts: 1 },
                { name: "Kuldeep Yadav", overs: "2.0", maidens: 0, runs: 25, wkts: 2 }
            ],
            fow: "1-48, 2-52, 3-74, 4-76"
        }
    }
};

season9Results.push(match21Data);

currentHtml = currentHtml.replace(
    /MULTI_DB\.season9\.results = \[[\s\S]*?\];/,
    `MULTI_DB.season9.results = ${JSON.stringify(season9Results)};`
);

fs.writeFileSync('index.html', currentHtml);
console.log("Match 21 (Season 9) data successfully injected into index.html!");
