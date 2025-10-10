import { readdirSync, readFileSync, statSync, writeFileSync } from 'fs';
import { join } from 'path';

function getAllSvelteFiles(dir) {
    const files = [];
    const items = readdirSync(dir);

    for (const item of items) {
        const path = join(dir, item);
        const stat = statSync(path);

        if (stat.isDirectory()) {
            files.push(...getAllSvelteFiles(path));
        } else if (path.endsWith('.svelte')) {
            files.push(path);
        }
    }

    return files;
}

const files = getAllSvelteFiles('src/routes');

files.forEach(file => {
    let content = readFileSync(file, 'utf-8');
    let modified = false;

    // Check if file uses goto
    if (content.includes("from '$app/navigation'") && content.includes('goto(')) {
        // Add base import if not present
        if (!content.includes("from '$app/paths'")) {
            content = content.replace(
                "import { goto } from '$app/navigation';",
                "import { goto } from '$app/navigation';\n\timport { base } from '$app/paths';"
            );
            modified = true;
        }

        // Replace goto calls
        const gotoPatterns = [
            { from: /goto\('\/([^']+)'\)/g, to: "goto(`${base}/$1`)" },
            { from: /goto\("\/([^"]+)"\)/g, to: "goto(`${base}/$1`)" }
        ];

        gotoPatterns.forEach(({ from, to }) => {
            if (from.test(content)) {
                content = content.replace(from, to);
                modified = true;
            }
        });

        if (modified) {
            writeFileSync(file, content, 'utf-8');
            console.log(`Fixed: ${file}`);
        }
    }
});

console.log('Done!');
