const fs = require('fs');

let currentHtml = fs.readFileSync('index.html', 'utf8');

const resultsMatch = currentHtml.match(/results:\s*(\[[\s\S]*?\]),\s*batting:/);
if (!resultsMatch) {
    console.error("Could not find results array.");
    process.exit(1);
}

let results = eval(resultsMatch[1]);
results = results.filter(m => m.match !== 2);

const newMatch = {
  "match": 2,
  "team1": "VV",
  "team2": "TT",
  "score1": "269/2",
  "overs1": "20.0",
  "score2": "140/10",
  "overs2": "18.5",
  "winner": "VV",
  "margin": "129 runs",
  "mom": "Virat Kohli (VV) — 110 (53)",
  "scorecard": {
    "t1Inn": {
      "bat": [
        { "name": "Rohit Sharma", "dismissal": "not out", "runs": 105, "balls": 51 },
        { "name": "KL Rahul", "dismissal": "lbw JOHNSON", "runs": 5, "balls": 3 },
        { "name": "Virat Kohli", "dismissal": "lbw SCHUTT", "runs": 110, "balls": 53 },
        { "name": "Vivaan Anandabd", "dismissal": "not out", "runs": 42, "balls": 13 },
        { "name": "Rajat Patidar", "dismissal": "did not bat", "runs": 0, "balls": 0 },
        { "name": "Alyssa Healy", "dismissal": "did not bat", "runs": 0, "balls": 0 },
        { "name": "Amelia Kerr", "dismissal": "did not bat", "runs": 0, "balls": 0 },
        { "name": "Mitchell Santner", "dismissal": "did not bat", "runs": 0, "balls": 0 },
        { "name": "Kagiso Rabada", "dismissal": "did not bat", "runs": 0, "balls": 0 },
        { "name": "Trent Boult", "dismissal": "did not bat", "runs": 0, "balls": 0 },
        { "name": "Imran Tahir", "dismissal": "did not bat", "runs": 0, "balls": 0 }
      ],
      "bowl": [
        { "name": "Mitchell Johnson", "overs": "4.0", "maidens": 0, "runs": 40, "wkts": 1 },
        { "name": "Megan Schutt", "overs": "4.0", "maidens": 0, "runs": 60, "wkts": 1 },
        { "name": "Alana King", "overs": "4.0", "maidens": 0, "runs": 45, "wkts": 0 },
        { "name": "Hardik Pandya", "overs": "4.0", "maidens": 0, "runs": 49, "wkts": 0 },
        { "name": "Trevor Singh", "overs": "3.0", "maidens": 0, "runs": 55, "wkts": 0 },
        { "name": "Ravi Shastri", "overs": "1.0", "maidens": 0, "runs": 18, "wkts": 0 }
      ],
      "fow": "1-7, 2-216"
    },
    "t2Inn": {
      "bat": [
        { "name": "Tim Seifert", "dismissal": "c PATIDAR b BOULT", "runs": 0, "balls": 1 },
        { "name": "Dewald Brevis", "dismissal": "c HEALY b RAVINDRA", "runs": 21, "balls": 13 },
        { "name": "Trevor Singh", "dismissal": "c HEALY b SANTNER", "runs": 37, "balls": 19 },
        { "name": "Shafali Verma", "dismissal": "lbw RAVINDRA", "runs": 4, "balls": 5 },
        { "name": "Laura Wolvaardt", "dismissal": "c KERR b RAVINDRA", "runs": 7, "balls": 7 },
        { "name": "Aiden Markram", "dismissal": "c & b KERR", "runs": 5, "balls": 6 },
        { "name": "Jordan Hermann", "dismissal": "lbw TAHIR", "runs": 25, "balls": 14 },
        { "name": "Hardik Pandya", "dismissal": "b RAVINDRA", "runs": 10, "balls": 11 },
        { "name": "Ravi Shastri", "dismissal": "lbw SANTNER", "runs": 11, "balls": 7 },
        { "name": "Alana King", "dismissal": "not out", "runs": 15, "balls": 23 },
        { "name": "Megan Schutt", "dismissal": "lbw BOULT", "runs": 4, "balls": 7 }
      ],
      "bowl": [
        { "name": "Trent Boult", "overs": "2.5", "maidens": 0, "runs": 24, "wkts": 2 },
        { "name": "Kagiso Rabada", "overs": "2.0", "maidens": 0, "runs": 27, "wkts": 0 },
        { "name": "Mitchell Santner", "overs": "4.0", "maidens": 0, "runs": 21, "wkts": 2 },
        { "name": "Rachin Ravindra", "overs": "4.0", "maidens": 0, "runs": 24, "wkts": 4 },
        { "name": "Amelia Kerr", "overs": "4.0", "maidens": 0, "runs": 28, "wkts": 1 },
        { "name": "Imran Tahir", "overs": "1.0", "maidens": 0, "runs": 6, "wkts": 1 },
        { "name": "Virat Kohli", "overs": "1.0", "maidens": 0, "runs": 9, "wkts": 0 }
      ],
      "fow": "1-0, 2-58, 3-62, 4-68, 5-73, 6-75, 7-98, 8-118, 9-120, 10-140"
    }
  }
};

results.push(newMatch);

const newResultsStr = "results: " + JSON.stringify(results, null, 8).replace(/\n/g, '\n      ') + ",\n      batting:";

currentHtml = currentHtml.replace(/results:\s*\[[\s\S]*?\],\s*batting:/, newResultsStr);

fs.writeFileSync('index.html', currentHtml);
console.log("Match 2 added successfully!");
