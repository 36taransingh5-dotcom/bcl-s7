const fs = require('fs');

let currentHtml = fs.readFileSync('index.html', 'utf8');

const season9ResultsMatch = currentHtml.match(/MULTI_DB\.season9\.results = (\[[\s\S]*?\]);/);
if (!season9ResultsMatch) {
    console.error("Could not find MULTI_DB.season9.results array.");
    process.exit(1);
}

let season9Results = JSON.parse(season9ResultsMatch[1]);

if (season9Results.find(r => r.match === 16)) {
    console.log("Match 16 already exists. Removing it to re-add.");
    season9Results = season9Results.filter(r => r.match !== 16);
}

const match16Data = {
    match: 16,
    team1: "HH",
    team2: "VV",
    venue: "Arun Jaitley Stadium",
    score1: "283/2",
    overs1: "20.0",
    score2: "261/9",
    overs2: "20.0",
    winner: "HH",
    margin: "22 runs",
    mom: "Shikhar Dhawan (HH) — 126*",
    scorecard: {
        t1Inn: {
            bat: [
                { name: "Shikhar Dhawan", dismissal: "not out", runs: 126, balls: 58 },
                { name: "Sai Sudharsan", dismissal: "c HEALY b TAHIR", runs: 42, balls: 19 },
                { name: "Steve Smith", dismissal: "c KOHLI b KERR", runs: 20, balls: 10 },
                { name: "Ryan Rickelton", dismissal: "not out", runs: 94, balls: 34 },
                { name: "Suryakumar Yadav", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Shubman Gill", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Axar Patel", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Krunal Pandya", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Heinrich Klaasen", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Jess Jonassen", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Mitchell Swepson", dismissal: "did not bat", runs: 0, balls: 0 }
            ],
            bowl: [
                { name: "Trent Boult", overs: "4.0", maidens: 0, runs: 49, wkts: 0 },
                { name: "Kagiso Rabada", overs: "4.0", maidens: 0, runs: 64, wkts: 0 },
                { name: "Mitchell Santner", overs: "4.0", maidens: 0, runs: 53, wkts: 0 },
                { name: "Imran Tahir", overs: "4.0", maidens: 0, runs: 52, wkts: 1 },
                { name: "Amelia Kerr", overs: "4.0", maidens: 0, runs: 65, wkts: 1 }
            ],
            fow: "1-77, 2-124"
        },
        t2Inn: {
            bat: [
                { name: "Rohit Sharma", dismissal: "c RICKELTON b JONASSEN", runs: 7, balls: 4 },
                { name: "KL Rahul", dismissal: "lbw HAZLEWOOD", runs: 0, balls: 1 },
                { name: "Virat Kohli", dismissal: "c SWEPSON b PATEL", runs: 54, balls: 25 },
                { name: "Rajat Patidar", dismissal: "b JONASSEN", runs: 8, balls: 4 },
                { name: "Vivaan Anandabd", dismissal: "c DHAWAN b HAZLEWOOD", runs: 94, balls: 39 },
                { name: "Alyssa Healy", dismissal: "c GILL b SWEPSON", runs: 18, balls: 4 },
                { name: "Joe Root", dismissal: "c DHAWAN b HAZLEWOOD", runs: 9, balls: 4 },
                { name: "Amelia Kerr", dismissal: "not out", runs: 43, balls: 17 },
                { name: "Mitchell Santner", dismissal: "lbw SWEPSON", runs: 9, balls: 5 },
                { name: "Kagiso Rabada", dismissal: "lbw SWEPSON", runs: 3, balls: 5 },
                { name: "Trent Boult", dismissal: "not out", runs: 8, balls: 14 }
            ],
            bowl: [
                { name: "Josh Hazlewood", overs: "4.0", maidens: 0, runs: 48, wkts: 3 },
                { name: "Jess Jonassen", overs: "4.0", maidens: 0, runs: 48, wkts: 2 },
                { name: "Krunal Pandya", overs: "4.0", maidens: 0, runs: 50, wkts: 0 },
                { name: "Mitchell Swepson", overs: "4.0", maidens: 0, runs: 50, wkts: 3 },
                { name: "Axar Patel", overs: "4.0", maidens: 0, runs: 64, wkts: 1 }
            ],
            fow: "1-1, 2-11, 3-19, 4-127, 5-156, 6-169, 7-200, 8-213, 9-231"
        }
    }
};

season9Results.push(match16Data);

currentHtml = currentHtml.replace(
    /MULTI_DB\.season9\.results = \[[\s\S]*?\];/,
    `MULTI_DB.season9.results = ${JSON.stringify(season9Results)};`
);

fs.writeFileSync('index.html', currentHtml);
console.log("Match 16 data successfully injected into index.html!");
