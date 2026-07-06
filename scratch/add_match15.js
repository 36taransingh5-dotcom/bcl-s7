const fs = require('fs');

let currentHtml = fs.readFileSync('index.html', 'utf8');

const resultsMatch = currentHtml.match(/results:\s*(\[[\s\S]*?\]),\s*batting:/);
if (!resultsMatch) {
    console.error("Could not find results array.");
    process.exit(1);
}

let results = eval(resultsMatch[1]);
results = results.filter(m => m.match !== 15);

const newMatch = {
  "match": 15,
  "team1": "UU",
  "team2": "GB",
  "score1": "76/10",
  "overs1": "8.4",
  "score2": "78/5",
  "overs2": "6.5",
  "winner": "GB",
  "margin": "5 wickets",
  "mom": "Harbhajan Singh (GB) — 4/14",
  "scorecard": {
    "t1Inn": {
      "bat": [
        { "name": "Vaibhav Suryavanshi", "dismissal": "c AHMAD b JANSEN", "runs": 8, "balls": 4 },
        { "name": "Chris Lynn", "dismissal": "c JADEJA b AHMAD", "runs": 26, "balls": 18 },
        { "name": "Kathryn Bryce", "dismissal": "lbw JANSEN", "runs": 4, "balls": 4 },
        { "name": "Tom Blundell", "dismissal": "b AHMAD", "runs": 9, "balls": 5 },
        { "name": "Aaron Hardie", "dismissal": "c MAXWELL b SINGH", "runs": 13, "balls": 6 },
        { "name": "Matt Short", "dismissal": "c KISHAN b SINGH", "runs": 0, "balls": 2 },
        { "name": "Michael Bracewell", "dismissal": "lbw AHMAD", "runs": 9, "balls": 6 },
        { "name": "Rilee Rossouw", "dismissal": "c PERRY b AHMAD", "runs": 0, "balls": 2 },
        { "name": "Orla Prendergast", "dismissal": "c KISHAN b SINGH", "runs": 2, "balls": 2 },
        { "name": "Shamar Springer", "dismissal": "lbw SINGH", "runs": 0, "balls": 1 },
        { "name": "Fazalhaq Farooqi", "dismissal": "not out", "runs": 1, "balls": 2 }
      ],
      "bowl": [
        { "name": "Bhuvneshwar Kumar", "overs": "2.0", "maidens": 0, "runs": 27, "wkts": 0 },
        { "name": "Marco Jansen", "overs": "2.0", "maidens": 0, "runs": 15, "wkts": 2 },
        { "name": "Noor Ahmad", "overs": "2.4", "maidens": 0, "runs": 16, "wkts": 4 },
        { "name": "Harbhajan Singh", "overs": "2.0", "maidens": 0, "runs": 14, "wkts": 4 }
      ],
      "fow": "1-15, 2-19, 3-46, 4-59, 5-59, 6-63, 7-63, 8-72, 9-72, 10-76"
    },
    "t2Inn": {
      "bat": [
        { "name": "Smriti Mandhana", "dismissal": "c WONG b BRACEWELL", "runs": 5, "balls": 4 },
        { "name": "Ishan Kishan", "dismissal": "c BLUNDELL b HARDIE", "runs": 18, "balls": 11 },
        { "name": "Ellyse Perry", "dismissal": "c BLUNDELL b BRACEWELL", "runs": 10, "balls": 4 },
        { "name": "Glenn Maxwell", "dismissal": "lbw HARDIE", "runs": 28, "balls": 12 },
        { "name": "Grant Bauer", "dismissal": "c BLUNDELL b HARDIE", "runs": 0, "balls": 1 },
        { "name": "Ravindra Jadeja", "dismissal": "not out", "runs": 2, "balls": 3 },
        { "name": "Shashank Singh", "dismissal": "not out", "runs": 13, "balls": 6 },
        { "name": "Marco Jansen", "dismissal": "did not bat", "runs": 0, "balls": 0 },
        { "name": "Noor Ahmad", "dismissal": "did not bat", "runs": 0, "balls": 0 },
        { "name": "Harbhajan Singh", "dismissal": "did not bat", "runs": 0, "balls": 0 },
        { "name": "Bhuvneshwar Kumar", "dismissal": "did not bat", "runs": 0, "balls": 0 }
      ],
      "bowl": [
        { "name": "Shamar Springer", "overs": "1.0", "maidens": 0, "runs": 15, "wkts": 0 },
        { "name": "Michael Bracewell", "overs": "2.5", "maidens": 0, "runs": 33, "wkts": 2 },
        { "name": "Matt Short", "overs": "1.0", "maidens": 0, "runs": 11, "wkts": 0 },
        { "name": "Aaron Hardie", "overs": "2.0", "maidens": 0, "runs": 17, "wkts": 3 }
      ],
      "fow": "1-15, 2-25, 3-53, 4-63, 5-64"
    }
  }
};

results.push(newMatch);

const newResultsStr = "results: " + JSON.stringify(results, null, 8).replace(/\n/g, '\n      ') + ",\n      batting:";

currentHtml = currentHtml.replace(/results:\s*\[[\s\S]*?\],\s*batting:/, newResultsStr);

fs.writeFileSync('index.html', currentHtml);
console.log("Match 15 added successfully!");
