const fs = require('fs');

let currentHtml = fs.readFileSync('index.html', 'utf8');

const resultsMatch = currentHtml.match(/results:\s*(\[[\s\S]*?\]),\s*batting:/);
if (!resultsMatch) {
    console.error("Could not find results array.");
    process.exit(1);
}

let results = eval(resultsMatch[1]);
results = results.filter(m => m.match !== 30);

const newMatch = {
  "match": 30,
  "team1": "UU",
  "team2": "AS",
  "score1": "0/0",
  "overs1": "0.0",
  "score2": "0/0",
  "overs2": "0.0",
  "winner": "TIE",
  "margin": "Match Abandoned",
  "mom": "None"
};

results.push(newMatch);
// sort by match number
results.sort((a, b) => a.match - b.match);

const newResultsStr = "results: " + JSON.stringify(results, null, 8).replace(/\n/g, '\n      ') + ",\n      batting:";

currentHtml = currentHtml.replace(/results:\s*\[[\s\S]*?\],\s*batting:/, newResultsStr);

fs.writeFileSync('index.html', currentHtml);
console.log("Match 30 added successfully!");
