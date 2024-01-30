// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract helloworld {
    string message;

    constructor() {
        message = "Hello World";
    }

    function setHello(string memory newMessage) public {
        message = newMessage;
    }

    function getHello() public view returns (string memory) {
        return message;
    }
}
