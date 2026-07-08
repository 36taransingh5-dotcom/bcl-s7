const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');
const resultsMatch = html.match(/results:\s*(\[[\s\S]*?\]),\s*batting:/);
let results = eval(resultsMatch[1]);

// Determine average batting position for each player
let playerPositions = {};

results.forEach(m => {
  if (!m.scorecard) return;
  
  [m.scorecard.t1Inn, m.scorecard.t2Inn].forEach(inn => {
    if (inn && inn.bat) {
      inn.bat.forEach((b, idx) => {
        let name = b.name;
        if (!playerPositions[name]) {
          playerPositions[name] = { totalPos: 0, count: 0, positions: {} };
        }
        playerPositions[name].totalPos += (idx + 1);
        playerPositions[name].count++;
        playerPositions[name].positions[idx + 1] = (playerPositions[name].positions[idx + 1] || 0) + 1;
      });
    }
  });
});

const battingMatch = html.match(/batting:\s*(\[[\s\S]*?\]),\s*bowling:/);
const bowlingMatch = html.match(/bowling:\s*(\[[\s\S]*?\])\s*};\s*const lDB = \{/);
let batting = eval(battingMatch[1]);
let bowling = eval(bowlingMatch[1]);

batting.forEach(b => {
  let posData = playerPositions[b.name];
  if (posData) {
    b.avgPos = posData.totalPos / posData.count;
    // Find most common pos
    let max = 0;
    let mostCommon = 0;
    for (let p in posData.positions) {
      if (posData.positions[p] > max) {
        max = posData.positions[p];
        mostCommon = parseInt(p);
      }
    }
    b.mostCommonPos = mostCommon;
  } else {
    b.mostCommonPos = 11;
  }
});

let sortedBatting = [...batting].sort((a, b) => b.runs - a.runs);
console.log("Top Performers by Position:");

for (let pos = 1; pos <= 8; pos++) {
  let playersAtPos = sortedBatting.filter(b => b.mostCommonPos === pos);
  console.log(`\nPosition ${pos}:`);
  playersAtPos.slice(0, 3).forEach(b => {
    console.log(`  ${b.name} (${b.team}): ${b.runs} runs, ${b.avg.toFixed(2)} avg`);
  });
}

console.log("\nTop Bowlers:");
let sortedBowling = [...bowling].sort((a, b) => b.wkts - a.wkts || a.econ - b.econ);
sortedBowling.slice(0, 5).forEach(b => {
  console.log(`  ${b.name} (${b.team}): ${b.wkts} wkts, ${b.avg.toFixed(2)} avg`);
});

console.log("\nWorst Performers by Position (Min 4 inns):");
let worstSorted = [...batting].filter(b => b.inn >= 4).sort((a, b) => a.avg - b.avg);
for (let pos = 1; pos <= 8; pos++) {
  let playersAtPos = worstSorted.filter(b => b.mostCommonPos === pos);
  console.log(`\nPosition ${pos}:`);
  playersAtPos.slice(0, 3).forEach(b => {
    console.log(`  ${b.name} (${b.team}): ${b.runs} runs, ${b.avg.toFixed(2)} avg`);
  });
}
