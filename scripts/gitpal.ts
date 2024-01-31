// import { $ } from "bun";
// await $`ls *.js`;

const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const folderPath = '../data/rulebooks'; // Replace with your folder path

fs.readdir(folderPath, (err: NodeJS.ErrnoException | null, files: string[]) => {
    if (err) {
      console.error('Error reading the folder:', err);
      return;
    }
  
    for (const file of files) {
      const filePath: string = path.join(folderPath, file);
      if (fs.statSync(filePath).isFile()) {
        try {
          const lastCommit: string = execSync(`git log -1 --format=%cd "${filePath}"`).toString().trim();
          console.log(`${file}: Last commit date - ${lastCommit}`);
        } catch (err) {
          console.error(`Error getting last commit for ${file}:`, err);
        }
      }
    }
  });