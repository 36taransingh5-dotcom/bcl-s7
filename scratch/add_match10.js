const fs = require('fs');

let currentHtml = fs.readFileSync('index.html', 'utf8');

const resultsMatch = currentHtml.match(/results:\s*(\[[\s\S]*?\]),\s*batting:/);
if (!resultsMatch) {
    console.error("Could not find results array.");
    process.exit(1);
}

let results = eval(resultsMatch[1]);
results = results.filter(m => m.match !== 10);

const newMatch = {
  "match": 10,
  "team1": "SM",
  "team2": "UU",
  "score1": "269/7",
  "overs1": "20.0",
  "score2": "112/10",
  "overs2": "13.3",
  "winner": "SM",
  "margin": "157 runs",
  "mom": "Liam Dawson (SM) — 6/30",
  "scorecard": {
    "t1Inn": {
      "bat": [
        { "name": "Sunil Narine", "dismissal": "b HARDIE", "runs": 14, "balls": 10 },
        { "name": "Sanju Samson", "dismissal": "c BLUNDELL b SPRINGER", "runs": 52, "balls": 22 },
        { "name": "Yashasvi Jaiswal", "dismissal": "c HARDIE b SPRINGER", "runs": 17, "balls": 8 },
        { "name": "Shreyas Iyer", "dismissal": "c SHORT b FAROOQI", "runs": 60, "balls": 27 },
        { "name": "Gautam Gambhir", "dismissal": "c BLUNDELL b SPRINGER", "runs": 19, "balls": 10 },
        { "name": "Andre Russell", "dismissal": "c BLUNDELL b HARDIE", "runs": 51, "balls": 19 },
        { "name": "Shivam Dube", "dismissal": "not out", "runs": 38, "balls": 15 },
        { "name": "Deandra Dottin", "dismissal": "c BLUNDELL b WONG", "runs": 3, "balls": 3 },
        { "name": "Shane Miller", "dismissal": "not out", "runs": 14, "balls": 7 },
        { "name": "Mitchell Starc", "dismissal": "did not bat", "runs": 0, "balls": 0 },
        { "name": "Tom Curran", "dismissal": "did not bat", "runs": 0, "balls": 0 }
      ],
      "bowl": [
        { "name": "Matt Short", "overs": "3.0", "maidens": 0, "runs": 49, "wkts": 0 },
        { "name": "Michael Bracewell", "overs": "3.0", "maidens": 0, "runs": 44, "wkts": 0 },
        { "name": "Shamar Springer", "overs": "4.0", "maidens": 0, "runs": 49, "wkts": 3 },
        { "name": "Aaron Hardie", "overs": "4.0", "maidens": 0, "runs": 43, "wkts": 2 },
        { "name": "Issy Wong", "overs": "2.0", "maidens": 0, "runs": 33, "wkts": 1 },
        { "name": "Fazalhaq Farooqi", "overs": "4.0", "maidens": 0, "runs": 51, "wkts": 1 }
      ],
      "fow": "1-64, 2-68, 3-129, 4-150, 5-166, 6-243, 7-246"
    },
    "t2Inn": {
      "bat": [
        { "name": "Vaibhav Suryavanshi", "dismissal": "c SAMSON b NARINE", "runs": 40, "balls": 24 },
        { "name": "Chris Lynn", "dismissal": "c DOTTIN b DAWSON", "runs": 18, "balls": 12 },
        { "name": "Kathryn Bryce", "dismissal": "c SAMSON b DAWSON", "runs": 0, "balls": 1 },
        { "name": "Tom Blundell", "dismissal": "lbw DAWSON", "runs": 6, "balls": 5 },
        { "name": "Aaron Hardie", "dismissal": "run out MILLER", "runs": 14, "balls": 5 },
        { "name": "Matt Short", "dismissal": "c SAMSON b DAWSON", "runs": 11, "balls": 7 },
        { "name": "Michael Bracewell", "dismissal": "c & b DAWSON", "runs": 5, "balls": 5 },
        { "name": "Rilee Rossouw", "dismissal": "c SAMSON b DAWSON", "runs": 6, "balls": 4 },
        { "name": "Uzair Basu", "dismissal": "c SAMSON b STARC", "runs": 7, "balls": 4 },
        { "name": "Shamar Springer", "dismissal": "not out", "runs": 3, "balls": 9 },
        { "name": "Fazalhaq Farooqi", "dismissal": "lbw CURRAN", "runs": 2, "balls": 5 }
      ],
      "bowl": [
        { "name": "Mitchell Starc", "overs": "4.0", "maidens": 0, "runs": 27, "wkts": 1 },
        { "name": "Tom Curran", "overs": "3.3", "maidens": 0, "runs": 29, "wkts": 1 },
        { "name": "Andre Russell", "overs": "1.0", "maidens": 0, "runs": 14, "wkts": 0 },
        { "name": "Liam Dawson", "overs": "4.0", "maidens": 0, "runs": 30, "wkts": 6 },
        { "name": "Sunil Narine", "overs": "1.0", "maidens": 0, "runs": 12, "wkts": 1 }
      ],
      "fow": "1-48, 2-48, 3-64, 4-68, 5-79, 6-89, 7-95, 8-106, 9-108, 10-112"
    }
  }
};

results.push(newMatch);

const newResultsStr = "results: " + JSON.stringify(results, null, 8).replace(/\n/g, '\n      ') + ",\n      batting:";

currentHtml = currentHtml.replace(/results:\s*\[[\s\S]*?\],\s*batting:/, newResultsStr);

fs.writeFileSync('index.html', currentHtml);
console.log("Match 10 added successfully!");
