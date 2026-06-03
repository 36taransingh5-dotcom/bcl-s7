const fs = require('fs');

let currentHtml = fs.readFileSync('index.html', 'utf8');

const seedMatch = currentHtml.match(/const SEED = (\{[\s\S]*?\});?(?:\\n|\n)+(?:\\n|\n)?let DB/);
const seed = JSON.parse(seedMatch[1]);

// 1. Recalculate Table (M, W, L, Pts)
seed.table.forEach(t => { t.m = 0; t.w = 0; t.l = 0; t.pts = 0; t.nr = 0; });

seed.results.forEach(m => {
    let t1 = seed.table.find(t => t.id === m.team1);
    let t2 = seed.table.find(t => t.id === m.team2);
    t1.m++; t2.m++;
    if (m.winner === t1.id) { t1.w++; t1.pts += 2; t2.l++; }
    else if (m.winner === t2.id) { t2.w++; t2.pts += 2; t1.l++; }
    else { t1.nr++; t2.nr++; t1.pts++; t2.pts++; }
});

// 2. Recalculate NRR
const stats = {
    "HH": { runsFor: 0, oversFor: 0, runsAgainst: 0, oversAgainst: 0 },
    "AS": { runsFor: 0, oversFor: 0, runsAgainst: 0, oversAgainst: 0 },
    "AA": { runsFor: 0, oversFor: 0, runsAgainst: 0, oversAgainst: 0 },
    "GB": { runsFor: 0, oversFor: 0, runsAgainst: 0, oversAgainst: 0 },
    "TT": { runsFor: 0, oversFor: 0, runsAgainst: 0, oversAgainst: 0 },
    "VV": { runsFor: 0, oversFor: 0, runsAgainst: 0, oversAgainst: 0 }
};

function parseScore(scoreStr) {
    if(!scoreStr) return {r:0, w:0};
    const parts = scoreStr.split('/');
    return {r: parseInt(parts[0]) || 0, w: parseInt(parts[1]) || 0};
}
function parseOvers(oversStr, allOut) {
    if(allOut) return 20.0;
    const o = parseFloat(oversStr);
    const intO = Math.floor(o);
    const balls = Math.round((o - intO) * 10);
    return intO + (balls / 6);
}

seed.results.forEach(res => {
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

seed.table.forEach(team => {
    const s = stats[team.id];
    if (s.oversFor > 0 && s.oversAgainst > 0) {
        team.nrr = parseFloat(((s.runsFor / s.oversFor) - (s.runsAgainst / s.oversAgainst)).toFixed(4));
    } else {
        team.nrr = 0;
    }
});

// 3. Recalculate Batting/Bowling Stats
seed.batting = [];
seed.bowling = [];

seed.results.forEach(m => {
    if (!m.scorecard) return;
    
    const updateBatting = (teamId, innData) => {
        innData.bat.forEach(b => {
            let p = seed.batting.find(p => p.name === b.name && p.team === teamId);
            if (!p) {
                p = { name: b.name, team: teamId, inn: 0, runs: 0, hs: 0, avg: 0, sr: 0, fifties: 0, hundreds: 0, mom: 0, catches: 0, dismissals: 0 };
                seed.batting.push(p);
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
        (innData.bowl || []).forEach(b => {
            let p = seed.bowling.find(p => p.name === b.name && p.team === teamId);
            if (!p) {
                p = { name: b.name, team: teamId, inn: 0, wkts: 0, bbi: "0/0", avg: 0, econ: 0, sr: 0, fourW: 0 };
                seed.bowling.push(p);
            }
            
            p.inn++;
            p.wkts += b.wkts;
            if (b.wkts >= 4) p.fourW++;
            
            let [bbiW, bbiR] = p.bbi.split('/').map(Number);
            if (b.wkts > bbiW || (b.wkts === bbiW && b.runs < bbiR)) {
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
            let p = seed.batting.find(p => p.name === momName && p.team === momTeam);
            if (p) p.mom += 1;
            else {
                let bp = seed.bowling.find(p => p.name === momName && p.team === momTeam);
                if (bp) {
                     p = { name: momName, team: momTeam, inn: 0, runs: 0, hs: 0, avg: 0, sr: 0, fifties: 0, hundreds: 0, mom: 1, catches: 0, dismissals: 0 };
                     seed.batting.push(p);
                }
            }
        }
    }
});

seed.batting.forEach(p => {
    p.avg = p.dismissals > 0 ? parseFloat((p.runs / p.dismissals).toFixed(2)) : (p.inn > 0 ? p.runs : 0);
});

const newSeedStr = "const SEED = " + JSON.stringify(seed, null, 2) + ";";
currentHtml = currentHtml.replace(/const SEED = \{[\s\S]*?\};?(?:\\n|\n)+(?:\\n|\n)?let DB/, newSeedStr + "\n\nlet DB");
currentHtml = currentHtml.replace(/const STORE_KEY = "bcl7_data_v\d+";/, 'const STORE_KEY = "bcl7_data_v25";');
fs.writeFileSync('index.html', currentHtml);
console.log("Match 22 stats and NRR successfully processed and merged!");
