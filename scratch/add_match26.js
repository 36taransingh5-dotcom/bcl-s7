const fs = require('fs');

let currentHtml = fs.readFileSync('index.html', 'utf8');

const season9ResultsMatch = currentHtml.match(/MULTI_DB\.season9\.results = (\[[\s\S]*?\]);/);
if (!season9ResultsMatch) {
    console.error("Could not find MULTI_DB.season9.results array.");
    process.exit(1);
}

let season9Results = JSON.parse(season9ResultsMatch[1]);

if (season9Results.find(r => r.match === 26)) {
    console.log("Match 26 already exists. Removing it to re-add.");
    season9Results = season9Results.filter(r => r.match !== 26);
}

const match26Data = {
    match: 26,
    team1: "SM",
    team2: "TT",
    venue: "Wankhede Stadium",
    score1: "162/10",
    overs1: "19.0",
    score2: "180/9",
    overs2: "20.0",
    winner: "TT",
    margin: "18 runs",
    mom: "Alana King (TT) — 4/36",
    scorecard: {
        t1Inn: {
            bat: [
                { name: "Yashasvi Jaiswal", dismissal: "b KING", runs: 40, balls: 28 },
                { name: "Sanju Samson", dismissal: "c SEIFERT b JOHNSON", runs: 9, balls: 8 },
                { name: "Gautam Gambhir", dismissal: "b KING", runs: 34, balls: 12 },
                { name: "Shreyas Iyer", dismissal: "lbw KING", runs: 16, balls: 7 },
                { name: "Andre Russell", dismissal: "c SEIFERT b SINGH", runs: 5, balls: 6 },
                { name: "Shivam Dube", dismissal: "b SCHUTT", runs: 34, balls: 28 },
                { name: "Jason Holder", dismissal: "c SCHUTT b KING", runs: 1, balls: 2 },
                { name: "Deandra Dottin", dismissal: "c SEIFERT b JOHNSON", runs: 1, balls: 2 },
                { name: "Sunil Narine", dismissal: "b SCHUTT", runs: 5, balls: 5 },
                { name: "Mitchell Starc", dismissal: "lbw PANDYA", runs: 7, balls: 14 },
                { name: "Liam Dawson", dismissal: "not out", runs: 1, balls: 2 }
            ],
            bowl: [
                { name: "Trevor Singh", overs: "4.0", maidens: 0, runs: 39, wkts: 1 },
                { name: "Mitchell Johnson", overs: "4.0", maidens: 0, runs: 39, wkts: 2 },
                { name: "Alana King", overs: "4.0", maidens: 0, runs: 36, wkts: 4 },
                { name: "Megan Schutt", overs: "4.0", maidens: 0, runs: 23, wkts: 2 },
                { name: "Hardik Pandya", overs: "3.0", maidens: 0, runs: 21, wkts: 1 }
            ],
            fow: "1-12, 2-74, 3-102, 4-111, 5-111, 6-113, 7-114, 8-121, 9-156, 10-162"
        },
        t2Inn: {
            bat: [
                { name: "Tim Seifert", dismissal: "c SAMSON b NARINE", runs: 0, balls: 2 },
                { name: "Dewald Brevis", dismissal: "b NARINE", runs: 10, balls: 6 },
                { name: "Laura Wolvaardt", dismissal: "b STARC", runs: 2, balls: 4 },
                { name: "Aiden Markram", dismissal: "b DAWSON", runs: 31, balls: 16 },
                { name: "Trevor Singh", dismissal: "b HOLDER", runs: 38, balls: 32 },
                { name: "Ravi Shastri", dismissal: "lbw HOLDER", runs: 0, balls: 1 },
                { name: "Hardik Pandya", dismissal: "c RUSSELL b STARC", runs: 25, balls: 15 },
                { name: "Jordan Hermann", dismissal: "c JAISWAL b RUSSELL", runs: 37, balls: 22 },
                { name: "Shafali Verma", dismissal: "lbw RUSSELL", runs: 30, balls: 15 },
                { name: "Alana King", dismissal: "not out", runs: 5, balls: 8 },
                { name: "Mitchell Johnson", dismissal: "not out", runs: 0, balls: 0 }
            ],
            bowl: [
                { name: "Sunil Narine", overs: "4.0", maidens: 0, runs: 38, wkts: 2 },
                { name: "Mitchell Starc", overs: "4.0", maidens: 0, runs: 34, wkts: 2 },
                { name: "Tom Curran", overs: "1.0", maidens: 0, runs: 14, wkts: 0 },
                { name: "Liam Dawson", overs: "4.0", maidens: 0, runs: 30, wkts: 1 },
                { name: "Jason Holder", overs: "4.0", maidens: 0, runs: 36, wkts: 2 },
                { name: "Andre Russell", overs: "3.0", maidens: 0, runs: 27, wkts: 2 }
            ],
            fow: "1-0, 2-7, 3-21, 4-80, 5-80, 6-86, 7-119, 8-159, 9-180"
        }
    }
};

season9Results.push(match26Data);

currentHtml = currentHtml.replace(
    /MULTI_DB\.season9\.results = \[[\s\S]*?\];/,
    `MULTI_DB.season9.results = ${JSON.stringify(season9Results)};`
);

fs.writeFileSync('index.html', currentHtml);
console.log("Match 26 (Season 9) data successfully injected into index.html!");
