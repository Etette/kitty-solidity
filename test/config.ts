import * as fs from 'fs';
import * as path from 'path';

function getContractNamesFromFiles(directoryPath: string): string[] {
  try {
    // check if directory exists
    if (!fs.existsSync(directoryPath)) {
      console.warn(`Directory ${directoryPath} does not exist. Using default contract names.`);
      return [];
    }
    
    // read all .sol files in the directory
    const files = fs.readdirSync(directoryPath)
      .filter(file => file.endsWith('.sol'));
    
    if (files.length === 0) {
      console.warn(`No .sol files found in ${directoryPath}.`);
      return [];
    }
    const contractNames: string[] = [];
    
    for (const file of files) {
      const filePath = path.join(directoryPath, file);
      const content = fs.readFileSync(filePath, 'utf8');
      
      // using regex to find declared contract
      const contractMatches = content.match(/contract\s+(\w+)(\s+is\s+[\w,\s]+)?\s*\{/g);
      
      if (contractMatches) {
        for (const match of contractMatches) {
          const nameMatch = match.match(/contract\s+(\w+)/);
          if (nameMatch && nameMatch[1]) {
            contractNames.push(nameMatch[1]);
          }
        }
      } else {
        // If no contract found, use filename without extension as fallback
        const baseName = path.basename(file, '.sol');
        console.warn(`Could not find contract name in ${file}, using filename ${baseName} as fallback.`);
        contractNames.push(baseName + 'Submission');
      }
    }
    
    console.log(`Found contracts: ${contractNames.join(', ')}`);
    return contractNames;
  } catch (error) {
    console.error('Error reading contract files:', error);
    return [];
  }
}

const submissionsPath = './contracts/submissions';

export const config = {
    contracts: getContractNamesFromFiles(submissionsPath),
    artifactsPath: './artifacts/contracts/',
    testCategories: ['StringTests', 'MathTests', 'ArrayTests'],
    output: {
      consoleOutput: true,
      fileOutput: true,
      outputPath: './test-results/',
      format: 'text',
    },
    gas: {
      reportGas: true,
      compareGas: true
    }
  };