const fs = require('fs');

let currentHtml = fs.readFileSync('index.html', 'utf8');

const season9ResultsMatch = currentHtml.match(/MULTI_DB\.season9\.results = (\[[\s\S]*?\]);/);
if (!season9ResultsMatch) {
    console.error("Could not find MULTI_DB.season9.results array.");
    process.exit(1);
}

let season9Results = JSON.parse(season9ResultsMatch[1]);

if (season9Results.find(r => r.match === 57)) {
    console.log("Match 57 already exists. Removing it to re-add.");
    season9Results = season9Results.filter(r => r.match !== 57);
}

const match57Data = {
    match: 57,
    team1: "GB",
    team2: "VV",
    venue: "Kabul International Stadium",
    score1: "210/6",
    overs1: "20.0",
    score2: "211/8",
    overs2: "19.4",
    winner: "VV",
    margin: "2 wickets",
    mom: "Joe Root (VV) — 48",
    scorecard: {
        t1Inn: {
            bat: [
                { name: "Smriti Mandhana", dismissal: "b SANTNER", runs: 12, balls: 14 },
                { name: "Ishan Kishan", dismissal: "b RABADA", runs: 8, balls: 6 },
                { name: "Ellyse Perry", dismissal: "b TAHIR", runs: 75, balls: 42 },
                { name: "Glenn Maxwell", dismissal: "c TAHIR b SANTNER", runs: 36, balls: 22 },
                { name: "Harmanpreet Kaur", dismissal: "b RABADA", runs: 19, balls: 13 },
                { name: "Grant Bauer", dismissal: "b TAHIR", runs: 0, balls: 2 },
                { name: "Ravindra Jadeja", dismissal: "not out", runs: 30, balls: 11 },
                { name: "Shashank Singh", dismissal: "not out", runs: 23, balls: 11 },
                { name: "Marco Jansen", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Noor Ahmad", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Bhuvneshwar Kumar", dismissal: "did not bat", runs: 0, balls: 0 }
            ],
            bowl: [
                { name: "Trent Boult", overs: "4.0", maidens: 0, runs: 34, wkts: 0 },
                { name: "Kagiso Rabada", overs: "4.0", maidens: 0, runs: 34, wkts: 2 },
                { name: "Mitchell Santner", overs: "4.0", maidens: 0, runs: 31, wkts: 2 },
                { name: "Amelia Kerr", overs: "4.0", maidens: 0, runs: 48, wkts: 0 },
                { name: "Imran Tahir", overs: "4.0", maidens: 0, runs: 58, wkts: 2 }
            ],
            fow: "1-16, 2-34, 3-103, 4-148, 5-148, 6-160"
        },
        t2Inn: {
            bat: [
                { name: "Rohit Sharma", dismissal: "c SINGH b KUMAR", runs: 10, balls: 8 },
                { name: "KL Rahul", dismissal: "c PERRY b KUMAR", runs: 16, balls: 14 },
                { name: "Virat Kohli", dismissal: "c KISHAN b AHMAD", runs: 7, balls: 10 },
                { name: "Rajat Patidar", dismissal: "lbw AHMAD", runs: 27, balls: 13 },
                { name: "Mitchell Santner", dismissal: "b SINGH", runs: 2, balls: 4 },
                { name: "Vivaan Anandabd", dismissal: "c KISHAN b JANSEN", runs: 48, balls: 26 },
                { name: "Joe Root", dismissal: "lbw JADEJA", runs: 48, balls: 21 },
                { name: "Alyssa Healy", dismissal: "c BAUER b KUMAR", runs: 32, balls: 12 },
                { name: "Amelia Kerr", dismissal: "not out", runs: 15, balls: 10 },
                { name: "Kagiso Rabada", dismissal: "not out", runs: 0, balls: 0 },
                { name: "Trent Boult", dismissal: "did not bat", runs: 0, balls: 0 }
            ],
            bowl: [
                { name: "Bhuvneshwar Kumar", overs: "4.0", maidens: 0, runs: 42, wkts: 3 },
                { name: "Marco Jansen", overs: "4.0", maidens: 0, runs: 34, wkts: 1 },
                { name: "Harbhajan Singh", overs: "4.0", maidens: 0, runs: 42, wkts: 1 },
                { name: "Noor Ahmad", overs: "4.0", maidens: 0, runs: 45, wkts: 2 },
                { name: "Ravindra Jadeja", overs: "3.4", maidens: 0, runs: 42, wkts: 1 }
            ],
            fow: "1-20, 2-31, 3-50, 4-61, 5-75, 6-153, 7-165, 8-202"
        }
    }
};

season9Results.push(match57Data);

currentHtml = currentHtml.replace(
    /MULTI_DB\.season9\.results = \[[\s\S]*?\];/,
    `MULTI_DB.season9.results = ${JSON.stringify(season9Results)};`
);

fs.writeFileSync('index.html', currentHtml);
console.log("Match 57 (Qualifier 1, Season 9) data successfully injected into index.html!");
