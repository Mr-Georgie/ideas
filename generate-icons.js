// Run once: node generate-icons.js
// Requires: npm install --save-dev sharp
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const svg = fs.readFileSync(path.join(__dirname, 'public/favicon.svg'));

async function generate() {
  await sharp(svg).resize(192, 192).png().toFile('public/logo192.png');
  console.log('✓ logo192.png');

  await sharp(svg).resize(512, 512).png().toFile('public/logo512.png');
  console.log('✓ logo512.png');

  // favicon.ico — write a 32x32 PNG named favicon.ico (browsers accept it)
  await sharp(svg).resize(32, 32).png().toFile('public/favicon.ico');
  console.log('✓ favicon.ico');

  console.log('\nDone. Commit the updated files in public/.');
}

generate().catch(err => { console.error(err); process.exit(1); });
