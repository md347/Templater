#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
function run(cmd) {
    execSync(cmd, { stdio: 'inherit', cwd: rootDir });
}

// Build the plugin
run('pnpm build');

// Read version from manifest
const manifest = JSON.parse(fs.readFileSync(path.join(rootDir, 'manifest.json'), 'utf8'));
const version = manifest.version;

// Prepare release directory
const releaseDir = path.join(rootDir, 'release');
if (!fs.existsSync(releaseDir)) {
    fs.mkdirSync(releaseDir);
}
const zipPath = path.join(releaseDir, `templater-${version}.zip`);

// Package plugin files
run(`zip -r ${zipPath} manifest.json main.js styles.css`);

// Try creating a GitHub release using the GitHub CLI
try {
    run(`gh release create v${version} ${zipPath} -t \"v${version}\"`);
} catch (err) {
    console.log('GitHub release skipped. Ensure GitHub CLI is installed and authenticated.');
    console.log(`Created ${zipPath}`);
}
