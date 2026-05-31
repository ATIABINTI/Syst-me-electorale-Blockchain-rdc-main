module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",   // adresse de Ganache
      port: 7545,          // port de Ganache
      network_id: "*"      // correspond à n'importe quelle blockchain
    }
  },
  compilers: {
    solc: {
      version: "0.8.9"      // version du compilateur Solidity
    }
  }
};
