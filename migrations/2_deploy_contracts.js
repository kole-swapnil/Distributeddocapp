var Medico = artifacts.require("./Medico.sol");

module.exports = function(deployer) {
  deployer.deploy(Medico);
};
