const fs = require('fs');

let currentHtml = fs.readFileSync('index.html', 'utf8');

const season9ResultsMatch = currentHtml.match(/MULTI_DB\.season9\.results = (\[[\s\S]*?\]);/);
if (!season9ResultsMatch) {
    console.error("Could not find MULTI_DB.season9.results array.");
    process.exit(1);
}

let season9Results = JSON.parse(season9ResultsMatch[1]);

if (season9Results.find(r => r.match === 24)) {
    console.log("Match 24 already exists. Removing it to re-add.");
    season9Results = season9Results.filter(r => r.match !== 24);
}

const match24Data = {
    match: 24,
    team1: "TT",
    team2: "GB",
    venue: "Pallekele International Cricket Stadium",
    score1: "197/8",
    overs1: "20.0",
    score2: "215/7",
    overs2: "20.0",
    winner: "GB",
    margin: "3 wickets",
    mom: "Glenn Maxwell (GB) — 54*",
    scorecard: {
        t1Inn: {
            bat: [
                { name: "Tim Seifert", dismissal: "b SINGH", runs: 36, balls: 25 },
                { name: "Dewald Brevis", dismissal: "b JADEJA", runs: 58, balls: 36 },
                { name: "Trevor Singh", dismissal: "c SINGH b AHMAD", runs: 12, balls: 4 },
                { name: "Laura Wolvaardt", dismissal: "c SINGH b JADEJA", runs: 4, balls: 4 },
                { name: "Shafali Verma", dismissal: "lbw JADEJA", runs: 29, balls: 21 },
                { name: "Aiden Markram", dismissal: "c MANDHANA b SINGH", runs: 30, balls: 13 },
                { name: "Hardik Pandya", dismissal: "c KISHAN b JANSEN", runs: 9, balls: 6 },
                { name: "Jordan Hermann", dismissal: "not out", runs: 10, balls: 8 },
                { name: "Ravi Shastri", dismissal: "c JADEJA b KUMAR", runs: 6, balls: 3 },
                { name: "Mitchell Johnson", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Megan Schutt", dismissal: "did not bat", runs: 0, balls: 0 }
            ],
            bowl: [
                { name: "Bhuvneshwar Kumar", overs: "4.0", maidens: 0, runs: 37, wkts: 1 },
                { name: "Marco Jansen", overs: "4.0", maidens: 0, runs: 41, wkts: 1 },
                { name: "Noor Ahmad", overs: "4.0", maidens: 0, runs: 32, wkts: 1 },
                { name: "Harbhajan Singh", overs: "4.0", maidens: 0, runs: 48, wkts: 2 },
                { name: "Ravindra Jadeja", overs: "4.0", maidens: 0, runs: 36, wkts: 3 }
            ],
            fow: "1-82, 2-97, 3-102, 4-119, 5-166, 6-174, 7-186, 8-197"
        },
        t2Inn: {
            bat: [
                { name: "Ishan Kishan", dismissal: "lbw SCHUTT", runs: 50, balls: 22 },
                { name: "Grant Bauer", dismissal: "b JOHNSON", runs: 11, balls: 7 },
                { name: "Ravindra Jadeja", dismissal: "c SEIFERT b JOHNSON", runs: 1, balls: 2 },
                { name: "Smriti Mandhana", dismissal: "lbw PANDYA", runs: 33, balls: 23 },
                { name: "Ellyse Perry", dismissal: "b KING", runs: 1, balls: 2 },
                { name: "Glenn Maxwell", dismissal: "not out", runs: 54, balls: 32 },
                { name: "Abhishek Sharma", dismissal: "c SEIFERT b SCHUTT", runs: 39, balls: 24 },
                { name: "Shashank Singh", dismissal: "c BREVIS b SINGH", runs: 13, balls: 6 },
                { name: "Marco Jansen", dismissal: "not out", runs: 10, balls: 3 },
                { name: "Noor Ahmad", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Bhuvneshwar Kumar", dismissal: "did not bat", runs: 0, balls: 0 }
            ],
            bowl: [
                { name: "Mitchell Johnson", overs: "4.0", maidens: 0, runs: 35, wkts: 2 },
                { name: "Trevor Singh", overs: "3.0", maidens: 0, runs: 44, wkts: 1 },
                { name: "Megan Schutt", overs: "4.0", maidens: 0, runs: 36, wkts: 2 },
                { name: "Hardik Pandya", overs: "4.0", maidens: 0, runs: 45, wkts: 1 },
                { name: "Alana King", overs: "4.0", maidens: 0, runs: 35, wkts: 1 },
                { name: "Ravi Shastri", overs: "1.0", maidens: 0, runs: 18, wkts: 0 }
            ],
            fow: "1-25, 2-31, 3-83, 4-92, 5-100, 6-183, 7-205"
        }
    }
};

season9Results.push(match24Data);

currentHtml = currentHtml.replace(
    /MULTI_DB\.season9\.results = \[[\s\S]*?\];/,
    `MULTI_DB.season9.results = ${JSON.stringify(season9Results)};`
);

fs.writeFileSync('index.html', currentHtml);
console.log("Match 24 (Season 9) data successfully injected into index.html!");
