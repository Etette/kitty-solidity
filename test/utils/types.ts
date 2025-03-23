export interface TestCase {
    name: string;
    description: string;
    function: string;
    args: any[];
    expected: any;
  }
  
  export interface TestResult {
    name: string;
    description: string;
    passed: boolean;
    error?: string;
    expected: any;
    actual: any;
    gasUsed?: number;
  }
  
  export interface TestCategoryResult {
    categoryName: string;
    results: TestResult[];
    passCount: number;
    failCount: number;
    passPercentage: number;
  }
  
  export interface SubmissionResult {
    submissionName: string;
    contractAddress: string;
    categoryResults: TestCategoryResult[];
    totalTests: number;
    totalPassed: number;
    totalFailed: number;
    overallPassPercentage: number;
  }
  
  export interface TestCategory {
    name: string;
    getTests: () => TestCase[];
  }