const fs = require('fs');
const path = require('path');

const walk = (dir, callback) => {
    fs.readdirSync(dir).forEach(file => {
        const filepath = path.join(dir, file);
        if (fs.statSync(filepath).isDirectory()) {
            walk(filepath, callback);
        } else {
            callback(filepath);
        }
    });
};

const srcDir = path.join(__dirname, 'frontend/src');

walk(srcDir, (filepath) => {
    if (filepath.endsWith('.jsx')) {
        let content = fs.readFileSync(filepath, 'utf8');
        let modified = false;

        // 1. components/common/Button -> components/Button/Button
        content = content.replace(/(['"])(.*?)\/components\/common\/([^'"]+)(['"])/g, (match, p1, prefix, compName, p4) => {
            modified = true;
            return `${p1}${prefix}/components/${compName}/${compName}${p4}`;
        });

        // 2. components/QuickAction -> components/QuickAction/QuickAction
        content = content.replace(/(['"])(.*?)\/components\/([^/'"]+)(['"])/g, (match, p1, prefix, compName, p4) => {
            if (['layout', 'common'].includes(compName)) return match;
            modified = true;
            return `${p1}${prefix}/components/${compName}/${compName}${p4}`;
        });
        
        // 3. ./common/Button -> ../Button/Button
        content = content.replace(/(['"])\.\/common\/([^'"]+)(['"])/g, (match, p1, compName, p3) => {
            modified = true;
            return `${p1}../${compName}/${compName}${p3}`;
        });

        if (modified) {
            fs.writeFileSync(filepath, content, 'utf8');
        }
    }
});

console.log('Updated imports.');
