const fs = require('fs');

let currentHtml = fs.readFileSync('index.html', 'utf8');

const resultsMatch = currentHtml.match(/results:\s*(\[[\s\S]*?\]),\s*batting:/);
if (!resultsMatch) {
    console.error("Could not find results array.");
    process.exit(1);
}

// Ensure we match MULTI_DB.season9.results correctly
const season9ResultsMatch = currentHtml.match(/MULTI_DB\.season9\.results = (\[[\s\S]*?\]);/);
let season9Results = season9ResultsMatch ? JSON.parse(season9ResultsMatch[1]) : [];

// Check if match 3 is already there
if (season9Results.find(r => r.match === 3)) {
    console.log("Match 3 already exists. Removing it to re-add.");
    season9Results = season9Results.filter(r => r.match !== 3);
}

const match3Data = {
    match: 3,
    team1: "GB",
    team2: "AA",
    venue: "Rajiv Gandhi International Cricket Stadium",
    score1: "226/7",
    overs1: "20.0",
    score2: "219/9",
    overs2: "20.0",
    winner: "GB",
    margin: "7 runs",
    mom: "Ellyse Perry (GB) — 119 (66)",
    scorecard: {
        t1Inn: {
            bat: [
                { name: "Smriti Mandhana", dismissal: "b BUMRAH", runs: 5, balls: 4 },
                { name: "Ishan Kishan", dismissal: "c MARSH b BUMRAH", runs: 18, balls: 9 },
                { name: "Ellyse Perry", dismissal: "not out", runs: 119, balls: 66 },
                { name: "Glenn Maxwell", dismissal: "b SIRAJ", runs: 1, balls: 3 },
                { name: "Grant Bauer", dismissal: "b JACKS", runs: 4, balls: 4 },
                { name: "Abhishek Sharma", dismissal: "lbw SCIVER", runs: 40, balls: 16 },
                { name: "Ravindra Jadeja", dismissal: "c STOKES b CHAKRAVARTHY", runs: 20, balls: 6 },
                { name: "Shashank Singh", dismissal: "c DE KOCK b JACKS", runs: 5, balls: 5 },
                { name: "Marco Jansen", dismissal: "not out", runs: 13, balls: 8 },
                { name: "Noor Ahmad", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Bhuvneshwar Kumar", dismissal: "did not bat", runs: 0, balls: 0 }
            ],
            bowl: [
                { name: "Mohd Siraj", overs: "4.0", maidens: 0, runs: 48, wkts: 1 },
                { name: "Jasprit Bumrah", overs: "4.0", maidens: 0, runs: 31, wkts: 2 },
                { name: "Will Jacks", overs: "4.0", maidens: 0, runs: 53, wkts: 2 },
                { name: "Varun Chakravarthy", overs: "4.0", maidens: 0, runs: 51, wkts: 1 },
                { name: "Nat Sciver", overs: "4.0", maidens: 0, runs: 43, wkts: 1 }
            ],
            fow: "1-17, 2-38, 3-39, 4-54, 5-140, 6-181, 7-203"
        },
        t2Inn: {
            bat: [
                { name: "David Warner", dismissal: "run out MANDHANA", runs: 62, balls: 29 },
                { name: "Travis Head", dismissal: "lbw JANSEN", runs: 16, balls: 12 },
                { name: "Q de Kock", dismissal: "c JADEJA b AHMAD", runs: 4, balls: 6 },
                { name: "Mitchell Marsh", dismissal: "c SHARMA b SINGH", runs: 5, balls: 3 },
                { name: "Tim David", dismissal: "c KISHAN b JADEJA", runs: 27, balls: 14 },
                { name: "Will Jacks", dismissal: "c KISHAN b AHMAD", runs: 6, balls: 4 },
                { name: "Ben Stokes", dismissal: "b SINGH", runs: 49, balls: 21 },
                { name: "Aarav Roy", dismissal: "lbw JADEJA", runs: 29, balls: 21 },
                { name: "Nat Sciver", dismissal: "lbw KUMAR", runs: 17, balls: 7 },
                { name: "Jasprit Bumrah", dismissal: "not out", runs: 1, balls: 1 },
                { name: "Mohd Siraj", dismissal: "not out", runs: 1, balls: 2 }
            ],
            bowl: [
                { name: "Bhuvneshwar Kumar", overs: "4.0", maidens: 0, runs: 46, wkts: 1 },
                { name: "Marco Jansen", overs: "4.0", maidens: 0, runs: 50, wkts: 1 },
                { name: "Noor Ahmad", overs: "4.0", maidens: 0, runs: 31, wkts: 2 },
                { name: "Harbhajan Singh", overs: "4.0", maidens: 0, runs: 50, wkts: 2 },
                { name: "Ravindra Jadeja", overs: "4.0", maidens: 0, runs: 40, wkts: 2 }
            ],
            fow: "1-46, 2-66, 3-73, 4-106, 5-119, 6-123, 7-189, 8-210, 9-218"
        }
    }
};

season9Results.push(match3Data);

currentHtml = currentHtml.replace(
    /MULTI_DB\.season9\.results = \[[\s\S]*?\];/,
    `MULTI_DB.season9.results = ${JSON.stringify(season9Results)};`
);

fs.writeFileSync('index.html', currentHtml);
console.log("Match 3 data successfully injected into index.html!");
