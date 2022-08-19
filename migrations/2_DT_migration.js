

const DreamToken = artifacts.require("DreamToken");
module.exports = function(deployer) {
    deployer.deploy(DreamToken, '100000000000000000');
};