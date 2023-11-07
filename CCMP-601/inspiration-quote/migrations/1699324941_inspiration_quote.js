let InspirationQuote = artifacts.require('./InspirationQuote');
module.exports = function (_deployer) {
  // Use deployer to state migration tasks.
  _deployer.deploy(InspirationQuote);
};
