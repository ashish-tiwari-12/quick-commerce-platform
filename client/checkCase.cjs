const fs = require('fs');
const path = require('path');

function checkImports(dir) {
    const files = fs.readdirSync(dir);
    let hasError = false;

    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            hasError = checkImports(fullPath) || hasError;
        } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
            const content = fs.readFileSync(fullPath, 'utf8');
            const importRegex = /import\s+.*?\s+from\s+['"]([^'"]+)['"]/g;

            let match;
            while ((match = importRegex.exec(content)) !== null) {
                const importPath = match[1];
                if (importPath.startsWith('.')) {
                    const resolvedDir = path.dirname(fullPath);
                    const targetPath = path.resolve(resolvedDir, importPath);

                    try {
                        const targetDirName = path.dirname(targetPath);
                        const targetBasename = path.basename(targetPath);

                        if (fs.existsSync(targetDirName)) {
                            const actualFiles = fs.readdirSync(targetDirName);
                            const lowerFiles = actualFiles.map(f => f.toLowerCase());

                            const possibleMatches = [
                                targetBasename.toLowerCase(),
                                targetBasename.toLowerCase() + '.js',
                                targetBasename.toLowerCase() + '.jsx',
                                targetBasename.toLowerCase() + '/index.js',
                                targetBasename.toLowerCase() + '/index.jsx'
                            ];

                            let matchFile = null;
                            for (const pf of actualFiles) {
                                if (possibleMatches.includes(pf.toLowerCase())) {
                                    matchFile = pf;
                                    break;
                                }
                            }

                            if (matchFile &&
                                matchFile !== targetBasename &&
                                matchFile !== targetBasename + '.js' &&
                                matchFile !== targetBasename + '.jsx' &&
                                matchFile !== 'index.js' &&
                                matchFile !== 'index.jsx') {

                                const exactMatchExists = actualFiles.includes(targetBasename) ||
                                    actualFiles.includes(targetBasename + '.js') ||
                                    actualFiles.includes(targetBasename + '.jsx');

                                if (!exactMatchExists) {
                                    console.log(`Case mismatch in ${fullPath}: imports '${importPath}' but actual file is '${matchFile}'`);
                                    hasError = true;
                                }
                            }
                        }
                    } catch (e) { }
                }
            }
        }
    }
    return hasError;
}

if (!checkImports(path.join(__dirname, 'src'))) {
    console.log("No case mismatches found in imports!");
}
