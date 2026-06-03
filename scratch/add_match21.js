const fs = require('fs');

let indexHtml = fs.readFileSync('index.html', 'utf8');

// Extract SEED
const seedMatch = indexHtml.match(/const SEED = (\{[\s\S]*?\});?(?:\\n|\n)+(?:\\n|\n)?let DB/);
if (!seedMatch) {
  console.error("SEED not found");
  process.exit(1);
}

let SEED;
try {
  SEED = JSON.parse(seedMatch[1]);
} catch (e) {
  const cleanStr = seedMatch[1].replace(/(\w+):/g, '"$1":').replace(/'/g, '"');
  try { SEED = JSON.parse(cleanStr); } catch(err) {
    SEED = eval('(' + seedMatch[1] + ')');
  }
}

// Match 21 Data
const match21 = {
  match: 21,
  team1: "GB",
  team2: "VV",
  venue: "Headingley",
  score1: "237/9",
  overs1: "20.0",
  score2: "281/6",
  overs2: "20.0",
  winner: "VV",
  margin: "44 runs",
  mom: "KL Rahul (VV) — 67 off 28",
  scorecard: {
    t1Inn: {
      bat: [
        { name: "Abhishek Sharma", dismissal: "c Henry b Boult", runs: 9, balls: 5 },
        { name: "Ellyse Perry", dismissal: "c Healy b Rabada", runs: 19, balls: 10 },
        { name: "Grant Bauer", dismissal: "c Henry b Boult", runs: 20, balls: 12 },
        { name: "Ishan Kishan", dismissal: "c Healy b Rabada", runs: 101, balls: 48 },
        { name: "Axar Patel", dismissal: "c Healy b Boult", runs: 0, balls: 1 },
        { name: "Smriti Mandhana", dismissal: "c Healy b Henry", runs: 47, balls: 23 },
        { name: "Rishabh Pant", dismissal: "b Santner", runs: 5, balls: 3 },
        { name: "Shashank Singh", dismissal: "c Healy b Ravindra", runs: 10, balls: 6 },
        { name: "Marco Jansen", dismissal: "not out", runs: 20, balls: 8 },
        { name: "Bhuvneshwar Kumar", dismissal: "c Healy b Rabada", runs: 0, balls: 3 },
        { name: "Arshdeep Singh", dismissal: "not out", runs: 1, balls: 1 }
      ],
      bowl: [
        { name: "Rachin Ravindra", overs: "4.0", dots: 2, runs: 55, wkts: 1 },
        { name: "Trent Boult", overs: "4.0", dots: 4, runs: 50, wkts: 3 },
        { name: "Kagiso Rabada", overs: "4.0", dots: 13, runs: 31, wkts: 3 },
        { name: "Mitchell Santner", overs: "4.0", dots: 1, runs: 44, wkts: 1 },
        { name: "Matt Henry", overs: "4.0", dots: 2, runs: 57, wkts: 1 }
      ],
      extras: 5,
      fow: [13, 34, 68, 68, 153, 162, 199, 235, 235]
    },
    t2Inn: {
      bat: [
        { name: "Rohit Sharma", dismissal: "c Singh b Jansen", runs: 64, balls: 28 },
        { name: "KL Rahul", dismissal: "b Patel", runs: 67, balls: 28 },
        { name: "Virat Kohli", dismissal: "lbw Theekshana", runs: 37, balls: 12 },
        { name: "Vivaan Armstrong", dismissal: "b Patel", runs: 5, balls: 3 },
        { name: "Yashasvi Jaiswal", dismissal: "c Sharma b Jansen", runs: 52, balls: 27 },
        { name: "Rachin Ravindra", dismissal: "c Kishan b Patel", runs: 2, balls: 3 },
        { name: "Alyssa Healy", dismissal: "not out", runs: 31, balls: 13 },
        { name: "Joe Root", dismissal: "not out", runs: 19, balls: 6 }
      ],
      bowl: [
        { name: "Bhuvneshwar Kumar", overs: "4.0", dots: 2, runs: 61, wkts: 0 },
        { name: "Arshdeep Singh", overs: "4.0", dots: 3, runs: 56, wkts: 0 },
        { name: "Marco Jansen", overs: "4.0", dots: 7, runs: 49, wkts: 2 },
        { name: "Maheesh Theekshana", overs: "4.0", dots: 3, runs: 68, wkts: 1 },
        { name: "Axar Patel", overs: "4.0", dots: 6, runs: 43, wkts: 3 }
      ],
      extras: 4,
      fow: [125, 152, 159, 181, 192, 248]
    }
  }
};

// Insert Result
SEED.results.push(match21);

// Update Points Table
let t1 = SEED.table.find(t => t.id === "GB");
let t2 = SEED.table.find(t => t.id === "VV");

t2.m += 1;
t2.w += 1;
t2.pts += 2;

t1.m += 1;
t1.l += 1;

// Function to calculate NRR
function calculateNRR() {
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
calculateNRR();

// Update Player Stats
function updateBatting(matchData, teamId, innData) {
    innData.bat.forEach(b => {
        let p = SEED.batting.find(p => p.name === b.name && p.team === teamId);
        if (!p) {
            p = { name: b.name, team: teamId, inn: 0, runs: 0, hs: 0, avg: 0, sr: 0, fifties: 0, hundreds: 0, mom: 0, catches: 0, dismissals: 0 };
            if (b.name === "Grant Bauer" || b.name === "Joe Root") p.note = "impact";
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

updateBatting(match21, "GB", match21.scorecard.t1Inn);
updateBatting(match21, "VV", match21.scorecard.t2Inn);
updateBowling(match21, "VV", match21.scorecard.t1Inn);
updateBowling(match21, "GB", match21.scorecard.t2Inn);

// MOM update
let momP = SEED.batting.find(p => p.name === "KL Rahul" && p.team === "VV");
if (momP) momP.mom += 1;

SEED.batting.forEach(p => {
    p.avg = p.dismissals > 0 ? p.runs / p.dismissals : (p.inn > 0 ? p.runs : 0);
});

// Inject back to index.html
const newSeedStr = "const SEED = " + JSON.stringify(SEED, null, 2) + ";";
indexHtml = indexHtml.replace(/const SEED = \{[\s\S]*?\};?(?:\\n|\n)+(?:\\n|\n)?let DB/, newSeedStr + "\\n\\nlet DB");

// Bump STORE_KEY
indexHtml = indexHtml.replace(/const STORE_KEY = "bcl7_data_v\d+";/, 'const STORE_KEY = "bcl7_data_v16";');

fs.writeFileSync('index.html', indexHtml);
console.log("Match 21 added successfully!");
