const fs = require('fs');

let currentHtml = fs.readFileSync('index.html', 'utf8');

const season9ResultsMatch = currentHtml.match(/MULTI_DB\.season9\.results = (\[[\s\S]*?\]);/);
if (!season9ResultsMatch) {
    console.error("Could not find MULTI_DB.season9.results array.");
    process.exit(1);
}

let season9Results = JSON.parse(season9ResultsMatch[1]);

if (season9Results.find(r => r.match === 10)) {
    console.log("Match 10 already exists. Removing it to re-add.");
    season9Results = season9Results.filter(r => r.match !== 10);
}

const match10Data = {
    match: 10,
    team1: "TT",
    team2: "SM",
    venue: "Sophia Gardens",
    score1: "181/10",
    overs1: "19.3",
    score2: "235/8",
    overs2: "20.0",
    winner: "SM",
    margin: "54 runs",
    mom: "Jason Holder (SM) — 82*",
    scorecard: {
        t1Inn: {
            bat: [
                { name: "Tim Seifert", dismissal: "c CURRAN b HOLDER", runs: 13, balls: 15 },
                { name: "Dewald Brevis", dismissal: "c SAMSON b DAWSON", runs: 24, balls: 16 },
                { name: "Trevor Singh", dismissal: "lbw CURRAN", runs: 71, balls: 34 },
                { name: "Shafali Verma", dismissal: "b CURRAN", runs: 21, balls: 10 },
                { name: "Laura Wolvaardt", dismissal: "b RUSSELL", runs: 1, balls: 2 },
                { name: "Aiden Markram", dismissal: "b RUSSELL", runs: 11, balls: 8 },
                { name: "Jordan Hermann", dismissal: "c & b RUSSELL", runs: 5, balls: 5 },
                { name: "Hardik Pandya", dismissal: "lbw CURRAN", runs: 29, balls: 17 },
                { name: "Ravi Shastri", dismissal: "c SAMSON b CURRAN", runs: 0, balls: 2 },
                { name: "Alana King", dismissal: "c SAMSON b RUSSELL", runs: 0, balls: 3 },
                { name: "Megan Schutt", dismissal: "not out", runs: 1, balls: 5 }
            ],
            bowl: [
                { name: "Sunil Narine", overs: "2.0", maidens: 0, runs: 20, wkts: 0 },
                { name: "Mitchell Starc", overs: "4.0", maidens: 0, runs: 27, wkts: 0 },
                { name: "Jason Holder", overs: "4.0", maidens: 0, runs: 49, wkts: 1 },
                { name: "Liam Dawson", overs: "2.0", maidens: 0, runs: 31, wkts: 1 },
                { name: "Tom Curran", overs: "3.3", maidens: 0, runs: 32, wkts: 4 },
                { name: "Andre Russell", overs: "4.0", maidens: 0, runs: 22, wkts: 4 }
            ],
            fow: "1-34, 2-46, 3-104, 4-105, 5-130, 6-144, 7-156, 8-156, 9-157, 10-181"
        },
        t2Inn: {
            bat: [
                { name: "Sanju Samson", dismissal: "c BREVIS b KING", runs: 33, balls: 14 },
                { name: "Yashasvi Jaiswal", dismissal: "lbw SCHUTT", runs: 4, balls: 5 },
                { name: "Gautam Gambhir", dismissal: "b JOHNSON", runs: 5, balls: 4 },
                { name: "Sunil Narine", dismissal: "c SEIFERT b JOHNSON", runs: 0, balls: 3 },
                { name: "Shreyas Iyer", dismissal: "c MARKRAM b KING", runs: 43, balls: 15 },
                { name: "Shivam Dube", dismissal: "c SEIFERT b PANDYA", runs: 5, balls: 8 },
                { name: "Jason Holder", dismissal: "not out", runs: 82, balls: 39 },
                { name: "Andre Russell", dismissal: "lbw SINGH", runs: 55, balls: 24 },
                { name: "Deandra Dottin", dismissal: "c SEIFERT b PANDYA", runs: 7, balls: 5 },
                { name: "Mitchell Starc", dismissal: "not out", runs: 0, balls: 3 },
                { name: "Liam Dawson", dismissal: "did not bat", runs: 0, balls: 0 }
            ],
            bowl: [
                { name: "Mitchell Johnson", overs: "4.0", maidens: 0, runs: 25, wkts: 2 },
                { name: "Megan Schutt", overs: "4.0", maidens: 0, runs: 68, wkts: 1 },
                { name: "Trevor Singh", overs: "3.0", maidens: 0, runs: 45, wkts: 1 },
                { name: "Alana King", overs: "4.0", maidens: 0, runs: 36, wkts: 2 },
                { name: "Hardik Pandya", overs: "4.0", maidens: 0, runs: 41, wkts: 2 },
                { name: "Ravi Shastri", overs: "1.0", maidens: 0, runs: 19, wkts: 0 }
            ],
            fow: "1-10, 2-21, 3-21, 4-69, 5-90, 6-90, 7-207, 8-222"
        }
    }
};

season9Results.push(match10Data);

currentHtml = currentHtml.replace(
    /MULTI_DB\.season9\.results = \[[\s\S]*?\];/,
    `MULTI_DB.season9.results = ${JSON.stringify(season9Results)};`
);

fs.writeFileSync('index.html', currentHtml);
console.log("Match 10 (Season 9) data successfully injected into index.html!");
