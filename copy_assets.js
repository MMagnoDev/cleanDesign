const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\socia\\.gemini\\antigravity-ide\\brain\\5091c861-cbda-4c8a-ac8d-29506549b5c3';
const destDir = path.join(__dirname, 'public', 'assets', 'clientes');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(srcDir);
files.forEach(file => {
  if (file.startsWith('client_portrait_') && file.endsWith('.png')) {
    const match = file.match(/client_portrait_([a-z]+)_[0-9]+\.png/);
    if (match) {
      const brandName = match[1];
      const srcPath = path.join(srcDir, file);
      const destPath = path.join(destDir, `${brandName}.png`);
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied ${file} -> ${brandName}.png`);
    }
  }
});
console.log('Copy complete!');
