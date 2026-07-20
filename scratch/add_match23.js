const fs = require('fs');

let currentHtml = fs.readFileSync('index.html', 'utf8');

const season9ResultsMatch = currentHtml.match(/MULTI_DB\.season9\.results = (\[[\s\S]*?\]);/);
if (!season9ResultsMatch) {
    console.error("Could not find MULTI_DB.season9.results array.");
    process.exit(1);
}

let season9Results = JSON.parse(season9ResultsMatch[1]);

if (season9Results.find(r => r.match === 23)) {
    console.log("Match 23 already exists. Removing it to re-add.");
    season9Results = season9Results.filter(r => r.match !== 23);
}

const match23Data = {
    match: 23,
    team1: "GB",
    team2: "HH",
    venue: "Headingley",
    score1: "188/9",
    overs1: "20.0",
    score2: "190/2",
    overs2: "15.5",
    winner: "HH",
    margin: "8 wickets",
    mom: "Sai Sudharsan (HH) — 105*",
    scorecard: {
        t1Inn: {
            bat: [
                { name: "Smriti Mandhana", dismissal: "b JONASSEN", runs: 14, balls: 10 },
                { name: "Ellyse Perry", dismissal: "b HAZLEWOOD", runs: 1, balls: 2 },
                { name: "Ishan Kishan", dismissal: "b PANDYA", runs: 29, balls: 14 },
                { name: "Glenn Maxwell", dismissal: "lbw PATEL", runs: 23, balls: 19 },
                { name: "Abhishek Sharma", dismissal: "c RICKELTON b HAZLEWOOD", runs: 16, balls: 12 },
                { name: "Marco Jansen", dismissal: "lbw SWEPSON", runs: 31, balls: 14 },
                { name: "Ravindra Jadeja", dismissal: "b SWEPSON", runs: 20, balls: 16 },
                { name: "Grant Bauer", dismissal: "c GILL b PANDYA", runs: 7, balls: 4 },
                { name: "Shashank Singh", dismissal: "not out", runs: 31, balls: 19 },
                { name: "Harbhajan Singh", dismissal: "lbw SWEPSON", runs: 9, balls: 10 },
                { name: "Bhuvneshwar Kumar", dismissal: "not out", runs: 1, balls: 1 }
            ],
            bowl: [
                { name: "Josh Hazlewood", overs: "4.0", maidens: 0, runs: 23, wkts: 2 },
                { name: "Krunal Pandya", overs: "4.0", maidens: 0, runs: 50, wkts: 2 },
                { name: "Jess Jonassen", overs: "4.0", maidens: 0, runs: 46, wkts: 1 },
                { name: "Axar Patel", overs: "4.0", maidens: 0, runs: 35, wkts: 1 },
                { name: "Mitchell Swepson", overs: "4.0", maidens: 0, runs: 29, wkts: 3 }
            ],
            fow: "1-3, 2-39, 3-45, 4-82, 5-84, 6-125, 7-138, 8-146, 9-187"
        },
        t2Inn: {
            bat: [
                { name: "Shikhar Dhawan", dismissal: "b SINGH", runs: 33, balls: 15 },
                { name: "Sai Sudharsan", dismissal: "not out", runs: 105, balls: 46 },
                { name: "Steve Smith", dismissal: "c KISHAN b JADEJA", runs: 24, balls: 21 },
                { name: "Suryakumar Yadav", dismissal: "not out", runs: 25, balls: 13 },
                { name: "Ryan Rickelton", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Shubman Gill", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Axar Patel", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Krunal Pandya", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Heinrich Klaasen", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Jess Jonassen", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Josh Hazlewood", dismissal: "did not bat", runs: 0, balls: 0 }
            ],
            bowl: [
                { name: "Marco Jansen", overs: "2.5", maidens: 0, runs: 47, wkts: 0 },
                { name: "Bhuvneshwar Kumar", overs: "2.0", maidens: 0, runs: 35, wkts: 0 },
                { name: "Noor Ahmad", overs: "4.0", maidens: 0, runs: 33, wkts: 0 },
                { name: "Harbhajan Singh", overs: "4.0", maidens: 0, runs: 40, wkts: 1 },
                { name: "Ravindra Jadeja", overs: "3.0", maidens: 0, runs: 32, wkts: 1 }
            ],
            fow: "1-79, 2-125"
        }
    }
};

season9Results.push(match23Data);

currentHtml = currentHtml.replace(
    /MULTI_DB\.season9\.results = \[[\s\S]*?\];/,
    `MULTI_DB.season9.results = ${JSON.stringify(season9Results)};`
);

fs.writeFileSync('index.html', currentHtml);
console.log("Match 23 (Season 9) data successfully injected into index.html!");
