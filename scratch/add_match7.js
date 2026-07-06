const fs = require('fs');

let currentHtml = fs.readFileSync('index.html', 'utf8');

const resultsMatch = currentHtml.match(/results:\s*(\[[\s\S]*?\]),\s*batting:/);
if (!resultsMatch) {
    console.error("Could not find results array.");
    process.exit(1);
}

let results = eval(resultsMatch[1]);
results = results.filter(m => m.match !== 7);

const newMatch = {
  "match": 7,
  "team1": "AS",
  "team2": "SM",
  "score1": "193/7",
  "overs1": "20.0",
  "score2": "114/10",
  "overs2": "11.2",
  "winner": "AS",
  "margin": "79 runs",
  "mom": "Josh Philippe (AS) — 70 (41)",
  "scorecard": {
    "t1Inn": {
      "bat": [
        { "name": "Danni Wyatt", "dismissal": "b NARINE", "runs": 30, "balls": 11 },
        { "name": "Rory Burns", "dismissal": "lbw STARC", "runs": 1, "balls": 2 },
        { "name": "Mahipal Lomror", "dismissal": "run out GAMBHIR", "runs": 29, "balls": 21 },
        { "name": "Joe Denly", "dismissal": "b CURRAN", "runs": 13, "balls": 9 },
        { "name": "Josh Philippe", "dismissal": "lbw STARC", "runs": 70, "balls": 41 },
        { "name": "Arjun Potter", "dismissal": "lbw CURRAN", "runs": 4, "balls": 4 },
        { "name": "Krishnappa Gowtham", "dismissal": "b DOTTIN", "runs": 12, "balls": 11 },
        { "name": "Alex Carey", "dismissal": "not out", "runs": 32, "balls": 18 },
        { "name": "Arshdeep Singh", "dismissal": "not out", "runs": 2, "balls": 3 },
        { "name": "Y Chahal", "dismissal": "did not bat", "runs": 0, "balls": 0 },
        { "name": "Kuldeep Yadav", "dismissal": "did not bat", "runs": 0, "balls": 0 }
      ],
      "bowl": [
        { "name": "Sunil Narine", "overs": "3.0", "maidens": 0, "runs": 49, "wkts": 1 },
        { "name": "Mitchell Starc", "overs": "4.0", "maidens": 0, "runs": 26, "wkts": 2 },
        { "name": "Liam Dawson", "overs": "4.0", "maidens": 0, "runs": 42, "wkts": 0 },
        { "name": "Tom Curran", "overs": "4.0", "maidens": 0, "runs": 35, "wkts": 2 },
        { "name": "Andre Russell", "overs": "2.0", "maidens": 0, "runs": 20, "wkts": 0 },
        { "name": "Deandra Dottin", "overs": "3.0", "maidens": 0, "runs": 21, "wkts": 1 }
      ],
      "fow": "1-14, 2-32, 3-61, 4-84, 5-110, 6-156, 7-180"
    },
    "t2Inn": {
      "bat": [
        { "name": "Sunil Narine", "dismissal": "c CAREY b GOWTHAM", "runs": 15, "balls": 7 },
        { "name": "Yashasvi Jaiswal", "dismissal": "b GOWTHAM", "runs": 6, "balls": 4 },
        { "name": "Gautam Gambhir", "dismissal": "c CAREY b SINGH", "runs": 5, "balls": 3 },
        { "name": "Sanju Samson", "dismissal": "c LOMROR b CHAHAL", "runs": 23, "balls": 12 },
        { "name": "Andre Russell", "dismissal": "b YADAV", "runs": 15, "balls": 8 },
        { "name": "Shivam Dube", "dismissal": "b CHAHAL", "runs": 5, "balls": 4 },
        { "name": "Shreyas Iyer", "dismissal": "lbw CHAHAL", "runs": 12, "balls": 8 },
        { "name": "Deandra Dottin", "dismissal": "b YADAV", "runs": 15, "balls": 6 },
        { "name": "Shane Miller", "dismissal": "lbw CHAHAL", "runs": 7, "balls": 9 },
        { "name": "Mitchell Starc", "dismissal": "c CAREY b GOWTHAM", "runs": 9, "balls": 5 },
        { "name": "Liam Dawson", "dismissal": "not out", "runs": 2, "balls": 2 }
      ],
      "bowl": [
        { "name": "Arshdeep Singh", "overs": "2.0", "maidens": 0, "runs": 28, "wkts": 1 },
        { "name": "Krishnappa Gowtham", "overs": "3.0", "maidens": 0, "runs": 32, "wkts": 3 },
        { "name": "Kuldeep Yadav", "overs": "3.0", "maidens": 0, "runs": 31, "wkts": 2 },
        { "name": "Y Chahal", "overs": "3.2", "maidens": 0, "runs": 23, "wkts": 4 }
      ],
      "fow": "1-15, 2-24, 3-26, 4-58, 5-65, 6-81, 7-82, 8-98, 9-108, 10-114"
    }
  }
};

results.push(newMatch);

const newResultsStr = "results: " + JSON.stringify(results, null, 8).replace(/\n/g, '\n      ') + ",\n      batting:";

currentHtml = currentHtml.replace(/results:\s*\[[\s\S]*?\],\s*batting:/, newResultsStr);

fs.writeFileSync('index.html', currentHtml);
console.log("Match 7 added successfully!");
