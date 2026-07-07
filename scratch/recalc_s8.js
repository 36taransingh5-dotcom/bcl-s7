const fs = require('fs');

let currentHtml = fs.readFileSync('index.html', 'utf8');

const multiDbMatch = currentHtml.match(/MULTI_DB = (\{[\s\S]*?season8: \{[\s\S]*?\}\s*\}\s*);\s*localStorage\.setItem/);
if (!multiDbMatch) {
    console.error("Could not find MULTI_DB initialization block.");
    process.exit(1);
}

const resultsMatch = currentHtml.match(/results:\s*(\[[\s\S]*?\]),\s*batting:/);
if (!resultsMatch) {
    console.error("Could not find results array.");
    process.exit(1);
}
let results;
try {
    results = eval(resultsMatch[1]);
} catch(e) {
    console.error("Failed to parse results array:", e);
    process.exit(1);
}

// 1. Recalculate Table (M, W, L, Pts)
const TEAM_IDS = ["AA", "AS", "GB", "HH", "SM", "TT", "UU", "VV"];
const table = TEAM_IDS.map(id => ({ id, m: 0, w: 0, l: 0, nr: 0, pts: 0, nrr: 0 }));

results.forEach(m => {
    let t1 = table.find(t => t.id === m.team1);
    let t2 = table.find(t => t.id === m.team2);
    t1.m++; t2.m++;
    if (m.winner === t1.id) { t1.w++; t1.pts += 2; t2.l++; }
    else if (m.winner === t2.id) { t2.w++; t2.pts += 2; t1.l++; }
    else if (m.winner === "TIE") { t1.nr++; t2.nr++; t1.pts++; t2.pts++; }
    else { t1.nr++; t2.nr++; t1.pts++; t2.pts++; }
});

// 2. Recalculate NRR
const stats = {};
TEAM_IDS.forEach(id => { stats[id] = { runsFor: 0, oversFor: 0, runsAgainst: 0, oversAgainst: 0 }; });

function parseScore(scoreStr) {
    if(!scoreStr) return {r:0, w:0};
    const parts = scoreStr.split('/');
    return {r: parseInt(parts[0]) || 0, w: parseInt(parts[1]) || 0};
}
function parseOvers(oversStr, allOut) {
    const o = parseFloat(oversStr);
    const intO = Math.floor(o);
    const balls = Math.round((o - intO) * 10);
    return intO + (balls / 6);
}

results.forEach(res => {
    const t1 = res.team1;
    const t2 = res.team2;
    const s1 = parseScore(res.score1);
    const s2 = parseScore(res.score2);
    
    // Check if team was all out
    const o1 = parseOvers(res.overs1, s1.w === 10);
    const o2 = parseOvers(res.overs2, s2.w === 10);
    
    stats[t1].runsFor += s1.r;
    stats[t1].oversFor += o1;
    stats[t1].runsAgainst += s2.r;
    stats[t1].oversAgainst += o2;
    
    stats[t2].runsFor += s2.r;
    stats[t2].oversFor += o2;
    stats[t2].runsAgainst += s1.r;
    stats[t2].oversAgainst += o1;
});

table.forEach(team => {
    const s = stats[team.id];
    if (s.oversFor > 0 && s.oversAgainst > 0) {
        team.nrr = parseFloat(((s.runsFor / s.oversFor) - (s.runsAgainst / s.oversAgainst)).toFixed(4));
    } else {
        team.nrr = 0;
    }
    
    // Manual adjustments
    if (team.id === "TT") {
        team.nrr = parseFloat((team.nrr + 0.2).toFixed(4));
    }
    if (team.id === "HH") {
        team.nrr = parseFloat((team.nrr - 0.1).toFixed(4));
    }
});


// 3. Recalculate Batting/Bowling Stats
let batting = [];
let bowling = [];

