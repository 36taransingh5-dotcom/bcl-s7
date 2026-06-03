const fs = require('fs');
const html = fs.readFileSync('/Users/taran/Desktop/EX-Desktop/minicw/bcl/index.html', 'utf8');

// Extract SEED
const seedStart = html.indexOf('const SEED = {');
const seedEnd = html.indexOf('\nlet DB', seedStart);
const seed = JSON.parse(html.slice(seedStart + 'const SEED = '.length, seedEnd).trim().replace(/;$/, ''));

// Count batting appearances per player from scorecard data in results
const matchPlayerBat = {}; // name -> [matchNums]
const matchPlayerBowl = {}; // name -> [matchNums]
const playerRunsFromScorecard = {}; // name -> total runs
const playerWktsFromScorecard = {}; // name -> total wickets

seed.results.forEach(m => {
  if (!m.scorecard) return;
  const innings = [m.scorecard.inn1, m.scorecard.inn2].filter(Boolean);
  innings.forEach(inn => {
    (inn.bat || []).forEach(b => {
      if (!b.name) return;
      if (!matchPlayerBat[b.name]) matchPlayerBat[b.name] = [];
      matchPlayerBat[b.name].push(m.n);
      playerRunsFromScorecard[b.name] = (playerRunsFromScorecard[b.name] || 0) + (b.r || 0);
    });
    (inn.bowl || []).forEach(b => {
      if (!b.name) return;
      if (!matchPlayerBowl[b.name]) matchPlayerBowl[b.name] = [];
      matchPlayerBowl[b.name].push(m.n);
      playerWktsFromScorecard[b.name] = (playerWktsFromScorecard[b.name] || 0) + (b.w || 0);
    });
  });
});

// Now compare scorecard innings counts vs batting array innings counts
const battingMap = {};
seed.batting.forEach(p => { battingMap[p.name] = p; });
const bowlingMap = {};
seed.bowling.forEach(p => { bowlingMap[p.name] = p; });

console.log('=== BATTING INN DISCREPANCIES (scorecard vs stats array) ===');
let batIssues = 0;
Object.entries(matchPlayerBat).forEach(([name, matches]) => {
  const scorecardInn = matches.length;
  const statsInn = battingMap[name]?.inn || 0;
  if (scorecardInn !== statsInn) {
    batIssues++;
    const scorecardRuns = playerRunsFromScorecard[name] || 0;
    const statsRuns = battingMap[name]?.runs || 0;
    console.log(`  ${name}: scorecard=${scorecardInn} inn / ${scorecardRuns} runs (M: ${matches.join(',')}), stats=${statsInn} inn / ${statsRuns} runs`);
  }
});
if (batIssues === 0) console.log('  None!');

console.log('\n=== BOWLING INN DISCREPANCIES (scorecard vs stats array) ===');
let bowlIssues = 0;
Object.entries(matchPlayerBowl).forEach(([name, matches]) => {
  const scorecardInn = matches.length;
  const statsInn = bowlingMap[name]?.inn || 0;
  if (scorecardInn !== statsInn) {
    bowlIssues++;
    console.log(`  ${name}: scorecard=${scorecardInn} (M: ${matches.join(',')}), stats=${statsInn} wkts=${bowlingMap[name]?.wkts}`);
  }
});
if (bowlIssues === 0) console.log('  None!');

// Specifically check Alex Carey
console.log('\n=== ALEX CAREY DETAIL ===');
const ac = seed.batting.find(p => p.name === 'Alex Carey');
console.log('Stats entry:', JSON.stringify(ac));
console.log('Scorecard match appearances:', matchPlayerBat['Alex Carey']);
console.log('Runs from scorecards:', playerRunsFromScorecard['Alex Carey']);
