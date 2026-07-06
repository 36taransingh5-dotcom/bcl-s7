const fs = require('fs');

let currentHtml = fs.readFileSync('index.html', 'utf8');

const resultsMatch = currentHtml.match(/results:\s*(\[[\s\S]*?\]),\s*batting:/);
if (!resultsMatch) {
    console.error("Could not find results array.");
    process.exit(1);
}

let results = eval(resultsMatch[1]);
results = results.filter(m => m.match !== 42);

const newMatch = {
  "match": 42,
  "team1": "HH",
  "team2": "TT",
  "score1": "227/4",
  "overs1": "20.0",
  "score2": "155/10",
  "overs2": "18.3",
  "winner": "HH",
  "margin": "72 runs",
  "mom": "Steve Smith (HH) — 59 (36)",
  "scorecard": {
    "t1Inn": {
      "bat": [
        { "name": "Steve Smith", "dismissal": "lbw SHASTRI", "runs": 59, "balls": 36 },
        { "name": "Shikhar Dhawan", "dismissal": "b GILLESPIE", "runs": 52, "balls": 25 },
        { "name": "Martin Guptill", "dismissal": "c SEIFERT b JOHNSON", "runs": 52, "balls": 32 },
        { "name": "Shubman Gill", "dismissal": "c BREVIS b JOHNSON", "runs": 23, "balls": 14 },
        { "name": "Heinrich Klaasen", "dismissal": "not out", "runs": 37, "balls": 12 },
        { "name": "Suryakumar Yadav", "dismissal": "not out", "runs": 2, "balls": 1 },
        { "name": "Krunal Pandya", "dismissal": "did not bat", "runs": 0, "balls": 0 },
        { "name": "Axar Patel", "dismissal": "did not bat", "runs": 0, "balls": 0 },
        { "name": "Jess Jonassen", "dismissal": "did not bat", "runs": 0, "balls": 0 },
        { "name": "Mitchell Swepson", "dismissal": "did not bat", "runs": 0, "balls": 0 },
        { "name": "Josh Hazlewood", "dismissal": "did not bat", "runs": 0, "balls": 0 }
      ],
      "bowl": [
        { "name": "Mitchell Johnson", "overs": "4.0", "maidens": 0, "runs": 48, "wkts": 2 },
        { "name": "Jason Gillespie", "overs": "4.0", "maidens": 0, "runs": 43, "wkts": 1 },
        { "name": "Hardik Pandya", "overs": "4.0", "maidens": 0, "runs": 49, "wkts": 0 },
        { "name": "Alana King", "overs": "4.0", "maidens": 0, "runs": 42, "wkts": 0 },
        { "name": "Ravi Shastri", "overs": "4.0", "maidens": 0, "runs": 43, "wkts": 1 }
      ],
      "fow": "1-77, 2-156, 3-179, 4-225"
    },
    "t2Inn": {
      "bat": [
        { "name": "Laura Wolvaardt", "dismissal": "c PANDYA b JONASSEN", "runs": 9, "balls": 6 },
        { "name": "Trevor Singh", "dismissal": "c SMITH b HAZLEWOOD", "runs": 2, "balls": 2 },
        { "name": "Dewald Brevis", "dismissal": "c & b JONASSEN", "runs": 3, "balls": 2 },
        { "name": "RVD Dussen", "dismissal": "c GILL b HAZLEWOOD", "runs": 13, "balls": 6 },
        { "name": "Tim Seifert", "dismissal": "lbw HAZLEWOOD", "runs": 6, "balls": 2 },
        { "name": "Jordan Hermann", "dismissal": "c KLAASEN b SWEPSON", "runs": 21, "balls": 18 },
        { "name": "Aiden Markram", "dismissal": "c KLAASEN b SWEPSON", "runs": 29, "balls": 23 },
        { "name": "Ravi Shastri", "dismissal": "lbw PANDYA", "runs": 5, "balls": 8 },
        { "name": "Hardik Pandya", "dismissal": "c GUPTILL b PANDYA", "runs": 56, "balls": 22 },
        { "name": "Alana King", "dismissal": "not out", "runs": 11, "balls": 21 },
        { "name": "Mitchell Johnson", "dismissal": "b PANDYA", "runs": 0, "balls": 1 }
      ],
      "bowl": [
        { "name": "Josh Hazlewood", "overs": "4.0", "maidens": 0, "runs": 29, "wkts": 3 },
        { "name": "Jess Jonassen", "overs": "4.0", "maidens": 0, "runs": 50, "wkts": 2 },
        { "name": "Mitchell Swepson", "overs": "4.0", "maidens": 0, "runs": 33, "wkts": 2 },
        { "name": "Krunal Pandya", "overs": "3.3", "maidens": 0, "runs": 17, "wkts": 3 },
        { "name": "Axar Patel", "overs": "3.0", "maidens": 0, "runs": 26, "wkts": 0 }
      ],
      "fow": "1-3, 2-8, 3-21, 4-27, 5-41, 6-68, 7-81, 8-89, 9-155, 10-155"
    }
  }
};

results.push(newMatch);

const newResultsStr = "results: " + JSON.stringify(results, null, 8).replace(/\n/g, '\n      ') + ",\n      batting:";

currentHtml = currentHtml.replace(/results:\s*\[[\s\S]*?\],\s*batting:/, newResultsStr);

fs.writeFileSync('index.html', currentHtml);
console.log("Match 42 added successfully!");
