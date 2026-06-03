const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const html = fs.readFileSync('../index.html', 'utf8');

const dom = new JSDOM(html, { runScripts: "dangerously" });
const window = dom.window;

// simulate opening modal
try {
  // Let's try match 1
  window.openScorecardModal(1);
  console.log("Match 1 success");
} catch(e) {
  console.error("Match 1 error:", e);
}

try {
  // Let's try match 4
  window.openScorecardModal(4);
  console.log("Match 4 success");
} catch(e) {
  console.error("Match 4 error:", e);
}

try {
  // Let's try match 32
  window.openScorecardModal(32);
  console.log("Match 32 success");
} catch(e) {
  console.error("Match 32 error:", e);
}
