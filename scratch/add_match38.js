const fs = require('fs');

let currentHtml = fs.readFileSync('index.html', 'utf8');

const season9ResultsMatch = currentHtml.match(/MULTI_DB\.season9\.results = (\[[\s\S]*?\]);/);
if (!season9ResultsMatch) {
    console.error("Could not find MULTI_DB.season9.results array.");
    process.exit(1);
}

let season9Results = JSON.parse(season9ResultsMatch[1]);

if (season9Results.find(r => r.match === 38)) {
    console.log("Match 38 already exists. Removing it to re-add.");
    season9Results = season9Results.filter(r => r.match !== 38);
}

const match38Data = {
    match: 38,
    team1: "GB",
    team2: "AS",
    venue: "Eden Gardens",
    score1: "224/7",
    overs1: "20.0",
    score2: "109/10",
    overs2: "12.1",
    winner: "GB",
    margin: "115 runs",
    mom: "Marco Jansen (GB) — 5/27",
    scorecard: {
        t1Inn: {
            bat: [
                { name: "Smriti Mandhana", dismissal: "c INGLIS b KRISHNA", runs: 4, balls: 4 },
                { name: "Ishan Kishan", dismissal: "c YADAV b KRISHNA", runs: 22, balls: 11 },
                { name: "Ellyse Perry", dismissal: "c YADAV b KRISHNA", runs: 21, balls: 11 },
                { name: "Harmanpreet Kaur", dismissal: "b ALLEN", runs: 58, balls: 36 },
                { name: "Glenn Maxwell", dismissal: "c POTTER b ALLEN", runs: 29, balls: 14 },
                { name: "Grant Bauer", dismissal: "c INGLIS b YADAV", runs: 5, balls: 3 },
                { name: "Ravindra Jadeja", dismissal: "c INGLIS b ALLEN", runs: 14, balls: 10 },
                { name: "Shashank Singh", dismissal: "not out", runs: 57, balls: 24 },
                { name: "Marco Jansen", dismissal: "not out", runs: 12, balls: 8 },
                { name: "Noor Ahmad", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Bhuvneshwar Kumar", dismissal: "did not bat", runs: 0, balls: 0 }
            ],
            bowl: [
                { name: "Arshdeep Singh", overs: "4.0", maidens: 0, runs: 46, wkts: 0 },
                { name: "Prasidh Krishna", overs: "4.0", maidens: 0, runs: 41, wkts: 3 },
                { name: "Fabian Allen", overs: "4.0", maidens: 0, runs: 39, wkts: 3 },
                { name: "Y Chahal", overs: "4.0", maidens: 0, runs: 51, wkts: 0 },
                { name: "Kuldeep Yadav", overs: "4.0", maidens: 0, runs: 46, wkts: 1 }
            ],
            fow: "1-11, 2-30, 3-63, 4-128, 5-135, 6-147, 7-177"
        },
        t2Inn: {
            bat: [
                { name: "Jason Roy", dismissal: "b KUMAR", runs: 2, balls: 5 },
                { name: "Josh Inglis", dismissal: "c KISHAN b JANSEN", runs: 16, balls: 15 },
                { name: "Arjun Potter", dismissal: "c SINGH b JADEJA", runs: 25, balls: 17 },
                { name: "Andrew Strauss", dismissal: "lbw JANSEN", runs: 2, balls: 2 },
                { name: "Joe Denly", dismissal: "c & b JANSEN", runs: 0, balls: 1 },
                { name: "Nitish Reddy", dismissal: "c KISHAN b JANSEN", runs: 52, balls: 17 },
                { name: "Arshdeep Singh", dismissal: "c KUMAR b JADEJA", runs: 2, balls: 6 },
                { name: "Y Chahal", dismissal: "b JADEJA", runs: 3, balls: 6 },
                { name: "Kuldeep Yadav", dismissal: "lbw JADEJA", runs: 0, balls: 1 },
                { name: "Fabian Allen", dismissal: "c KISHAN b JANSEN", runs: 2, balls: 2 },
                { name: "Prasidh Krishna", dismissal: "not out", runs: 1, balls: 1 }
            ],
            bowl: [
                { name: "Bhuvneshwar Kumar", overs: "3.0", maidens: 0, runs: 26, wkts: 1 },
                { name: "Marco Jansen", overs: "4.0", maidens: 0, runs: 27, wkts: 5 },
                { name: "Noor Ahmad", overs: "2.0", maidens: 0, runs: 32, wkts: 0 },
                { name: "Harbhajan Singh", overs: "2.0", maidens: 0, runs: 18, wkts: 0 },
                { name: "Ravindra Jadeja", overs: "1.1", maidens: 0, runs: 2, wkts: 4 }
            ],
            fow: "1-18, 2-18, 3-20, 4-20, 5-99, 6-103, 7-104, 8-104, 9-107, 10-109"
        }
    }
};

season9Results.push(match38Data);

currentHtml = currentHtml.replace(
    /MULTI_DB\.season9\.results = \[[\s\S]*?\];/,
    `MULTI_DB.season9.results = ${JSON.stringify(season9Results)};`
);

fs.writeFileSync('index.html', currentHtml);
console.log("Match 38 (Season 9) data successfully injected into index.html!");
