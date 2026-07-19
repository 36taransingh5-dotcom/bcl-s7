const fs = require('fs');

let currentHtml = fs.readFileSync('index.html', 'utf8');

const season9ResultsMatch = currentHtml.match(/MULTI_DB\.season9\.results = (\[[\s\S]*?\]);/);
if (!season9ResultsMatch) {
    console.error("Could not find MULTI_DB.season9.results array.");
    process.exit(1);
}

let season9Results = JSON.parse(season9ResultsMatch[1]);

if (season9Results.find(r => r.match === 18)) {
    console.log("Match 18 already exists. Removing it to re-add.");
    season9Results = season9Results.filter(r => r.match !== 18);
}

const match18Data = {
    match: 18,
    team1: "VV",
    team2: "AS",
    venue: "Beausejour Cricket Ground",
    score1: "237/8",
    overs1: "20.0",
    score2: "99/10",
    overs2: "11.4",
    winner: "VV",
    margin: "138 runs",
    mom: "KL Rahul (VV) — 65",
    scorecard: {
        t1Inn: {
            bat: [
                { name: "Rohit Sharma", dismissal: "lbw YADAV", runs: 36, balls: 14 },
                { name: "KL Rahul", dismissal: "lbw CHAHAL", runs: 65, balls: 29 },
                { name: "Virat Kohli", dismissal: "b ALLEN", runs: 12, balls: 7 },
                { name: "Rajat Patidar", dismissal: "c MUZARABANI b ALLEN", runs: 2, balls: 2 },
                { name: "Vivaan Anandabd", dismissal: "c INGLIS b CHAHAL", runs: 14, balls: 10 },
                { name: "Amelia Kerr", dismissal: "c INGLIS b SINGH", runs: 46, balls: 25 },
                { name: "Mitchell Santner", dismissal: "not out", runs: 54, balls: 23 },
                { name: "Alyssa Healy", dismissal: "b MUZARABANI", runs: 1, balls: 5 },
                { name: "Rachin Ravindra", dismissal: "c STRAUSS b SINGH", runs: 6, balls: 4 },
                { name: "Kagiso Rabada", dismissal: "not out", runs: 1, balls: 1 },
                { name: "Trent Boult", dismissal: "did not bat", runs: 0, balls: 0 }
            ],
            bowl: [
                { name: "Arshdeep Singh", overs: "4.0", maidens: 0, runs: 46, wkts: 2 },
                { name: "Kuldeep Yadav", overs: "4.0", maidens: 0, runs: 55, wkts: 1 },
                { name: "Blessing Muzarabani", overs: "4.0", maidens: 0, runs: 65, wkts: 1 },
                { name: "Fabian Allen", overs: "4.0", maidens: 0, runs: 30, wkts: 2 },
                { name: "Y Chahal", overs: "4.0", maidens: 0, runs: 41, wkts: 2 }
            ],
            fow: "1-68, 2-92, 3-94, 4-124, 5-135, 6-212, 7-219, 8-234"
        },
        t2Inn: {
            bat: [
                { name: "Josh Inglis", dismissal: "c KOHLI b SANTNER", runs: 21, balls: 12 },
                { name: "Jason Roy", dismissal: "c RAHUL b RABADA", runs: 1, balls: 2 },
                { name: "Arjun Potter", dismissal: "c TAHIR b BOULT", runs: 1, balls: 4 },
                { name: "Joe Denly", dismissal: "lbw BOULT", runs: 0, balls: 1 },
                { name: "Andrew Strauss", dismissal: "c KERR b RAVINDRA", runs: 24, balls: 11 },
                { name: "Rilee Rossouw", dismissal: "c KOHLI b TAHIR", runs: 25, balls: 14 },
                { name: "Arshdeep Singh", dismissal: "c HEALY b TAHIR", runs: 7, balls: 14 },
                { name: "Y Chahal", dismissal: "c HEALY b KERR", runs: 1, balls: 3 },
                { name: "Kuldeep Yadav", dismissal: "b KERR", runs: 0, balls: 1 },
                { name: "Nitish Reddy", dismissal: "c HEALY b RABADA", runs: 6, balls: 4 },
                { name: "Fabian Allen", dismissal: "not out", runs: 11, balls: 4 }
            ],
            bowl: [
                { name: "Trent Boult", overs: "2.0", maidens: 0, runs: 16, wkts: 2 },
                { name: "Kagiso Rabada", overs: "2.4", maidens: 0, runs: 27, wkts: 2 },
                { name: "Mitchell Santner", overs: "2.0", maidens: 0, runs: 18, wkts: 1 },
                { name: "Rachin Ravindra", overs: "1.0", maidens: 0, runs: 13, wkts: 1 },
                { name: "Amelia Kerr", overs: "3.0", maidens: 0, runs: 18, wkts: 2 },
                { name: "Imran Tahir", overs: "1.0", maidens: 0, runs: 5, wkts: 2 }
            ],
            fow: "1-10, 2-15, 3-15, 4-40, 5-60, 6-81, 7-82, 8-82, 9-85, 10-99"
        }
    }
};

season9Results.push(match18Data);

currentHtml = currentHtml.replace(
    /MULTI_DB\.season9\.results = \[[\s\S]*?\];/,
    `MULTI_DB.season9.results = ${JSON.stringify(season9Results)};`
);

fs.writeFileSync('index.html', currentHtml);
console.log("Match 18 (Season 9) data successfully injected into index.html!");
