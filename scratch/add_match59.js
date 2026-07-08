const fs = require('fs');

let currentHtml = fs.readFileSync('index.html', 'utf8');

const resultsMatch = currentHtml.match(/results:\s*(\[[\s\S]*?\]),\s*batting:/);
if (!resultsMatch) {
    console.error("Could not find results array.");
    process.exit(1);
}

let results = eval(resultsMatch[1]);
results = results.filter(m => m.match !== 59);

const newMatch = {
  "match": 59,
  "team1": "GB",
  "team2": "VV",
  "score1": "208/5",
  "overs1": "20.0",
  "score2": "195/7",
  "overs2": "20.0",
  "winner": "GB",
  "margin": "13 runs",
  "mom": "Grant Bauer (GB) — 45 (24)",
  "scorecard": {
    "t1Inn": {
      "bat": [
        { "name": "Smriti Mandhana", "dismissal": "lbw RABADA", "runs": 32, "balls": 18 },
        { "name": "Ishan Kishan", "dismissal": "lbw RABADA", "runs": 26, "balls": 17 },
        { "name": "Ellyse Perry", "dismissal": "b KERR", "runs": 43, "balls": 25 },
        { "name": "Abhishek Sharma", "dismissal": "b TAHIR", "runs": 21, "balls": 17 },
        { "name": "Glenn Maxwell", "dismissal": "b TAHIR", "runs": 27, "balls": 13 },
        { "name": "Grant Bauer", "dismissal": "not out", "runs": 45, "balls": 24 },
        { "name": "Shashank Singh", "dismissal": "not out", "runs": 14, "balls": 6 }
      ],
      "bowl": [
        { "name": "Trent Boult", "overs": "4.0", "maidens": 0, "runs": 45, "wkts": 0 },
        { "name": "Kagiso Rabada", "overs": "4.0", "maidens": 0, "runs": 34, "wkts": 2 },
        { "name": "Mitchell Santner", "overs": "4.0", "maidens": 0, "runs": 45, "wkts": 0 },
        { "name": "Imran Tahir", "overs": "4.0", "maidens": 0, "runs": 37, "wkts": 2 },
        { "name": "Amelia Kerr", "overs": "4.0", "maidens": 0, "runs": 47, "wkts": 1 }
      ],
      "fow": "1-58, 2-59, 3-122, 4-130, 5-175"
    },
    "t2Inn": {
      "bat": [
        { "name": "Rohit Sharma", "dismissal": "c KISHAN b AHMAD", "runs": 46, "balls": 29 },
        { "name": "KL Rahul", "dismissal": "c KISHAN b JANSEN", "runs": 18, "balls": 12 },
        { "name": "Virat Kohli", "dismissal": "c KISHAN b SINGH", "runs": 1, "balls": 2 },
        { "name": "Joe Root", "dismissal": "lbw SINGH", "runs": 9, "balls": 4 },
        { "name": "Vivaan Anandabd", "dismissal": "c KISHAN b AHMAD", "runs": 32, "balls": 19 },
        { "name": "Yashasvi Jaiswal", "dismissal": "c SINGH b SINGH", "runs": 6, "balls": 6 },
        { "name": "Amelia Kerr", "dismissal": "not out", "runs": 47, "balls": 24 },
        { "name": "Alyssa Healy", "dismissal": "b JANSEN", "runs": 32, "balls": 21 },
        { "name": "Mitchell Santner", "dismissal": "not out", "runs": 1, "balls": 3 },
        { "name": "Kagiso Rabada", "dismissal": "did not bat", "runs": 0, "balls": 0 },
        { "name": "Trent Boult", "dismissal": "did not bat", "runs": 0, "balls": 0 }
      ],
      "bowl": [
        { "name": "Bhuvneshwar Kumar", "overs": "4.0", "maidens": 0, "runs": 47, "wkts": 0 },
        { "name": "Marco Jansen", "overs": "4.0", "maidens": 0, "runs": 35, "wkts": 2 },
        { "name": "Noor Ahmad", "overs": "4.0", "maidens": 0, "runs": 28, "wkts": 2 },
        { "name": "Harbhajan Singh", "overs": "4.0", "maidens": 0, "runs": 35, "wkts": 3 },
        { "name": "Ravindra Jadeja", "overs": "4.0", "maidens": 0, "runs": 47, "wkts": 0 }
      ],
      "fow": "1-36, 2-44, 3-54, 4-89, 5-96, 6-124, 7-183"
    }
  }
};

results.push(newMatch);

const newResultsStr = "results: " + JSON.stringify(results, null, 8).replace(/\n/g, '\n      ') + ",\n      batting:";

currentHtml = currentHtml.replace(/results:\s*\[[\s\S]*?\],\s*batting:/, newResultsStr);

fs.writeFileSync('index.html', currentHtml);
console.log("Match 59 added successfully!");
