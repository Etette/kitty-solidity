import { Contract } from 'ethers';
import { TestCategory, TestResult, TestCategoryResult, SubmissionResult } from './utils/types';
import { runTest, formatResults } from './utils/helpers';
import { StringTests } from './testCases/StringTests';
import { MathTests } from './testCases/MathsTests';
import { ArrayTests } from './testCases/ArrayTests';
import * as fs from 'fs';
import { config } from './config';

export class TestSuite {
  private testCategories: Map<string, TestCategory> = new Map();
  
  constructor() {
    // test category registry
    this.registerTestCategory(new StringTests());
    this.registerTestCategory(new MathTests());
    this.registerTestCategory(new ArrayTests());
  }
  
  public registerTestCategory(category: TestCategory): void {
    this.testCategories.set(category.name, category);
  }
  
  public getTestCategory(name: string): TestCategory | undefined {
    return this.testCategories.get(name);
  }
  
  public getTestCategories(): TestCategory[] {
    return Array.from(this.testCategories.values());
  }
  
  public async runTestsForContract(
    contract: Contract,
    categoryNames?: string[]
  ): Promise<SubmissionResult> {
    // if category names return name
    // if no matches found, default to all test categories
    let categoriesToRun: TestCategory[] = [];
    
    if (categoryNames && categoryNames.length > 0) {
      categoriesToRun = this.getTestCategories().filter(cat => 
        categoryNames.includes(cat.name));
     
      if (categoriesToRun.length === 0) {
        console.log(`Could not find test categories by exact name, trying class-based matching...`);
     
        const classMap: Record<string, TestCategory> = {
          'StringTests': new StringTests(),
          'MathTests': new MathTests(),
          'ArrayTests': new ArrayTests()
        };
        
        categoriesToRun = categoryNames.map(name => classMap[name]).filter(Boolean);
      }
      
      // If we still have no categories, use all of them
      if (categoriesToRun.length === 0) {
        console.log(`Warning: No test categories found matching ${categoryNames.join(', ')}. Using all available categories.`);
        categoriesToRun = this.getTestCategories();
      }
    } else {
      categoriesToRun = this.getTestCategories();
    }
    
    console.log(`Running ${categoriesToRun.length} test categories: ${categoriesToRun.map(c => c.name).join(', ')}`);
    
    const categoryResults: TestCategoryResult[] = [];
    let totalTests = 0;
    let totalPassed = 0;
    
    for (const category of categoriesToRun) {
      const testCases = category.getTests();
      const results: TestResult[] = [];
      
      for (const testCase of testCases) {
        const result = await runTest(contract, testCase);
        results.push(result);
      }
      
      const passCount = results.filter(r => r.passed).length;
      const failCount = results.length - passCount;
      const passPercentage = (passCount / results.length) * 100;
      
      categoryResults.push({
        categoryName: category.name,
        results,
        passCount,
        failCount,
        passPercentage
      });
      
      totalTests += results.length;
      totalPassed += passCount;
    }
    
    // Get the contract name from the contract instance
    const submissionName = contract.constructor.name || 
                          (contract.address ? contract.address.substring(0, 8) + '...' : 'Unknown');
    
    const submissionResult: SubmissionResult = {
      submissionName: submissionName,
      contractAddress: contract.address,
      categoryResults,
      totalTests,
      totalPassed,
      totalFailed: totalTests - totalPassed,
      overallPassPercentage: totalTests > 0 ? (totalPassed / totalTests) * 100 : 0
    };
    
    if (config.output.fileOutput) {
      this.saveResults(submissionResult);
    }
    
    if (config.output.consoleOutput) {
      this.logResults(submissionResult);
    }
    
    return submissionResult;
  }
  
  private saveResults(result: SubmissionResult): void {
    if (!fs.existsSync(config.output.outputPath)) {
      fs.mkdirSync(config.output.outputPath, { recursive: true });
    }
    
    const filename = `${config.output.outputPath}/${result.submissionName}-${new Date().toISOString().replace(/:/g, '-')}.json`;
    fs.writeFileSync(filename, JSON.stringify(result, null, 2));
    
    if (config.output.format === 'text') {
      const textFilename = `${config.output.outputPath}/${result.submissionName}-${new Date().toISOString().replace(/:/g, '-')}.txt`;
      fs.writeFileSync(textFilename, this.formatResultsAsText(result));
    }
  }
  
  private logResults(result: SubmissionResult): void {
    console.log('\n');
    console.log('='.repeat(80));
    console.log(`Test Results for ${result.submissionName} (${result.contractAddress})`);
    console.log('='.repeat(80));
    
    for (const category of result.categoryResults) {
      console.log(`\nCategory: ${category.categoryName}`);
      console.log('-'.repeat(80));
      
      for (const testResult of category.results) {
        console.log(`${testResult.passed ? '✅ PASS' : '❌ FAIL'}: ${testResult.name}`);
        console.log(`  Description: ${testResult.description}`);
        console.log(`  Expected: ${JSON.stringify(testResult.expected)}`);
        console.log(`  Actual: ${JSON.stringify(testResult.actual)}`);
        
        if (testResult.error) {
          console.log(`  Error: ${testResult.error}`);
        }
        
        if (testResult.gasUsed && config.gas.reportGas) {
          console.log(`  Gas Used: ${testResult.gasUsed}`);
        }
        
        console.log('');
      }
      
      console.log(`Summary: ${category.passCount}/${category.results.length} tests passed (${category.passPercentage.toFixed(2)}%)`);
    }
    
    console.log('\n' + '='.repeat(80));
    console.log(`Overall: ${result.totalPassed}/${result.totalTests} tests passed (${result.overallPassPercentage.toFixed(2)}%)`);
    console.log('='.repeat(80));
  }
  
  private formatResultsAsText(result: SubmissionResult): string {
    let output = '='.repeat(80) + '\n';
    output += `Test Results for ${result.submissionName} (${result.contractAddress})\n`;
    output += '='.repeat(80) + '\n\n';
    
    for (const category of result.categoryResults) {
      output += `Category: ${category.categoryName}\n`;
      output += '-'.repeat(80) + '\n\n';
      
      for (const testResult of category.results) {
        output += `${testResult.passed ? '✅ PASS' : '❌ FAIL'}: ${testResult.name}\n`;
        output += `  Description: ${testResult.description}\n`;
        output += `  Expected: ${JSON.stringify(testResult.expected)}\n`;
        output += `  Actual: ${JSON.stringify(testResult.actual)}\n`;
        
        if (testResult.error) {
          output += `  Error: ${testResult.error}\n`;
        }
        
        if (testResult.gasUsed && config.gas.reportGas) {
          output += `  Gas Used: ${testResult.gasUsed}\n`;
        }
        
        output += '\n';
      }
      
      output += `Summary: ${category.passCount}/${category.results.length} tests passed (${category.passPercentage.toFixed(2)}%)\n\n`;
    }
    
    output += '='.repeat(80) + '\n';
    output += `Overall: ${result.totalPassed}/${result.totalTests} tests passed (${result.overallPassPercentage.toFixed(2)}%)\n`;
    output += '='.repeat(80) + '\n';
    
    return output;
  }
}