const fs = require('fs');

let indexHtml = fs.readFileSync('index.html', 'utf8');

// 1. Extract SEED
const seedMatch = indexHtml.match(/const SEED = (\{[\s\S]*?\n\});\n\nlet DB/);
if (!seedMatch) {
  console.error("SEED not found");
  process.exit(1);
}

let SEED;
try {
  SEED = JSON.parse(seedMatch[1]);
} catch (e) {
  // It's a JS object, not pure JSON. Let's use eval
  const cleanStr = seedMatch[1].replace(/(\w+):/g, '"$1":').replace(/'/g, '"');
  try { SEED = JSON.parse(cleanStr); } catch(err) {
    SEED = eval('(' + seedMatch[1] + ')');
  }
}

// Ensure the new player is added to TT squad if needed
// Actually, SQUADS are separate, but we only need to add them to stats arrays.

// Match 31 Data
const match31 = {
  match: 31,
  team1: "HH",
  team2: "TT",
  venue: "National Stadium, Karachi",
  score1: "220/10",
  overs1: "19.1",
  score2: "196/10",
  overs2: "18.3",
  winner: "HH",
  margin: "24 runs",
  mom: "Martin Guptill (HH) — 81 off 38",
  scorecard: {
    t1Inn: {
      bat: [
        { name: "Steve Smith", dismissal: "c Samson b Shami", runs: 35, balls: 14 },
        { name: "Martin Guptill", dismissal: "c Joseph b Shastri", runs: 81, balls: 38 },
        { name: "Shikhar Dhawan", dismissal: "c Samson b Joseph", runs: 16, balls: 7 },
        { name: "Shubman Gill", dismissal: "b Chakravarthy", runs: 5, balls: 4 },
        { name: "Ruturaj Gaikwad", dismissal: "c Pandya b Shastri", runs: 7, balls: 7 },
        { name: "Krunal Pandya", dismissal: "run out Dussen", runs: 19, balls: 8 },
        { name: "Harry Kraft", dismissal: "b Shami", runs: 0, balls: 1 },
        { name: "Washington Sundar", dismissal: "c Dussen b Shastri", runs: 10, balls: 8 },
        { name: "Heinrich Klaasen", dismissal: "b Pandya", runs: 38, balls: 21 },
        { name: "Jess Jonassen", dismissal: "c Shami b Shastri", runs: 0, balls: 1 },
        { name: "Fazalhaq Farooqi", dismissal: "not out", runs: 2, balls: 7 }
      ],
      bowl: [
        { name: "Yuvraj Singh", overs: "2.0", dots: 4, runs: 30, wkts: 0 },
        { name: "Varun Chakravarthy", overs: "4.0", dots: 9, runs: 39, wkts: 1 },
        { name: "Mohammed Shami", overs: "4.0", dots: 8, runs: 50, wkts: 2 }, // Assuming "Mohd Shami" -> "Mohammed Shami"
        { name: "Hardik Pandya", overs: "2.2", dots: 2, runs: 19, wkts: 1 },
        { name: "Alzarri Joseph", overs: "3.0", dots: 6, runs: 38, wkts: 1 },
        { name: "Ravi Shastri", overs: "4.0", dots: 11, runs: 37, wkts: 4 }
      ],
      extras: 7,
      fow: [40, 73, 90, 97, 158, 158, 168, 183, 183, 220]
    },
    t2Inn: {
      bat: [
        { name: "Laura Wolvaardt", dismissal: "c Klaasen b Jonassen", runs: 17, balls: 10 },
        { name: "Sanju Samson", dismissal: "c Kraft b Farooqi", runs: 10, balls: 9 },
        { name: "Yuvraj Singh", dismissal: "b Sundar", runs: 26, balls: 11 },
        { name: "Dewald Brevis", dismissal: "lbw Swepson", runs: 39, balls: 14 },
        { name: "Rassie van der Dussen", dismissal: "b Swepson", runs: 30, balls: 14 }, // "RVD Dussen"
        { name: "Vaibhav Suryavanshi", dismissal: "c Farooqi b Swepson", runs: 43, balls: 23 },
        { name: "Hardik Pandya", dismissal: "run out Pandya", runs: 1, balls: 3 },
        { name: "Aiden Markram", dismissal: "b Farooqi", runs: 17, balls: 12 },
        { name: "Ravi Shastri", dismissal: "b Pandya", runs: 8, balls: 5 },
        { name: "Mohammed Shami", dismissal: "not out", runs: 5, balls: 9 }, // "Mohd Shami"
        { name: "Varun Chakravarthy", dismissal: "c Klaasen b Farooqi", runs: 0, balls: 1 }
      ],
      bowl: [
        { name: "Fazalhaq Farooqi", overs: "3.3", dots: 7, runs: 35, wkts: 3 },
        { name: "Jess Jonassen", overs: "4.0", dots: 4, runs: 46, wkts: 1 },
        { name: "Mitchell Swepson", overs: "4.0", dots: 5, runs: 47, wkts: 3 },
        { name: "Washington Sundar", overs: "4.0", dots: 8, runs: 39, wkts: 1 },
        { name: "Krunal Pandya", overs: "3.0", dots: 4, runs: 29, wkts: 1 }
      ],
      extras: 0,
      fow: [27, 29, 92, 92, 160, 163, 167, 178, 196, 196]
    }
  }
};

// Insert Result
SEED.results.push(match31);

// Update Points Table
let t1 = SEED.table.find(t => t.id === "HH");
let t2 = SEED.table.find(t => t.id === "TT");

t1.m += 1;
t1.w += 1;
t1.pts += 2;

t2.m += 1;
t2.l += 1;

// Function to calculate NRR based on total runs/overs across all matches
function calculateNRR() {
    // Collect runs/overs for and against
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
    
    SEED.results.forEach(res => {
        const t1 = res.team1;
        const t2 = res.team2;
        const s1 = parseScore(res.score1);
        const s2 = parseScore(res.score2);
        
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
    
    SEED.table.forEach(team => {
        const s = stats[team.id];
        if (s.oversFor > 0 && s.oversAgainst > 0) {
            team.nrr = (s.runsFor / s.oversFor) - (s.runsAgainst / s.oversAgainst);
        } else {
            team.nrr = 0; // fallback
        }
    });
}
// Recalculate NRR for all teams since we added a match
calculateNRR();

// Update Player Stats
function updateBatting(matchData, teamId, innData) {
    innData.bat.forEach(b => {
        let p = SEED.batting.find(p => p.name === b.name && p.team === teamId);
        if (!p) {
            p = { name: b.name, team: teamId, inn: 0, runs: 0, hs: 0, avg: 0, sr: 0, fifties: 0, hundreds: 0, mom: 0, catches: 0, dismissals: 0 };
            if(b.name === "Vaibhav Suryavanshi") p.note = "impact";
            SEED.batting.push(p);
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
}

function updateBowling(matchData, teamId, innData) {
    innData.bowl.forEach(b => {
        let p = SEED.bowling.find(p => p.name === b.name && p.team === teamId);
        if (!p) {
            p = { name: b.name, team: teamId, inn: 0, wkts: 0, bbi: "0/0", avg: 0, econ: 0, sr: 0, fourW: 0 };
            SEED.bowling.push(p);
        }
        
        p.inn++;
        p.wkts += b.wkts;
        if (b.wkts >= 4) p.fourW++;
        
        // BBI Logic
        let [bbiW, bbiR] = p.bbi.split('/').map(Number);
        if (b.wkts > bbiW || (b.wkts === bbiW && b.runs < bbiR)) {
            p.bbi = b.wkts + "/" + b.runs;
        }
    });
}

updateBatting(match31, "HH", match31.scorecard.t1Inn);
updateBatting(match31, "TT", match31.scorecard.t2Inn);
updateBowling(match31, "TT", match31.scorecard.t1Inn);
updateBowling(match31, "HH", match31.scorecard.t2Inn);

// MOM update
let momP = SEED.batting.find(p => p.name === "Martin Guptill" && p.team === "HH");
if (momP) momP.mom += 1;

// Full Recalculation for Batting Avg/SR
SEED.batting.forEach(p => {
    p.avg = p.dismissals > 0 ? p.runs / p.dismissals : (p.inn > 0 ? p.runs : 0);
    // SR is hard to perfectly recalculate without historic balls faced. Let's not overwrite historical SR precisely, 
    // but the prompt doesn't strictly track balls faced for season.
    // For simplicity, we just leave SR as is or approximate it if needed. 
    // Actually, we don't have historic balls faced in SEED.batting, so SR is frozen unless we recalculate from all scorecards.
});

// Full Recalculation for Bowling Avg/Econ/SR
SEED.bowling.forEach(p => {
    // Similar to SR, historic runs conceded / overs bowled is not in SEED.bowling. 
    // We will just update wickets and BBI.
});

// Inject back to index.html
const newSeedStr = "const SEED = " + JSON.stringify(SEED, null, 2) + ";";
indexHtml = indexHtml.replace(/const SEED = \{[\s\S]*?\n\};\n\nlet DB/, newSeedStr + "\\n\\nlet DB");

// Bump STORE_KEY
indexHtml = indexHtml.replace(/const STORE_KEY = "bcl7_data_v13";/, 'const STORE_KEY = "bcl7_data_v14";');
// Also if it's currently v12, replace v12 with v14 just in case.
indexHtml = indexHtml.replace(/const STORE_KEY = "bcl7_data_v12";/, 'const STORE_KEY = "bcl7_data_v14";');
indexHtml = indexHtml.replace(/const STORE_KEY = "bcl7_data_v11";/, 'const STORE_KEY = "bcl7_data_v14";');

fs.writeFileSync('index.html', indexHtml);
console.log("Match 31 added successfully!");
