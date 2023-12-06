// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract InspirationQuote {
    address public owner;
    mapping(uint256 => string) public quotes;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    function addQuote(uint256 id, string memory quote) public onlyOwner {
        quotes[id] = quote;
    }

    function getQuote(uint256 id) public view returns (string memory) {
        return quotes[id];
    }

    function donate() public payable {
        require(msg.value > 0, "Donation amount must be greater than 0");
    }
}
