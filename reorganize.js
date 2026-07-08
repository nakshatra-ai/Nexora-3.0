const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'frontend/src');

// Reorganize components
const componentsDir = path.join(srcDir, 'components');
const commonDir = path.join(componentsDir, 'common');

const moveComponent = (file, sourceDir, destDirName) => {
    const destDir = path.join(componentsDir, destDirName);
    if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
    }
    const sourcePath = path.join(sourceDir, file);
    if (fs.existsSync(sourcePath)) {
        fs.renameSync(sourcePath, path.join(destDir, file));
    }
};

// Move common components
if (fs.existsSync(commonDir)) {
    const commonFiles = fs.readdirSync(commonDir);
    commonFiles.forEach(file => {
        if (file.endsWith('.jsx') || file.endsWith('.css')) {
            const compName = file.replace('.jsx', '').replace('.css', '');
            moveComponent(file, commonDir, compName);
        }
    });
    // Remove common dir if empty
    if (fs.readdirSync(commonDir).length === 0) {
        fs.rmdirSync(commonDir);
    }
}

// Move loose components
const looseFiles = fs.readdirSync(componentsDir).filter(f => fs.statSync(path.join(componentsDir, f)).isFile());
looseFiles.forEach(file => {
    if (file.endsWith('.jsx') || file.endsWith('.css')) {
        const compName = file.replace('.jsx', '').replace('.css', '');
        moveComponent(file, componentsDir, compName);
    }
});

console.log('Moved components successfully.');
