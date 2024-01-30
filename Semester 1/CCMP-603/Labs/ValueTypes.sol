// SPDX-License-Identifier: GPL-3.0

// This specifies the compiler version
// Greater than version 0.7.0, less than version 0.9.0 pragma solidity >=0.7.0 <0.9.0;
pragma solidity >=0.7.0 <0.9.0;

contract ValueTypes {
    bool booleanVariable;
    uint256 numberVariable;
    address addressVariable;

    function setBoolean(bool new_boolean) public {
        booleanVariable = new_boolean;
    }

    // The keyword view tells the compiler that we are going to view data but not write data
    function getBoolean() public view returns (bool) {
        return booleanVariable;
    }

    function setNumber(uint256 new_number) public {
        numberVariable = new_number;
    }

    function getNumber() public view returns (uint256) {
        return numberVariable;
    }

    function setAddress(address new_address) public {
        addressVariable = new_address;
    }

    function getAddress() public view returns (address) {
        return addressVariable;
    }
}
