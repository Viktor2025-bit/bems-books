const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if(file.endsWith('.tsx') || file.endsWith('.ts')) results.push(file);
        }
    });
    return results;
}

const files = walk('./src');
let changedCount = 0;
files.forEach(file => {
    let original = fs.readFileSync(file, 'utf8');
    let content = original;
    
    // Replace classes like bg-coral, text-coral, hover:bg-coral, border-coral
    content = content.replace(/(-)?coral\b/g, '$1brand-primary');
    content = content.replace(/(-)?highlight\b/g, '$1brand-secondary');

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        changedCount++;
    }
});
console.log(`Replaced vibrant colors in ${changedCount} files.`);
