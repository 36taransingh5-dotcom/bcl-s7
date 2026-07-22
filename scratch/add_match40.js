const fs = require('fs');

let currentHtml = fs.readFileSync('index.html', 'utf8');

const season9ResultsMatch = currentHtml.match(/MULTI_DB\.season9\.results = (\[[\s\S]*?\]);/);
if (!season9ResultsMatch) {
    console.error("Could not find MULTI_DB.season9.results array.");
    process.exit(1);
}

let season9Results = JSON.parse(season9ResultsMatch[1]);

if (season9Results.find(r => r.match === 40)) {
    console.log("Match 40 already exists. Removing it to re-add.");
    season9Results = season9Results.filter(r => r.match !== 40);
}

const match40Data = {
    match: 40,
    team1: "SM",
    team2: "GB",
    venue: "Beausejour Cricket Ground",
    score1: "131/10",
    overs1: "14.2",
    score2: "265/5",
    overs2: "20.0",
    winner: "GB",
    margin: "134 runs",
    mom: "Glenn Maxwell (GB) — 112",
    scorecard: {
        t1Inn: {
            bat: [
                { name: "Sanju Samson", dismissal: "lbw KUMAR", runs: 2, balls: 2 },
                { name: "Yashasvi Jaiswal", dismissal: "b SINGH", runs: 27, balls: 11 },
                { name: "Gautam Gambhir", dismissal: "c & b JANSEN", runs: 12, balls: 5 },
                { name: "Jason Holder", dismissal: "b SINGH", runs: 26, balls: 15 },
                { name: "Shreyas Iyer", dismissal: "lbw AHMAD", runs: 2, balls: 4 },
                { name: "Shivam Dube", dismissal: "b SINGH", runs: 10, balls: 8 },
                { name: "Sunil Narine", dismissal: "b SINGH", runs: 3, balls: 2 },
                { name: "Deandra Dottin", dismissal: "c KISHAN b SINGH", runs: 19, balls: 12 },
                { name: "Andre Russell", dismissal: "lbw JADEJA", runs: 24, balls: 18 },
                { name: "Mitchell Starc", dismissal: "not out", runs: 5, balls: 7 },
                { name: "Liam Dawson", dismissal: "c KISHAN b KUMAR", runs: 0, balls: 3 }
            ],
            bowl: [
                { name: "Bhuvneshwar Kumar", overs: "2.2", maidens: 0, runs: 27, wkts: 2 },
                { name: "Marco Jansen", overs: "2.0", maidens: 0, runs: 28, wkts: 1 },
                { name: "Noor Ahmad", overs: "4.0", maidens: 0, runs: 31, wkts: 1 },
                { name: "Harbhajan Singh", overs: "4.0", maidens: 0, runs: 23, wkts: 5 },
                { name: "Ravindra Jadeja", overs: "2.0", maidens: 0, runs: 22, wkts: 1 }
            ],
            fow: "1-2, 2-25, 3-65, 4-68, 5-78, 6-82, 7-84, 8-117, 9-130, 10-131"
        },
        t2Inn: {
            bat: [
                { name: "Smriti Mandhana", dismissal: "lbw NARINE", runs: 8, balls: 7 },
                { name: "Ishan Kishan", dismissal: "c HOLDER b NARINE", runs: 20, balls: 16 },
                { name: "Ellyse Perry", dismissal: "c GAMBHIR b DAWSON", runs: 78, balls: 33 },
                { name: "Glenn Maxwell", dismissal: "c NARINE b CURRAN", runs: 112, balls: 49 },
                { name: "Grant Bauer", dismissal: "not out", runs: 23, balls: 11 },
                { name: "Shashank Singh", dismissal: "c SAMSON b CURRAN", runs: 16, balls: 4 },
                { name: "Harmanpreet Kaur", dismissal: "not out", runs: 2, balls: 1 },
                { name: "Marco Jansen", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Ravindra Jadeja", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Noor Ahmad", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Bhuvneshwar Kumar", dismissal: "did not bat", runs: 0, balls: 0 }
            ],
            bowl: [
                { name: "Sunil Narine", overs: "4.0", maidens: 0, runs: 39, wkts: 2 },
                { name: "Mitchell Starc", overs: "4.0", maidens: 0, runs: 44, wkts: 0 },
                { name: "Jason Holder", overs: "4.0", maidens: 0, runs: 57, wkts: 0 },
                { name: "Liam Dawson", overs: "4.0", maidens: 0, runs: 50, wkts: 1 },
                { name: "Tom Curran", overs: "3.0", maidens: 0, runs: 49, wkts: 2 },
                { name: "Andre Russell", overs: "1.0", maidens: 0, runs: 21, wkts: 0 }
            ],
            fow: "1-16, 2-43, 3-211, 4-247, 5-263"
        }
    }
};

season9Results.push(match40Data);

currentHtml = currentHtml.replace(
    /MULTI_DB\.season9\.results = \[[\s\S]*?\];/,
    `MULTI_DB.season9.results = ${JSON.stringify(season9Results)};`
);

fs.writeFileSync('index.html', currentHtml);
console.log("Match 40 (Season 9) data successfully injected into index.html!");
