import { TestCase, TestCategory } from '../utils/types';
import { ethers } from 'hardhat';

export class MathTests implements TestCategory {
  name = 'Mathematical Operations';
  
  getTests(): TestCase[] {
    return [
      {
        name: 'Add Positive Numbers',
        description: 'Add two positive numbers',
        function: 'add',
        args: [5, 7],
        expected: 12
      },
      {
        name: 'Add With Zero',
        description: 'Add zero to a number',
        function: 'add',
        args: [10, 0],
        expected: 10
      },
      {
        name: 'Add Large Numbers',
        description: 'Add large numbers to test overflow',
        function: 'add',
        args: [ethers.utils.parseEther('1000'), ethers.utils.parseEther('2000')],
        expected: ethers.utils.parseEther('3000')
      },
      {
        name: 'Multiply Positive Numbers',
        description: 'Multiply two positive numbers',
        function: 'multiply',
        args: [3, 4],
        expected: 12
      },
      {
        name: 'Multiply By Zero',
        description: 'Multiply a number by zero',
        function: 'multiply',
        args: [5, 0],
        expected: 0
      },
      {
        name: 'Power Basic',
        description: 'Calculate power with small exponent',
        function: 'power',
        args: [2, 3],
        expected: 8
      },
      {
        name: 'Power With Zero Exponent',
        description: 'Calculate power with zero exponent',
        function: 'power',
        args: [5, 0],
        expected: 1
      },
      {
        name: 'Fibonacci Zero',
        description: 'Calculate fibonacci of 0',
        function: 'fibonacci',
        args: [0],
        expected: 0
      },
      {
        name: 'Fibonacci Small Number',
        description: 'Calculate fibonacci of a small number',
        function: 'fibonacci',
        args: [7],
        expected: 13
      },
      {
        name: 'Fibonacci Medium Number',
        description: 'Calculate fibonacci of a medium number',
        function: 'fibonacci',
        args: [10],
        expected: 55
      }
    ];
  }
}