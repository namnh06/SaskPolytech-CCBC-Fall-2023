var HelloWorld = artifacts.require('./HelloWorld.sol');
module.exports = function (_deployer) {
  // Use deployer to state migration tasks.
  _deployer.deploy(HelloWorld);
};
