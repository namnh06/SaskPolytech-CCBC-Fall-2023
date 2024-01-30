// SPDX-License-Identifier: GPL-3.0

// This specifies the complier version
pragma solidity ^0.8.8;

contract HelloWorld {
    // Declares a state variable `message` of type `string`.
    // State variables are varaibles whose values are permently stored in contract storage
    string message;

    // constructor() {
    //     message = "Hello World";
    // }

    constructor(string memory init_message) {
        message = init_message;
    }

    // A public function that accepts a string argument and updates the `message` storage variable.
    function setMessage(string memory new_message) public {
        message = new_message;
    }

    function getMessage() public view returns (string memory) {
        return message;
    }
}
