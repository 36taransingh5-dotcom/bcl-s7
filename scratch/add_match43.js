const fs = require('fs');

let currentHtml = fs.readFileSync('index.html', 'utf8');

const resultsMatch = currentHtml.match(/results:\s*(\[[\s\S]*?\]),\s*batting:/);
if (!resultsMatch) {
    console.error("Could not find results array.");
    process.exit(1);
}

let results = eval(resultsMatch[1]);
results = results.filter(m => m.match !== 43);

const newMatch = {
  "match": 43,
  "team1": "UU",
  "team2": "GB",
  "score1": "219/3",
  "overs1": "20.0",
  "score2": "220/6",
  "overs2": "15.4",
  "winner": "GB",
  "margin": "4 wickets",
  "mom": "Glenn Maxwell (GB) — 61 (25)",
  "scorecard": {
    "t1Inn": {
      "bat": [
        { "name": "Vaibhav Suryavanshi", "dismissal": "b JADEJA", "runs": 69, "balls": 35 },
        { "name": "Chris Lynn", "dismissal": "lbw AHMAD", "runs": 38, "balls": 25 },
        { "name": "Kathryn Bryce", "dismissal": "lbw KUMAR", "runs": 32, "balls": 20 },
        { "name": "Tom Blundell", "dismissal": "not out", "runs": 41, "balls": 25 },
        { "name": "Aaron Hardie", "dismissal": "not out", "runs": 36, "balls": 16 },
        { "name": "Matt Short", "dismissal": "did not bat", "runs": 0, "balls": 0 },
        { "name": "Michael Bracewell", "dismissal": "did not bat", "runs": 0, "balls": 0 },
        { "name": "Rilee Rossouw", "dismissal": "did not bat", "runs": 0, "balls": 0 },
        { "name": "Issy Wong", "dismissal": "did not bat", "runs": 0, "balls": 0 },
        { "name": "Shamar Springer", "dismissal": "did not bat", "runs": 0, "balls": 0 },
        { "name": "Fazalhaq Farooqi", "dismissal": "did not bat", "runs": 0, "balls": 0 }
      ],
      "bowl": [
        { "name": "Bhuvneshwar Kumar", "overs": "4.0", "maidens": 0, "runs": 47, "wkts": 1 },
        { "name": "Marco Jansen", "overs": "4.0", "maidens": 0, "runs": 57, "wkts": 0 },
        { "name": "Noor Ahmad", "overs": "4.0", "maidens": 0, "runs": 25, "wkts": 1 },
        { "name": "Harbhajan Singh", "overs": "4.0", "maidens": 0, "runs": 43, "wkts": 0 },
        { "name": "Ravindra Jadeja", "overs": "4.0", "maidens": 0, "runs": 45, "wkts": 1 }
      ],
      "fow": "1-93, 2-122, 3-160"
    },
    "t2Inn": {
      "bat": [
        { "name": "Abhishek Sharma", "dismissal": "c & b SPRINGER", "runs": 58, "balls": 23 },
        { "name": "Ishan Kishan", "dismissal": "b SPRINGER", "runs": 15, "balls": 6 },
        { "name": "Smriti Mandhana", "dismissal": "c SPRINGER b HARDIE", "runs": 33, "balls": 12 },
        { "name": "Ellyse Perry", "dismissal": "lbw BRACEWELL", "runs": 8, "balls": 6 },
        { "name": "Glenn Maxwell", "dismissal": "not out", "runs": 61, "balls": 25 },
        { "name": "Grant Bauer", "dismissal": "c BLUNDELL b SHORT", "runs": 24, "balls": 11 },
        { "name": "Ravindra Jadeja", "dismissal": "c BLUNDELL b SHORT", "runs": 12, "balls": 9 },
        { "name": "Shashank Singh", "dismissal": "not out", "runs": 3, "balls": 2 },
        { "name": "Marco Jansen", "dismissal": "did not bat", "runs": 0, "balls": 0 },
        { "name": "Harbhajan Singh", "dismissal": "did not bat", "runs": 0, "balls": 0 },
        { "name": "Bhuvneshwar Kumar", "dismissal": "did not bat", "runs": 0, "balls": 0 }
      ],
      "bowl": [
        { "name": "Shamar Springer", "overs": "4.0", "maidens": 0, "runs": 41, "wkts": 2 },
        { "name": "Fazalhaq Farooqi", "overs": "1.0", "maidens": 0, "runs": 23, "wkts": 0 },
        { "name": "Michael Bracewell", "overs": "4.0", "maidens": 0, "runs": 47, "wkts": 1 },
        { "name": "Issy Wong", "overs": "2.0", "maidens": 0, "runs": 39, "wkts": 0 },
        { "name": "Aaron Hardie", "overs": "2.0", "maidens": 0, "runs": 28, "wkts": 1 },
        { "name": "Spencer Johnson", "overs": "1.0", "maidens": 0, "runs": 21, "wkts": 0 },
        { "name": "Matt Short", "overs": "1.4", "maidens": 0, "runs": 15, "wkts": 2 }
      ],
      "fow": "1-39, 2-84, 3-101, 4-139, 5-195, 6-217"
    }
  }
};

results.push(newMatch);

const newResultsStr = "results: " + JSON.stringify(results, null, 8).replace(/\n/g, '\n      ') + ",\n      batting:";

currentHtml = currentHtml.replace(/results:\s*\[[\s\S]*?\],\s*batting:/, newResultsStr);

fs.writeFileSync('index.html', currentHtml);
console.log("Match 43 added successfully!");
