const fs = require('fs');

let currentHtml = fs.readFileSync('index.html', 'utf8');

const resultsMatch = currentHtml.match(/results:\s*(\[[\s\S]*?\]),\s*batting:/);
if (!resultsMatch) {
    console.error("Could not find results array.");
    process.exit(1);
}

let results = eval(resultsMatch[1]);
results = results.filter(m => m.match !== 58);

const newMatch = {
  "match": 58,
  "team1": "GB",
  "team2": "SM",
  "score1": "202/7",
  "overs1": "20.0",
  "score2": "116/9",
  "overs2": "12.0",
  "winner": "GB",
  "margin": "86 runs",
  "mom": "Glenn Maxwell (GB) — 86 (43)",
  "scorecard": {
    "t1Inn": {
      "bat": [
        { "name": "Smriti Mandhana", "dismissal": "lbw DAWSON", "runs": 42, "balls": 30 },
        { "name": "Ishan Kishan", "dismissal": "c GAMBHIR b NARINE", "runs": 5, "balls": 4 },
        { "name": "Ellyse Perry", "dismissal": "b NARINE", "runs": 1, "balls": 2 },
        { "name": "Abhishek Sharma", "dismissal": "b CURRAN", "runs": 7, "balls": 4 },
        { "name": "Glenn Maxwell", "dismissal": "b STARC", "runs": 86, "balls": 43 },
        { "name": "Grant Bauer", "dismissal": "c & b DAWSON", "runs": 15, "balls": 12 },
        { "name": "Ravindra Jadeja", "dismissal": "c SAMSON b RUSSELL", "runs": 27, "balls": 17 },
        { "name": "Shashank Singh", "dismissal": "not out", "runs": 7, "balls": 3 },
        { "name": "Marco Jansen", "dismissal": "not out", "runs": 10, "balls": 5 }
      ],
      "bowl": [
        { "name": "Sunil Narine", "overs": "4.0", "maidens": 0, "runs": 36, "wkts": 2 },
        { "name": "Mitchell Starc", "overs": "4.0", "maidens": 0, "runs": 44, "wkts": 1 },
        { "name": "Tom Curran", "overs": "4.0", "maidens": 0, "runs": 43, "wkts": 1 },
        { "name": "Liam Dawson", "overs": "4.0", "maidens": 0, "runs": 29, "wkts": 2 },
        { "name": "Andre Russell", "overs": "3.0", "maidens": 0, "runs": 30, "wkts": 1 },
        { "name": "Deandra Dottin", "overs": "1.0", "maidens": 0, "runs": 18, "wkts": 0 }
      ],
      "fow": "1-7, 2-25, 3-32, 4-98, 5-118, 6-184, 7-192"
    },
    "t2Inn": {
      "bat": [
        { "name": "Sanju Samson", "dismissal": "lbw JANSEN", "runs": 13, "balls": 7 },
        { "name": "Yashasvi Jaiswal", "dismissal": "c & b KUMAR", "runs": 14, "balls": 10 },
        { "name": "Gautam Gambhir", "dismissal": "lbw JADEJA", "runs": 25, "balls": 15 },
        { "name": "Sunil Narine", "dismissal": "c SINGH b KUMAR", "runs": 0, "balls": 1 },
        { "name": "Shreyas Iyer", "dismissal": "lbw AHMAD", "runs": 13, "balls": 6 },
        { "name": "Andre Russell", "dismissal": "lbw AHMAD", "runs": 16, "balls": 8 },
        { "name": "Shivam Dube", "dismissal": "c SINGH b JADEJA", "runs": 5, "balls": 3 },
        { "name": "Deandra Dottin", "dismissal": "lbw JANSEN", "runs": 8, "balls": 8 },
        { "name": "Shane Miller", "dismissal": "not out", "runs": 17, "balls": 9 },
        { "name": "Mitchell Starc", "dismissal": "c KISHAN b JANSEN", "runs": 2, "balls": 5 },
        { "name": "Tom Curran", "dismissal": "not out", "runs": 0, "balls": 0 }
      ],
      "bowl": [
        { "name": "Bhuvneshwar Kumar", "overs": "3.0", "maidens": 0, "runs": 33, "wkts": 2 },
        { "name": "Marco Jansen", "overs": "3.0", "maidens": 0, "runs": 22, "wkts": 3 },
        { "name": "Noor Ahmad", "overs": "3.0", "maidens": 0, "runs": 19, "wkts": 2 },
        { "name": "Harbhajan Singh", "overs": "1.0", "maidens": 0, "runs": 20, "wkts": 0 },
        { "name": "Ravindra Jadeja", "overs": "2.0", "maidens": 0, "runs": 19, "wkts": 2 }
      ],
      "fow": "1-21, 2-27, 3-27, 4-58, 5-84, 6-89, 7-92, 8-114, 9-116"
    }
  }
};

results.push(newMatch);

const newResultsStr = "results: " + JSON.stringify(results, null, 8).replace(/\n/g, '\n      ') + ",\n      batting:";

currentHtml = currentHtml.replace(/results:\s*\[[\s\S]*?\],\s*batting:/, newResultsStr);

fs.writeFileSync('index.html', currentHtml);
console.log("Match 58 added successfully!");
