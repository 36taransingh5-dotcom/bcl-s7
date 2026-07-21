const fs = require('fs');

let currentHtml = fs.readFileSync('index.html', 'utf8');

const season9ResultsMatch = currentHtml.match(/MULTI_DB\.season9\.results = (\[[\s\S]*?\]);/);
if (!season9ResultsMatch) {
    console.error("Could not find MULTI_DB.season9.results array.");
    process.exit(1);
}

let season9Results = JSON.parse(season9ResultsMatch[1]);

if (season9Results.find(r => r.match === 31)) {
    console.log("Match 31 already exists. Removing it to re-add.");
    season9Results = season9Results.filter(r => r.match !== 31);
}

const match31Data = {
    match: 31,
    team1: "VV",
    team2: "GB",
    venue: "Chinnaswammy",
    score1: "171/10",
    overs1: "19.3",
    score2: "172/7",
    overs2: "19.2",
    winner: "GB",
    margin: "3 wickets",
    mom: "Ravindra Jadeja (GB) — 4 wkts",
    scorecard: {
        t1Inn: {
            bat: [
                { name: "Rohit Sharma", dismissal: "c & b KUMAR", runs: 43, balls: 16 },
                { name: "KL Rahul", dismissal: "b JANSEN", runs: 13, balls: 10 },
                { name: "Virat Kohli", dismissal: "lbw JADEJA", runs: 23, balls: 24 },
                { name: "Rajat Patidar", dismissal: "b AHMAD", runs: 8, balls: 5 },
                { name: "Vivaan Armstrong", dismissal: "b SINGH", runs: 8, balls: 4 },
                { name: "Mitchell Santner", dismissal: "c KISHAN b JADEJA", runs: 9, balls: 14 },
                { name: "Amelia Kerr", dismissal: "lbw JADEJA", runs: 21, balls: 19 },
                { name: "Alyssa Healy", dismissal: "b JADEJA", runs: 21, balls: 13 },
                { name: "Rachin Ravindra", dismissal: "c KISHAN b JANSEN", runs: 23, balls: 10 },
                { name: "Kagiso Rabada", dismissal: "lbw KUMAR", runs: 0, balls: 1 },
                { name: "Trent Boult", dismissal: "not out", runs: 0, balls: 1 }
            ],
            bowl: [
                { name: "Bhuvneshwar Kumar", overs: "4.0", maidens: 0, runs: 45, wkts: 2 },
                { name: "Marco Jansen", overs: "3.3", maidens: 0, runs: 43, wkts: 2 },
                { name: "Noor Ahmad", overs: "4.0", maidens: 0, runs: 28, wkts: 1 },
                { name: "Harbhajan Singh", overs: "4.0", maidens: 0, runs: 24, wkts: 1 },
                { name: "Ravindra Jadeja", overs: "4.0", maidens: 0, runs: 29, wkts: 4 }
            ],
            fow: "1-56, 2-56, 3-67, 4-76, 5-103, 6-116, 7-131, 8-154, 9-167, 10-171"
        },
        t2Inn: {
            bat: [
                { name: "Smriti Mandhana", dismissal: "c HEALY b RABADA", runs: 16, balls: 11 },
                { name: "Ishan Kishan", dismissal: "b RAVINDRA", runs: 11, balls: 13 },
                { name: "Ellyse Perry", dismissal: "b SANTNER", runs: 4, balls: 5 },
                { name: "Glenn Maxwell", dismissal: "lbw KERR", runs: 15, balls: 9 },
                { name: "Harmanpreet Kaur", dismissal: "c ARMSTRONG b BOULT", runs: 27, balls: 18 },
                { name: "Ravindra Jadeja", dismissal: "c HEALY b KERR", runs: 0, balls: 2 },
                { name: "Grant Bauer", dismissal: "c HEALY b SANTNER", runs: 66, balls: 43 },
                { name: "Shashank Singh", dismissal: "not out", runs: 13, balls: 11 },
                { name: "Marco Jansen", dismissal: "not out", runs: 16, balls: 4 },
                { name: "Noor Ahmad", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Bhuvneshwar Kumar", dismissal: "did not bat", runs: 0, balls: 0 }
            ],
            bowl: [
                { name: "Trent Boult", overs: "4.0", maidens: 0, runs: 23, wkts: 1 },
                { name: "Kagiso Rabada", overs: "4.0", maidens: 0, runs: 33, wkts: 1 },
                { name: "Mitchell Santner", overs: "4.0", maidens: 0, runs: 45, wkts: 2 },
                { name: "Rachin Ravindra", overs: "1.2", maidens: 0, runs: 9, wkts: 1 },
                { name: "Amelia Kerr", overs: "4.0", maidens: 0, runs: 40, wkts: 2 },
                { name: "Imran Tahir", overs: "2.0", maidens: 0, runs: 18, wkts: 0 }
            ],
            fow: "1-27, 2-32, 3-34, 4-63, 5-63, 6-119, 7-154"
        }
    }
};

season9Results.push(match31Data);

currentHtml = currentHtml.replace(
    /MULTI_DB\.season9\.results = \[[\s\S]*?\];/,
    `MULTI_DB.season9.results = ${JSON.stringify(season9Results)};`
);

fs.writeFileSync('index.html', currentHtml);
console.log("Match 31 (Season 9) data successfully injected into index.html!");
