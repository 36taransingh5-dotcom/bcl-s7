const fs = require('fs');

let currentHtml = fs.readFileSync('index.html', 'utf8');

const resultsMatch = currentHtml.match(/results:\s*(\[[\s\S]*?\]),\s*batting:/);
if (!resultsMatch) {
    console.error("Could not find results array.");
    process.exit(1);
}

let results = eval(resultsMatch[1]);
results = results.filter(m => m.match !== 55);

const newMatch = {
  "match": 55,
  "team1": "HH",
  "team2": "UU",
  "score1": "222/7",
  "overs1": "20.0",
  "score2": "106/10",
  "overs2": "11.5",
  "winner": "HH",
  "margin": "116 runs",
  "mom": "Suryakumar Yadav (HH) — 74 (48)",
  "scorecard": {
    "t1Inn": {
      "bat": [
        { "name": "Steve Smith", "dismissal": "c SHORT b SPRINGER", "runs": 1, "balls": 3 },
        { "name": "Shikhar Dhawan", "dismissal": "run out BLUNDELL", "runs": 15, "balls": 7 },
        { "name": "Martin Guptill", "dismissal": "b BRACEWELL", "runs": 4, "balls": 5 },
        { "name": "Suryakumar Yadav", "dismissal": "lbw FAROOQI", "runs": 74, "balls": 48 },
        { "name": "Shubman Gill", "dismissal": "c BRACEWELL b FAROOQI", "runs": 69, "balls": 28 },
        { "name": "Axar Patel", "dismissal": "lbw SHORT", "runs": 34, "balls": 17 },
        { "name": "Heinrich Klaasen", "dismissal": "not out", "runs": 17, "balls": 9 },
        { "name": "Krunal Pandya", "dismissal": "b SHORT", "runs": 4, "balls": 2 },
        { "name": "Jess Jonassen", "dismissal": "not out", "runs": 0, "balls": 1 },
        { "name": "Mitchell Swepson", "dismissal": "did not bat", "runs": 0, "balls": 0 },
        { "name": "Josh Hazlewood", "dismissal": "did not bat", "runs": 0, "balls": 0 }
      ],
      "bowl": [
        { "name": "Shamar Springer", "overs": "4.0", "maidens": 0, "runs": 37, "wkts": 1 },
        { "name": "Fazalhaq Farooqi", "overs": "4.0", "maidens": 0, "runs": 43, "wkts": 2 },
        { "name": "Issy Wong", "overs": "3.0", "maidens": 0, "runs": 41, "wkts": 0 },
        { "name": "Michael Bracewell", "overs": "4.0", "maidens": 0, "runs": 40, "wkts": 1 },
        { "name": "Aaron Hardie", "overs": "3.0", "maidens": 0, "runs": 30, "wkts": 0 },
        { "name": "Matt Short", "overs": "2.0", "maidens": 0, "runs": 27, "wkts": 2 }
      ],
      "fow": "1-2, 2-16, 3-39, 4-146, 5-197, 6-218, 7-222"
    },
    "t2Inn": {
      "bat": [
        { "name": "Chris Lynn", "dismissal": "lbw JONASSEN", "runs": 24, "balls": 11 },
        { "name": "Vaibhav Suryavanshi", "dismissal": "c KLAASEN b HAZLEWOOD", "runs": 9, "balls": 7 },
        { "name": "Kathryn Bryce", "dismissal": "c KLAASEN b PANDYA", "runs": 15, "balls": 13 },
        { "name": "Tom Blundell", "dismissal": "b JONASSEN", "runs": 8, "balls": 6 },
        { "name": "Aaron Hardie", "dismissal": "c KLAASEN b SWEPSON", "runs": 19, "balls": 12 },
        { "name": "Matt Short", "dismissal": "c KLAASEN b SWEPSON", "runs": 16, "balls": 10 },
        { "name": "Michael Bracewell", "dismissal": "b PATEL", "runs": 2, "balls": 4 },
        { "name": "Orla Prendergast", "dismissal": "b PATEL", "runs": 8, "balls": 4 },
        { "name": "Rilee Rossouw", "dismissal": "c & b PATEL", "runs": 0, "balls": 1 },
        { "name": "Shamar Springer", "dismissal": "lbw SWEPSON", "runs": 1, "balls": 2 },
        { "name": "Fazalhaq Farooqi", "dismissal": "not out", "runs": 1, "balls": 1 }
      ],
      "bowl": [
        { "name": "Josh Hazlewood", "overs": "3.0", "maidens": 0, "runs": 33, "wkts": 1 },
        { "name": "Jess Jonassen", "overs": "4.0", "maidens": 0, "runs": 34, "wkts": 2 },
        { "name": "Krunal Pandya", "overs": "2.0", "maidens": 0, "runs": 18, "wkts": 1 },
        { "name": "Mitchell Swepson", "overs": "1.5", "maidens": 0, "runs": 11, "wkts": 3 },
        { "name": "Axar Patel", "overs": "1.0", "maidens": 0, "runs": 8, "wkts": 3 }
      ],
      "fow": "1-33, 2-35, 3-51, 4-65, 5-87, 6-93, 7-101, 8-101, 9-105, 10-106"
    }
  }
};

results.push(newMatch);

const newResultsStr = "results: " + JSON.stringify(results, null, 8).replace(/\n/g, '\n      ') + ",\n      batting:";

currentHtml = currentHtml.replace(/results:\s*\[[\s\S]*?\],\s*batting:/, newResultsStr);

fs.writeFileSync('index.html', currentHtml);
console.log("Match 55 added successfully!");
