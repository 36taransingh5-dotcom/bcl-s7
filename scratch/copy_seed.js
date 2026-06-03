const fs = require('fs');

const extracted = fs.readFileSync('extracted.js', 'utf8');
const index = fs.readFileSync('index.html', 'utf8');

// Extract SEED from extracted.js
const seedMatch = extracted.match(/const SEED = {([\s\S]*?)\n};\n\nlet DB/);
if (!seedMatch) {
    console.error("Could not find SEED in extracted.js");
    process.exit(1);
}
const seedContent = `const SEED = {${seedMatch[1]}\n};`;

// Replace SEED in index.html
const replacedIndex = index.replace(/const SEED = {[\s\S]*?\n};\n\nlet DB/, `${seedContent}\n\nlet DB`);

fs.writeFileSync('index.html', replacedIndex);
console.log("Replaced SEED in index.html!");
