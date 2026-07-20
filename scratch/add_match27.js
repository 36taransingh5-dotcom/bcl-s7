const fs = require('fs');

let currentHtml = fs.readFileSync('index.html', 'utf8');

const season9ResultsMatch = currentHtml.match(/MULTI_DB\.season9\.results = (\[[\s\S]*?\]);/);
if (!season9ResultsMatch) {
    console.error("Could not find MULTI_DB.season9.results array.");
    process.exit(1);
}

let season9Results = JSON.parse(season9ResultsMatch[1]);

if (season9Results.find(r => r.match === 27)) {
    console.log("Match 27 already exists. Removing it to re-add.");
    season9Results = season9Results.filter(r => r.match !== 27);
}

const match27Data = {
    match: 27,
    team1: "AA",
    team2: "GB",
    venue: "Sydney Cricket Ground",
    score1: "224/7",
    overs1: "20.0",
    score2: "225/6",
    overs2: "19.3",
    winner: "GB",
    margin: "4 wickets",
    mom: "Ishan Kishan (GB) — 69",
    scorecard: {
        t1Inn: {
            bat: [
                { name: "Travis Head", dismissal: "c KISHAN b AHMAD", runs: 41, balls: 19 },
                { name: "David Warner", dismissal: "c KISHAN b KUMAR", runs: 14, balls: 7 },
                { name: "Q de Kock", dismissal: "lbw JANSEN", runs: 17, balls: 7 },
                { name: "Mitchell Marsh", dismissal: "c KISHAN b AHMAD", runs: 5, balls: 8 },
                { name: "Tim David", dismissal: "c KISHAN b JADEJA", runs: 19, balls: 12 },
                { name: "Aarav Roy", dismissal: "c KUMAR b JADEJA", runs: 46, balls: 26 },
                { name: "Will Jacks", dismissal: "b JADEJA", runs: 21, balls: 14 },
                { name: "Ben Stokes", dismissal: "not out", runs: 29, balls: 14 },
                { name: "Nat Sciver", dismissal: "not out", runs: 31, balls: 13 },
                { name: "Jasprit Bumrah", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Mohd Siraj", dismissal: "did not bat", runs: 0, balls: 0 }
            ],
            bowl: [
                { name: "Bhuvneshwar Kumar", overs: "4.0", maidens: 0, runs: 32, wkts: 1 },
                { name: "Marco Jansen", overs: "4.0", maidens: 0, runs: 69, wkts: 1 },
                { name: "Noor Ahmad", overs: "4.0", maidens: 0, runs: 35, wkts: 2 },
                { name: "Harbhajan Singh", overs: "4.0", maidens: 0, runs: 48, wkts: 0 },
                { name: "Ravindra Jadeja", overs: "4.0", maidens: 0, runs: 39, wkts: 3 }
            ],
            fow: "1-39, 2-56, 3-62, 4-83, 5-117, 6-164, 7-165"
        },
        t2Inn: {
            bat: [
                { name: "Smriti Mandhana", dismissal: "c STOKES b SIRAJ", runs: 32, balls: 18 },
                { name: "Ishan Kishan", dismissal: "lbw SCIVER", runs: 69, balls: 33 },
                { name: "Ellyse Perry", dismissal: "b JACKS", runs: 35, balls: 18 },
                { name: "Harmanpreet Kaur", dismissal: "b CHAKRAVARTHY", runs: 16, balls: 10 },
                { name: "Glenn Maxwell", dismissal: "not out", runs: 46, balls: 20 },
                { name: "Ravindra Jadeja", dismissal: "b JACKS", runs: 1, balls: 3 },
                { name: "Grant Bauer", dismissal: "c SIRAJ b BUMRAH", runs: 4, balls: 2 },
                { name: "Shashank Singh", dismissal: "not out", runs: 17, balls: 13 },
                { name: "Marco Jansen", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Noor Ahmad", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Bhuvneshwar Kumar", dismissal: "did not bat", runs: 0, balls: 0 }
            ],
            bowl: [
                { name: "Mohd Siraj", overs: "4.0", maidens: 0, runs: 43, wkts: 1 },
                { name: "Jasprit Bumrah", overs: "4.0", maidens: 0, runs: 31, wkts: 1 },
                { name: "Will Jacks", overs: "4.0", maidens: 0, runs: 42, wkts: 2 },
                { name: "Varun Chakravarthy", overs: "4.0", maidens: 0, runs: 62, wkts: 1 },
                { name: "Nat Sciver", overs: "3.3", maidens: 0, runs: 42, wkts: 1 }
            ],
            fow: "1-52, 2-126, 3-150, 4-166, 5-192, 6-197"
        }
    }
};

season9Results.push(match27Data);

currentHtml = currentHtml.replace(
    /MULTI_DB\.season9\.results = \[[\s\S]*?\];/,
    `MULTI_DB.season9.results = ${JSON.stringify(season9Results)};`
);

fs.writeFileSync('index.html', currentHtml);
console.log("Match 27 (Season 9) data successfully injected into index.html!");
