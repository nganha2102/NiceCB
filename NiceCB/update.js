import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Recreate __dirname and __filename in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.resolve(__dirname, 'src');

function walkDir(dir, callback) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach(entry => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath, callback);
    } else if (/\.(ts|tsx|js|jsx)$/.test(entry.name)) {
      callback(fullPath);
    }
  });
}

walkDir(srcDir, (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  const fileDir = path.dirname(filePath);

  // Match import/export paths (e.g., from '../components/Button')
  const updatedContent = content.replace(/(from\s+['"])(.+?)(['"])/g, (match, p1, importPath, p3) => {
    // Only target relative paths (starting with '.')
    if (importPath.startsWith('.')) {
      // Resolve the absolute path of the imported module
      const resolvedPath = path.resolve(fileDir, importPath);
      
      // Ensure the resolved path stays inside the 'src' folder
      if (resolvedPath.startsWith(srcDir)) {
        const relativeToSrc = path.relative(srcDir, resolvedPath);
        // Normalize slashes for cross-platform support and map to alias '@/'
        const aliasPath = '@/' + relativeToSrc.split(path.sep).join('/');
        return `${p1}${aliasPath}${p3}`;
      }
    }
    return match;
  });

  if (content !== updatedContent) {
    fs.writeFileSync(filePath, updatedContent, 'utf8');
    console.log(`Updated: ${path.relative(__dirname, filePath)}`);
  }
});

console.log('Import path update complete!');