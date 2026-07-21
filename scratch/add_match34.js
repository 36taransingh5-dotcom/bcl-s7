const fs = require('fs');

let currentHtml = fs.readFileSync('index.html', 'utf8');

const season9ResultsMatch = currentHtml.match(/MULTI_DB\.season9\.results = (\[[\s\S]*?\]);/);
if (!season9ResultsMatch) {
    console.error("Could not find MULTI_DB.season9.results array.");
    process.exit(1);
}

let season9Results = JSON.parse(season9ResultsMatch[1]);

if (season9Results.find(r => r.match === 34)) {
    console.log("Match 34 already exists. Removing it to re-add.");
    season9Results = season9Results.filter(r => r.match !== 34);
}

const match34Data = {
    match: 34,
    team1: "AS",
    team2: "GB",
    venue: "Bellerive Oval",
    score1: "215/6",
    overs1: "20.0",
    score2: "127/10",
    overs2: "15.1",
    winner: "AS",
    margin: "88 runs",
    mom: "Josh Inglis (AS) — 75",
    scorecard: {
        t1Inn: {
            bat: [
                { name: "Josh Inglis", dismissal: "b SINGH", runs: 75, balls: 45 },
                { name: "Jason Roy", dismissal: "b AHMAD", runs: 47, balls: 20 },
                { name: "Andrew Strauss", dismissal: "lbw KUMAR", runs: 67, balls: 35 },
                { name: "Joe Denly", dismissal: "c KISHAN b KUMAR", runs: 10, balls: 6 },
                { name: "Rilee Rossouw", dismissal: "b JANSEN", runs: 4, balls: 4 },
                { name: "Arjun Potter", dismissal: "c KISHAN b KUMAR", runs: 3, balls: 4 },
                { name: "Nitish Reddy", dismissal: "not out", runs: 6, balls: 6 },
                { name: "Fabian Allen", dismissal: "not out", runs: 1, balls: 1 },
                { name: "Arshdeep Singh", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Y Chahal", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Kuldeep Yadav", dismissal: "did not bat", runs: 0, balls: 0 }
            ],
            bowl: [
                { name: "Marco Jansen", overs: "4.0", maidens: 0, runs: 44, wkts: 1 },
                { name: "Bhuvneshwar Kumar", overs: "4.0", maidens: 0, runs: 43, wkts: 3 },
                { name: "Noor Ahmad", overs: "4.0", maidens: 0, runs: 15, wkts: 1 },
                { name: "Harbhajan Singh", overs: "4.0", maidens: 0, runs: 60, wkts: 1 },
                { name: "Ravindra Jadeja", overs: "4.0", maidens: 0, runs: 53, wkts: 0 }
            ],
            fow: "1-72, 2-153, 3-199, 4-202, 5-206, 6-212"
        },
        t2Inn: {
            bat: [
                { name: "Smriti Mandhana", dismissal: "c & b MUZARABANI", runs: 18, balls: 7 },
                { name: "Ishan Kishan", dismissal: "c INGLIS b SINGH", runs: 5, balls: 5 },
                { name: "Ellyse Perry", dismissal: "c ALLEN b MUZARABANI", runs: 5, balls: 6 },
                { name: "Glenn Maxwell", dismissal: "c INGLIS b ALLEN", runs: 6, balls: 5 },
                { name: "Abhishek Sharma", dismissal: "c MUZARABANI b ALLEN", runs: 7, balls: 6 },
                { name: "Ravindra Jadeja", dismissal: "c INGLIS b ALLEN", runs: 17, balls: 9 },
                { name: "Grant Bauer", dismissal: "c INGLIS b CHAHAL", runs: 24, balls: 15 },
                { name: "Shashank Singh", dismissal: "c INGLIS b CHAHAL", runs: 12, balls: 10 },
                { name: "Marco Jansen", dismissal: "c INGLIS b YADAV", runs: 28, balls: 18 },
                { name: "Harbhajan Singh", dismissal: "c INGLIS b MUZARABANI", runs: 2, balls: 6 },
                { name: "Bhuvneshwar Kumar", dismissal: "not out", runs: 0, balls: 4 }
            ],
            bowl: [
                { name: "Arshdeep Singh", overs: "2.0", maidens: 0, runs: 22, wkts: 1 },
                { name: "Blessing Muzarabani", overs: "4.0", maidens: 0, runs: 21, wkts: 3 },
                { name: "Fabian Allen", overs: "4.0", maidens: 0, runs: 40, wkts: 3 },
                { name: "Y Chahal", overs: "4.0", maidens: 0, runs: 24, wkts: 2 },
                { name: "Kuldeep Yadav", overs: "1.1", maidens: 0, runs: 18, wkts: 1 }
            ],
            fow: "1-19, 2-25, 3-29, 4-42, 5-43, 6-62, 7-89, 8-110, 9-127, 10-127"
        }
    }
};

season9Results.push(match34Data);

currentHtml = currentHtml.replace(
    /MULTI_DB\.season9\.results = \[[\s\S]*?\];/,
    `MULTI_DB.season9.results = ${JSON.stringify(season9Results)};`
);

fs.writeFileSync('index.html', currentHtml);
console.log("Match 34 (Season 9) data successfully injected into index.html!");
