const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'frontend', 'src');

// Collect all files
const allFiles = [];
const walk = (dir) => {
    fs.readdirSync(dir).forEach(file => {
        const filepath = path.join(dir, file);
        if (fs.statSync(filepath).isDirectory()) {
            walk(filepath);
        } else {
            allFiles.push(filepath);
        }
    });
};
walk(srcDir);

// Map base name to filepath
const fileMap = {};
allFiles.forEach(f => {
    const parsed = path.parse(f);
    // if there are duplicate names, this simple script might pick the last one, but for components it should be unique enough
    fileMap[parsed.name] = f;
});

let brokenCount = 0;

allFiles.forEach(filepath => {
    if (filepath.endsWith('.jsx')) {
        let content = fs.readFileSync(filepath, 'utf8');
        let modified = false;

        const importRegex = /import\s+[^'"]+['"]([^'"]+)['"]/g;
        let match;
        const replacements = [];

        while ((match = importRegex.exec(content)) !== null) {
            const importPath = match[1];
            if (importPath.startsWith('.')) {
                // Check if it resolves
                const dir = path.dirname(filepath);
                let resolved = path.resolve(dir, importPath);
                
                let exists = false;
                if (fs.existsSync(resolved) && fs.statSync(resolved).isFile()) exists = true;
                if (fs.existsSync(resolved + '.jsx')) exists = true;
                if (fs.existsSync(resolved + '.js')) exists = true;
                if (fs.existsSync(resolved + '.css')) exists = true;

                if (!exists) {
                    // Try to find it in fileMap
                    const targetName = path.basename(importPath);
                    if (fileMap[targetName]) {
                        // Compute new relative path
                        let newRelative = path.relative(dir, fileMap[targetName]);
                        // Normalize to use forward slashes
                        newRelative = newRelative.replace(/\\/g, '/');
                        if (!newRelative.startsWith('.')) {
                            newRelative = './' + newRelative;
                        }
                        // Remove extension for js/jsx
                        newRelative = newRelative.replace(/\.jsx?$/, '');
                        
                        replacements.push({
                            oldImport: importPath,
                            newImport: newRelative
                        });
                    } else {
                        console.log(`Could not find replacement for ${importPath} in ${filepath}`);
                    }
                }
            }
        }

        replacements.forEach(r => {
            content = content.replace(new RegExp(`(['"])${r.oldImport.replace(/\./g, '\\.')}(['"])`, 'g'), `$1${r.newImport}$2`);
            modified = true;
            brokenCount++;
        });

        if (modified) {
            fs.writeFileSync(filepath, content, 'utf8');
        }
    }
});

console.log(`Fixed ${brokenCount} imports!`);
