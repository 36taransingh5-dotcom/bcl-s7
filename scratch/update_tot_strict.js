const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const s8TeamXI = `  const teamXI = [
    { name: "Travis Head", team: "AA", pos: "Opener", top: "15%", left: "30%" },
    { name: "David Warner", team: "AA", pos: "Opener (C)", top: "15%", left: "70%" },
    { name: "Virat Kohli", team: "VV", pos: "No. 3", top: "27%", left: "50%" },
    { name: "Ellyse Perry", team: "GB", pos: "No. 4", top: "39%", left: "50%" },
    { name: "Glenn Maxwell", team: "GB", pos: "No. 5", top: "50%", left: "50%" },
    { name: "Arjun Potter", team: "AS", pos: "No. 6", top: "60%", left: "28%" },
    { name: "Shivam Dube", team: "SM", pos: "No. 7", top: "60%", left: "72%" },
    { name: "Hardik Pandya", team: "TT", pos: "No. 8", top: "72%", left: "50%" },
    { name: "Liam Dawson", team: "SM", pos: "No. 9 Spinner", top: "83%", left: "22%" },
    { name: "Josh Hazlewood", team: "HH", pos: "No. 10 Pacer", top: "85%", left: "50%" },
    { name: "Noor Ahmad", team: "GB", pos: "No. 11 Spinner", top: "83%", left: "78%" },
    { name: "Jess Jonassen", team: "HH", pos: "Impact Player (BOWL)", top: "7%", left: "50%" }
  ];`;

const s8WorstXI = `  const worstXI = [
    { name: "Sunil Narine", team: "SM", pos: "Opener", top: "15%", left: "30%" },
    { name: "Jordan Hermann", team: "TT", pos: "Opener", top: "15%", left: "70%" },
    { name: "Kathryn Bryce", team: "UU", pos: "No. 3", top: "27%", left: "50%" },
    { name: "Rory Burns", team: "AS", pos: "No. 4", top: "39%", left: "50%" },
    { name: "Aaron Hardie", team: "UU", pos: "No. 5 (C)", top: "50%", left: "50%" },
    { name: "Krunal Pandya", team: "HH", pos: "No. 6", top: "60%", left: "28%" },
    { name: "Michael Bracewell", team: "UU", pos: "No. 7", top: "60%", left: "72%" },
    { name: "Rilee Rossouw", team: "UU", pos: "No. 8", top: "72%", left: "50%" },
    { name: "Krishnappa Gowtham", team: "AS", pos: "No. 9 Spinner", top: "83%", left: "22%" },
    { name: "Kyle Jamieson", team: "AS", pos: "No. 10 Pacer", top: "85%", left: "50%" },
    { name: "Fazalhaq Farooqi", team: "UU", pos: "No. 11 Pacer", top: "83%", left: "78%" },
    { name: "Issy Wong", team: "UU", pos: "Impact Player (BOWL)", top: "7%", left: "50%" }
  ];`;

html = html.replace(/const teamXI = \[\s*\{[\s\S]*?\}\s*\];/, s8TeamXI);
html = html.replace(/const worstXI = \[\s*\{[\s\S]*?\}\s*\];/, s8WorstXI);

// Write back
fs.writeFileSync('index.html', html);
console.log("Updated TOT and Flop XI to strict positions.");
