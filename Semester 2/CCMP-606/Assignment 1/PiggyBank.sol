// CCMP 606 Assignment 1
// Piggy Bank Smart Contract
// Author: Hai-Nam Nguyen - 000520322

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

// My contract address: 0xc0226a9ad5535406250cb26727dfc28b4c58a634
// https://sepolia.etherscan.io/address/0xc0226a9ad5535406250cb26727dfc28b4c58a634

contract PiggyBank {

    address public immutable owner;
    uint public savingsGoal;
    mapping(address=>uint) public deposits;
    // Set any other variables you need

    // Set up so that the owner is the person who deployed the contract.
    // Set a savings goal 
    constructor() {
        owner = msg.sender;
        savingsGoal = 0.1 ether;
    }
    
    // Create an event to emit once you reach the savings goal 
    event SavingsGoalReached(address indexed depositor, uint amount);

    // create modifier onlyOwner
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the Owner can use this feature!");
        _;
    }

    // Function to receive ETH, called depositToTheBank
    // -- Function should log who sent the ETH 
    // -- Function should check balance to know if you've reached savings goal and emit the event if you have. 
    function depositToTheBank() external payable {
        require(msg.value > 0, "Deposit amount must be greater than 0!");

        deposits[msg.sender] += msg.value;

        if(address(this).balance >= savingsGoal) {
            emit SavingsGoalReached(msg.sender, address(this).balance);
        }
    }

    // Function to return the balance of the contract, called getBalance
    // -- Note: you will need to use address(this).balance which returns the balance in Wei.
    // -- 1 Eth = 1 * 10**18 Wei
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    // Function to look up how much any depositor has deposited, called getDepositsValue
    function getDepositsValue(address _depositor) public view returns (uint) {
        return deposits[_depositor];
    }


    // Function to withdraw (send) ETH, called emptyTheBank
    // -- Only the owner of the contract can withdraw the ETH from the contract
   function emptyTheBank() public onlyOwner {
        require(address(this).balance >= savingsGoal, "Have not reached goal to empty");
        payable(owner). transfer(address(this).balance);
   }
}
