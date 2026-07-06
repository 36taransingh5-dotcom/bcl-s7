const fs = require('fs');

let currentHtml = fs.readFileSync('index.html', 'utf8');

const resultsMatch = currentHtml.match(/results:\s*(\[[\s\S]*?\]),\s*batting:/);
if (!resultsMatch) {
    console.error("Could not find results array.");
    process.exit(1);
}

let results = eval(resultsMatch[1]);
results = results.filter(m => m.match !== 48);

const newMatch = {
  "match": 48,
  "team1": "VV",
  "team2": "UU",
  "score1": "233/7",
  "overs1": "20.0",
  "score2": "170/8",
  "overs2": "20.0",
  "winner": "VV",
  "margin": "63 runs",
  "mom": "Vivaan Anandabd (VV) — 76 (39)",
  "scorecard": {
    "t1Inn": {
      "bat": [
        { "name": "Rohit Sharma", "dismissal": "b SPRINGER", "runs": 15, "balls": 6 },
        { "name": "KL Rahul", "dismissal": "lbw FAROOQI", "runs": 4, "balls": 4 },
        { "name": "Virat Kohli", "dismissal": "b SPRINGER", "runs": 51, "balls": 31 },
        { "name": "Joe Root", "dismissal": "c LYNN b FAROOQI", "runs": 0, "balls": 1 },
        { "name": "Vivaan Anandabd", "dismissal": "c ROSSOUW b FAROOQI", "runs": 76, "balls": 39 },
        { "name": "Amelia Kerr", "dismissal": "b SPRINGER", "runs": 16, "balls": 13 },
        { "name": "Rachin Ravindra", "dismissal": "lbw BRACEWELL", "runs": 2, "balls": 2 },
        { "name": "Alyssa Healy", "dismissal": "not out", "runs": 43, "balls": 18 },
        { "name": "Mitchell Santner", "dismissal": "not out", "runs": 21, "balls": 7 },
        { "name": "Kagiso Rabada", "dismissal": "did not bat", "runs": 0, "balls": 0 },
        { "name": "Trent Boult", "dismissal": "did not bat", "runs": 0, "balls": 0 }
      ],
      "bowl": [
        { "name": "Aaron Hardie", "overs": "3.0", "maidens": 0, "runs": 56, "wkts": 0 },
        { "name": "Shamar Springer", "overs": "4.0", "maidens": 0, "runs": 29, "wkts": 3 },
        { "name": "Fazalhaq Farooqi", "overs": "4.0", "maidens": 0, "runs": 39, "wkts": 3 },
        { "name": "Michael Bracewell", "overs": "4.0", "maidens": 0, "runs": 34, "wkts": 1 },
        { "name": "Issy Wong", "overs": "1.0", "maidens": 0, "runs": 14, "wkts": 0 },
        { "name": "Matt Short", "overs": "4.0", "maidens": 0, "runs": 57, "wkts": 0 }
      ],
      "fow": "1-19, 2-33, 3-33, 4-119, 5-154, 6-159, 7-184"
    },
    "t2Inn": {
      "bat": [
        { "name": "Chris Lynn", "dismissal": "lbw RABADA", "runs": 21, "balls": 15 },
        { "name": "Vaibhav Suryavanshi", "dismissal": "b RABADA", "runs": 21, "balls": 13 },
        { "name": "Kathryn Bryce", "dismissal": "c SHARMA b KERR", "runs": 17, "balls": 14 },
        { "name": "Tom Blundell", "dismissal": "lbw RAVINDRA", "runs": 32, "balls": 21 },
        { "name": "Aaron Hardie", "dismissal": "c HEALY b RABADA", "runs": 1, "balls": 2 },
        { "name": "Matt Short", "dismissal": "c BOULT b RAVINDRA", "runs": 41, "balls": 28 },
        { "name": "Michael Bracewell", "dismissal": "c KOHLI b BOULT", "runs": 3, "balls": 3 },
        { "name": "Orla Prendergast", "dismissal": "not out", "runs": 16, "balls": 13 },
        { "name": "Rilee Rossouw", "dismissal": "c SHARMA b BOULT", "runs": 9, "balls": 5 },
        { "name": "Shamar Springer", "dismissal": "not out", "runs": 4, "balls": 6 },
        { "name": "Fazalhaq Farooqi", "dismissal": "did not bat", "runs": 0, "balls": 0 }
      ],
      "bowl": [
        { "name": "Vivaan Anandabd", "overs": "1.0", "maidens": 0, "runs": 8, "wkts": 0 },
        { "name": "Trent Boult", "overs": "4.0", "maidens": 0, "runs": 27, "wkts": 2 },
        { "name": "Kagiso Rabada", "overs": "4.0", "maidens": 0, "runs": 28, "wkts": 3 },
        { "name": "Mitchell Santner", "overs": "2.0", "maidens": 0, "runs": 21, "wkts": 0 },
        { "name": "Amelia Kerr", "overs": "4.0", "maidens": 0, "runs": 32, "wkts": 1 },
        { "name": "Rachin Ravindra", "overs": "4.0", "maidens": 0, "runs": 39, "wkts": 2 },
        { "name": "Imran Tahir", "overs": "1.0", "maidens": 0, "runs": 10, "wkts": 0 }
      ],
      "fow": "1-42, 2-43, 3-82, 4-85, 5-130, 6-139, 7-143, 8-157"
    }
  }
};

results.push(newMatch);

const newResultsStr = "results: " + JSON.stringify(results, null, 8).replace(/\n/g, '\n      ') + ",\n      batting:";

currentHtml = currentHtml.replace(/results:\s*\[[\s\S]*?\],\s*batting:/, newResultsStr);

fs.writeFileSync('index.html', currentHtml);
console.log("Match 48 added successfully!");
