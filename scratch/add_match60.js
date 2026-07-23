const fs = require('fs');

let currentHtml = fs.readFileSync('index.html', 'utf8');

const season9ResultsMatch = currentHtml.match(/MULTI_DB\.season9\.results = (\[[\s\S]*?\]);/);
if (!season9ResultsMatch) {
    console.error("Could not find MULTI_DB.season9.results array.");
    process.exit(1);
}

let season9Results = JSON.parse(season9ResultsMatch[1]);

if (season9Results.find(r => r.match === 60)) {
    console.log("Match 60 already exists. Removing it to re-add.");
    season9Results = season9Results.filter(r => r.match !== 60);
}

const match60Data = {
    match: 60,
    team1: "AA",
    team2: "VV",
    venue: "Newlands",
    score1: "235/6",
    overs1: "19.3",
    score2: "233/10",
    overs2: "20.0",
    winner: "AA",
    margin: "2 runs",
    mom: "Varun Chakravarthy (AA) — 4/36",
    scorecard: {
        t1Inn: {
            bat: [
                { name: "Travis Head", dismissal: "c HEALY b BOULT", runs: 1, balls: 3 },
                { name: "David Warner", dismissal: "b TAHIR", runs: 66, balls: 32 },
                { name: "Q de Kock", dismissal: "c HEALY b SANTNER", runs: 24, balls: 12 },
                { name: "Mitchell Marsh", dismissal: "b KERR", runs: 1, balls: 3 },
                { name: "Tim David", dismissal: "c HEALY b KERR", runs: 52, balls: 23 },
                { name: "Will Jacks", dismissal: "b TAHIR", runs: 5, balls: 4 },
                { name: "Aarav Roy", dismissal: "not out", runs: 72, balls: 34 },
                { name: "Nat Sciver", dismissal: "not out", runs: 11, balls: 6 },
                { name: "Ben Stokes", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Jasprit Bumrah", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Mohd Siraj", dismissal: "did not bat", runs: 0, balls: 0 }
            ],
            bowl: [
                { name: "Trent Boult", overs: "4.0", maidens: 0, runs: 48, wkts: 1 },
                { name: "Kagiso Rabada", overs: "4.0", maidens: 0, runs: 60, wkts: 0 },
                { name: "Mitchell Santner", overs: "3.0", maidens: 0, runs: 37, wkts: 1 },
                { name: "Rachin Ravindra", overs: "1.0", maidens: 0, runs: 13, wkts: 0 },
                { name: "Amelia Kerr", overs: "4.0", maidens: 0, runs: 41, wkts: 2 },
                { name: "Imran Tahir", overs: "3.3", maidens: 0, runs: 36, wkts: 2 }
            ],
            fow: "1-2, 2-80, 3-91, 4-97, 5-111, 6-189"
        },
        t2Inn: {
            bat: [
                { name: "Rohit Sharma", dismissal: "c MARSH b JACKS", runs: 60, balls: 32 },
                { name: "KL Rahul", dismissal: "lbw BUMRAH", runs: 26, balls: 14 },
                { name: "Virat Kohli", dismissal: "b SIRAJ", runs: 74, balls: 35 },
                { name: "Vivaan Anandabd", dismissal: "c HEAD b JACKS", runs: 7, balls: 3 },
                { name: "Rajat Patidar", dismissal: "c DE KOCK b BUMRAH", runs: 35, balls: 18 },
                { name: "Alyssa Healy", dismissal: "c DE KOCK b BUMRAH", runs: 24, balls: 12 },
                { name: "Amelia Kerr", dismissal: "not out", runs: 6, balls: 3 },
                { name: "Mitchell Santner", dismissal: "c WARNER b CHAKRAVARTHY", runs: 0, balls: 1 },
                { name: "Rachin Ravindra", dismissal: "b CHAKRAVARTHY", runs: 0, balls: 1 },
                { name: "Kagiso Rabada", dismissal: "c DE KOCK b CHAKRAVARTHY", runs: 0, balls: 1 },
                { name: "Trent Boult", dismissal: "lbw CHAKRAVARTHY", runs: 0, balls: 1 }
            ],
            bowl: [
                { name: "Mohd Siraj", overs: "4.0", maidens: 0, runs: 45, wkts: 1 },
                { name: "Jasprit Bumrah", overs: "4.0", maidens: 0, runs: 45, wkts: 3 },
                { name: "Will Jacks", overs: "4.0", maidens: 0, runs: 41, wkts: 2 },
                { name: "Varun Chakravarthy", overs: "4.0", maidens: 0, runs: 36, wkts: 4 },
                { name: "Ben Stokes", overs: "2.0", maidens: 0, runs: 34, wkts: 0 },
                { name: "Nat Sciver", overs: "2.0", maidens: 0, runs: 32, wkts: 0 }
            ],
            fow: "1-38, 2-137, 3-147, 4-182, 5-221, 6-230, 7-233, 8-233, 9-233, 10-233"
        }
    }
};

season9Results.push(match60Data);

currentHtml = currentHtml.replace(
    /MULTI_DB\.season9\.results = \[[\s\S]*?\];/,
    `MULTI_DB.season9.results = ${JSON.stringify(season9Results)};`
);

fs.writeFileSync('index.html', currentHtml);
console.log("Match 60 (Final, Season 9) data successfully injected into index.html!");
