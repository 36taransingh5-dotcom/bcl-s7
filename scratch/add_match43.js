const fs = require('fs');

let currentHtml = fs.readFileSync('index.html', 'utf8');

const season9ResultsMatch = currentHtml.match(/MULTI_DB\.season9\.results = (\[[\s\S]*?\]);/);
if (!season9ResultsMatch) {
    console.error("Could not find MULTI_DB.season9.results array.");
    process.exit(1);
}

let season9Results = JSON.parse(season9ResultsMatch[1]);

if (season9Results.find(r => r.match === 43)) {
    console.log("Match 43 already exists. Removing it to re-add.");
    season9Results = season9Results.filter(r => r.match !== 43);
}

const match43Data = {
    match: 43,
    team1: "SM",
    team2: "GB",
    venue: "Kabul International Stadium",
    score1: "196/10",
    overs1: "19.5",
    score2: "242/9",
    overs2: "20.0",
    winner: "GB",
    margin: "1 wicket",
    mom: "Glenn Maxwell (GB) — 91",
    scorecard: {
        t1Inn: {
            bat: [
                { name: "Sanju Samson", dismissal: "b BAUER", runs: 46, balls: 26 },
                { name: "Yashasvi Jaiswal", dismissal: "c MANDHANA b JANSEN", runs: 25, balls: 13 },
                { name: "Gautam Gambhir", dismissal: "c JADEJA b BAUER", runs: 25, balls: 12 },
                { name: "Jason Holder", dismissal: "lbw JADEJA", runs: 8, balls: 8 },
                { name: "Shivam Dube", dismissal: "c KISHAN b JADEJA", runs: 7, balls: 5 },
                { name: "Shreyas Iyer", dismissal: "lbw SINGH", runs: 41, balls: 21 },
                { name: "Sunil Narine", dismissal: "lbw JANSEN", runs: 27, balls: 21 },
                { name: "Andre Russell", dismissal: "lbw AHMAD", runs: 13, balls: 8 },
                { name: "Shane Miller", dismissal: "c KISHAN b AHMAD", runs: 1, balls: 2 },
                { name: "Mitchell Starc", dismissal: "b AHMAD", runs: 0, balls: 2 },
                { name: "Liam Dawson", dismissal: "not out", runs: 1, balls: 1 }
            ],
            bowl: [
                { name: "Bhuvneshwar Kumar", overs: "2.0", maidens: 0, runs: 18, wkts: 0 },
                { name: "Marco Jansen", overs: "4.0", maidens: 0, runs: 39, wkts: 2 },
                { name: "Noor Ahmad", overs: "2.5", maidens: 0, runs: 26, wkts: 3 },
                { name: "Grant Bauer", overs: "4.0", maidens: 0, runs: 42, wkts: 2 },
                { name: "Harbhajan Singh", overs: "3.0", maidens: 0, runs: 35, wkts: 1 },
                { name: "Ravindra Jadeja", overs: "4.0", maidens: 0, runs: 34, wkts: 2 }
            ],
            fow: "1-68, 2-72, 3-104, 4-111, 5-114, 6-173, 7-194, 8-195, 9-195, 10-196"
        },
        t2Inn: {
            bat: [
                { name: "Smriti Mandhana", dismissal: "lbw CURRAN", runs: 13, balls: 8 },
                { name: "Ishan Kishan", dismissal: "c SAMSON b STARC", runs: 2, balls: 4 },
                { name: "Ellyse Perry", dismissal: "c SAMSON b RUSSELL", runs: 16, balls: 9 },
                { name: "Harmanpreet Kaur", dismissal: "b CURRAN", runs: 22, balls: 8 },
                { name: "Glenn Maxwell", dismissal: "lbw STARC", runs: 91, balls: 39 },
                { name: "Grant Bauer", dismissal: "b RUSSELL", runs: 1, balls: 4 },
                { name: "Ravindra Jadeja", dismissal: "lbw RUSSELL", runs: 0, balls: 1 },
                { name: "Shashank Singh", dismissal: "b NARINE", runs: 34, balls: 19 },
                { name: "Marco Jansen", dismissal: "not out", runs: 47, balls: 20 },
                { name: "Harbhajan Singh", dismissal: "c SAMSON b DAWSON", runs: 1, balls: 3 },
                { name: "Bhuvneshwar Kumar", dismissal: "not out", runs: 8, balls: 6 }
            ],
            bowl: [
                { name: "Mitchell Starc", overs: "4.0", maidens: 0, runs: 31, wkts: 2 },
                { name: "Jason Holder", overs: "3.0", maidens: 0, runs: 44, wkts: 0 },
                { name: "Tom Curran", overs: "4.0", maidens: 0, runs: 53, wkts: 2 },
                { name: "Andre Russell", overs: "4.0", maidens: 0, runs: 45, wkts: 3 },
                { name: "Liam Dawson", overs: "2.0", maidens: 0, runs: 18, wkts: 1 },
                { name: "Sunil Narine", overs: "3.0", maidens: 0, runs: 45, wkts: 1 }
            ],
            fow: "1-3, 2-33, 3-53, 4-71, 5-74, 6-74, 7-139, 8-216, 9-221"
        }
    }
};

season9Results.push(match43Data);

currentHtml = currentHtml.replace(
    /MULTI_DB\.season9\.results = \[[\s\S]*?\];/,
    `MULTI_DB.season9.results = ${JSON.stringify(season9Results)};`
);

fs.writeFileSync('index.html', currentHtml);
console.log("Match 43 (Season 9) data successfully injected into index.html!");