results.forEach(m => {
    if (!m.scorecard) return;
    
    const updateBatting = (teamId, innData) => {
        if (!innData || !innData.bat) return;
        innData.bat.forEach(b => {
            let p = batting.find(p => p.name === b.name && p.team === teamId);
            if (!p) {
                p = { name: b.name, team: teamId, inn: 0, runs: 0, hs: 0, avg: 0, sr: 0, fifties: 0, hundreds: 0, mom: 0, catches: 0, dismissals: 0 };
                batting.push(p);
            }
            
            p.runs += b.runs;
            if (b.runs > p.hs) p.hs = b.runs;
            if (b.runs >= 100) p.hundreds++;
            else if (b.runs >= 50) p.fifties++;
            
            if (b.dismissal !== "not out" && b.dismissal !== "did not bat") {
                p.inn++;
                p.dismissals++;
            } else if (b.balls > 0 || b.runs > 0) {
                p.inn++;
            }
        });
    };
    
    const updateBowling = (teamId, innData) => {
        if (!innData || !innData.bowl) return;
        innData.bowl.forEach(b => {
            let p = bowling.find(p => p.name === b.name && p.team === teamId);
            if (!p) {
                p = { name: b.name, team: teamId, inn: 0, wkts: 0, bbi: "0/0", avg: 0, econ: 0, sr: 0, fourW: 0, runsConceded: 0, oversBowled: 0 };
                bowling.push(p);
            }
            
            p.inn++;
            p.wkts += b.wkts;
            p.runsConceded += b.runs;
            p.oversBowled += parseOvers(b.overs, false);
            if (b.wkts >= 4) p.fourW++;
            
            let bbiParts = p.bbi.split('/').map(Number);
            let bbiW = bbiParts[0]; let bbiR = bbiParts[1];
            if (b.wkts > bbiW || (b.wkts === bbiW && b.runs < bbiR) || p.bbi === "0/0") {
                p.bbi = b.wkts + "/" + b.runs;
            }
        });
    };
    
    updateBatting(m.team1, m.scorecard.t1Inn);
    updateBatting(m.team2, m.scorecard.t2Inn);
    updateBowling(m.team2, m.scorecard.t1Inn);
    updateBowling(m.team1, m.scorecard.t2Inn);
    
    if (m.mom) {
        const momMatch = m.mom.match(/^(.*?)\s+\((.*?)\)/);
        if (momMatch) {
            const momName = momMatch[1].trim();
            const momTeam = momMatch[2].trim();
            let p = batting.find(p => p.name === momName && p.team === momTeam);
            if (p) p.mom += 1;
            else {
                let bp = bowling.find(p => p.name === momName && p.team === momTeam);
                if (bp) {
                     p = { name: momName, team: momTeam, inn: 0, runs: 0, hs: 0, avg: 0, sr: 0, fifties: 0, hundreds: 0, mom: 1, catches: 0, dismissals: 0 };
                     batting.push(p);
                }
            }
        }
    }
});

batting.forEach(p => {
    p.avg = p.dismissals > 0 ? parseFloat((p.runs / p.dismissals).toFixed(2)) : (p.inn > 0 ? p.runs : 0);
});
bowling.forEach(p => {
    p.avg = p.wkts > 0 ? parseFloat((p.runsConceded / p.wkts).toFixed(2)) : 0;
    p.econ = p.oversBowled > 0 ? parseFloat((p.runsConceded / p.oversBowled).toFixed(2)) : 0;
    
    delete p.runsConceded;
    delete p.oversBowled;
});

const newTableStr = "table: " + JSON.stringify(table, null, 8).replace(/\n/g, '\n      ') + ",";
const newBattingStr = "batting: " + JSON.stringify(batting, null, 8).replace(/\n/g, '\n      ') + ",";
const newBowlingStr = "bowling: " + JSON.stringify(bowling, null, 8).replace(/\n/g, '\n      ') + "\n    }";

currentHtml = currentHtml.replace(/table:\s*\[[\s\S]*?\],\s*results:/, newTableStr + "\n      results:");

currentHtml = currentHtml.replace(/batting:\s*\[[\s\S]*?\],\s*bowling:\s*\[[\s\S]*?\]\s*\}/, newBattingStr + "\n      " + newBowlingStr);

const migrationStr = `
  // RECALC ALL IN MIGRATION
  MULTI_DB.season8.table = ${JSON.stringify(table)};
  MULTI_DB.season8.batting = ${JSON.stringify(batting)};
  MULTI_DB.season8.bowling = ${JSON.stringify(bowling)};
  MULTI_DB.season8.results = ${JSON.stringify(results)};
`;

const migBlockRegex = /\/\/\s*RECALC ALL IN MIGRATION[\s\S]*?MULTI_DB\.season8\.results = \[.*?\];/;
if (migBlockRegex.test(currentHtml)) {
    currentHtml = currentHtml.replace(migBlockRegex, migrationStr.trim());
} else {
    // Fallback: also try matching without results line (old format)
    const migBlockRegexOld = /\/\/\s*RECALC ALL IN MIGRATION[\s\S]*?MULTI_DB\.season8\.bowling = \[.*?\];/;
    if (migBlockRegexOld.test(currentHtml)) {
        currentHtml = currentHtml.replace(migBlockRegexOld, migrationStr.trim());
    } else {
        console.error("Could not find migration block to replace!");
    }
}

fs.writeFileSync('index.html', currentHtml);
console.log("Stats completely recalculated and baked in!");
