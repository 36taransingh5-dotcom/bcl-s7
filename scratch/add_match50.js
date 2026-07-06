const fs = require('fs');

let currentHtml = fs.readFileSync('index.html', 'utf8');

const resultsMatch = currentHtml.match(/results:\s*(\[[\s\S]*?\]),\s*batting:/);
if (!resultsMatch) {
    console.error("Could not find results array.");
    process.exit(1);
}

let results = eval(resultsMatch[1]);
results = results.filter(m => m.match !== 50);

const newMatch = {
  "match": 50,
  "team1": "AS",
  "team2": "HH",
  "score1": "132/10",
  "overs1": "14.5",
  "score2": "133/4",
  "overs2": "12.0",
  "winner": "HH",
  "margin": "6 wickets",
  "mom": "Shikhar Dhawan (HH) — 59 (28)",
  "scorecard": {
    "t1Inn": {
      "bat": [
        { "name": "Maia Bouchier", "dismissal": "c KLAASEN b HAZLEWOOD", "runs": 6, "balls": 7 },
        { "name": "Joe Denly", "dismissal": "c KLAASEN b JONASSEN", "runs": 1, "balls": 2 },
        { "name": "Josh Philippe", "dismissal": "c KLAASEN b JONASSEN", "runs": 16, "balls": 9 },
        { "name": "Rory Burns", "dismissal": "c KLAASEN b HAZLEWOOD", "runs": 0, "balls": 2 },
        { "name": "Mahipal Lomror", "dismissal": "c KLAASEN b SWEPSON", "runs": 27, "balls": 18 },
        { "name": "Arjun Potter", "dismissal": "lbw HAZLEWOOD", "runs": 0, "balls": 1 },
        { "name": "Krishnappa Gowtham", "dismissal": "c YADAV b PANDYA", "runs": 14, "balls": 12 },
        { "name": "Alex Carey", "dismissal": "c KLAASEN b JONASSEN", "runs": 54, "balls": 18 },
        { "name": "Ruturaj Gaikwad", "dismissal": "c KLAASEN b PANDYA", "runs": 5, "balls": 4 },
        { "name": "Kuldeep Yadav", "dismissal": "lbw PATEL", "runs": 8, "balls": 12 },
        { "name": "Arshdeep Singh", "dismissal": "not out", "runs": 1, "balls": 4 }
      ],
      "bowl": [
        { "name": "Josh Hazlewood", "overs": "4.0", "maidens": 0, "runs": 27, "wkts": 3 },
        { "name": "Jess Jonassen", "overs": "4.0", "maidens": 0, "runs": 37, "wkts": 3 },
        { "name": "Krunal Pandya", "overs": "3.0", "maidens": 0, "runs": 34, "wkts": 2 },
        { "name": "Mitchell Swepson", "overs": "2.0", "maidens": 0, "runs": 21, "wkts": 1 },
        { "name": "Axar Patel", "overs": "1.5", "maidens": 0, "runs": 13, "wkts": 1 }
      ],
      "fow": "1-6, 2-16, 3-16, 4-32, 5-33, 6-60, 7-66, 8-71, 9-128, 10-132"
    },
    "t2Inn": {
      "bat": [
        { "name": "Steve Smith", "dismissal": "not out", "runs": 53, "balls": 27 },
        { "name": "Shikhar Dhawan", "dismissal": "c YADAV b CHAHAL", "runs": 59, "balls": 28 },
        { "name": "Martin Guptill", "dismissal": "lbw SINGH", "runs": 11, "balls": 5 },
        { "name": "Suryakumar Yadav", "dismissal": "b GOWTHAM", "runs": 3, "balls": 4 },
        { "name": "Krunal Pandya", "dismissal": "lbw POTTER", "runs": 2, "balls": 5 },
        { "name": "Shubman Gill", "dismissal": "not out", "runs": 2, "balls": 3 },
        { "name": "Axar Patel", "dismissal": "did not bat", "runs": 0, "balls": 0 },
        { "name": "Heinrich Klaasen", "dismissal": "did not bat", "runs": 0, "balls": 0 },
        { "name": "Jess Jonassen", "dismissal": "did not bat", "runs": 0, "balls": 0 },
        { "name": "Mitchell Swepson", "dismissal": "did not bat", "runs": 0, "balls": 0 },
        { "name": "Josh Hazlewood", "dismissal": "did not bat", "runs": 0, "balls": 0 }
      ],
      "bowl": [
        { "name": "Arshdeep Singh", "overs": "3.0", "maidens": 0, "runs": 28, "wkts": 1 },
        { "name": "Krishnappa Gowtham", "overs": "3.0", "maidens": 0, "runs": 35, "wkts": 1 },
        { "name": "Kuldeep Yadav", "overs": "3.0", "maidens": 0, "runs": 30, "wkts": 0 },
        { "name": "Y Chahal", "overs": "2.0", "maidens": 0, "runs": 27, "wkts": 1 },
        { "name": "Arjun Potter", "overs": "1.0", "maidens": 0, "runs": 10, "wkts": 1 }
      ],
      "fow": "1-88, 2-99, 3-104, 4-125"
    }
  }
};

results.push(newMatch);

const newResultsStr = "results: " + JSON.stringify(results, null, 8).replace(/\n/g, '\n      ') + ",\n      batting:";

currentHtml = currentHtml.replace(/results:\s*\[[\s\S]*?\],\s*batting:/, newResultsStr);

fs.writeFileSync('index.html', currentHtml);
console.log("Match 50 added successfully!");
