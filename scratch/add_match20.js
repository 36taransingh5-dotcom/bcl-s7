const fs = require('fs');

let currentHtml = fs.readFileSync('index.html', 'utf8');

const resultsMatch = currentHtml.match(/results:\s*(\[[\s\S]*?\]),\s*batting:/);
if (!resultsMatch) {
    console.error("Could not find results array.");
    process.exit(1);
}

let results = eval(resultsMatch[1]);
results = results.filter(m => m.match !== 20);

const newMatch = {
  "match": 20,
  "team1": "VV",
  "team2": "UU",
  "score1": "162/9",
  "overs1": "20.0",
  "score2": "163/8",
  "overs2": "20.0",
  "winner": "UU",
  "margin": "2 wickets",
  "mom": "Issy Wong (UU) — 4/18",
  "scorecard": {
    "t1Inn": {
      "bat": [
        { "name": "Rohit Sharma", "dismissal": "lbw FAROOQI", "runs": 30, "balls": 15 },
        { "name": "KL Rahul", "dismissal": "lbw SPRINGER", "runs": 0, "balls": 1 },
        { "name": "Virat Kohli", "dismissal": "b HARDIE", "runs": 48, "balls": 20 },
        { "name": "Joe Root", "dismissal": "lbw WONG", "runs": 4, "balls": 5 },
        { "name": "Vivaan Anandabd", "dismissal": "c BRYCE b SPRINGER", "runs": 0, "balls": 1 },
        { "name": "Amelia Kerr", "dismissal": "b SPRINGER", "runs": 0, "balls": 2 },
        { "name": "Rachin Ravindra", "dismissal": "not out", "runs": 60, "balls": 34 },
        { "name": "Mitchell Santner", "dismissal": "c HARDIE b WONG", "runs": 8, "balls": 10 },
        { "name": "Alyssa Healy", "dismissal": "c HARDIE b WONG", "runs": 0, "balls": 1 },
        { "name": "Kagiso Rabada", "dismissal": "c ROSSOUW b WONG", "runs": 5, "balls": 18 },
        { "name": "Trent Boult", "dismissal": "not out", "runs": 4, "balls": 14 }
      ],
      "bowl": [
        { "name": "Shamar Springer", "overs": "4.0", "maidens": 0, "runs": 34, "wkts": 3 },
        { "name": "Michael Bracewell", "overs": "2.0", "maidens": 0, "runs": 24, "wkts": 0 },
        { "name": "Aaron Hardie", "overs": "3.0", "maidens": 0, "runs": 34, "wkts": 1 },
        { "name": "Fazalhaq Farooqi", "overs": "4.0", "maidens": 0, "runs": 35, "wkts": 1 },
        { "name": "Issy Wong", "overs": "4.0", "maidens": 0, "runs": 18, "wkts": 4 },
        { "name": "Matt Short", "overs": "3.0", "maidens": 0, "runs": 16, "wkts": 0 }
      ],
      "fow": "1-2, 2-63, 3-72, 4-73, 5-73, 6-95, 7-119, 8-119, 9-130"
    },
    "t2Inn": {
      "bat": [
        { "name": "Vaibhav Suryavanshi", "dismissal": "b TAHIR", "runs": 29, "balls": 17 },
        { "name": "Chris Lynn", "dismissal": "b SANTNER", "runs": 15, "balls": 6 },
        { "name": "Kathryn Bryce", "dismissal": "lbw TAHIR", "runs": 2, "balls": 3 },
        { "name": "Tom Blundell", "dismissal": "c HEALY b SANTNER", "runs": 11, "balls": 5 },
        { "name": "Aaron Hardie", "dismissal": "b KERR", "runs": 4, "balls": 7 },
        { "name": "Matt Short", "dismissal": "lbw SANTNER", "runs": 30, "balls": 15 },
        { "name": "Michael Bracewell", "dismissal": "not out", "runs": 46, "balls": 38 },
        { "name": "Rilee Rossouw", "dismissal": "lbw TAHIR", "runs": 14, "balls": 13 },
        { "name": "Orla Prendergast", "dismissal": "lbw RAVINDRA", "runs": 5, "balls": 8 },
        { "name": "Shamar Springer", "dismissal": "not out", "runs": 7, "balls": 8 },
        { "name": "Fazalhaq Farooqi", "dismissal": "did not bat", "runs": 0, "balls": 0 }
      ],
      "bowl": [
        { "name": "Trent Boult", "overs": "1.0", "maidens": 0, "runs": 15, "wkts": 0 },
        { "name": "Kagiso Rabada", "overs": "4.0", "maidens": 0, "runs": 37, "wkts": 0 },
        { "name": "Mitchell Santner", "overs": "4.0", "maidens": 0, "runs": 40, "wkts": 3 },
        { "name": "Imran Tahir", "overs": "4.0", "maidens": 0, "runs": 38, "wkts": 3 },
        { "name": "Amelia Kerr", "overs": "4.0", "maidens": 0, "runs": 15, "wkts": 1 },
        { "name": "Rachin Ravindra", "overs": "3.0", "maidens": 0, "runs": 18, "wkts": 1 }
      ],
      "fow": "1-37, 2-42, 3-55, 4-57, 5-87, 6-110, 7-131, 8-148"
    }
  }
};

results.push(newMatch);

const newResultsStr = "results: " + JSON.stringify(results, null, 8).replace(/\n/g, '\n      ') + ",\n      batting:";

currentHtml = currentHtml.replace(/results:\s*\[[\s\S]*?\],\s*batting:/, newResultsStr);

fs.writeFileSync('index.html', currentHtml);
console.log("Match 20 added successfully!");
