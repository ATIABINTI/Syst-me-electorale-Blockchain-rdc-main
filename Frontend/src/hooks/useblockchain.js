// src/hooks/useBlockchain.js
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import ElectionFactory from "../contracts/ElectionFactory.json";

export const useBlockchain = () => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const init = async () => 
                      {
      if (window.ethereum) {
         const prov = new ethers.BrowserProvider(window.ethereum);
               await prov.send("eth_requestAccounts", []);
        const sign = await prov.getSigner();
        const acct = await sign.getAddress();

        const cont = new ethers.Contract(
          "ADRESSE_CONTRACT_DEPLOYÉ", 
          ElectionFactory.abi, 
          sign
        );

        setProvider(prov);
        setSigner(sign);
        setAccount(acct);
        setContract(cont);
      } else {
        console.error("Veuillez installer MetaMask !");
      }
    };
    init();
  }, []);

  return { provider, signer, contract, account };
};