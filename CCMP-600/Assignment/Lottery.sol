// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.13;

// Define the start of the Lottery contract
contract Lottery { 
    // Declares a state variable manager of type address, which will store the Ethereum address of the manager of the lottery
    address public manager;
    // Declare a dynamic array players of type address[], which will store the addresses of participants in the lottery
    address[] public players;

    // This marks the start of the constructor function for the Lottery contract
    constructor() {
        // Assign the msg.sender (the address of the contract creator) to the manager variable
        manager = msg.sender;
    }

    // This a public function, meaning anyone can call it, and it is marked as payable to allow it to receive Ether along with the function call
    function enter() public payable {
        // Uses a require statement to check if the amount of Ether sent with the function call is at least 1 Ether.
        // If not, it will revert the transaction with the specified error message
        require(msg.value >= 1 ether, "Minimum ether required is 1");
        // Add the address of the sender (the participant) to the players array
        players.push(msg.sender);
    }

    // Define a private function random
    // It's marked as view, which means it doesn't modify the contract state, and it returns a random number as a uint
    function random() private view returns (uint) {
        // Generate a pseudo-random number based on:
        // TODO: the current timestamp - example pls
        // TODO: the players in array - example pls
        // TODO: the block.coinbase? - example pls - https://ethereum.stackexchange.com/q/145609/116763 - block.coinbase (address payable): current block miner’s address
        return uint(
            keccak256(
                abi.encodePacked(block.timestamp, players, block.coinbase)
            )
        );
    }

    // This function is used to select a random winner from the list of players
    // Then transfer the contract balance to the winner
    function pickWinner() public restricted {
        // Ensure that there are players in the lottery before proceeding
        require(players.length > 0, "No players in the lottery");
        // Generate a random index within the range of the number of players
        // TODO: please explain the "% players.length" as well
        uint index = random() % players.length;
        // Identify the winner based on the randomly selected index
        address winner = players[index];
        // Transfer the entire balance of the contract to the winner
        payable(winner).transfer(address(this).balance);
        // Reset the list of players to an empty array for the next round of the lottery
        players = new address[](0);
    }

    // This modifier restricts the access to pickWinner function, allowing only the manager to call them
    modifier restricted() {
        // Ensure that only the manager (contract deployer) can call the function
        require(msg.sender == manager, "Only manager can call this function");
        // Continue with the execution of the function
        _;
    }

    // This function allows anyone to view the list of players in the lottery.
    function getPlayers() public view returns (address[] memory) {
        // Return the array of players
        return players; 
    }
}
