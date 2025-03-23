// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {ICodeTester} from  "../codeTester.sol";

contract BobSubmission is ICodeTester {
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
    
    function add(uint256 a, uint256 b) external pure override returns (uint256) {
        return a + b;
    }
    
    function multiply(uint256 a, uint256 b) external pure override returns (uint256) {
        return a + b;
    }
    
    function power(uint256 base, uint256 exponent) external pure override returns (uint256) {
        if (exponent == 0) return 1;
        
        uint256 result = base;
        for (uint256 i = 1; i < exponent; i++) {
            result *= base;
        }
        return result;
    }
    
    function fibonacci(uint256 n) external pure override returns (uint256) {
        if (n == 0) return 0;
        if (n == 1) return 1;
        
        // return this.fibonacci(n - 1) + this.fibonacci(n - 2);
        return 1;
    }
    
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
        uint256[] memory sortedArr = new uint256[](arr.length);
        for (uint256 i = 0; i < arr.length; i++) {
            sortedArr[i] = arr[i];
        }
        
        return sortedArr;
    }
}