const fs = require('fs');

let currentHtml = fs.readFileSync('index.html', 'utf8');

const resultsMatch = currentHtml.match(/results:\s*(\[[\s\S]*?\]),\s*batting:/);
if (!resultsMatch) {
    console.error("Could not find results array.");
    process.exit(1);
}

let results = eval(resultsMatch[1]);
results = results.filter(m => m.match !== 38);

const newMatch = {
  "match": 38,
  "team1": "SM",
  "team2": "UU",
  "score1": "259/10",
  "overs1": "19.5",
  "score2": "190/10",
  "overs2": "18.0",
  "winner": "SM",
  "margin": "69 runs",
  "mom": "Sanju Samson (SM) — 87 (32)",
  "scorecard": {
    "t1Inn": {
      "bat": [
        { "name": "Yashasvi Jaiswal", "dismissal": "lbw BRACEWELL", "runs": 25, "balls": 17 },
        { "name": "Sanju Samson", "dismissal": "b WONG", "runs": 87, "balls": 32 },
        { "name": "Gautam Gambhir", "dismissal": "c BLUNDELL b HARDIE", "runs": 4, "balls": 4 },
        { "name": "Sunil Narine", "dismissal": "c HARDIE b WONG", "runs": 42, "balls": 16 },
        { "name": "Shreyas Iyer", "dismissal": "lbw BRACEWELL", "runs": 17, "balls": 6 },
        { "name": "Deandra Dottin", "dismissal": "b HARDIE", "runs": 7, "balls": 9 },
        { "name": "Andre Russell", "dismissal": "not out", "runs": 38, "balls": 14 },
        { "name": "Shivam Dube", "dismissal": "c & b BRACEWELL", "runs": 39, "balls": 17 },
        { "name": "Shane Miller", "dismissal": "c LYNN b BRACEWELL", "runs": 0, "balls": 1 },
        { "name": "Mitchell Starc", "dismissal": "c LYNN b BRACEWELL", "runs": 0, "balls": 2 },
        { "name": "Liam Dawson", "dismissal": "b BRACEWELL", "runs": 0, "balls": 1 }
      ],
      "bowl": [
        { "name": "Aaron Hardie", "overs": "4.0", "maidens": 0, "runs": 57, "wkts": 2 },
        { "name": "Shamar Springer", "overs": "4.0", "maidens": 0, "runs": 39, "wkts": 0 },
        { "name": "Fazalhaq Farooqi", "overs": "3.0", "maidens": 0, "runs": 49, "wkts": 0 },
        { "name": "Issy Wong", "overs": "4.0", "maidens": 0, "runs": 56, "wkts": 2 },
        { "name": "Michael Bracewell", "overs": "3.5", "maidens": 0, "runs": 40, "wkts": 6 },
        { "name": "Matt Short", "overs": "1.0", "maidens": 0, "runs": 18, "wkts": 0 }
      ],
      "fow": "1-71, 2-78, 3-136, 4-175, 5-182, 6-182, 7-259, 8-259, 9-259, 10-259"
    },
    "t2Inn": {
      "bat": [
        { "name": "Chris Lynn", "dismissal": "c SAMSON b CURRAN", "runs": 54, "balls": 24 },
        { "name": "Vaibhav Suryavanshi", "dismissal": "c SAMSON b STARC", "runs": 2, "balls": 5 },
        { "name": "Kathryn Bryce", "dismissal": "c DUBE b CURRAN", "runs": 23, "balls": 10 },
        { "name": "Tom Blundell", "dismissal": "c CURRAN b NARINE", "runs": 40, "balls": 24 },
        { "name": "Aaron Hardie", "dismissal": "c CURRAN b DAWSON", "runs": 12, "balls": 7 },
        { "name": "Matt Short", "dismissal": "c DOTTIN b NARINE", "runs": 39, "balls": 14 },
        { "name": "Michael Bracewell", "dismissal": "run out DAWSON", "runs": 1, "balls": 4 },
        { "name": "Rilee Rossouw", "dismissal": "lbw STARC", "runs": 8, "balls": 9 },
        { "name": "Orla Prendergast", "dismissal": "b STARC", "runs": 0, "balls": 1 },
        { "name": "Shamar Springer", "dismissal": "not out", "runs": 6, "balls": 8 },
        { "name": "Issy Wong", "dismissal": "c RUSSELL b STARC", "runs": 0, "balls": 2 }
      ],
      "bowl": [
        { "name": "Sunil Narine", "overs": "4.0", "maidens": 0, "runs": 51, "wkts": 2 },
        { "name": "Mitchell Starc", "overs": "4.0", "maidens": 0, "runs": 34, "wkts": 4 },
        { "name": "Liam Dawson", "overs": "4.0", "maidens": 0, "runs": 49, "wkts": 1 },
        { "name": "Tom Curran", "overs": "4.0", "maidens": 0, "runs": 32, "wkts": 2 },
        { "name": "Andre Russell", "overs": "2.0", "maidens": 0, "runs": 19, "wkts": 0 }
      ],
      "fow": "1-16, 2-66, 3-91, 4-104, 5-157, 6-162, 7-178, 8-179, 9-190, 10-190"
    }
  }
};

results.push(newMatch);

const newResultsStr = "results: " + JSON.stringify(results, null, 8).replace(/\n/g, '\n      ') + ",\n      batting:";

currentHtml = currentHtml.replace(/results:\s*\[[\s\S]*?\],\s*batting:/, newResultsStr);

fs.writeFileSync('index.html', currentHtml);
console.log("Match 38 added successfully!");
