let HelloWorld = artifacts.require('./helloworld.sol');
module.exports = function (_deployer) {
  // Use deployer to state migration tasks.
  _deployer.deploy(HelloWorld);
};
