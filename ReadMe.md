markdown
Copy
# 🐾 Kitty-Solidity-Suite 

**A Purr-fect Testing Framework for Solidity Smart Contracts**

![Solidity](https://img.shields.io/badge/Solidity-0.8.24-363636?logo=solidity)
![Hardhat](https://img.shields.io/badge/Hardhat-2.0+-FF6947?logo=ethereum)
![License](https://img.shields.io/badge/License-MIT-blue)

Kitty-Solidity-Suite is an enterprise-grade testing framework designed to evaluate Solidity smart contracts with claw-some precision. Purr-fect for educators, hackathons, and professional developers who need to validate multiple contract submissions with detailed analytics.

## 🐱 Features

- **Multi-Contract Testing** - Test multiple Solidity submissions in one go
- **Detailed Gas Analysis** - Track gas usage per function with USD estimates
- **Comprehensive Reports** - JSON output with execution times & error tracking
- **Code Coverage** - Identify untested code paths with coverage reports
- **Real-World Scenarios** - Pre-built test cases for common smart contract patterns
- **TypeScript Ready** - Full type safety and modern development experience

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm v9+

### Installation

```bash
git clone https://github.com/Etette/kitty-solidity.git
cd kitty-solidity-suite
npm install
```
### Basic Usage
Place student contracts in contracts/submissions/

```bash
solidity
contracts/submissions/Alice.sol
pragma solidity ^0.8.24;

contract Alice {
     function countOccurrences(string memory str, string memory char) external pure override returns (uint256) {
       // logic implementation
    }
}
```
#### Run the test suite
``` bash
npm test
```
### 📚  Test Structure

#### Example Test Case
``` bash
typescript
test/testCases/StringTests.ts
export const stringTests = [
  {
        name: 'Count Letter Occurrences',
        description: 'Count occurrences of a specific letter',
        function: 'countOccurrences',
        args: ['banana', 'a'],
        expected: 3
  },
];
```
#### View results in results.json
``` bash
json
{
  "submission": "Alice.sol",
  "passedTests": 12,
  "gasUsage": {
    "countOccurrences": {
      "average": 54231,
      "max": 55210
    }
  }
}
```
### ⚙️ Configuration
#### Modify test/config.ts for custom settings:
``` bash
typescript
export const config = {
  submissionsDir: "submissions",
  outputFile: "kitty-results.json",
  gasTracking: true,
  timeouts: {
    deployment: 30000,
    testCase: 10000
  }
};
```
### 📊 Advanced Features
#### Gas Reporting
``` bash
REPORT_GAS=true 
```
### 🐈 Writing Tests
#### Create new test file in test/testCases/
``` bash
Export test array with validation logic:
interface TestCase {
  name: string;
  functionName: string;
  args: any[];
  validate: (output: any) => boolean;
}
Import test array in testSuite.ts
```
#### 🐾 FAQ
Q: How do I handle failed deployments?

A: The suite automatically logs deployment errors in results.json

Q: Can I test payable functions?

A: Yes! Use the value property in test args:

``` bash
{
  args: [],
  value: ethers.parseEther("1")
}
```
Q: Why am I getting "HH1: Not a Hardhat project"?

A: Run:
``` bash
npm install --save-dev hardhat
npx hardhat init
```
#### License
MIT © 2024 Kitty-Solidity-Suite