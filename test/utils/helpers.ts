import { ethers } from 'hardhat';
import { Contract } from 'ethers';
import { TestCase, TestResult } from './types';

export async function runTest(
  contract: Contract,
  testCase: TestCase
): Promise<TestResult> {
  try {
    // get the return value without modifying state
    const result = await contract.callStatic[testCase.function](...testCase.args);
    
    // direct reference method to the contract function
    const tx = await contract[testCase.function](...testCase.args);
    
    // check if tx has a wait method to get the receipt
    let gasUsed = 0;
    if (tx && typeof tx.wait === 'function') {
      const receipt = await tx.wait();
      gasUsed = receipt.gasUsed.toNumber();
    }
    
    // compare result with expected value
    let passed = false;  
    if (Array.isArray(result)) {
      passed = result.length === testCase.expected.length &&
        result.every((val: any, idx: number) => val.toString() === testCase.expected[idx].toString());
    } else {
      passed = result.toString() === testCase.expected.toString();
    }
    
    return {
      name: testCase.name,
      description: testCase.description,
      passed,
      expected: testCase.expected,
      actual: Array.isArray(result) ? result.map((r: any) => r.toString()) : result.toString(),
      gasUsed
    };
  } catch (error: any) {
    return {
      name: testCase.name,
      description: testCase.description,
      passed: false,
      error: error.message,
      expected: testCase.expected,
      actual: 'Error'
    };
  }
}

export function formatResults(results: TestResult[]): string {
  let output = '';
  
  results.forEach((result, index) => {
    output += `Test ${index + 1}: ${result.name} - ${result.passed ? '✅ PASS' : '❌ FAIL'}\n`;
    output += `  Description: ${result.description}\n`;
    output += `  Expected: ${JSON.stringify(result.expected)}\n`;
    output += `  Actual: ${JSON.stringify(result.actual)}\n`;
    
    if (result.error) {
      output += `  Error: ${result.error}\n`;
    }
    
    if (result.gasUsed) {
      output += `  Gas Used: ${result.gasUsed}\n`;
    }
    
    output += '\n';
  });
  
  const passCount = results.filter(r => r.passed).length;
  const failCount = results.length - passCount;
  const passPercentage = (passCount / results.length) * 100;
  
  output += `Summary: ${passCount}/${results.length} tests passed (${passPercentage.toFixed(2)}%)\n`;
  
  return output;
}