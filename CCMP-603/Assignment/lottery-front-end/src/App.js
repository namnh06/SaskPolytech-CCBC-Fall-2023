import React from "react";
import Web3 from "web3";
import ContractArtifact from "./Lottery.json";


class App extends React.Component {
  state = {
    manager: "",
    players: [],
    balance: "",
    accountAddress: "",
    value: "",
    message: "",
  };

  async componentDidMount() {
    const contractABI = ContractArtifact.abi;
    const networkId = await window.ethereum.request({ method: "net_version" });
    const contractAddress = ContractArtifact.networks[networkId].address;

    const web3 = new Web3(window.ethereum);
    const LotteryContract = new web3.eth.Contract(contractABI, contractAddress);

    const manager = await LotteryContract.methods.manager().call();
    const players = await LotteryContract.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(LotteryContract.options.address);
    const accounts = await web3.eth.getAccounts();
    const accountAddress = accounts[0];
    this.setState({ manager, players, balance, accountAddress });
  }

  onSubmit = async (event) => {
    event.preventDefault();
    const contractABI = ContractArtifact.abi;
    const networkId = await window.ethereum.request({ method: "net_version" });
    const contractAddress = ContractArtifact.networks[networkId].address;

    const web3 = new Web3(window.ethereum);
    const LotteryContract = new web3.eth.Contract(contractABI, contractAddress);
    const accounts = await web3.eth.getAccounts();

    this.setState({ message: "Waiting on transaction success..." });

    // await lottery.methods.enter().send({
    await LotteryContract.methods.enter().send({
      from: accounts[0],
      value: Web3.utils.toWei(this.state.value, "ether"),
    });

    this.setState({ message: "You have been entered!" });
  };

  onClick = async () => {
    const contractABI = ContractArtifact.abi;
    const networkId = await window.ethereum.request({ method: "net_version" });
    const contractAddress = ContractArtifact.networks[networkId].address;

    const web3 = new Web3(window.ethereum);
    const LotteryContract = new web3.eth.Contract(contractABI, contractAddress);
    const accounts = await web3.eth.getAccounts();

    this.setState({ message: "Waiting on transaction success..." });

    // await lottery.methods.pickWinner().send({
    await LotteryContract.methods.pickWinner().send({
      from: accounts[0],
    });

    this.setState({ message: "A winner has been picked!" });
  };

  render() {
    return (
      <div className="container">
        <div className="container">
          <h1 className="h1">Lottery Contract</h1>
          <h3 className="h3">You are login as {this.state.accountAddress}</h3>
          <h4 className="h4">
            This contract is managed by {this.state.manager}
          </h4>
        </div>
        <hr />
        <div className="container">
          <form onSubmit={this.onSubmit}>
            <h4>Want to try your luck?</h4>
            <div >
              <label>Amount of ether to enter</label>
              <div class="input-group flex-nowrap">
                <span class="input-group-text" id="addon-wrapping">ETH</span>
                <input
                  type="text"
                  placeholder="Amount of ETH"
                  className="form-control"
                  value={this.state.value}
                  onChange={(event) => this.setState({ value: event.target.value })}
                />
              </div>
            </div>
            <button type="button" className="btn btn-primary btn-lg mt-2">Enter</button>
          </form>
        </div>
        <hr></hr>
        <div className="container">
          <h4>Ready to pick a winner?</h4>
          <button type="button" className="btn btn-success btn-lg" onClick={this.onClick}>Pick a winner!</button>
          <hr />
          {this.state.message ? <div><h1>{this.state.message}</h1><hr></hr></div> : ""}
          There are currently{" "}
          {this.state.players.length} people entered, competing to win{" "}
          {Web3.utils.fromWei(this.state.balance, "ether")} ether!
        </div>
      </div>
    );
  }
}
export default App;