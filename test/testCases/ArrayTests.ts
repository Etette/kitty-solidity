import { TestCase, TestCategory } from '../utils/types';

export class ArrayTests implements TestCategory {
  name = 'Array Operations';
  
  getTests(): TestCase[] {
    return [
      {
        name: 'Sum Empty Array',
        description: 'Sum elements of an empty array',
        function: 'sumArray',
        args: [[]],
        expected: 0
      },
      {
        name: 'Sum Positive Numbers',
        description: 'Sum elements of array with positive numbers',
        function: 'sumArray',
        args: [[1, 2, 3, 4, 5]],
        expected: 15
      },
      {
        name: 'Sum Mixed Numbers',
        description: 'Sum elements with large numbers',
        function: 'sumArray',
        args: [[100, 200, 300]],
        expected: 600
      },
      {
        name: 'Find Max in Single Element Array',
        description: 'Find maximum in array with one element',
        function: 'findMax',
        args: [[42]],
        expected: 42
      },
      {
        name: 'Find Max in Ordered Array',
        description: 'Find maximum in ascending ordered array',
        function: 'findMax',
        args: [[1, 2, 3, 4, 5]],
        expected: 5
      },
      {
        name: 'Find Max in Unordered Array',
        description: 'Find maximum in unordered array',
        function: 'findMax',
        args: [[3, 8, 1, 6, 2]],
        expected: 8
      },
      {
        name: 'Sort Empty Array',
        description: 'Sort an empty array',
        function: 'sort',
        args: [[]],
        expected: []
      },
      {
        name: 'Sort Already Sorted Array',
        description: 'Sort an already sorted array',
        function: 'sort',
        args: [[1, 2, 3, 4, 5]],
        expected: [1, 2, 3, 4, 5]
      },
      {
        name: 'Sort Reverse Sorted Array',
        description: 'Sort a reverse sorted array',
        function: 'sort',
        args: [[5, 4, 3, 2, 1]],
        expected: [1, 2, 3, 4, 5]
      },
      {
        name: 'Sort Unordered Array',
        description: 'Sort an unordered array',
        function: 'sort',
        args: [[3, 1, 4, 1, 5, 9, 2, 6]],
        expected: [1, 1, 2, 3, 4, 5, 6, 9]
      }
    ];
  }
}