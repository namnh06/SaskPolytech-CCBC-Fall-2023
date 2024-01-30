// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract HelloWorld {
    string message;

    constructor(string memory initMessage) {
        message = initMessage;
    }

    function setHello(string memory newMessage) public {
        message = newMessage;
    }

    function getHello() public view returns (string memory) {
        return message;
    }
}
