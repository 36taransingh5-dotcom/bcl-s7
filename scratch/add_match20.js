const fs = require('fs');

let currentHtml = fs.readFileSync('index.html', 'utf8');

const season9ResultsMatch = currentHtml.match(/MULTI_DB\.season9\.results = (\[[\s\S]*?\]);/);
if (!season9ResultsMatch) {
    console.error("Could not find MULTI_DB.season9.results array.");
    process.exit(1);
}

let season9Results = JSON.parse(season9ResultsMatch[1]);

if (season9Results.find(r => r.match === 20)) {
    console.log("Match 20 already exists. Removing it to re-add.");
    season9Results = season9Results.filter(r => r.match !== 20);
}

const match20Data = {
    match: 20,
    team1: "TT",
    team2: "VV",
    venue: "Adelaide Oval",
    score1: "230/7",
    overs1: "20.0",
    score2: "231/5",
    overs2: "19.3",
    winner: "VV",
    margin: "5 wickets",
    mom: "KL Rahul (VV) — 89",
    scorecard: {
        t1Inn: {
            bat: [
                { name: "Tim Seifert", dismissal: "lbw BOULT", runs: 13, balls: 10 },
                { name: "Dewald Brevis", dismissal: "c RABADA b TAHIR", runs: 85, balls: 42 },
                { name: "Trevor Singh", dismissal: "b TAHIR", runs: 13, balls: 8 },
                { name: "Laura Wolvaardt", dismissal: "c HEALY b TAHIR", runs: 30, balls: 13 },
                { name: "Shafali Verma", dismissal: "c HEALY b RABADA", runs: 45, balls: 23 },
                { name: "Aiden Markram", dismissal: "c HEALY b RABADA", runs: 21, balls: 11 },
                { name: "Jordan Hermann", dismissal: "not out", runs: 8, balls: 7 },
                { name: "Hardik Pandya", dismissal: "b RAVINDRA", runs: 8, balls: 4 },
                { name: "Ravi Shastri", dismissal: "not out", runs: 3, balls: 2 },
                { name: "Mitchell Johnson", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Megan Schutt", dismissal: "did not bat", runs: 0, balls: 0 }
            ],
            bowl: [
                { name: "Trent Boult", overs: "4.0", maidens: 0, runs: 38, wkts: 1 },
                { name: "Kagiso Rabada", overs: "4.0", maidens: 0, runs: 51, wkts: 2 },
                { name: "Mitchell Santner", overs: "2.0", maidens: 0, runs: 27, wkts: 0 },
                { name: "Amelia Kerr", overs: "4.0", maidens: 0, runs: 46, wkts: 0 },
                { name: "Imran Tahir", overs: "4.0", maidens: 0, runs: 43, wkts: 3 },
                { name: "Rachin Ravindra", overs: "2.0", maidens: 0, runs: 21, wkts: 1 }
            ],
            fow: "1-52, 2-89, 3-130, 4-166, 5-207, 6-214, 7-224"
        },
        t2Inn: {
            bat: [
                { name: "Rohit Sharma", dismissal: "c & b JOHNSON", runs: 0, balls: 1 },
                { name: "KL Rahul", dismissal: "c SEIFERT b KING", runs: 89, balls: 40 },
                { name: "Virat Kohli", dismissal: "c PANDYA b JOHNSON", runs: 0, balls: 2 },
                { name: "Rajat Patidar", dismissal: "c SINGH b JOHNSON", runs: 4, balls: 5 },
                { name: "Mitchell Santner", dismissal: "not out", runs: 77, balls: 50 },
                { name: "Vivaan Armstrong", dismissal: "c HERMANN b SINGH", runs: 10, balls: 7 },
                { name: "Alyssa Healy", dismissal: "not out", runs: 36, balls: 12 },
                { name: "Amelia Kerr", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Kagiso Rabada", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Imran Tahir", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Rachin Ravindra", dismissal: "did not bat", runs: 0, balls: 0 }
            ],
            bowl: [
                { name: "Mitchell Johnson", overs: "4.0", maidens: 0, runs: 38, wkts: 3 },
                { name: "Megan Schutt", overs: "4.0", maidens: 0, runs: 39, wkts: 0 },
                { name: "Hardik Pandya", overs: "4.0", maidens: 0, runs: 65, wkts: 0 },
                { name: "Alana King", overs: "4.0", maidens: 0, runs: 44, wkts: 1 },
                { name: "Trevor Singh", overs: "3.3", maidens: 0, runs: 45, wkts: 1 }
            ],
            fow: "1-0, 2-0, 3-12, 4-154, 5-175"
        }
    }
};

season9Results.push(match20Data);

currentHtml = currentHtml.replace(
    /MULTI_DB\.season9\.results = \[[\s\S]*?\];/,
    `MULTI_DB.season9.results = ${JSON.stringify(season9Results)};`
);

fs.writeFileSync('index.html', currentHtml);
console.log("Match 20 (Season 9) data successfully injected into index.html!");
