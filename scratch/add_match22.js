const fs = require('fs');

let currentHtml = fs.readFileSync('index.html', 'utf8');

const season9ResultsMatch = currentHtml.match(/MULTI_DB\.season9\.results = (\[[\s\S]*?\]);/);
if (!season9ResultsMatch) {
    console.error("Could not find MULTI_DB.season9.results array.");
    process.exit(1);
}

let season9Results = JSON.parse(season9ResultsMatch[1]);

if (season9Results.find(r => r.match === 22)) {
    console.log("Match 22 already exists. Removing it to re-add.");
    season9Results = season9Results.filter(r => r.match !== 22);
}

const match22Data = {
    match: 22,
    team1: "HH",
    team2: "TT",
    venue: "Sher-e-Bangla National Cricket Stadium",
    score1: "249/7",
    overs1: "20.0",
    score2: "274/5",
    overs2: "20.0",
    winner: "TT",
    margin: "5 wickets",
    mom: "Tim Seifert (TT) — 118",
    scorecard: {
        t1Inn: {
            bat: [
                { name: "Shikhar Dhawan", dismissal: "c SEIFERT b JOHNSON", runs: 4, balls: 2 },
                { name: "Sai Sudharsan", dismissal: "lbw SCHUTT", runs: 32, balls: 10 },
                { name: "Suryakumar Yadav", dismissal: "lbw SCHUTT", runs: 50, balls: 26 },
                { name: "Ryan Rickelton", dismissal: "lbw PANDYA", runs: 29, balls: 21 },
                { name: "Steve Smith", dismissal: "lbw PANDYA", runs: 30, balls: 11 },
                { name: "Shubman Gill", dismissal: "c SEIFERT b KING", runs: 10, balls: 8 },
                { name: "Heinrich Klaasen", dismissal: "not out", runs: 43, balls: 19 },
                { name: "Krunal Pandya", dismissal: "c BREVIS b KING", runs: 21, balls: 13 },
                { name: "Axar Patel", dismissal: "not out", runs: 26, balls: 10 },
                { name: "Jess Jonassen", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Josh Hazlewood", dismissal: "did not bat", runs: 0, balls: 0 }
            ],
            bowl: [
                { name: "Mitchell Johnson", overs: "4.0", maidens: 0, runs: 66, wkts: 1 },
                { name: "Trevor Singh", overs: "4.0", maidens: 0, runs: 51, wkts: 0 },
                { name: "Megan Schutt", overs: "4.0", maidens: 0, runs: 37, wkts: 2 },
                { name: "Hardik Pandya", overs: "4.0", maidens: 0, runs: 47, wkts: 2 },
                { name: "Alana King", overs: "4.0", maidens: 0, runs: 44, wkts: 2 }
            ],
            fow: "1-4, 2-67, 3-94, 4-135, 5-159, 6-161, 7-219"
        },
        t2Inn: {
            bat: [
                { name: "Tim Seifert", dismissal: "c HAZLEWOOD b PANDYA", runs: 118, balls: 49 },
                { name: "Dewald Brevis", dismissal: "c DHAWAN b HAZLEWOOD", runs: 15, balls: 11 },
                { name: "Trevor Singh", dismissal: "lbw JONASSEN", runs: 7, balls: 4 },
                { name: "Laura Wolvaardt", dismissal: "c PATEL b SWEPSON", runs: 23, balls: 13 },
                { name: "Ravi Shastri", dismissal: "b HAZLEWOOD", runs: 21, balls: 15 },
                { name: "Aiden Markram", dismissal: "not out", runs: 45, balls: 13 },
                { name: "Jordan Hermann", dismissal: "not out", runs: 44, balls: 15 },
                { name: "Hardik Pandya", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Mitchell Johnson", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Megan Schutt", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Alana King", dismissal: "did not bat", runs: 0, balls: 0 }
            ],
            bowl: [
                { name: "Josh Hazlewood", overs: "4.0", maidens: 0, runs: 40, wkts: 2 },
                { name: "Jess Jonassen", overs: "4.0", maidens: 0, runs: 45, wkts: 1 },
                { name: "Krunal Pandya", overs: "4.0", maidens: 0, runs: 83, wkts: 1 },
                { name: "Mitchell Swepson", overs: "4.0", maidens: 0, runs: 56, wkts: 1 },
                { name: "Axar Patel", overs: "4.0", maidens: 0, runs: 49, wkts: 0 }
            ],
            fow: "1-27, 2-36, 3-116, 4-160, 5-200"
        }
    }
};

season9Results.push(match22Data);

currentHtml = currentHtml.replace(
    /MULTI_DB\.season9\.results = \[[\s\S]*?\];/,
    `MULTI_DB.season9.results = ${JSON.stringify(season9Results)};`
);

fs.writeFileSync('index.html', currentHtml);
console.log("Match 22 (Season 9) data successfully injected into index.html!");
