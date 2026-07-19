const fs = require('fs');

let currentHtml = fs.readFileSync('index.html', 'utf8');

const season9ResultsMatch = currentHtml.match(/MULTI_DB\.season9\.results = (\[[\s\S]*?\]);/);
if (!season9ResultsMatch) {
    console.error("Could not find MULTI_DB.season9.results array.");
    process.exit(1);
}

let season9Results = JSON.parse(season9ResultsMatch[1]);

if (season9Results.find(r => r.match === 13)) {
    console.log("Match 13 already exists. Removing it to re-add.");
    season9Results = season9Results.filter(r => r.match !== 13);
}

const match13Data = {
    match: 13,
    team1: "TT",
    team2: "HH",
    venue: "Al Amerat Cricket Stadium",
    score1: "217/7",
    overs1: "20.0",
    score2: "214/6",
    overs2: "20.0",
    winner: "TT",
    margin: "3 runs",
    mom: "Trevor Singh (TT) — 76 & 4/28",
    scorecard: {
        t1Inn: {
            bat: [
                { name: "Tim Seifert", dismissal: "c JONASSEN b HAZLEWOOD", runs: 17, balls: 8 },
                { name: "Dewald Brevis", dismissal: "b HAZLEWOOD", runs: 11, balls: 7 },
                { name: "Trevor Singh", dismissal: "b PATEL", runs: 76, balls: 38 },
                { name: "Laura Wolvaardt", dismissal: "c PATEL b PANDYA", runs: 20, balls: 15 },
                { name: "Shafali Verma", dismissal: "c HAZLEWOOD b PANDYA", runs: 9, balls: 9 },
                { name: "Ravi Shastri", dismissal: "lbw PANDYA", runs: 38, balls: 26 },
                { name: "Aiden Markram", dismissal: "not out", runs: 31, balls: 11 },
                { name: "Jordan Hermann", dismissal: "lbw PATEL", runs: 9, balls: 5 },
                { name: "Hardik Pandya", dismissal: "not out", runs: 1, balls: 1 },
                { name: "Mitchell Johnson", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Megan Schutt", dismissal: "did not bat", runs: 0, balls: 0 }
            ],
            bowl: [
                { name: "Josh Hazlewood", overs: "4.0", maidens: 0, runs: 36, wkts: 2 },
                { name: "Jess Jonassen", overs: "4.0", maidens: 0, runs: 42, wkts: 0 },
                { name: "Krunal Pandya", overs: "4.0", maidens: 0, runs: 51, wkts: 3 },
                { name: "Mitchell Swepson", overs: "4.0", maidens: 0, runs: 47, wkts: 0 },
                { name: "Axar Patel", overs: "4.0", maidens: 0, runs: 36, wkts: 2 }
            ],
            fow: "1-28, 2-29, 3-63, 4-75, 5-176, 6-176, 7-205"
        },
        t2Inn: {
            bat: [
                { name: "Shikhar Dhawan", dismissal: "lbw SINGH", runs: 30, balls: 19 },
                { name: "Sai Sudharsan", dismissal: "c HERMANN b SINGH", runs: 39, balls: 20 },
                { name: "Steve Smith", dismissal: "run out VERMA", runs: 38, balls: 23 },
                { name: "Suryakumar Yadav", dismissal: "b SINGH", runs: 15, balls: 9 },
                { name: "Ryan Rickelton", dismissal: "c SEIFERT b SINGH", runs: 8, balls: 4 },
                { name: "Shubman Gill", dismissal: "not out", runs: 59, balls: 25 },
                { name: "Heinrich Klaasen", dismissal: "b KING", runs: 17, balls: 13 },
                { name: "Krunal Pandya", dismissal: "not out", runs: 5, balls: 8 },
                { name: "Axar Patel", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Jess Jonassen", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Josh Hazlewood", dismissal: "did not bat", runs: 0, balls: 0 }
            ],
            bowl: [
                { name: "Mitchell Johnson", overs: "4.0", maidens: 0, runs: 29, wkts: 0 },
                { name: "Megan Schutt", overs: "4.0", maidens: 0, runs: 49, wkts: 0 },
                { name: "Hardik Pandya", overs: "3.0", maidens: 0, runs: 46, wkts: 0 },
                { name: "Alana King", overs: "4.0", maidens: 0, runs: 47, wkts: 1 },
                { name: "Trevor Singh", overs: "4.0", maidens: 0, runs: 28, wkts: 4 },
                { name: "Ravi Shastri", overs: "1.0", maidens: 0, runs: 13, wkts: 0 }
            ],
            fow: "1-71, 2-72, 3-103, 4-111, 5-147, 6-188"
        }
    }
};

season9Results.push(match13Data);

currentHtml = currentHtml.replace(
    /MULTI_DB\.season9\.results = \[[\s\S]*?\];/,
    `MULTI_DB.season9.results = ${JSON.stringify(season9Results)};`
);

fs.writeFileSync('index.html', currentHtml);
console.log("Match 13 data successfully injected into index.html!");
