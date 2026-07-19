const fs = require('fs');

let currentHtml = fs.readFileSync('index.html', 'utf8');

const season9ResultsMatch = currentHtml.match(/MULTI_DB\.season9\.results = (\[[\s\S]*?\]);/);
if (!season9ResultsMatch) {
    console.error("Could not find MULTI_DB.season9.results array.");
    process.exit(1);
}

let season9Results = JSON.parse(season9ResultsMatch[1]);

if (season9Results.find(r => r.match === 12)) {
    console.log("Match 12 already exists. Removing it to re-add.");
    season9Results = season9Results.filter(r => r.match !== 12);
}

const match12Data = {
    match: 12,
    team1: "AA",
    team2: "VV",
    venue: "Bay Oval",
    score1: "189/6",
    overs1: "20.0",
    score2: "193/4",
    overs2: "18.0",
    winner: "VV",
    margin: "6 wickets",
    mom: "Virat Kohli (VV) — 62*",
    scorecard: {
        t1Inn: {
            bat: [
                { name: "Travis Head", dismissal: "lbw RABADA", runs: 16, balls: 8 },
                { name: "David Warner", dismissal: "c HEALY b BOULT", runs: 29, balls: 26 },
                { name: "Q de Kock", dismissal: "c KERR b RABADA", runs: 0, balls: 3 },
                { name: "Mitchell Marsh", dismissal: "c KOHLI b BOULT", runs: 46, balls: 26 },
                { name: "Tim David", dismissal: "not out", runs: 65, balls: 37 },
                { name: "Aarav Roy", dismissal: "b KERR", runs: 12, balls: 8 },
                { name: "Ben Stokes", dismissal: "lbw RABADA", runs: 3, balls: 5 },
                { name: "Nat Sciver", dismissal: "not out", runs: 12, balls: 7 },
                { name: "Will Jacks", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Jasprit Bumrah", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Mohd Siraj", dismissal: "did not bat", runs: 0, balls: 0 }
            ],
            bowl: [
                { name: "Trent Boult", overs: "4.0", maidens: 0, runs: 19, wkts: 2 },
                { name: "Kagiso Rabada", overs: "4.0", maidens: 0, runs: 40, wkts: 3 },
                { name: "Mitchell Santner", overs: "4.0", maidens: 0, runs: 41, wkts: 0 },
                { name: "Amelia Kerr", overs: "4.0", maidens: 0, runs: 34, wkts: 1 },
                { name: "Imran Tahir", overs: "2.0", maidens: 0, runs: 25, wkts: 0 },
                { name: "Rachin Ravindra", overs: "2.0", maidens: 0, runs: 24, wkts: 0 }
            ],
            fow: "1-31, 2-31, 3-86, 4-103, 5-143, 6-163"
        },
        t2Inn: {
            bat: [
                { name: "Rohit Sharma", dismissal: "b SIRAJ", runs: 10, balls: 8 },
                { name: "KL Rahul", dismissal: "b BUMRAH", runs: 20, balls: 10 },
                { name: "Virat Kohli", dismissal: "not out", runs: 62, balls: 39 },
                { name: "Rajat Patidar", dismissal: "c DE KOCK b JACKS", runs: 9, balls: 8 },
                { name: "Vivaan Armstrong", dismissal: "c ROY b CHAKRAVARTHY", runs: 42, balls: 22 },
                { name: "Alyssa Healy", dismissal: "not out", runs: 49, balls: 22 },
                { name: "Amelia Kerr", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Mitchell Santner", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Kagiso Rabada", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Imran Tahir", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Rachin Ravindra", dismissal: "did not bat", runs: 0, balls: 0 }
            ],
            bowl: [
                { name: "Mohd Siraj", overs: "4.0", maidens: 0, runs: 34, wkts: 1 },
                { name: "Jasprit Bumrah", overs: "3.0", maidens: 0, runs: 38, wkts: 1 },
                { name: "Will Jacks", overs: "4.0", maidens: 0, runs: 50, wkts: 1 },
                { name: "Varun Chakravarthy", overs: "4.0", maidens: 0, runs: 43, wkts: 1 },
                { name: "Nat Sciver", overs: "3.0", maidens: 0, runs: 28, wkts: 0 }
            ],
            fow: "1-28, 2-32, 3-48, 4-121"
        }
    }
};

season9Results.push(match12Data);

currentHtml = currentHtml.replace(
    /MULTI_DB\.season9\.results = \[[\s\S]*?\];/,
    `MULTI_DB.season9.results = ${JSON.stringify(season9Results)};`
);

fs.writeFileSync('index.html', currentHtml);
console.log("Match 12 data successfully injected into index.html!");
