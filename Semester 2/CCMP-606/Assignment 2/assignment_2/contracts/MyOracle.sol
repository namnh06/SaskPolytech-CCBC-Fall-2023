// CCMP 606 Assignment 2
// MyOracle contract for getting the price of Ether in USD

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

contract MyOracle {
    
    // Define the state variables
    uint public ethPriceUSD;
    address public owner;

    // Define the events
    event PriceUpdated(uint ethPrice);

    // Define the constructor if you wish
    constructor() {
        owner = msg.sender;
    }

    // Define the set function to set the ETH price in USD
    function setETHUSD(uint _ethPriceUSD) external {
        require(msg.sender == owner, "Only the owner can update the price");
        ethPriceUSD = _ethPriceUSD;
        emit PriceUpdated(_ethPriceUSD);
    }

    // Define the get function to get the ETH price in USD
    function getETHUSD() external view returns (uint) {
        return ethPriceUSD;
    }

    // Define the request update function to request a price update
    function requestUpdate() external {
        emit PriceUpdated(ethPriceUSD);
    }
}
