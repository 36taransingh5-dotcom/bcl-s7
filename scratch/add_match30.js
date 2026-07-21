const fs = require('fs');

let currentHtml = fs.readFileSync('index.html', 'utf8');

const season9ResultsMatch = currentHtml.match(/MULTI_DB\.season9\.results = (\[[\s\S]*?\]);/);
if (!season9ResultsMatch) {
    console.error("Could not find MULTI_DB.season9.results array.");
    process.exit(1);
}

let season9Results = JSON.parse(season9ResultsMatch[1]);

if (season9Results.find(r => r.match === 30)) {
    console.log("Match 30 already exists. Removing it to re-add.");
    season9Results = season9Results.filter(r => r.match !== 30);
}

const match30Data = {
    match: 30,
    team1: "GB",
    team2: "HH",
    venue: "Basin Reserve",
    score1: "239/6",
    overs1: "20.0",
    score2: "122/10",
    overs2: "16.3",
    winner: "GB",
    margin: "117 runs",
    mom: "Noor Ahmad (GB) — 5/32",
    scorecard: {
        t1Inn: {
            bat: [
                { name: "Smriti Mandhana", dismissal: "b HAZLEWOOD", runs: 0, balls: 4 },
                { name: "Ishan Kishan", dismissal: "not out", runs: 97, balls: 49 },
                { name: "Ellyse Perry", dismissal: "lbw HAZLEWOOD", runs: 20, balls: 11 },
                { name: "Glenn Maxwell", dismissal: "b PANDYA", runs: 6, balls: 5 },
                { name: "Harmanpreet Kaur", dismissal: "b PANDYA", runs: 18, balls: 11 },
                { name: "Ravindra Jadeja", dismissal: "c SWEPSON b PANDYA", runs: 6, balls: 3 },
                { name: "Grant Bauer", dismissal: "c HAZLEWOOD b JONASSEN", runs: 67, balls: 33 },
                { name: "Shashank Singh", dismissal: "not out", runs: 16, balls: 4 },
                { name: "Marco Jansen", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Noor Ahmad", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Bhuvneshwar Kumar", dismissal: "did not bat", runs: 0, balls: 0 }
            ],
            bowl: [
                { name: "Josh Hazlewood", overs: "4.0", maidens: 0, runs: 10, wkts: 2 },
                { name: "Jess Jonassen", overs: "4.0", maidens: 0, runs: 68, wkts: 1 },
                { name: "Krunal Pandya", overs: "4.0", maidens: 0, runs: 33, wkts: 3 },
                { name: "Mitchell Swepson", overs: "4.0", maidens: 0, runs: 69, wkts: 0 },
                { name: "Axar Patel", overs: "4.0", maidens: 0, runs: 55, wkts: 0 }
            ],
            fow: "1-0, 2-20, 3-35, 4-59, 5-65, 6-193"
        },
        t2Inn: {
            bat: [
                { name: "Shikhar Dhawan", dismissal: "c AHMAD b KUMAR", runs: 8, balls: 6 },
                { name: "Sai Sudharsan", dismissal: "c KISHAN b AHMAD", runs: 67, balls: 36 },
                { name: "Suryakumar Yadav", dismissal: "lbw KUMAR", runs: 0, balls: 1 },
                { name: "Steve Smith", dismissal: "c MANDHANA b KUMAR", runs: 0, balls: 2 },
                { name: "Krunal Pandya", dismissal: "lbw JANSEN", runs: 1, balls: 2 },
                { name: "Ryan Rickelton", dismissal: "c KISHAN b AHMAD", runs: 7, balls: 9 },
                { name: "Shubman Gill", dismissal: "c KAUR b AHMAD", runs: 0, balls: 1 },
                { name: "Axar Patel", dismissal: "b AHMAD", runs: 10, balls: 11 },
                { name: "Heinrich Klaasen", dismissal: "b AHMAD", runs: 11, balls: 8 },
                { name: "Jess Jonassen", dismissal: "b JADEJA", runs: 8, balls: 11 },
                { name: "Josh Hazlewood", dismissal: "not out", runs: 4, balls: 12 }
            ],
            bowl: [
                { name: "Bhuvneshwar Kumar", overs: "4.0", maidens: 0, runs: 32, wkts: 3 },
                { name: "Marco Jansen", overs: "4.0", maidens: 0, runs: 25, wkts: 1 },
                { name: "Noor Ahmad", overs: "4.0", maidens: 0, runs: 32, wkts: 5 },
                { name: "Harbhajan Singh", overs: "4.0", maidens: 0, runs: 25, wkts: 0 },
                { name: "Ravindra Jadeja", overs: "0.3", maidens: 0, runs: 2, wkts: 1 }
            ],
            fow: "1-26, 2-26, 3-26, 4-27, 5-52, 6-52, 7-88, 8-110, 9-111, 10-122"
        }
    }
};

season9Results.push(match30Data);

currentHtml = currentHtml.replace(
    /MULTI_DB\.season9\.results = \[[\s\S]*?\];/,
    `MULTI_DB.season9.results = ${JSON.stringify(season9Results)};`
);

fs.writeFileSync('index.html', currentHtml);
console.log("Match 30 (Season 9) data successfully injected into index.html!");
