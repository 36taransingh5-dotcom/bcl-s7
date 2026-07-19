const fs = require('fs');

let currentHtml = fs.readFileSync('index.html', 'utf8');

const season9ResultsMatch = currentHtml.match(/MULTI_DB\.season9\.results = (\[[\s\S]*?\]);/);
if (!season9ResultsMatch) {
    console.error("Could not find MULTI_DB.season9.results array.");
    process.exit(1);
}

let season9Results = JSON.parse(season9ResultsMatch[1]);

if (season9Results.find(r => r.match === 15)) {
    console.log("Match 15 already exists. Removing it to re-add.");
    season9Results = season9Results.filter(r => r.match !== 15);
}

const match15Data = {
    match: 15,
    team1: "AA",
    team2: "TT",
    venue: "Gabba",
    score1: "210/5",
    overs1: "20.0",
    score2: "145/9",
    overs2: "20.0",
    winner: "AA",
    margin: "65 runs",
    mom: "Will Jacks (AA) — 5/31",
    scorecard: {
        t1Inn: {
            bat: [
                { name: "Travis Head", dismissal: "lbw PANDYA", runs: 54, balls: 26 },
                { name: "David Warner", dismissal: "b JOHNSON", runs: 9, balls: 7 },
                { name: "Q de Kock", dismissal: "c SEIFERT b KING", runs: 68, balls: 42 },
                { name: "Mitchell Marsh", dismissal: "c BREVIS b SCHUTT", runs: 49, balls: 29 },
                { name: "Aarav Roy", dismissal: "not out", runs: 24, balls: 11 },
                { name: "Ben Stokes", dismissal: "c MARKRAM b JOHNSON", runs: 3, balls: 4 },
                { name: "Nat Sciver", dismissal: "not out", runs: 2, balls: 2 },
                { name: "Will Jacks", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Tim David", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Jasprit Bumrah", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Mohd Siraj", dismissal: "did not bat", runs: 0, balls: 0 }
            ],
            bowl: [
                { name: "Mitchell Johnson", overs: "4.0", maidens: 0, runs: 46, wkts: 2 },
                { name: "Megan Schutt", overs: "4.0", maidens: 0, runs: 38, wkts: 1 },
                { name: "Alana King", overs: "4.0", maidens: 0, runs: 52, wkts: 1 },
                { name: "Trevor Singh", overs: "4.0", maidens: 0, runs: 51, wkts: 0 },
                { name: "Hardik Pandya", overs: "4.0", maidens: 0, runs: 23, wkts: 1 }
            ],
            fow: "1-31, 2-94, 3-156, 4-203, 5-208"
        },
        t2Inn: {
            bat: [
                { name: "Tim Seifert", dismissal: "b SIRAJ", runs: 4, balls: 8 },
                { name: "Dewald Brevis", dismissal: "c ROY b JACKS", runs: 27, balls: 20 },
                { name: "Trevor Singh", dismissal: "b JACKS", runs: 17, balls: 9 },
                { name: "Laura Wolvaardt", dismissal: "lbw JACKS", runs: 23, balls: 10 },
                { name: "Shafali Verma", dismissal: "c DE KOCK b CHAKRAVARTHY", runs: 7, balls: 6 },
                { name: "Ravi Shastri", dismissal: "c DAVID b JACKS", runs: 3, balls: 3 },
                { name: "Aiden Markram", dismissal: "c MARSH b CHAKRAVARTHY", runs: 13, balls: 10 },
                { name: "Jordan Hermann", dismissal: "lbw SIRAJ", runs: 16, balls: 15 },
                { name: "Hardik Pandya", dismissal: "c SCIVER b JACKS", runs: 16, balls: 7 },
                { name: "Alana King", dismissal: "not out", runs: 10, balls: 12 },
                { name: "Megan Schutt", dismissal: "not out", runs: 8, balls: 20 }
            ],
            bowl: [
                { name: "Mohd Siraj", overs: "4.0", maidens: 0, runs: 35, wkts: 2 },
                { name: "Jasprit Bumrah", overs: "4.0", maidens: 0, runs: 24, wkts: 0 },
                { name: "Will Jacks", overs: "4.0", maidens: 0, runs: 31, wkts: 5 },
                { name: "Varun Chakravarthy", overs: "4.0", maidens: 0, runs: 28, wkts: 2 },
                { name: "Nat Sciver", overs: "4.0", maidens: 0, runs: 26, wkts: 0 }
            ],
            fow: "1-8, 2-45, 3-66, 4-77, 5-81, 6-82, 7-99, 8-121, 9-127"
        }
    }
};

season9Results.push(match15Data);

currentHtml = currentHtml.replace(
    /MULTI_DB\.season9\.results = \[[\s\S]*?\];/,
    `MULTI_DB.season9.results = ${JSON.stringify(season9Results)};`
);

fs.writeFileSync('index.html', currentHtml);
console.log("Match 15 (Season 9) data successfully injected into index.html!");
