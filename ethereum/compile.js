const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

//  PATHS 
const buildPath = path.resolve(__dirname, "..", "frontend", "src", "ethereum", "build");
const contractPath = path.resolve(__dirname, "contracts", "Election.sol");

console.log(" Build path:", buildPath);

// CLEAN BUILD
fs.removeSync(buildPath);
fs.ensureDirSync(buildPath);

// READ CONTRACT 
const source = fs.readFileSync(contractPath, "utf8");

//  INPUT CONFIG
const input = {
   language: "Solidity",
   sources: {
      "Election.sol": {
         content: source,
      },
   },
   settings: {
      outputSelection: {
         "*": {
            "*": ["abi", "evm.bytecode"],
         },
      },
   },
};

// COMPILE 
let output;
try {
   output = JSON.parse(solc.compile(JSON.stringify(input))).contracts["Election.sol"];
} catch (err) {
   console.error("Compilation error:", err.message);
   process.exit(1);
}

// BUILD OUTPUT 
for (let contractName in output) {
   fs.outputJSONSync(
      path.resolve(buildPath, contractName + ".json"),
      output[contractName]
   );
}

console.log(" Smart contracts compilés avec succès !");