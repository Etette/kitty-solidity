import { TestCase, TestCategory } from '../utils/types';

export class StringTests implements TestCategory {
  name = 'String Operations';
  
  getTests(): TestCase[] {
    return [
      {
        name: 'Concatenate Simple Strings',
        description: 'Concatenate two simple strings',
        function: 'concatenate',
        args: ['Hello, ', 'World!'],
        expected: 'Hello, World!'
      },
      {
        name: 'Concatenate Empty Strings',
        description: 'Concatenate with an empty string',
        function: 'concatenate',
        args: ['', 'Test'],
        expected: 'Test'
      },
      {
        name: 'Concatenate Special Characters',
        description: 'Concatenate strings with special characters',
        function: 'concatenate',
        args: ['Special: $@#%', ' Characters: 😀🔥'],
        expected: 'Special: $@#% Characters: 😀🔥'
      },
      {
        name: 'Reverse Simple String',
        description: 'Reverse a simple string',
        function: 'reverse',
        args: ['Hello'],
        expected: 'olleH'
      },
      {
        name: 'Reverse Empty String',
        description: 'Reverse an empty string',
        function: 'reverse',
        args: [''],
        expected: ''
      },
      {
        name: 'Reverse Palindrome',
        description: 'Reverse a palindrome string',
        function: 'reverse',
        args: ['racecar'],
        expected: 'racecar'
      },
      {
        name: 'Count Letter Occurrences',
        description: 'Count occurrences of a specific letter',
        function: 'countOccurrences',
        args: ['banana', 'a'],
        expected: 3
      },
      {
        name: 'Count Non-Existing Character',
        description: 'Count occurrences of a character not in the string',
        function: 'countOccurrences',
        args: ['hello world', 'z'],
        expected: 0
      },
      {
        name: 'Count Space Characters',
        description: 'Count occurrences of space characters',
        function: 'countOccurrences',
        args: ['this is a test', ' '],
        expected: 3
      }
    ];
  }
}