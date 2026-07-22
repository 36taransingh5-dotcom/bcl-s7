const fs = require('fs');

let currentHtml = fs.readFileSync('index.html', 'utf8');

const season9ResultsMatch = currentHtml.match(/MULTI_DB\.season9\.results = (\[[\s\S]*?\]);/);
if (!season9ResultsMatch) {
    console.error("Could not find MULTI_DB.season9.results array.");
    process.exit(1);
}

let season9Results = JSON.parse(season9ResultsMatch[1]);

if (season9Results.find(r => r.match === 39)) {
    console.log("Match 39 already exists. Removing it to re-add.");
    season9Results = season9Results.filter(r => r.match !== 39);
}

const match39Data = {
    match: 39,
    team1: "VV",
    team2: "AS",
    venue: "Adelaide Oval",
    score1: "279/6",
    overs1: "18.0",
    score2: "166/10",
    overs2: "18.0",
    winner: "VV",
    margin: "113 runs",
    mom: "Vivaan Armstrong (VV) — 77*",
    scorecard: {
        t1Inn: {
            bat: [
                { name: "Rohit Sharma", dismissal: "c ROY b KRISHNA", runs: 66, balls: 26 },
                { name: "KL Rahul", dismissal: "c INGLIS b YADAV", runs: 11, balls: 7 },
                { name: "Virat Kohli", dismissal: "lbw YADAV", runs: 57, balls: 17 },
                { name: "Rajat Patidar", dismissal: "c POTTER b CHAHAL", runs: 10, balls: 3 },
                { name: "Vivaan Armstrong", dismissal: "not out", runs: 77, balls: 29 },
                { name: "Alyssa Healy", dismissal: "c STRAUSS b ALLEN", runs: 20, balls: 7 },
                { name: "Mitchell Santner", dismissal: "c & b KRISHNA", runs: 12, balls: 10 },
                { name: "Amelia Kerr", dismissal: "not out", runs: 26, balls: 9 },
                { name: "Kagiso Rabada", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Trent Boult", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Imran Tahir", dismissal: "did not bat", runs: 0, balls: 0 }
            ],
            bowl: [
                { name: "Arshdeep Singh", overs: "3.0", maidens: 0, runs: 56, wkts: 0 },
                { name: "Kuldeep Yadav", overs: "4.0", maidens: 0, runs: 50, wkts: 2 },
                { name: "Prasidh Krishna", overs: "3.0", maidens: 0, runs: 54, wkts: 2 },
                { name: "Y Chahal", overs: "4.0", maidens: 0, runs: 65, wkts: 1 },
                { name: "Fabian Allen", overs: "4.0", maidens: 0, runs: 54, wkts: 1 }
            ],
            fow: "1-28, 2-115, 3-128, 4-153, 5-174, 6-215"
        },
        t2Inn: {
            bat: [
                { name: "Arjun Potter", dismissal: "c ARMSTRONG b RABADA", runs: 13, balls: 5 },
                { name: "Jason Roy", dismissal: "run out RAHUL", runs: 13, balls: 12 },
                { name: "Josh Inglis", dismissal: "c HEALY b RABADA", runs: 9, balls: 8 },
                { name: "Arshdeep Singh", dismissal: "c HEALY b KERR", runs: 4, balls: 7 },
                { name: "Y Chahal", dismissal: "c PATIDAR b KERR", runs: 0, balls: 2 },
                { name: "Kuldeep Yadav", dismissal: "c HEALY b KERR", runs: 2, balls: 4 },
                { name: "Joe Denly", dismissal: "lbw SANTNER", runs: 47, balls: 29 },
                { name: "Nitish Reddy", dismissal: "lbw SANTNER", runs: 31, balls: 13 },
                { name: "Andrew Strauss", dismissal: "lbw SANTNER", runs: 12, balls: 8 },
                { name: "Fabian Allen", dismissal: "not out", runs: 27, balls: 14 },
                { name: "Prasidh Krishna", dismissal: "b RAVINDRA", runs: 4, balls: 6 }
            ],
            bowl: [
                { name: "Trent Boult", overs: "4.0", maidens: 0, runs: 36, wkts: 0 },
                { name: "Kagiso Rabada", overs: "4.0", maidens: 0, runs: 34, wkts: 2 },
                { name: "Amelia Kerr", overs: "4.0", maidens: 0, runs: 32, wkts: 3 },
                { name: "Mitchell Santner", overs: "4.0", maidens: 0, runs: 40, wkts: 3 },
                { name: "Imran Tahir", overs: "1.0", maidens: 0, runs: 7, wkts: 0 },
                { name: "Rachin Ravindra", overs: "1.0", maidens: 0, runs: 13, wkts: 1 }
            ],
            fow: "1-21, 2-35, 3-35, 4-35, 5-41, 6-42, 7-85, 8-97, 9-146, 10-166"
        }
    }
};

season9Results.push(match39Data);

currentHtml = currentHtml.replace(
    /MULTI_DB\.season9\.results = \[[\s\S]*?\];/,
    `MULTI_DB.season9.results = ${JSON.stringify(season9Results)};`
);

fs.writeFileSync('index.html', currentHtml);
console.log("Match 39 (Season 9) data successfully injected into index.html!");
