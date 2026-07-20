const fs = require('fs');

let currentHtml = fs.readFileSync('index.html', 'utf8');

const season9ResultsMatch = currentHtml.match(/MULTI_DB\.season9\.results = (\[[\s\S]*?\]);/);
if (!season9ResultsMatch) {
    console.error("Could not find MULTI_DB.season9.results array.");
    process.exit(1);
}

let season9Results = JSON.parse(season9ResultsMatch[1]);

if (season9Results.find(r => r.match === 19)) {
    console.log("Match 19 already exists. Removing it to re-add.");
    season9Results = season9Results.filter(r => r.match !== 19);
}

const match19Data = {
    match: 19,
    team1: "GB",
    team2: "VV",
    venue: "Pallekele International Cricket Stadium",
    score1: "164/9",
    overs1: "20.0",
    score2: "117/10",
    overs2: "18.0",
    winner: "GB",
    margin: "47 runs",
    mom: "Bhuvneshwar Kumar (GB) — 5/14",
    scorecard: {
        t1Inn: {
            bat: [
                { name: "Smriti Mandhana", dismissal: "c HEALY b SANTNER", runs: 26, balls: 18 },
                { name: "Ellyse Perry", dismissal: "b SANTNER", runs: 44, balls: 27 },
                { name: "Ishan Kishan", dismissal: "b KERR", runs: 5, balls: 7 },
                { name: "Ravindra Jadeja", dismissal: "c HEALY b BOULT", runs: 1, balls: 4 },
                { name: "Glenn Maxwell", dismissal: "c HEALY b RAVINDRA", runs: 15, balls: 11 },
                { name: "Grant Bauer", dismissal: "lbw RABADA", runs: 33, balls: 18 },
                { name: "Shashank Singh", dismissal: "c HEALY b SANTNER", runs: 26, balls: 16 },
                { name: "Marco Jansen", dismissal: "lbw KERR", runs: 6, balls: 6 },
                { name: "Abhishek Sharma", dismissal: "lbw KERR", runs: 3, balls: 4 },
                { name: "Harbhajan Singh", dismissal: "not out", runs: 1, balls: 3 },
                { name: "Bhuvneshwar Kumar", dismissal: "not out", runs: 2, balls: 6 }
            ],
            bowl: [
                { name: "Trent Boult", overs: "4.0", maidens: 0, runs: 33, wkts: 1 },
                { name: "Kagiso Rabada", overs: "4.0", maidens: 0, runs: 26, wkts: 1 },
                { name: "Mitchell Santner", overs: "4.0", maidens: 0, runs: 26, wkts: 3 },
                { name: "Imran Tahir", overs: "1.0", maidens: 0, runs: 11, wkts: 0 },
                { name: "Amelia Kerr", overs: "4.0", maidens: 0, runs: 47, wkts: 3 },
                { name: "Rachin Ravindra", overs: "3.0", maidens: 0, runs: 19, wkts: 1 }
            ],
            fow: "1-66, 2-71, 3-74, 4-82, 5-95, 6-148, 7-158, 8-161, 9-162"
        },
        t2Inn: {
            bat: [
                { name: "Rohit Sharma", dismissal: "lbw JANSEN", runs: 0, balls: 1 },
                { name: "KL Rahul", dismissal: "c MANDHANA b KUMAR", runs: 2, balls: 3 },
                { name: "Virat Kohli", dismissal: "c KISHAN b JADEJA", runs: 51, balls: 40 },
                { name: "Rajat Patidar", dismissal: "c KISHAN b KUMAR", runs: 0, balls: 1 },
                { name: "Mitchell Santner", dismissal: "b KUMAR", runs: 0, balls: 1 },
                { name: "Rachin Ravindra", dismissal: "b KUMAR", runs: 12, balls: 15 },
                { name: "Vivaan Armstrong", dismissal: "c BAUER b SINGH", runs: 11, balls: 6 },
                { name: "Amelia Kerr", dismissal: "c KISHAN b SINGH", runs: 32, balls: 28 },
                { name: "Alyssa Healy", dismissal: "b JADEJA", runs: 5, balls: 5 },
                { name: "Kagiso Rabada", dismissal: "lbw KUMAR", runs: 3, balls: 7 },
                { name: "Imran Tahir", dismissal: "not out", runs: 0, balls: 1 }
            ],
            bowl: [
                { name: "Marco Jansen", overs: "4.0", maidens: 0, runs: 25, wkts: 1 },
                { name: "Bhuvneshwar Kumar", overs: "4.0", maidens: 0, runs: 14, wkts: 5 },
                { name: "Noor Ahmad", overs: "3.0", maidens: 0, runs: 38, wkts: 0 },
                { name: "Harbhajan Singh", overs: "4.0", maidens: 0, runs: 21, wkts: 2 },
                { name: "Ravindra Jadeja", overs: "3.0", maidens: 0, runs: 18, wkts: 2 }
            ],
            fow: "1-0, 2-4, 3-4, 4-4, 5-32, 6-46, 7-108, 8-114, 9-115, 10-117"
        }
    }
};

season9Results.push(match19Data);

currentHtml = currentHtml.replace(
    /MULTI_DB\.season9\.results = \[[\s\S]*?\];/,
    `MULTI_DB.season9.results = ${JSON.stringify(season9Results)};`
);

fs.writeFileSync('index.html', currentHtml);
console.log("Match 19 (Season 9) data successfully injected into index.html!");
