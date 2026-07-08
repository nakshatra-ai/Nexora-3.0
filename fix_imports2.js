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

        // Fix ../common/Comp -> ../Comp/Comp
        content = content.replace(/(['"])\.\.\/common\/([^'"]+)(['"])/g, (match, p1, compName, p3) => {
            modified = true;
            return ${p1}..//;
        });

        // Fix ../../common/Comp -> ../../Comp/Comp
        content = content.replace(/(['"])\.\.\/\.\.\/common\/([^'"]+)(['"])/g, (match, p1, compName, p3) => {
            modified = true;
            return ${p1}../..//;
        });
        
        // Fix components/Context/AppContext -> we didn't move AppContext yet, but CreateRequestModal was moved into a subfolder!
        // So CreateRequestModal/CreateRequestModal.jsx needs its imports shifted by 1 level!
        // Any import that starts with ../ but isn't ../common needs an extra ../ if it's in a new folder.
        // Actually, let's just fix the CreateRequestModal specifically if needed, or wait for next build.
        
        if (modified) {
            fs.writeFileSync(filepath, content, 'utf8');
        }
    }
});
console.log('Fixed more common imports.');
