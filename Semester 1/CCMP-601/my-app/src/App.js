import React, { useState, useEffect } from "react";
import Web3 from "web3";
import ContractArtifact from "./helloworld.json";

function App() {
  const [msg, setMsg] = useState("");
  const [myAccount, setAccount] = useState("");
  const [error, setError] = useState(null);

  const checkWallet = async () => {
    // Check if MetaMask is installed in the browser
    if (window.ethereum) {
      setMsg("Wallet Found");
    } else {
      setMsg("Please Install MetaMask");
    }
  };

  const readSmartContract = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setAccount(accounts[0]);

      const contractABI = ContractArtifact.abi;
      const networkId = await window.ethereum.request({ method: "net_version" });
      const contractAddress = ContractArtifact.networks[networkId].address;

      const web3 = new Web3(window.ethereum);

      const HelloContract = new web3.eth.Contract(contractABI, contractAddress);

      await HelloContract.methods.setHello("Bye Bye Class, 123").send({ from: accounts[0] });

      const theResponse = await HelloContract.methods.getHello().call();

      setMsg(theResponse);
      setError(null);
    } catch (error) {
      console.error("Error:", error);
      setError(error.message || "An error occurred");
    }
  };

  useEffect(() => {
    checkWallet();
  }, []);

  return (
    <div className="App">
      <p>
        {myAccount ? (
          msg
        ) : (
          <button onClick={readSmartContract}> Connect </button>
        )}
      </p>
      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default App;
