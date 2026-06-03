const fs = require('fs');

let index = fs.readFileSync('index.html', 'utf8');

// 1. Update STORE_KEY
index = index.replace(/const STORE_KEY = "bcl7_data_v12";/, 'const STORE_KEY = "bcl7_data_v13";');

// 2. Replace renderPlayoffs function
const newRenderPlayoffs = `function renderPlayoffs(){
  const c = document.getElementById('playoffsContainer');
  if(!c) return;
  
  const sortedStandings = [...DB.table].sort((a,b)=>b.pts-a.pts||b.nrr-a.nrr);
  const rank1 = sortedStandings[0]?.id || "Rank 1";
  const rank2 = sortedStandings[1]?.id || "Rank 2";
  const rank3 = sortedStandings[2]?.id || "Rank 3";
  const rank4 = sortedStandings[3]?.id || "Rank 4";
  
  const m43 = DB.results.find(r => r.match === 43); // Qualifier 1
  const m44 = DB.results.find(r => r.match === 44); // Eliminator
  const m45 = DB.results.find(r => r.match === 45); // Qualifier 2
  const m46 = DB.results.find(r => r.match === 46); // Final
  
  // Qualifier 1
  const q1Team1 = m43 ? m43.team1 : rank1;
  const q1Team2 = m43 ? m43.team2 : rank2;
  
  // Eliminator
  const elimTeam1 = m44 ? m44.team1 : rank3;
  const elimTeam2 = m44 ? m44.team2 : rank4;
  
  // Qualifier 2 Teams
  let q2Team1 = "Loser Q1";
  let q2Team2 = "Winner Elim";
  if (m43) q2Team1 = m43.winner === m43.team1 ? m43.team2 : m43.team1;
  if (m44) q2Team2 = m44.winner;
  if (m45) {
    q2Team1 = m45.team1;
    q2Team2 = m45.team2;
  }
  
  // Final Teams
  let finalTeam1 = "Winner Q1";
  let finalTeam2 = "Winner Q2";
  if (m43) finalTeam1 = m43.winner;
  if (m45) finalTeam2 = m45.winner;
  if (m46) {
    finalTeam1 = m46.team1;
    finalTeam2 = m46.team2;
  }
  
  const q1Html = renderPlayoffsMatch(43, q1Team1, q1Team2, 1, 2, m43, "Qualifier 1");
  const elimHtml = renderPlayoffsMatch(44, elimTeam1, elimTeam2, 3, 4, m44, "Eliminator");
  const q2Html = renderPlayoffsMatch(45, q2Team1, q2Team2, null, null, m45, "Qualifier 2");
  const finalHtml = renderPlayoffsMatch(46, finalTeam1, finalTeam2, null, null, m46, "Final");
  
  // Champion Card
  let champCardHtml = "";
  if (m46 && m46.winner) {
    const champ = byId(m46.winner);
    champCardHtml = \`
      <div class="bracket-champ-card">
        <div class="champ-trophy">🏆</div>
        <div class="champ-subtitle">BCL Season 7 Champion</div>
        <div class="champ-title">\${champ ? champ.emoji + ' ' + champ.name : m46.winner}</div>
        <div style="font-size:12px; color:var(--green); font-weight:700; margin-top:4px;">Won by \${m46.margin}</div>
      </div>
    \`;
  } else {
    champCardHtml = \`
      <div class="bracket-champ-card" style="opacity: 0.6; border-color: var(--border);">
        <div class="champ-trophy" style="animation: none; opacity: 0.5;">🏆</div>
        <div class="champ-subtitle">BCL Season 7 Champion</div>
        <div class="champ-title" style="color: var(--muted);">TBD</div>
      </div>
    \`;
  }
  
  c.innerHTML = \`
    <div class="bracket-container" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
      <div class="bracket-col">
        <div class="bracket-col-title">Playoffs</div>
        \${q1Html}
        \${elimHtml}
      </div>
      
      <div class="bracket-col">
        <div class="bracket-col-title">Qualifier 2</div>
        <div style="margin-top:40px;"></div>
        \${q2Html}
      </div>
      
      <div class="bracket-col">
        <div class="bracket-col-title">The Final</div>
        \${finalHtml}
        <div style="margin-top: 24px;"></div>
        \${champCardHtml}
      </div>
    </div>
  \`;
}`;

// We also need to modify renderPlayoffsMatch to accept matchType.
// Currently: function renderPlayoffsMatch(matchNum, team1Id, team2Id, seed1Val, seed2Val, res) 
// New: function renderPlayoffsMatch(matchNum, team1Id, team2Id, seed1Val, seed2Val, res, matchType)
const oldRenderPlayoffsMatchRegex = /function renderPlayoffsMatch\([\s\S]*?return `[\s\S]*?`;\n\}/;
const newRenderPlayoffsMatch = `function renderPlayoffsMatch(matchNum, team1Id, team2Id, seed1Val, seed2Val, res, matchType = 'Knockout') {
  const t1 = byId(team1Id);
  const t2 = byId(team2Id);
  
  const name1 = t1 ? t1.name : team1Id;
  const emoji1 = t1 ? t1.emoji : "❓";
  const name2 = t2 ? t2.name : team2Id;
  const emoji2 = t2 ? t2.emoji : "❓";
  
  const score1 = res ? res.score1 : "";
  const score2 = res ? res.score2 : "";
  const overs1 = res ? \`(\${res.overs1})\` : "";
  const overs2 = res ? \`(\${res.overs2})\` : "";
  
  const isT1Win = res && res.winner === team1Id;
  const isT2Win = res && res.winner === team2Id;
  const isFinished = !!res;
  
  const t1Class = isFinished ? (isT1Win ? 'winner' : 'loser') : '';
  const t2Class = isFinished ? (isT2Win ? 'winner' : 'loser') : '';
  const activeClass = isFinished ? '' : 'active-match';
  
  return \`
    <div class="bracket-match \${activeClass}">
      <div class="bracket-match-hdr">
        <span>\${matchType} (M\${matchNum})</span>
        <span>\${res && res.venue ? res.venue : ''}</span>
      </div>
      <div class="bracket-teams">
        <div class="bracket-team \${t1Class}">
          <div class="bracket-team-info">
            \${seed1Val ? \`<span class="bracket-seed">#\${seed1Val}</span>\` : ''}
            <span>\${emoji1} \${name1}</span>
          </div>
          <div class="bracket-score">\${score1} <span style="font-size: 10px; opacity: 0.7;">\${overs1}</span></div>
        </div>
        <div class="bracket-team \${t2Class}">
          <div class="bracket-team-info">
            \${seed2Val ? \`<span class="bracket-seed">#\${seed2Val}</span>\` : ''}
            <span>\${emoji2} \${name2}</span>
          </div>
          <div class="bracket-score">\${score2} <span style="font-size: 10px; opacity: 0.7;">\${overs2}</span></div>
        </div>
      </div>
      \${res && res.margin ? \`<div class="bracket-info-footer">✓ won by \${res.margin}</div>\` : ''}
    </div>
  \`;
}`;

index = index.replace(/function renderPlayoffs\([\s\S]*?<\/div>[\s\S]*?`;\n\}/, newRenderPlayoffs);
index = index.replace(oldRenderPlayoffsMatchRegex, newRenderPlayoffsMatch);

fs.writeFileSync('index.html', index);
console.log("Updated playoffs logic and STORE_KEY.");
