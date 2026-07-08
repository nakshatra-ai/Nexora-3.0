const fs = require('fs');
const path = require('path');

const walk = (dir, callback) => {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir).forEach(file => {
        const filepath = path.join(dir, file);
        if (fs.statSync(filepath).isDirectory()) {
            walk(filepath, callback);
        } else {
            callback(filepath);
        }
    });
};

const srcDir = path.join(__dirname, 'frontend/src/pages');

// Move page components to their own folders
fs.readdirSync(srcDir).forEach(page => {
    const pageCompDir = path.join(srcDir, page, 'components');
    if (fs.existsSync(pageCompDir)) {
        const files = fs.readdirSync(pageCompDir).filter(f => fs.statSync(path.join(pageCompDir, f)).isFile());
        files.forEach(file => {
            if (file.endsWith('.jsx') || file.endsWith('.css')) {
                const compName = file.replace('.jsx', '').replace('.css', '');
                const destDir = path.join(pageCompDir, compName);
                if (!fs.existsSync(destDir)) {
                    fs.mkdirSync(destDir, { recursive: true });
                }
                fs.renameSync(path.join(pageCompDir, file), path.join(destDir, file));
            }
        });
    }
});
console.log('Fixed page components.');
