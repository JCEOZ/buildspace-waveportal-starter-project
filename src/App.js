import * as React from "react";
import { ethers } from "ethers";
import './App.css';

export default function App() {
  const [currentAccount, setCurrentAccount] = React.useState("");

  const wave = () => {

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
          Wave at Me
        </button>
      </div>
    </div>
  );
}
