const fs = require('fs');

let currentHtml = fs.readFileSync('index.html', 'utf8');

const season9ResultsMatch = currentHtml.match(/MULTI_DB\.season9\.results = (\[[\s\S]*?\]);/);
if (!season9ResultsMatch) {
    console.error("Could not find MULTI_DB.season9.results array.");
    process.exit(1);
}

let season9Results = JSON.parse(season9ResultsMatch[1]);

if (season9Results.find(r => r.match === 6)) {
    console.log("Match 6 already exists. Removing it to re-add.");
    season9Results = season9Results.filter(r => r.match !== 6);
}

const match6Data = {
    match: 6,
    team1: "VV",
    team2: "SM",
    venue: "Providence Stadium",
    score1: "132/9",
    overs1: "20.0",
    score2: "134/5",
    overs2: "11.0",
    winner: "SM",
    margin: "5 wickets",
    mom: "Jason Holder (SM) — 3/20 & 9*",
    scorecard: {
        t1Inn: {
            bat: [
                { name: "Rohit Sharma", dismissal: "lbw HOLDER", runs: 29, balls: 9 },
                { name: "KL Rahul", dismissal: "c SAMSON b HOLDER", runs: 8, balls: 7 },
                { name: "Virat Kohli", dismissal: "lbw CURRAN", runs: 7, balls: 4 },
                { name: "Rajat Patidar", dismissal: "lbw CURRAN", runs: 3, balls: 7 },
                { name: "Vivaan Anandabd", dismissal: "c RUSSELL b CURRAN", runs: 10, balls: 7 },
                { name: "Mitchell Santner", dismissal: "c SAMSON b RUSSELL", runs: 19, balls: 21 },
                { name: "Amelia Kerr", dismissal: "b STARC", runs: 2, balls: 5 },
                { name: "Alyssa Healy", dismissal: "not out", runs: 32, balls: 36 },
                { name: "Rachin Ravindra", dismissal: "lbw RUSSELL", runs: 3, balls: 5 },
                { name: "Kagiso Rabada", dismissal: "c SAMSON b HOLDER", runs: 12, balls: 16 },
                { name: "Trent Boult", dismissal: "not out", runs: 1, balls: 3 }
            ],
            bowl: [
                { name: "Mitchell Starc", overs: "4.0", maidens: 0, runs: 38, wkts: 1 },
                { name: "Tom Curran", overs: "4.0", maidens: 0, runs: 25, wkts: 3 },
                { name: "Jason Holder", overs: "4.0", maidens: 0, runs: 20, wkts: 3 },
                { name: "Liam Dawson", overs: "3.0", maidens: 0, runs: 19, wkts: 0 },
                { name: "Andre Russell", overs: "4.0", maidens: 0, runs: 13, wkts: 2 },
                { name: "Sunil Narine", overs: "1.0", maidens: 0, runs: 16, wkts: 0 }
            ],
            fow: "1-35, 2-42, 3-44, 4-55, 5-58, 6-69, 7-90, 8-96, 9-116"
        },
        t2Inn: {
            bat: [
                { name: "Sanju Samson", dismissal: "c HEALY b BOULT", runs: 20, balls: 9 },
                { name: "Yashasvi Jaiswal", dismissal: "lbw KERR", runs: 36, balls: 22 },
                { name: "Gautam Gambhir", dismissal: "not out", runs: 48, balls: 21 },
                { name: "Shreyas Iyer", dismissal: "b KERR", runs: 12, balls: 8 },
                { name: "Shivam Dube", dismissal: "b RAVINDRA", runs: 0, balls: 1 },
                { name: "Andre Russell", dismissal: "run out RAVINDRA", runs: 8, balls: 3 },
                { name: "Jason Holder", dismissal: "not out", runs: 9, balls: 3 },
                { name: "Sunil Narine", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Mitchell Starc", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Liam Dawson", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Tom Curran", dismissal: "did not bat", runs: 0, balls: 0 }
            ],
            bowl: [
                { name: "Trent Boult", overs: "2.0", maidens: 0, runs: 20, wkts: 1 },
                { name: "Kagiso Rabada", overs: "3.0", maidens: 0, runs: 41, wkts: 0 },
                { name: "Amelia Kerr", overs: "4.0", maidens: 0, runs: 43, wkts: 2 },
                { name: "Mitchell Santner", overs: "1.0", maidens: 0, runs: 15, wkts: 0 },
                { name: "Rachin Ravindra", overs: "1.0", maidens: 0, runs: 15, wkts: 1 }
            ],
            fow: "1-30, 2-82, 3-104, 4-111, 5-119"
        }
    }
};

season9Results.push(match6Data);

currentHtml = currentHtml.replace(
    /MULTI_DB\.season9\.results = \[[\s\S]*?\];/,
    `MULTI_DB.season9.results = ${JSON.stringify(season9Results)};`
);

fs.writeFileSync('index.html', currentHtml);
console.log("Match 6 data successfully injected into index.html!");
