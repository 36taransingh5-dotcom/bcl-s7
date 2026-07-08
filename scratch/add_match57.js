const fs = require('fs');

let currentHtml = fs.readFileSync('index.html', 'utf8');

const resultsMatch = currentHtml.match(/results:\s*(\[[\s\S]*?\]),\s*batting:/);
if (!resultsMatch) {
    console.error("Could not find results array.");
    process.exit(1);
}

let results = eval(resultsMatch[1]);
results = results.filter(m => m.match !== 57);

const newMatch = {
  "match": 57,
  "team1": "AA",
  "team2": "VV",
  "score1": "163/4",
  "overs1": "16.5",
  "score2": "159/9",
  "overs2": "20.0",
  "winner": "AA",
  "margin": "4 runs",
  "mom": "David Warner (AA) — 74 (40)",
  "scorecard": {
    "t1Inn": {
      "bat": [
        { "name": "Travis Head", "dismissal": "lbw BOULT", "runs": 1, "balls": 2 },
        { "name": "David Warner", "dismissal": "c KERR b SANTNER", "runs": 74, "balls": 40 },
        { "name": "Q de Kock", "dismissal": "b BOULT", "runs": 4, "balls": 6 },
        { "name": "Mitchell Marsh", "dismissal": "lbw SANTNER", "runs": 0, "balls": 5 },
        { "name": "Will Jacks", "dismissal": "not out", "runs": 53, "balls": 32 },
        { "name": "Aarav Roy", "dismissal": "not out", "runs": 29, "balls": 16 }
      ],
      "bowl": [
        { "name": "Trent Boult", "overs": "4.0", "maidens": 0, "runs": 32, "wkts": 2 },
        { "name": "Kagiso Rabada", "overs": "3.0", "maidens": 0, "runs": 33, "wkts": 0 },
        { "name": "Mitchell Santner", "overs": "3.5", "maidens": 0, "runs": 44, "wkts": 2 },
        { "name": "Amelia Kerr", "overs": "4.0", "maidens": 0, "runs": 35, "wkts": 0 },
        { "name": "Imran Tahir", "overs": "1.0", "maidens": 0, "runs": 12, "wkts": 0 },
        { "name": "Rachin Ravindra", "overs": "1.0", "maidens": 0, "runs": 5, "wkts": 0 }
      ],
      "fow": "1-2, 2-18, 3-45, 4-112"
    },
    "t2Inn": {
      "bat": [
        { "name": "Rohit Sharma", "dismissal": "c SCIVER b SIRAJ", "runs": 8, "balls": 4 },
        { "name": "KL Rahul", "dismissal": "lbw JACKS", "runs": 30, "balls": 19 },
        { "name": "Virat Kohli", "dismissal": "c DE KOCK b SIRAJ", "runs": 6, "balls": 2 },
        { "name": "Joe Root", "dismissal": "lbw BUMRAH", "runs": 11, "balls": 7 },
        { "name": "Vivaan Anandabd", "dismissal": "lbw CHAKRAVARTHY", "runs": 26, "balls": 11 },
        { "name": "Amelia Kerr", "dismissal": "lbw CHAKRAVARTHY", "runs": 0, "balls": 2 },
        { "name": "Mitchell Santner", "dismissal": "c JACKS b SIRAJ", "runs": 18, "balls": 22 },
        { "name": "Rachin Ravindra", "dismissal": "b CHAKRAVARTHY", "runs": 35, "balls": 33 },
        { "name": "Alyssa Healy", "dismissal": "c HEAD b SCIVER", "runs": 16, "balls": 14 },
        { "name": "Trent Boult", "dismissal": "not out", "runs": 4, "balls": 5 },
        { "name": "Kagiso Rabada", "dismissal": "not out", "runs": 1, "balls": 1 }
      ],
      "bowl": [
        { "name": "Mohd Siraj", "overs": "4.0", "maidens": 0, "runs": 36, "wkts": 3 },
        { "name": "Jasprit Bumrah", "overs": "4.0", "maidens": 0, "runs": 46, "wkts": 1 },
        { "name": "Will Jacks", "overs": "4.0", "maidens": 0, "runs": 25, "wkts": 1 },
        { "name": "Varun Chakravarthy", "overs": "4.0", "maidens": 0, "runs": 24, "wkts": 3 },
        { "name": "Nat Sciver", "overs": "4.0", "maidens": 0, "runs": 27, "wkts": 1 }
      ],
      "fow": "1-8, 2-14, 3-42, 4-81, 5-81, 6-85, 7-125, 8-145, 9-158"
    }
  }
};

results.push(newMatch);

const newResultsStr = "results: " + JSON.stringify(results, null, 8).replace(/\n/g, '\n      ') + ",\n      batting:";

currentHtml = currentHtml.replace(/results:\s*\[[\s\S]*?\],\s*batting:/, newResultsStr);

fs.writeFileSync('index.html', currentHtml);
console.log("Match 57 added successfully!");
