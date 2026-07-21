const fs = require('fs');

let currentHtml = fs.readFileSync('index.html', 'utf8');

const season9ResultsMatch = currentHtml.match(/MULTI_DB\.season9\.results = (\[[\s\S]*?\]);/);
if (!season9ResultsMatch) {
    console.error("Could not find MULTI_DB.season9.results array.");
    process.exit(1);
}

let season9Results = JSON.parse(season9ResultsMatch[1]);

if (season9Results.find(r => r.match === 37)) {
    console.log("Match 37 already exists. Removing it to re-add.");
    season9Results = season9Results.filter(r => r.match !== 37);
}

const match37Data = {
    match: 37,
    team1: "VV",
    team2: "SM",
    venue: "Sydney Cricket Ground",
    score1: "172/9",
    overs1: "20.0",
    score2: "174/6",
    overs2: "18.0",
    winner: "SM",
    margin: "4 wickets",
    mom: "Jason Holder (SM) — 87",
    scorecard: {
        t1Inn: {
            bat: [
                { name: "Rohit Sharma", dismissal: "b DAWSON", runs: 22, balls: 20 },
                { name: "KL Rahul", dismissal: "b STARC", runs: 13, balls: 12 },
                { name: "Virat Kohli", dismissal: "b HOLDER", runs: 48, balls: 24 },
                { name: "Rajat Patidar", dismissal: "lbw DAWSON", runs: 8, balls: 4 },
                { name: "Vivaan Armstrong", dismissal: "b DAWSON", runs: 30, balls: 17 },
                { name: "Amelia Kerr", dismissal: "lbw DAWSON", runs: 21, balls: 13 },
                { name: "Alyssa Healy", dismissal: "lbw STARC", runs: 4, balls: 8 },
                { name: "Mitchell Santner", dismissal: "b NARINE", runs: 0, balls: 2 },
                { name: "Rachin Ravindra", dismissal: "b STARC", runs: 17, balls: 8 },
                { name: "Kagiso Rabada", dismissal: "not out", runs: 4, balls: 6 },
                { name: "Trent Boult", dismissal: "not out", runs: 3, balls: 7 }
            ],
            bowl: [
                { name: "Sunil Narine", overs: "4.0", maidens: 0, runs: 36, wkts: 1 },
                { name: "Mitchell Starc", overs: "4.0", maidens: 0, runs: 30, wkts: 3 },
                { name: "Andre Russell", overs: "3.0", maidens: 0, runs: 23, wkts: 0 },
                { name: "Jason Holder", overs: "4.0", maidens: 0, runs: 33, wkts: 1 },
                { name: "Liam Dawson", overs: "4.0", maidens: 0, runs: 31, wkts: 4 },
                { name: "Tom Curran", overs: "1.0", maidens: 0, runs: 18, wkts: 0 }
            ],
            fow: "1-27, 2-77, 3-93, 4-99, 5-144, 6-145, 7-148, 8-158, 9-166"
        },
        t2Inn: {
            bat: [
                { name: "Sanju Samson", dismissal: "lbw RABADA", runs: 2, balls: 4 },
                { name: "Yashasvi Jaiswal", dismissal: "c & b BOULT", runs: 6, balls: 3 },
                { name: "Gautam Gambhir", dismissal: "c RAHUL b RABADA", runs: 2, balls: 2 },
                { name: "Jason Holder", dismissal: "lbw KERR", runs: 87, balls: 58 },
                { name: "Sunil Narine", dismissal: "c & b SANTNER", runs: 23, balls: 19 },
                { name: "Shivam Dube", dismissal: "c & b KERR", runs: 6, balls: 7 },
                { name: "Andre Russell", dismissal: "not out", runs: 43, balls: 16 },
                { name: "Shreyas Iyer", dismissal: "not out", runs: 0, balls: 1 },
                { name: "Mitchell Starc", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Liam Dawson", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Tom Curran", dismissal: "did not bat", runs: 0, balls: 0 }
            ],
            bowl: [
                { name: "Trent Boult", overs: "4.0", maidens: 0, runs: 33, wkts: 1 },
                { name: "Kagiso Rabada", overs: "4.0", maidens: 0, runs: 27, wkts: 2 },
                { name: "Mitchell Santner", overs: "3.0", maidens: 0, runs: 48, wkts: 1 },
                { name: "Imran Tahir", overs: "2.0", maidens: 0, runs: 19, wkts: 0 },
                { name: "Amelia Kerr", overs: "4.0", maidens: 0, runs: 34, wkts: 2 },
                { name: "Rachin Ravindra", overs: "1.0", maidens: 0, runs: 10, wkts: 0 }
            ],
            fow: "1-9, 2-9, 3-12, 4-83, 5-112, 6-150"
        }
    }
};

season9Results.push(match37Data);

currentHtml = currentHtml.replace(
    /MULTI_DB\.season9\.results = \[[\s\S]*?\];/,
    `MULTI_DB.season9.results = ${JSON.stringify(season9Results)};`
);

fs.writeFileSync('index.html', currentHtml);
console.log("Match 37 (Season 9) data successfully injected into index.html!");
