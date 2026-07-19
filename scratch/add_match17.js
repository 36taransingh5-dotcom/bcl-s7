const fs = require('fs');

let currentHtml = fs.readFileSync('index.html', 'utf8');

const season9ResultsMatch = currentHtml.match(/MULTI_DB\.season9\.results = (\[[\s\S]*?\]);/);
if (!season9ResultsMatch) {
    console.error("Could not find MULTI_DB.season9.results array.");
    process.exit(1);
}

let season9Results = JSON.parse(season9ResultsMatch[1]);

if (season9Results.find(r => r.match === 17)) {
    console.log("Match 17 already exists. Removing it to re-add.");
    season9Results = season9Results.filter(r => r.match !== 17);
}

const match17Data = {
    match: 17,
    team1: "VV",
    team2: "AA",
    venue: "Bay Oval",
    score1: "224/10",
    overs1: "19.5",
    score2: "187/9",
    overs2: "20.0",
    winner: "VV",
    margin: "37 runs",
    mom: "Rajat Patidar (VV) — 79",
    scorecard: {
        t1Inn: {
            bat: [
                { name: "Rohit Sharma", dismissal: "c STOKES b SIRAJ", runs: 16, balls: 8 },
                { name: "KL Rahul", dismissal: "c DE KOCK b SIRAJ", runs: 18, balls: 9 },
                { name: "Virat Kohli", dismissal: "b SIRAJ", runs: 3, balls: 4 },
                { name: "Rajat Patidar", dismissal: "b CHAKRAVARTHY", runs: 79, balls: 41 },
                { name: "Vivaan Anandabd", dismissal: "b JACKS", runs: 21, balls: 10 },
                { name: "Mitchell Santner", dismissal: "c DE KOCK b JACKS", runs: 0, balls: 2 },
                { name: "Amelia Kerr", dismissal: "lbw SCIVER", runs: 62, balls: 32 },
                { name: "Alyssa Healy", dismissal: "c STOKES b JACKS", runs: 13, balls: 7 },
                { name: "Rachin Ravindra", dismissal: "b SCIVER", runs: 6, balls: 4 },
                { name: "Kagiso Rabada", dismissal: "c SIRAJ b SCIVER", runs: 0, balls: 1 },
                { name: "Trent Boult", dismissal: "not out", runs: 3, balls: 1 }
            ],
            bowl: [
                { name: "Mohd Siraj", overs: "4.0", maidens: 0, runs: 50, wkts: 3 },
                { name: "Jasprit Bumrah", overs: "4.0", maidens: 0, runs: 47, wkts: 0 },
                { name: "Will Jacks", overs: "4.0", maidens: 0, runs: 58, wkts: 3 },
                { name: "Varun Chakravarthy", overs: "4.0", maidens: 0, runs: 32, wkts: 1 },
                { name: "Nat Sciver", overs: "3.5", maidens: 0, runs: 34, wkts: 3 }
            ],
            fow: "1-24, 2-35, 3-44, 4-87, 5-87, 6-168, 7-194, 8-221, 9-221, 10-224"
        },
        t2Inn: {
            bat: [
                { name: "Travis Head", dismissal: "c TAHIR b BOULT", runs: 10, balls: 12 },
                { name: "David Warner", dismissal: "c KERR b RABADA", runs: 33, balls: 12 },
                { name: "Q de Kock", dismissal: "c HEALY b TAHIR", runs: 9, balls: 5 },
                { name: "Mitchell Marsh", dismissal: "c & b RABADA", runs: 6, balls: 5 },
                { name: "Will Jacks", dismissal: "lbw SANTNER", runs: 1, balls: 2 },
                { name: "Tim David", dismissal: "b RAVINDRA", runs: 13, balls: 13 },
                { name: "Aarav Roy", dismissal: "c HEALY b TAHIR", runs: 37, balls: 19 },
                { name: "Ben Stokes", dismissal: "c ANANDABD b RAVINDRA", runs: 8, balls: 8 },
                { name: "Nat Sciver", dismissal: "not out", runs: 53, balls: 25 },
                { name: "Mohd Siraj", dismissal: "b KERR", runs: 8, balls: 15 },
                { name: "Jasprit Bumrah", dismissal: "not out", runs: 1, balls: 5 }
            ],
            bowl: [
                { name: "Trent Boult", overs: "4.0", maidens: 0, runs: 29, wkts: 1 },
                { name: "Kagiso Rabada", overs: "4.0", maidens: 0, runs: 43, wkts: 2 },
                { name: "Imran Tahir", overs: "2.0", maidens: 0, runs: 20, wkts: 2 },
                { name: "Mitchell Santner", overs: "3.0", maidens: 0, runs: 28, wkts: 1 },
                { name: "Amelia Kerr", overs: "4.0", maidens: 0, runs: 33, wkts: 1 },
                { name: "Rachin Ravindra", overs: "3.0", maidens: 0, runs: 28, wkts: 2 }
            ],
            fow: "1-28, 2-48, 3-62, 4-63, 5-65, 6-106, 7-117, 8-124, 9-180"
        }
    }
};

season9Results.push(match17Data);

currentHtml = currentHtml.replace(
    /MULTI_DB\.season9\.results = \[[\s\S]*?\];/,
    `MULTI_DB.season9.results = ${JSON.stringify(season9Results)};`
);

fs.writeFileSync('index.html', currentHtml);
console.log("Match 17 data successfully injected into index.html!");
