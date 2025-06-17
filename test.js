const fs = require('fs');
const path = require('path');

function renameJsToJsx(dirPath) {
  fs.readdirSync(dirPath).forEach((file) => {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      renameJsToJsx(fullPath); // Recurse into subdirectories
    } else if (stat.isFile() && path.extname(file) === '.js') {
      const newPath = path.join(dirPath, path.basename(file, '.js') + '.jsx');
      fs.renameSync(fullPath, newPath);
      console.log(`Renamed: ${file} → ${path.basename(newPath)}`);
    }
  });
}

// Replace with your target directory (e.g., './src')
const targetDir = path.resolve(__dirname, 'components');

renameJsToJsx(targetDir);
