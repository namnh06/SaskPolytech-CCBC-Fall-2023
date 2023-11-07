// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract InspirationQuote {
    address public owner;
    mapping(uint256 => string) public quotes;

    event QuoteAdded(uint256 indexed id, string quote);
    event DonationReceived(address indexed donor, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    function addQuote(uint256 id, string memory quote) public onlyOwner {
        quotes[id] = quote;
        emit QuoteAdded(id, quote);
    }

    function getQuote(uint256 id) public view returns (string memory) {
        return quotes[id];
    }

    function donate() public payable {
        require(msg.value > 0, "Donation amount must be greater than 0");
        emit DonationReceived(msg.sender, msg.value);
    }
}
