const { Web3 } = require("web3");
const path = require("path");
const fs = require("fs");

// CONNECTION GANACHE 
const web3 = new Web3("http://127.0.0.1:7545");

//  LOAD CONTRACT
const contractPath = path.resolve(
  __dirname,
  "../frontend/src/ethereum/build/ElectionFactory.json"
);

const compiledFactory = JSON.parse(
  fs.readFileSync(contractPath, "utf8")
);

// DEPLOY 
const deploy = async () => {
  try {
    const accounts = await web3.eth.getAccounts();

    console.log("🚀 Déploiement depuis :", accounts[0]);

    const contract = new web3.eth.Contract(compiledFactory.abi);

    const result = await contract
      .deploy({
        data: compiledFactory.evm.bytecode.object || compiledFactory.bytecode,
      })
      .send({
        from: accounts[0],
        gas: "4000000",
      });

    console.log("✅ Contrat déployé !");
    console.log("📍 Adresse :", result.options.address);

    // sauvegarder adresse
    fs.writeFileSync(
      path.resolve(__dirname, "../frontend/src/ethereum/address.json"),
      JSON.stringify({ address: result.options.address })
    );

  } catch (error) {
    console.error(" Erreur déploiement :", error.message);
  }
};

//  RUN 
deploy();