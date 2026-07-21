const fs = require('fs');

let currentHtml = fs.readFileSync('index.html', 'utf8');

const season9ResultsMatch = currentHtml.match(/MULTI_DB\.season9\.results = (\[[\s\S]*?\]);/);
if (!season9ResultsMatch) {
    console.error("Could not find MULTI_DB.season9.results array.");
    process.exit(1);
}

let season9Results = JSON.parse(season9ResultsMatch[1]);

if (season9Results.find(r => r.match === 32)) {
    console.log("Match 32 already exists. Removing it to re-add.");
    season9Results = season9Results.filter(r => r.match !== 32);
}

const match32Data = {
    match: 32,
    team1: "HH",
    team2: "VV",
    venue: "Al Amerat Cricket Stadium",
    score1: "115/10",
    overs1: "17.3",
    score2: "119/2",
    overs2: "10.3",
    winner: "VV",
    margin: "8 wickets",
    mom: "Trent Boult (VV) — 3/24",
    scorecard: {
        t1Inn: {
            bat: [
                { name: "Shikhar Dhawan", dismissal: "b BOULT", runs: 41, balls: 27 },
                { name: "Sai Sudharsan", dismissal: "c SANTNER b BOULT", runs: 0, balls: 1 },
                { name: "Steve Smith", dismissal: "c TAHIR b SANTNER", runs: 20, balls: 13 },
                { name: "Suryakumar Yadav", dismissal: "c BOULT b KERR", runs: 22, balls: 10 },
                { name: "Ryan Rickelton", dismissal: "b KERR", runs: 1, balls: 2 },
                { name: "Axar Patel", dismissal: "c TAHIR b BOULT", runs: 7, balls: 5 },
                { name: "Shubman Gill", dismissal: "c RAHUL b KERR", runs: 2, balls: 5 },
                { name: "Heinrich Klaasen", dismissal: "c RAVINDRA b SANTNER", runs: 8, balls: 10 },
                { name: "Krunal Pandya", dismissal: "lbw RAVINDRA", runs: 3, balls: 7 },
                { name: "Jess Jonassen", dismissal: "c KOHLI b RAVINDRA", runs: 5, balls: 13 },
                { name: "Josh Hazlewood", dismissal: "not out", runs: 5, balls: 12 }
            ],
            bowl: [
                { name: "Trent Boult", overs: "4.0", maidens: 0, runs: 24, wkts: 3 },
                { name: "Kagiso Rabada", overs: "3.0", maidens: 0, runs: 30, wkts: 0 },
                { name: "Mitchell Santner", overs: "4.0", maidens: 0, runs: 29, wkts: 2 },
                { name: "Imran Tahir", overs: "1.0", maidens: 0, runs: 14, wkts: 0 },
                { name: "Amelia Kerr", overs: "4.0", maidens: 0, runs: 13, wkts: 3 },
                { name: "Rachin Ravindra", overs: "1.3", maidens: 0, runs: 4, wkts: 2 }
            ],
            fow: "1-1, 2-41, 3-83, 4-85, 5-87, 6-94, 7-94, 8-104, 9-106, 10-115"
        },
        t2Inn: {
            bat: [
                { name: "Rohit Sharma", dismissal: "c HAZLEWOOD b PANDYA", runs: 33, balls: 22 },
                { name: "KL Rahul", dismissal: "c PATEL b HAZLEWOOD", runs: 9, balls: 6 },
                { name: "Virat Kohli", dismissal: "not out", runs: 31, balls: 18 },
                { name: "Rajat Patidar", dismissal: "not out", runs: 42, balls: 17 },
                { name: "Vivaan Armstrong", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Alyssa Healy", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Amelia Kerr", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Mitchell Santner", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Kagiso Rabada", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Imran Tahir", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Rachin Ravindra", dismissal: "did not bat", runs: 0, balls: 0 }
            ],
            bowl: [
                { name: "Josh Hazlewood", overs: "4.0", maidens: 0, runs: 35, wkts: 1 },
                { name: "Jess Jonassen", overs: "2.0", maidens: 0, runs: 21, wkts: 0 },
                { name: "Krunal Pandya", overs: "3.0", maidens: 0, runs: 38, wkts: 1 },
                { name: "Axar Patel", overs: "1.0", maidens: 0, runs: 14, wkts: 0 },
                { name: "Steve Smith", overs: "0.3", maidens: 0, runs: 7, wkts: 0 }
            ],
            fow: "1-25, 2-57"
        }
    }
};

season9Results.push(match32Data);

currentHtml = currentHtml.replace(
    /MULTI_DB\.season9\.results = \[[\s\S]*?\];/,
    `MULTI_DB.season9.results = ${JSON.stringify(season9Results)};`
);

fs.writeFileSync('index.html', currentHtml);
console.log("Match 32 (Season 9) data successfully injected into index.html!");
