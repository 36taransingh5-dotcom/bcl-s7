const fs = require('fs');
let currentHtml = fs.readFileSync('/Users/taran/Desktop/EX-Desktop/minicw/bcl/index.html', 'utf8');

const seedMatch = currentHtml.match(/const SEED = (\{[\s\S]*?\});?(?:\\n|\n)+(?:\\n|\n)?let DB/);
const seed = JSON.parse(seedMatch[1]);

const SQUADS = {
  TT: ['Sanju Samson', 'Laura Wolvaardt', 'Aiden Markram', 'Rassie van der Dussen', 'Dewald Brevis', 'Yuvraj Singh', 'Hardik Pandya', 'Ravi Shastri', 'Mohammed Shami', 'Varun Chakravarthy', 'Alzarri Joseph', 'Trevor Singh', 'Vaibhav Suryavanshi'],
  AA: ['David Warner', 'Travis Head', 'Quinton de Kock', 'Ben Stokes', 'Will Jacks', 'Tim David', 'Aarav Roy', 'Jasprit Bumrah', 'Mohammed Siraj', 'Kuldeep Yadav', 'Ravi Bishnoi', 'Evin Lewis'],
  GB: ['Abhishek Sharma', 'Ishan Kishan', 'Smriti Mandhana', 'Ellyse Perry', 'Rishabh Pant', 'Shashank Singh', 'Axar Patel', 'Marco Jansen', 'Bhuvneshwar Kumar', 'Maheesh Theekshana', 'Arshdeep Singh', 'Grant Bauer'],
  AS: ['Mitchell Marsh', 'Jordan Hermann', 'Temba Bavuma', 'Josh Inglis', 'Alex Carey', 'David Miller', 'Marcus Stoinis', 'Michael Bracewell', 'Jason Behrendorff', 'Yuzvendra Chahal', 'Alana King', 'Nicholas Pooran', 'Ajit Agarkar', 'Sophie Devine', 'Arjun Potter'],
  HH: ['Steve Smith', 'Martin Guptill', 'Shubman Gill', 'Shikhar Dhawan', 'Heinrich Klaasen', 'Washington Sundar', 'Krunal Pandya', 'Harry Kraft', 'Jess Jonassen', 'Fazalhaq Farooqi', 'Mitchell Swepson', 'Rahmanullah Gurbaz', 'Harmanpreet Kaur'],
  VV: ['KL Rahul', 'Rohit Sharma', 'Virat Kohli', 'Joe Root', 'Vivaan Armstrong', 'Alyssa Healy', 'Rachin Ravindra', 'Mitchell Santner', 'Kagiso Rabada', 'Trent Boult', 'Matt Henry', 'Yashasvi Jaiswal']
};

function getPlayerTeam(playerName) {
    for (let t in SQUADS) {
        if (SQUADS[t].includes(playerName)) return t;
    }
    for (let t in SQUADS) {
        for (let p of SQUADS[t]) {
            if (p.includes(playerName) || playerName.includes(p)) return t;
        }
    }
    return null;
}

// Fix swapped innings
let fixedCount = 0;
seed.results.forEach(m => {
    if (!m.scorecard || !m.scorecard.t1Inn || !m.scorecard.t1Inn.bat.length) return;
    let firstBatter = m.scorecard.t1Inn.bat[0].name;
    let actualTeam = getPlayerTeam(firstBatter);
    
    if (actualTeam && actualTeam !== m.team1) {
        console.log(`Fixing Match ${m.match}: Swapping t1Inn (was ${actualTeam}) and t2Inn...`);
        let temp = m.scorecard.t1Inn;
        m.scorecard.t1Inn = m.scorecard.t2Inn;
        m.scorecard.t2Inn = temp;
        fixedCount++;
    }
});
console.log(`Fixed ${fixedCount} matches.`);

// Now completely recalculate batting and bowling stats to clean out duplicates!
seed.batting = [];
seed.bowling = [];

seed.results.forEach(m => {
    if (!m.scorecard) return;
    
    const updateBatting = (teamId, innData) => {
        if (!innData || !innData.bat) return;
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
        if (!innData || !innData.bowl) return;
        innData.bowl.forEach(b => {
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

// Remove any remaining weirdness, e.g. "undefined" or weird names
seed.batting = seed.batting.filter(p => p.name && p.team);
seed.bowling = seed.bowling.filter(p => p.name && p.team);

const newSeedStr = "const SEED = " + JSON.stringify(seed, null, 2) + ";";
currentHtml = currentHtml.replace(/const SEED = \{[\s\S]*?\};?(?:\\n|\n)+(?:\\n|\n)?let DB/, newSeedStr + "\n\nlet DB");
currentHtml = currentHtml.replace(/const STORE_KEY = "bcl7_data_v\d+";/, 'const STORE_KEY = "bcl7_data_v26";');
fs.writeFileSync('/Users/taran/Desktop/EX-Desktop/minicw/bcl/index.html', currentHtml);
console.log("Player dupes fixed and stats recalculated!");
