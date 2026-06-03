const fs = require('fs');
const html = fs.readFileSync('index.html','utf8');
const seedMatch = html.match(/const SEED = (\{[\s\S]*?\});\s*\n\s*\nlet DB/);
if (!seedMatch) { console.error('SEED not found'); process.exit(1); }
const SEED = JSON.parse(seedMatch[1]);
const count = SEED.batting.filter(p=>p.name==='Ishan Kishan').length;
console.log('Ishan Kishan entries in SEED batting:', count);
