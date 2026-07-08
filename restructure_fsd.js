const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'frontend/src');

// Define FSD directories
const dirs = ['app', 'pages', 'widgets', 'features', 'entities', 'shared/ui', 'shared/api', 'shared/lib', 'shared/config'];
dirs.forEach(d => {
    const p = path.join(srcDir, d);
    if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
});

const moveSafe = (srcFile, destDir) => {
    if (fs.existsSync(srcFile)) {
        const basename = path.basename(srcFile);
        const dest = path.join(destDir, basename);
        if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
        fs.renameSync(srcFile, dest);
    }
};

const moveFolder = (srcFolder, destFolder) => {
    if (fs.existsSync(srcFolder)) {
        if (!fs.existsSync(destFolder)) fs.mkdirSync(destFolder, { recursive: true });
        fs.readdirSync(srcFolder).forEach(file => {
            fs.renameSync(path.join(srcFolder, file), path.join(destFolder, file));
        });
        try { fs.rmdirSync(srcFolder); } catch(e) {}
    }
};

// 1. Move to APP
moveSafe(path.join(srcDir, 'App.jsx'), path.join(srcDir, 'app'));
moveSafe(path.join(srcDir, 'App.css'), path.join(srcDir, 'app'));
moveSafe(path.join(srcDir, 'main.jsx'), path.join(srcDir, 'app'));
moveFolder(path.join(srcDir, 'context'), path.join(srcDir, 'app/providers'));
moveFolder(path.join(srcDir, 'styles'), path.join(srcDir, 'app/styles'));

// 2. Move to SHARED
moveFolder(path.join(srcDir, 'assets'), path.join(srcDir, 'shared/assets'));
moveFolder(path.join(srcDir, 'utils'), path.join(srcDir, 'shared/lib'));
moveFolder(path.join(srcDir, 'hooks'), path.join(srcDir, 'shared/lib/hooks'));

// 3. Move UI components to SHARED/UI
// First move all current components to shared/ui, except those that are features/widgets.
const componentsDir = path.join(srcDir, 'components');
if (fs.existsSync(componentsDir)) {
    fs.readdirSync(componentsDir).forEach(item => {
        const itemPath = path.join(componentsDir, item);
        if (fs.statSync(itemPath).isDirectory()) {
            if (item === 'layout') {
                moveFolder(itemPath, path.join(srcDir, 'widgets'));
            } else if (['CreateRequestModal', 'FeedbackModal', 'AdminAccessModal', 'WifiSpeedTest'].includes(item)) {
                moveFolder(itemPath, path.join(srcDir, 'features', item));
            } else if (['StatusBadge', 'KPICard', 'QuickAction'].includes(item)) {
                moveFolder(itemPath, path.join(srcDir, 'entities', item));
            } else {
                moveFolder(itemPath, path.join(srcDir, 'shared/ui', item));
            }
        } else {
            moveSafe(itemPath, path.join(srcDir, 'shared/ui'));
        }
    });
    try { fs.rmdirSync(componentsDir); } catch(e) {}
}

// 4. Extract features/entities from pages
const pagesDir = path.join(srcDir, 'pages');
if (fs.existsSync(pagesDir)) {
    fs.readdirSync(pagesDir).forEach(page => {
        const pageDir = path.join(pagesDir, page);
        if (fs.statSync(pageDir).isDirectory()) {
            // Find components inside page
            if (fs.existsSync(pageDir)) {
                fs.readdirSync(pageDir).forEach(comp => {
                    const compPath = path.join(pageDir, comp);
                    if (fs.statSync(compPath).isDirectory()) {
                        // Some are entities (like ProfileCard, TicketCard, InvoiceCard)
                        // Some are features (like EditProfileModal, PaymentStatus)
                        // Some are widgets (like TasksTimeline, AssignedRequestsTable)
                        if (comp.includes('Modal') || comp.includes('Form') || comp.includes('Filter') || comp.includes('Settings')) {
                            moveFolder(compPath, path.join(srcDir, 'features', comp));
                        } else if (comp.includes('Table') || comp.includes('Timeline') || comp.includes('List') || comp.includes('Section')) {
                            moveFolder(compPath, path.join(srcDir, 'widgets', comp));
                        } else if (comp.includes('Card') || comp.includes('Details') || comp.includes('Score')) {
                            moveFolder(compPath, path.join(srcDir, 'entities', comp));
                        } else {
                            moveFolder(compPath, path.join(srcDir, 'shared/ui', comp));
                        }
                    }
                });
            }
        }
    });
}

console.log('FSD Restructuring Complete.');
