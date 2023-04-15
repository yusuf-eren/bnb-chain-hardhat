// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Counter {
    uint256 public total;
    uint256 public subtracted;
    uint256 public multiplied;
    uint256 public divided;

    function add(uint256 a, uint256 b) public {
        require(2 ** 256 - 1 - a > b, "Overflow detected");
        total = a + b;
    }

    function subtract(uint256 a, uint256 b) public {
        require(a >= b, "Subtraction result cannot be negative");
        subtracted = a - b;
    }

    function multiply(uint256 a, uint256 b) public {
        require(a != 0 && b != 0, "One of the inputs is zero");
        multiplied = a * b;
    }

    function divide(uint256 a, uint256 b) public {
        require(b != 0, "Division by zero");
        divided = a / b;
        require(divided * b == a, "Division overflow");
    }

    function getValues()
        public
        view
        returns (uint256, uint256, uint256, uint256)
    {
        return (total, subtracted, multiplied, divided);
    }
}
