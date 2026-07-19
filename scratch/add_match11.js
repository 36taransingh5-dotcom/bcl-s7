const fs = require('fs');

let currentHtml = fs.readFileSync('index.html', 'utf8');

const season9ResultsMatch = currentHtml.match(/MULTI_DB\.season9\.results = (\[[\s\S]*?\]);/);
if (!season9ResultsMatch) {
    console.error("Could not find MULTI_DB.season9.results array.");
    process.exit(1);
}

let season9Results = JSON.parse(season9ResultsMatch[1]);

if (season9Results.find(r => r.match === 11)) {
    console.log("Match 11 already exists. Removing it to re-add.");
    season9Results = season9Results.filter(r => r.match !== 11);
}

const match11Data = {
    match: 11,
    team1: "GB",
    team2: "TT",
    venue: "Trent Bridge",
    score1: "181/10",
    overs1: "19.2",
    score2: "184/3",
    overs2: "15.1",
    winner: "TT",
    margin: "7 wickets",
    mom: "Trevor Singh (TT) — 94* & 3/35",
    scorecard: {
        t1Inn: {
            bat: [
                { name: "Smriti Mandhana", dismissal: "lbw JOHNSON", runs: 0, balls: 2 },
                { name: "Ishan Kishan", dismissal: "c SHASTRI b KING", runs: 53, balls: 30 },
                { name: "Ellyse Perry", dismissal: "c KING b JOHNSON", runs: 3, balls: 3 },
                { name: "Ravindra Jadeja", dismissal: "b JOHNSON", runs: 12, balls: 7 },
                { name: "Glenn Maxwell", dismissal: "lbw SINGH", runs: 62, balls: 35 },
                { name: "Abhishek Sharma", dismissal: "c SEIFERT b KING", runs: 11, balls: 5 },
                { name: "Grant Bauer", dismissal: "c BREVIS b KING", runs: 1, balls: 6 },
                { name: "Marco Jansen", dismissal: "c & b SINGH", runs: 20, balls: 15 },
                { name: "Shashank Singh", dismissal: "c SEIFERT b SCHUTT", runs: 6, balls: 6 },
                { name: "Harbhajan Singh", dismissal: "not out", runs: 2, balls: 3 },
                { name: "Bhuvneshwar Kumar", dismissal: "c SCHUTT b SINGH", runs: 2, balls: 5 }
            ],
            bowl: [
                { name: "Mitchell Johnson", overs: "4.0", maidens: 0, runs: 26, wkts: 3 },
                { name: "Megan Schutt", overs: "4.0", maidens: 0, runs: 44, wkts: 1 },
                { name: "Hardik Pandya", overs: "4.0", maidens: 0, runs: 37, wkts: 0 },
                { name: "Alana King", overs: "4.0", maidens: 0, runs: 31, wkts: 3 },
                { name: "Trevor Singh", overs: "3.2", maidens: 0, runs: 35, wkts: 3 }
            ],
            fow: "1-0, 2-4, 3-18, 4-86, 5-102, 6-126, 7-153, 8-176, 9-178, 10-181"
        },
        t2Inn: {
            bat: [
                { name: "Tim Seifert", dismissal: "c KISHAN b JANSEN", runs: 1, balls: 2 },
                { name: "Dewald Brevis", dismissal: "c MANDHANA b JANSEN", runs: 25, balls: 15 },
                { name: "Trevor Singh", dismissal: "not out", runs: 94, balls: 41 },
                { name: "Laura Wolvaardt", dismissal: "c KISHAN b JANSEN", runs: 12, balls: 3 },
                { name: "Shafali Verma", dismissal: "not out", runs: 49, balls: 30 },
                { name: "Hardik Pandya", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Jordan Hermann", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Aiden Markram", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Ravi Shastri", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Mitchell Johnson", dismissal: "did not bat", runs: 0, balls: 0 },
                { name: "Megan Schutt", dismissal: "did not bat", runs: 0, balls: 0 }
            ],
            bowl: [
                { name: "Marco Jansen", overs: "4.0", maidens: 0, runs: 57, wkts: 3 },
                { name: "Bhuvneshwar Kumar", overs: "2.1", maidens: 0, runs: 24, wkts: 0 },
                { name: "Noor Ahmad", overs: "4.0", maidens: 0, runs: 37, wkts: 0 },
                { name: "Harbhajan Singh", overs: "3.0", maidens: 0, runs: 38, wkts: 0 },
                { name: "Ravindra Jadeja", overs: "2.0", maidens: 0, runs: 26, wkts: 0 }
            ],
            fow: "1-2, 2-39, 3-51"
        }
    }
};

season9Results.push(match11Data);

currentHtml = currentHtml.replace(
    /MULTI_DB\.season9\.results = \[[\s\S]*?\];/,
    `MULTI_DB.season9.results = ${JSON.stringify(season9Results)};`
);

fs.writeFileSync('index.html', currentHtml);
console.log("Match 11 data successfully injected into index.html!");
