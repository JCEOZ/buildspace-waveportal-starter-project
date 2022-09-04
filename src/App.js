import * as React from "react";
import { ethers } from "ethers";
import './App.css';
import abi from "./utils/WavePortal.json";

export default function App() {
  const [currentAccount, setCurrentAccount] = React.useState("");
  const [totalNumberOfWaves, setTotalNumberOfWaves] = React.useState(0);
  const contractAddress = "0x2E40fc20092A1Ed2F28137b0B572a5eFbB8321d5";
  const contractABI = abi.abi;

  const getTotalWaves = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        const count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count: ", count.toNumber());
        setTotalNumberOfWaves(count.toNumber());
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const wave = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        const waveTxn = await wavePortalContract.wave();
        console.log("Mining: ", waveTxn.hash);

        await waveTxn.wait();
        console.log("Mined: ", waveTxn.hash)

        const count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count: ", count.toNumber());
        setTotalNumberOfWaves(count.toNumber());
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Get Metamask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      const account = accounts[0];
      console.log("Connected: ", account);
      setCurrentAccount(account);
    } catch (error) {
      console.log(error);
    }
  }

  const checkIfWalletIsConnected = async () => {
    // First make sure we have access to window.ethereum
    const { ethereum } = window;
    if (!ethereum) {
      console.log("Make sure you have Metamask!");
    } else {
      console.log("We have the ethereum object: ", ethereum);
    }

    // Check if we're authorized to access the user's wallet
    const accounts = await ethereum.request({ method: "eth_accounts" });
    console.log("Accounts: ", accounts);

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account: ", account);
      setCurrentAccount(account);
    } else {
      console.log("No authorized account found");
    }
  }

  // This runs our function when the page loads.
  React.useEffect(() => {
    checkIfWalletIsConnected();
    getTotalWaves();
  }, [])
  
  return (
    <div className="mainContainer">

      <div className="dataContainer">
        <div className="header">
        👋 Hey there!
        </div>

        <div className="bio">
        I am J'CEO'Z and I worked as a developer so that's pretty cool right? Connect your Ethereum wallet and wave at me!
        </div>

        <button className="waveButton" onClick={wave}>
          Wave at Me (Total number of counts: { totalNumberOfWaves })
        </button>

        { !currentAccount && (
          <button className="waveButton" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
}
