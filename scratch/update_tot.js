const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const s8TeamXI = `  const teamXI = [
    { name: "David Warner", team: "AA", pos: "Opener", top: "15%", left: "30%" },
    { name: "Ishan Kishan", team: "GB", pos: "Opener / WK", top: "15%", left: "70%" },
    { name: "Glenn Maxwell", team: "GB", pos: "No. 3", top: "27%", left: "50%" },
    { name: "Vivaan Anandabd", team: "VV", pos: "No. 4 (C)", top: "39%", left: "50%" },
    { name: "Virat Kohli", team: "VV", pos: "No. 5", top: "50%", left: "50%" },
    { name: "Will Jacks", team: "AA", pos: "No. 6 All-rounder (S)", top: "60%", left: "28%" },
    { name: "Hardik Pandya", team: "TT", pos: "No. 7 All-rounder (P)", top: "60%", left: "72%" },
    { name: "Liam Dawson", team: "SM", pos: "No. 8 All-rounder (S)", top: "72%", left: "50%" },
    { name: "Kagiso Rabada", team: "VV", pos: "No. 9 Pacer", top: "83%", left: "22%" },
    { name: "Josh Hazlewood", team: "HH", pos: "No. 10 Pacer", top: "85%", left: "50%" },
    { name: "Noor Ahmad", team: "GB", pos: "No. 11 Spinner", top: "83%", left: "78%" },
    { name: "Jess Jonassen", team: "HH", pos: "Impact Player (BOWL)", top: "7%", left: "50%" }
  ];`;

const s8WorstXI = `  const worstXI = [
    { name: "Sunil Narine", team: "SM", pos: "Opener", top: "15%", left: "30%" },
    { name: "Rilee Rossouw", team: "UU", pos: "Opener", top: "15%", left: "70%" },
    { name: "Orla Prendergast", team: "UU", pos: "No. 3", top: "27%", left: "50%" },
    { name: "Aaron Hardie", team: "UU", pos: "No. 4 (C)", top: "39%", left: "50%" },
    { name: "Krishnappa Gowtham", team: "AS", pos: "No. 5", top: "50%", left: "50%" },
    { name: "Arjun Potter", team: "AS", pos: "No. 6 All-rounder (P)", top: "60%", left: "28%" },
    { name: "Yuzvendra Chahal", team: "AS", pos: "No. 7 Spinner", top: "60%", left: "72%" },
    { name: "Kyle Jamieson", team: "AS", pos: "No. 8 Pacer", top: "72%", left: "50%" },
    { name: "Fazalhaq Farooqi", team: "UU", pos: "No. 9 Pacer", top: "83%", left: "22%" },
    { name: "Bhuvneshwar Kumar", team: "GB", pos: "No. 10 Pacer", top: "85%", left: "50%" },
    { name: "Issy Wong", team: "UU", pos: "No. 11 Pacer", top: "83%", left: "78%" },
    { name: "Matt Short", team: "UU", pos: "Impact Player (BAT)", top: "7%", left: "50%" }
  ];`;

html = html.replace(/const teamXI = \[\s*\{[\s\S]*?\}\s*\];/, s8TeamXI);
html = html.replace(/const worstXI = \[\s*\{[\s\S]*?\}\s*\];/, s8WorstXI);

// Replace "Season 7" with "Season 8" in the TOT titles and descriptions
html = html.replace(/BCL Season 7 Team of the Tournament/g, "BCL Season 8 Team of the Tournament");
html = html.replace(/BCL Season 7 Worst Team of the Tournament/g, "BCL Season 8 Worst Team of the Tournament");

// Write back
fs.writeFileSync('index.html', html);
console.log("Updated TOT and Flop XI for Season 8");
