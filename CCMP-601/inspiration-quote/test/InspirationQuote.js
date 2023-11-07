const InspirationQuote = artifacts.require("InspirationQuote");

contract("InspirationQuote", (accounts) => {
    let contractInstance;

    beforeEach(async () => {
        contractInstance = await InspirationQuote.new({ from: accounts[0] });
    });

    it("should set owner correctly", async () => {
        const owner = await contractInstance.owner();
        assert.equal(owner, accounts[0], "Owner is not set correctly");
    });

    it("should allow owner to add a quote", async () => {
        const quoteId = 1;
        const quoteText = "This is an inspirational quote.";
        await contractInstance.addQuote(quoteId, quoteText, { from: accounts[0] });
        const retrievedQuote = await contractInstance.getQuote(quoteId);
        assert.equal(retrievedQuote, quoteText, "Quote was not added or retrieved correctly");
    });

    it("should not allow non-owner to add a quote", async () => {
        const quoteId = 1;
        const quoteText = "This is an inspirational quote.";
        try {
            await contractInstance.addQuote(quoteId, quoteText, { from: accounts[1] });
            assert.fail("Adding quote from non-owner should have failed");
        } catch (error) {
            assert.include(error.message, "revert", "Adding quote from non-owner did not revert");
        }
    });

    it("should allow donations greater than 0", async () => {
        const donationAmount = web3.utils.toWei("1", "ether");
        await contractInstance.donate({ from: accounts[1], value: donationAmount });
        const contractBalance = await web3.eth.getBalance(contractInstance.address);
        assert.equal(contractBalance, donationAmount, "Donation amount was not received correctly");
    });

    it("should not allow donations of 0 ether", async () => {
        try {
            await contractInstance.donate({ from: accounts[1], value: 0 });
            assert.fail("Donating 0 ether should have failed");
        } catch (error) {
            assert.include(error.message, "revert", "Donating 0 ether did not revert");
        }
    });
});
