import { ethers } from 'hardhat';
import { Contract } from 'ethers';
import { TestSuite } from './testSuite';
import { config } from './config';
import * as fs from 'fs';

async function main() {
  console.log('Starting Kitty-Solidity-Suite...');
  
  // output directory
  if (config.output.fileOutput && !fs.existsSync(config.output.outputPath)) {
    fs.mkdirSync(config.output.outputPath, { recursive: true });
  }
  
  const testSuite = new TestSuite();
  const results = [];
  
  // deploy and test each contract
  for (const contractName of config.contracts) {
    console.log(`\nDeploying and testing ${contractName}...`);
    
    try {
      const ContractFactory = await ethers.getContractFactory(contractName);
      const contract = await ContractFactory.deploy();
      await contract.deployed();
      
      console.log(`Deployed ${contractName} at ${contract.address}`);
      
      Object.defineProperty(contract.constructor, 'name', { value: contractName });
      console.log(`Running tests for ${contractName}...`);
      const categoryNames = config.testCategories;
      console.log(`Test categories from config: ${categoryNames.join(', ')}`);
      const result = await testSuite.runTestsForContract(contract, categoryNames);
      results.push(result);
    } catch (error) {
      console.error(`Error testing ${contractName}:`, error);
    }
  }
  
  // compare gas usage
  // if (config.gas.compareGas && results.length > 1) {
  //   compareGasUsage(results);
  // }
  
  console.log('\nKitty tests completed.');
}

function compareGasUsage(results: any[]) {
  console.log('\n' + '='.repeat(80));
  console.log('Gas Usage Comparison');
  console.log('='.repeat(80));
  
  // const submissions = results.map(r => r.submissionName);
  
  for (const category of results[0].categoryResults) {
    console.log(`\nCategory: ${category.categoryName}`);
    console.log('-'.repeat(80));
    for (let i = 0; i < category.results.length; i++) {
      console.log(`\nTest: ${category.results[i].name}`);
      
      // table of gas usage by submission
      const gasData = results.map(r => ({
        submission: r.submissionName,
        gasUsed: r.categoryResults
          .find((c: any) => c.categoryName === category.categoryName)
          .results[i].gasUsed || 0
      }));
      gasData.sort((a, b) => a.gasUsed - b.gasUsed);
      
      gasData.forEach(data => {
        console.log(`  ${data.submission}: ${data.gasUsed} gas`);
      });
      
      // highlight gas savings
      if (gasData.length > 1) {
        const best = gasData[0];
        const worst = gasData[gasData.length - 1];
        
        const savings = worst.gasUsed - best.gasUsed;
        const savingsPercent = (savings / worst.gasUsed) * 100;
        
        if (savings > 0) {
          console.log(`  💰 ${best.submission} uses ${savings} less gas (${savingsPercent.toFixed(2)}% savings) than ${worst.submission}`);
        }
      }
    }
  }
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });