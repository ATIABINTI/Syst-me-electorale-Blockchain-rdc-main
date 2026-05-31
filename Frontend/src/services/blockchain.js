// src/services/blockchain.js
import { ethers } from "ethers";
import ElectionJSON from "../ethereum/build/Election.json"; // le JSON compilé de ton smart contract

// Adresse déployée du contrat (change selon ton déploiement)
const CONTRACT_ADDRESS = "0x1234567890abcdef1234567890abcdef12345678";

export const getProvider = () => {
  if (!window.ethereum) {
    throw new Error("MetaMask non détecté ! Installez MetaMask pour interagir avec la blockchain.");
  }
  const provider = new ethers.BrowserProvider(window.ethereum); // nouvelle API ethers 6+
  return provider;
};

export const getSigner = async () => {
  const provider = getProvider();
  await provider.send("eth_requestAccounts", []); // demande de connexion à MetaMask
  const signer = await provider.getSigner();
  return signer;
};

export const getElectionContract = async () => {
  const signer = await getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, ElectionJSON.abi, signer);
  return contract;
};