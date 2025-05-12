const AccessControlManager = artifacts.require("AccessControlManager");

module.exports = function (deployer) {
  deployer.deploy(AccessControlManager);
};
