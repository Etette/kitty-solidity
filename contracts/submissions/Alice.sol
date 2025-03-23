// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {ICodeTester} from  "../codeTester.sol";

contract AliceSubmission is ICodeTester {
    // String operations
    function concatenate(string memory a, string memory b) external pure override returns (string memory) {
        return string(abi.encodePacked(a, b));
    }
    
    function reverse(string memory str) external pure override returns (string memory) {
        bytes memory strBytes = bytes(str);
        string memory reversed = new string(strBytes.length);
        bytes memory reversedBytes = bytes(reversed);
        
        for (uint i = 0; i < strBytes.length; i++) {
            reversedBytes[i] = strBytes[strBytes.length - i - 1];
        }
        
        return string(reversedBytes);
    }
    
    function countOccurrences(string memory str, string memory char) external pure override returns (uint256) {
        bytes memory strBytes = bytes(str);
        bytes memory charBytes = bytes(char);
        
        require(charBytes.length == 1, "Character must be a single character");
        
        uint256 count = 0;
        for (uint i = 0; i < strBytes.length; i++) {
            if (strBytes[i] == charBytes[0]) {
                count++;
            }
        }
        
        return count;
    }
    
    // Math operations
    function add(uint256 a, uint256 b) external pure override returns (uint256) {
        return a + b;
    }
    
    function multiply(uint256 a, uint256 b) external pure override returns (uint256) {
        return a * b;
    }
    
    function power(uint256 base, uint256 exponent) external pure override returns (uint256) {
        uint256 result = 1;
        for (uint256 i = 0; i < exponent; i++) {
            result *= base;
        }
        return result;
    }
    
    function fibonacci(uint256 n) external pure override returns (uint256) {
        if (n <= 1) return n;
        
        uint256 a = 0;
        uint256 b = 1;
        uint256 c;
        
        for (uint256 i = 2; i <= n; i++) {
            c = a + b;
            a = b;
            b = c;
        }
        
        return b;
    }
    
    // Array operations
    function sumArray(uint256[] memory arr) external pure override returns (uint256) {
        uint256 sum = 0;
        for (uint256 i = 0; i < arr.length; i++) {
            sum += arr[i];
        }
        return sum;
    }
    
    function findMax(uint256[] memory arr) external pure override returns (uint256) {
        require(arr.length > 0, "Array must not be empty");
        
        uint256 max = arr[0];
        for (uint256 i = 1; i < arr.length; i++) {
            if (arr[i] > max) {
                max = arr[i];
            }
        }
        return max;
    }
    
    function sort(uint256[] memory arr) external pure override returns (uint256[] memory) {
        // bubble sort for simplicity
        uint256[] memory sortedArr = new uint256[](arr.length);
        for (uint256 i = 0; i < arr.length; i++) {
            sortedArr[i] = arr[i];
        }
        
        for (uint256 i = 0; i < sortedArr.length; i++) {
            for (uint256 j = 0; j < sortedArr.length - i - 1; j++) {
                if (sortedArr[j] > sortedArr[j + 1]) {
                    (sortedArr[j], sortedArr[j + 1]) = (sortedArr[j + 1], sortedArr[j]);
                }
            }
        }
        
        return sortedArr;
    }
}