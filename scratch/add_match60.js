const fs = require('fs');

let currentHtml = fs.readFileSync('index.html', 'utf8');

const resultsMatch = currentHtml.match(/results:\s*(\[[\s\S]*?\]),\s*batting:/);
if (!resultsMatch) {
    console.error("Could not find results array.");
    process.exit(1);
}

let results = eval(resultsMatch[1]);
results = results.filter(m => m.match !== 60);

const newMatch = {
  "match": 60,
  "team1": "AA",
  "team2": "GB",
  "score1": "239/6",
  "overs1": "20.0",
  "score2": "168/10",
  "overs2": "19.2",
  "winner": "AA",
  "margin": "71 runs",
  "mom": "Aarav Roy (AA) — 65 (17) & 1/0",
  "scorecard": {
    "t1Inn": {
      "bat": [
        { "name": "Travis Head", "dismissal": "c & b KUMAR", "runs": 6, "balls": 4 },
        { "name": "David Warner", "dismissal": "lbw JADEJA", "runs": 70, "balls": 38 },
        { "name": "Q de Kock", "dismissal": "c PERRY b KUMAR", "runs": 22, "balls": 9 },
        { "name": "Mitchell Marsh", "dismissal": "c JANSEN b AHMAD", "runs": 10, "balls": 8 },
        { "name": "Will Jacks", "dismissal": "not out", "runs": 36, "balls": 31 },
        { "name": "Aarav Roy", "dismissal": "b JADEJA", "runs": 65, "balls": 17 },
        { "name": "Ben Stokes", "dismissal": "c SINGH b JANSEN", "runs": 27, "balls": 12 },
        { "name": "Tim David", "dismissal": "not out", "runs": 3, "balls": 1 },
        { "name": "Nat Sciver", "dismissal": "did not bat", "runs": 0, "balls": 0 },
        { "name": "Jasprit Bumrah", "dismissal": "did not bat", "runs": 0, "balls": 0 },
        { "name": "Varun Chakravarthy", "dismissal": "did not bat", "runs": 0, "balls": 0 }
      ],
      "bowl": [
        { "name": "Bhuvneshwar Kumar", "overs": "4.0", "maidens": 0, "runs": 57, "wkts": 2 },
        { "name": "Marco Jansen", "overs": "4.0", "maidens": 0, "runs": 61, "wkts": 1 },
        { "name": "Noor Ahmad", "overs": "4.0", "maidens": 0, "runs": 30, "wkts": 1 },
        { "name": "Harbhajan Singh", "overs": "4.0", "maidens": 0, "runs": 47, "wkts": 0 },
        { "name": "Ravindra Jadeja", "overs": "4.0", "maidens": 0, "runs": 44, "wkts": 2 }
      ],
      "fow": "1-6, 2-30, 3-61, 4-124, 5-202, 6-236"
    },
    "t2Inn": {
      "bat": [
        { "name": "Abhishek Sharma", "dismissal": "c DE KOCK b BUMRAH", "runs": 13, "balls": 11 },
        { "name": "Ishan Kishan", "dismissal": "b SIRAJ", "runs": 28, "balls": 14 },
        { "name": "Smriti Mandhana", "dismissal": "b SCIVER", "runs": 26, "balls": 17 },
        { "name": "Ellyse Perry", "dismissal": "c & b SIRAJ", "runs": 0, "balls": 2 },
        { "name": "Grant Bauer", "dismissal": "b CHAKRAVARTHY", "runs": 10, "balls": 7 },
        { "name": "Glenn Maxwell", "dismissal": "lbw SCIVER", "runs": 38, "balls": 18 },
        { "name": "Ravindra Jadeja", "dismissal": "c DE KOCK b SCIVER", "runs": 2, "balls": 6 },
        { "name": "Shashank Singh", "dismissal": "c BUMRAH b CHAKRAVARTHY", "runs": 33, "balls": 17 },
        { "name": "Marco Jansen", "dismissal": "c CHAKRAVARTHY b SIRAJ", "runs": 10, "balls": 10 },
        { "name": "Harbhajan Singh", "dismissal": "not out", "runs": 2, "balls": 9 },
        { "name": "Bhuvneshwar Kumar", "dismissal": "b ROY", "runs": 1, "balls": 6 }
      ],
      "bowl": [
        { "name": "Mohd Siraj", "overs": "4.0", "maidens": 0, "runs": 32, "wkts": 3 },
        { "name": "Jasprit Bumrah", "overs": "4.0", "maidens": 0, "runs": 33, "wkts": 1 },
        { "name": "Will Jacks", "overs": "4.0", "maidens": 0, "runs": 45, "wkts": 0 },
        { "name": "Varun Chakravarthy", "overs": "4.0", "maidens": 0, "runs": 28, "wkts": 2 },
        { "name": "Nat Sciver", "overs": "3.0", "maidens": 0, "runs": 26, "wkts": 3 },
        { "name": "Aarav Roy", "overs": "0.2", "maidens": 0, "runs": 0, "wkts": 1 }
      ],
      "fow": "1-31, 2-43, 3-43, 4-59, 5-118, 6-119, 7-130, 8-148, 9-166, 10-168"
    }
  }
};

results.push(newMatch);

const newResultsStr = "results: " + JSON.stringify(results, null, 8).replace(/\n/g, '\n      ') + ",\n      batting:";

currentHtml = currentHtml.replace(/results:\s*\[[\s\S]*?\],\s*batting:/, newResultsStr);

fs.writeFileSync('index.html', currentHtml);
console.log("Match 60 added successfully!");
