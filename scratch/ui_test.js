const fs = require('fs');
const { JSDOM } = require('jsdom');

const html = fs.readFileSync('index.html', 'utf8');
const dom = new JSDOM(html, { runScripts: 'dangerously', resources: 'usable' });
const window = dom.window;

function safeCall(matchNum) {
  try {
    window.openScorecardModal(matchNum);
    console.log(`Match ${matchNum} OK`);
  } catch(e) {
    console.error(`Match ${matchNum} ERROR:`, e.message);
  }
}

// Wait a bit for scripts to load
setTimeout(() => {
  const matches = window.DB.results.map(r => r.match);
  matches.forEach(m => safeCall(m));
}, 1000);
