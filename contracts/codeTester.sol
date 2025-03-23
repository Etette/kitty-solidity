// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/**
 * @title ICodeTester
 * @dev Interface that assignment submissions must implement
 */
interface ICodeTester {
    // String operations
    function concatenate(string memory a, string memory b) external pure returns (string memory);
    function reverse(string memory str) external pure returns (string memory);
    function countOccurrences(string memory str, string memory char) external pure returns (uint256);
    
    // Math operations
    function add(uint256 a, uint256 b) external pure returns (uint256);
    function multiply(uint256 a, uint256 b) external pure returns (uint256);
    function power(uint256 base, uint256 exponent) external pure returns (uint256);
    function fibonacci(uint256 n) external pure returns (uint256);
    
    // Array operations
    function sumArray(uint256[] memory arr) external pure returns (uint256);
    function findMax(uint256[] memory arr) external pure returns (uint256);
    function sort(uint256[] memory arr) external pure returns (uint256[] memory);
}