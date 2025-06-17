const fs = require('fs');
const path = require('path');

// Directory to process
const directory = './'; // Change this to the folder containing your files

// File extensions to process
const fileExtensions = ['.js', '.jsx', '.tsx', '.ts'];

// Function to add React import
function addReactImportToFile(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf8');

  // Check if 'import React from "react"' already exists
  if (/import\s+React\s+from\s+['"]react['"]/.test(fileContent)) {
    return; // Skip if already imported
  }

  // Add import at the top
  const updatedContent = `import React from 'react';\n${fileContent}`;
  fs.writeFileSync(filePath, updatedContent, 'utf8');
  console.log(`Updated: ${filePath}`);
}

// Recursively process all files in the directory
function processDirectory(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      processDirectory(filePath); // Recurse into subdirectory
    } else if (fileExtensions.includes(path.extname(file))) {
      addReactImportToFile(filePath);
    }
  });
}

// Start processing
processDirectory(directory);
console.log('Done!');
