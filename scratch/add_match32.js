const fs = require('fs');

let currentHtml = fs.readFileSync('index.html', 'utf8');

const resultsMatch = currentHtml.match(/results:\s*(\[[\s\S]*?\]),\s*batting:/);
if (!resultsMatch) {
    console.error("Could not find results array.");
    process.exit(1);
}

let results = eval(resultsMatch[1]);
results = results.filter(m => m.match !== 32);

const newMatch = {
  "match": 32,
  "team1": "SM",
  "team2": "HH",
  "score1": "187/10",
  "overs1": "17.5",
  "score2": "189/7",
  "overs2": "19.3",
  "winner": "HH",
  "margin": "3 wickets",
  "mom": "Martin Guptill (HH) — 109 (61)",
  "scorecard": {
    "t1Inn": {
      "bat": [
        { "name": "Yashasvi Jaiswal", "dismissal": "lbw PANDYA", "runs": 26, "balls": 19 },
        { "name": "Sanju Samson", "dismissal": "c HAZLEWOOD b JONASSEN", "runs": 9, "balls": 4 },
        { "name": "Shreyas Iyer", "dismissal": "c KLAASEN b HAZLEWOOD", "runs": 1, "balls": 2 },
        { "name": "Sunil Narine", "dismissal": "c & b HAZLEWOOD", "runs": 3, "balls": 4 },
        { "name": "Gautam Gambhir", "dismissal": "run out KLAASEN", "runs": 76, "balls": 32 },
        { "name": "Andre Russell", "dismissal": "lbw SWEPSON", "runs": 17, "balls": 6 },
        { "name": "Deandra Dottin", "dismissal": "b PATEL", "runs": 19, "balls": 17 },
        { "name": "Shivam Dube", "dismissal": "b SWEPSON", "runs": 11, "balls": 6 },
        { "name": "Shane Miller", "dismissal": "c KLAASEN b PATEL", "runs": 18, "balls": 10 },
        { "name": "Mitchell Starc", "dismissal": "run out PATEL", "runs": 4, "balls": 6 },
        { "name": "Liam Dawson", "dismissal": "not out", "runs": 2, "balls": 2 }
      ],
      "bowl": [
        { "name": "Josh Hazlewood", "overs": "4.0", "maidens": 0, "runs": 30, "wkts": 2 },
        { "name": "Jess Jonassen", "overs": "3.0", "maidens": 0, "runs": 42, "wkts": 1 },
        { "name": "Krunal Pandya", "overs": "3.0", "maidens": 0, "runs": 38, "wkts": 1 },
        { "name": "Mitchell Swepson", "overs": "3.5", "maidens": 0, "runs": 35, "wkts": 2 },
        { "name": "Axar Patel", "overs": "4.0", "maidens": 0, "runs": 42, "wkts": 2 }
      ],
      "fow": "1-12, 2-13, 3-19, 4-60, 5-90, 6-144, 7-163, 8-167, 9-183, 10-187"
    },
    "t2Inn": {
      "bat": [
        { "name": "Steve Smith", "dismissal": "lbw DAWSON", "runs": 6, "balls": 6 },
        { "name": "Shikhar Dhawan", "dismissal": "c & b NARINE", "runs": 0, "balls": 1 },
        { "name": "Martin Guptill", "dismissal": "c SAMSON b DOTTIN", "runs": 109, "balls": 61 },
        { "name": "Suryakumar Yadav", "dismissal": "c SAMSON b CURRAN", "runs": 38, "balls": 25 },
        { "name": "Shubman Gill", "dismissal": "c NARINE b CURRAN", "runs": 7, "balls": 4 },
        { "name": "Heinrich Klaasen", "dismissal": "not out", "runs": 23, "balls": 15 },
        { "name": "Krunal Pandya", "dismissal": "c SAMSON b DOTTIN", "runs": 0, "balls": 1 },
        { "name": "Axar Patel", "dismissal": "b STARC", "runs": 4, "balls": 3 },
        { "name": "Ruturaj Gaikwad", "dismissal": "not out", "runs": 1, "balls": 1 },
        { "name": "Jess Jonassen", "dismissal": "did not bat", "runs": 0, "balls": 0 },
        { "name": "Mitchell Swepson", "dismissal": "did not bat", "runs": 0, "balls": 0 }
      ],
      "bowl": [
        { "name": "Sunil Narine", "overs": "4.0", "maidens": 0, "runs": 39, "wkts": 1 },
        { "name": "Mitchell Starc", "overs": "4.0", "maidens": 0, "runs": 36, "wkts": 1 },
        { "name": "Liam Dawson", "overs": "4.0", "maidens": 0, "runs": 37, "wkts": 1 },
        { "name": "Tom Curran", "overs": "4.0", "maidens": 0, "runs": 32, "wkts": 2 },
        { "name": "Andre Russell", "overs": "2.0", "maidens": 0, "runs": 28, "wkts": 0 },
        { "name": "Deandra Dottin", "overs": "1.3", "maidens": 0, "runs": 16, "wkts": 2 }
      ],
      "fow": "1-1, 2-46, 3-131, 4-151, 5-168, 6-168, 7-179"
    }
  }
};

results.push(newMatch);

const newResultsStr = "results: " + JSON.stringify(results, null, 8).replace(/\n/g, '\n      ') + ",\n      batting:";

currentHtml = currentHtml.replace(/results:\s*\[[\s\S]*?\],\s*batting:/, newResultsStr);

fs.writeFileSync('index.html', currentHtml);
console.log("Match 32 added successfully!");
