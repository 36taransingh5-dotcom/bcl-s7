const fs = require('fs');

let currentHtml = fs.readFileSync('index.html', 'utf8');

const season9ResultsMatch = currentHtml.match(/MULTI_DB\.season9\.results = (\[[\s\S]*?\]);/);
if (!season9ResultsMatch) {
    console.error("Could not find MULTI_DB.season9.results array.");
    process.exit(1);
}

let season9Results = JSON.parse(season9ResultsMatch[1]);

if (season9Results.find(r => r.match === 59)) {
    console.log("Match 59 already exists. Removing it to re-add.");
    season9Results = season9Results.filter(r => r.match !== 59);
}

const match59Data = {
    match: 59,
    team1: "GB",
    team2: "AA",
    venue: "Al Amerat Cricket Stadium",
    score1: "194/7",
    overs1: "20.0",
    score2: "195/8",
    overs2: "20.0",
    winner: "AA",
    margin: "2 wickets",
    mom: "Will Jacks (AA) — 48",
    scorecard: {
        t1Inn: {
            bat: [
                { name: "Smriti Mandhana", dismissal: "b BUMRAH", runs: 17, balls: 10 },
                { name: "Ishan Kishan", dismissal: "c DAVID b CHAKRAVARTHY", runs: 48, balls: 26 },
                { name: "Ellyse Perry", dismissal: "b JACKS", runs: 15, balls: 9 },
                { name: "Harmanpreet Kaur", dismissal: "lbw CHAKRAVARTHY", runs: 2, balls: 5 },
                { name: "Glenn Maxwell", dismissal: "c DE KOCK b STOKES", runs: 12, balls: 12 },
                { name: "Ravindra Jadeja", dismissal: "c SIRAJ b BUMRAH", runs: 26, balls: 19 },
                { name: "Grant Bauer", dismissal: "c HEAD b SCIVER", runs: 7, balls: 3 },
                { name: "Shashank Singh", dismissal: "not out", runs: 37, balls: 24 },
                { name: "Marco Jansen", dismissal: "not out", runs: 28, balls: 12 },
                { name: "Noor Ahmad", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Bhuvneshwar Kumar", dismissal: "did not bat", runs: 0, balls: 0 }
            ],
            bowl: [
                { name: "Mohd Siraj", overs: "3.0", maidens: 0, runs: 28, wkts: 0 },
                { name: "Jasprit Bumrah", overs: "4.0", maidens: 0, runs: 33, wkts: 2 },
                { name: "Will Jacks", overs: "3.0", maidens: 0, runs: 40, wkts: 1 },
                { name: "Varun Chakravarthy", overs: "3.0", maidens: 0, runs: 25, wkts: 2 },
                { name: "Nat Sciver", overs: "4.0", maidens: 0, runs: 43, wkts: 1 },
                { name: "Ben Stokes", overs: "3.0", maidens: 0, runs: 24, wkts: 1 }
            ],
            fow: "1-33, 2-61, 3-66, 4-83, 5-101, 6-108, 7-163"
        },
        t2Inn: {
            bat: [
                { name: "Travis Head", dismissal: "b SINGH", runs: 36, balls: 20 },
                { name: "David Warner", dismissal: "c MAXWELL b SINGH", runs: 13, balls: 15 },
                { name: "Q de Kock", dismissal: "lbw AHMAD", runs: 2, balls: 4 },
                { name: "Mitchell Marsh", dismissal: "c MANDHANA b JADEJA", runs: 19, balls: 12 },
                { name: "Tim David", dismissal: "b AHMAD", runs: 23, balls: 17 },
                { name: "Will Jacks", dismissal: "lbw JANSEN", runs: 48, balls: 22 },
                { name: "Aarav Roy", dismissal: "c KISHAN b JADEJA", runs: 5, balls: 7 },
                { name: "Nat Sciver", dismissal: "lbw KUMAR", runs: 30, balls: 16 },
                { name: "Ben Stokes", dismissal: "not out", runs: 4, balls: 3 },
                { name: "Jasprit Bumrah", dismissal: "not out", runs: 3, balls: 4 },
                { name: "Mohd Siraj", dismissal: "did not bat", runs: 0, balls: 0 }
            ],
            bowl: [
                { name: "Bhuvneshwar Kumar", overs: "4.0", maidens: 0, runs: 42, wkts: 1 },
                { name: "Marco Jansen", overs: "4.0", maidens: 0, runs: 56, wkts: 1 },
                { name: "Noor Ahmad", overs: "4.0", maidens: 0, runs: 31, wkts: 2 },
                { name: "Harbhajan Singh", overs: "4.0", maidens: 0, runs: 24, wkts: 2 },
                { name: "Ravindra Jadeja", overs: "4.0", maidens: 0, runs: 40, wkts: 2 }
            ],
            fow: "1-54, 2-55, 3-57, 4-79, 5-115, 6-121, 7-169, 8-183"
        }
    }
};

season9Results.push(match59Data);

currentHtml = currentHtml.replace(
    /MULTI_DB\.season9\.results = \[[\s\S]*?\];/,
    `MULTI_DB.season9.results = ${JSON.stringify(season9Results)};`
);

fs.writeFileSync('index.html', currentHtml);
console.log("Match 59 (Qualifier 2, Season 9) data successfully injected into index.html!");
