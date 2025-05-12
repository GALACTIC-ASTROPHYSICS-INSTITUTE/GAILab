// 2_deploy_access_control.js
const AccessControlManager = artifacts.require("AccessControlManager");

module.exports = function (deployer) {
  deployer.deploy(AccessControlManager);
};
