import React from "react";
import Web3 from "web3";
import ContractArtifact from "./lottery.json";


class App extends React.Component {
  state = {
    manager: "",
    players: [],
    powerBallPlayers: [],
    balance: "",
    accountAddress: "",
    value: "",
    powerBall: "",
    latestPowerBallNumber: "",
    message: "",
    contractAddress: "",
  };

  async componentDidMount() {
    const contractABI = ContractArtifact.abi;
    const networkId = await window.ethereum.request({ method: "net_version" });
    const contractAddress = ContractArtifact.networks[networkId].address;

    const web3 = new Web3(window.ethereum);
    const LotteryContract = new web3.eth.Contract(contractABI, contractAddress);

    const manager = await LotteryContract.methods.manager().call();
    const players = await LotteryContract.methods.getPlayers().call();
    const powerBallPlayers = await LotteryContract.methods.getPowerBallPlayers().call();
    const latestPowerBallNumber = await LotteryContract.methods.getPowerBall().call();
    console.log(latestPowerBallNumber);
    const balance = await web3.eth.getBalance(LotteryContract.options.address);
    const accounts = await web3.eth.getAccounts();
    const accountAddress = accounts[0];
    this.setState({
      manager,
      players,
      powerBallPlayers, balance, accountAddress, latestPowerBallNumber,
      contractAddress: contractAddress
    });
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
    await LotteryContract.methods.enter(this.state.powerBall).send({
      from: accounts[0],
      value: Web3.utils.toWei(this.state.value, "ether"),
    });

    const players = await LotteryContract.methods.getPlayers().call();
    const powerBallPlayers = await LotteryContract.methods.getPowerBallPlayers().call();
    const balance = await web3.eth.getBalance(LotteryContract.options.address);
    this.setState({ players, powerBallPlayers, balance, message: "You have been entered!" });
  };

  onClick = async () => {
    const contractABI = ContractArtifact.abi;
    const networkId = await window.ethereum.request({ method: "net_version" });
    const contractAddress = ContractArtifact.networks[networkId].address;

    const web3 = new Web3(window.ethereum);
    const LotteryContract = new web3.eth.Contract(contractABI, contractAddress);
    const accounts = await web3.eth.getAccounts();

    this.setState({ message: "Waiting on transaction success..." });

    await LotteryContract.methods.pickWinner().send({
      from: accounts[0],
    });
    const players = await LotteryContract.methods.getPlayers().call();
    const powerBallPlayers = await LotteryContract.methods.getPowerBallPlayers().call();
    const balance = await web3.eth.getBalance(LotteryContract.options.address);
    this.setState({ players, powerBallPlayers, balance, message: "A winner has been picked! Check your wallet now!" });
  };

  fetchPowerBallNumber = async () => {
    const contractABI = ContractArtifact.abi;
    const networkId = await window.ethereum.request({ method: "net_version" });
    const contractAddress = ContractArtifact.networks[networkId].address;

    const web3 = new Web3(window.ethereum);
    const LotteryContract = new web3.eth.Contract(contractABI, contractAddress);
    const accounts = await web3.eth.getAccounts();

    this.setState({ message: "Waiting on transaction success..." });

    await LotteryContract.methods.requestUpdate().send({
      from: accounts[0],
    });
    const players = await LotteryContract.methods.getPlayers().call();
    const powerBallPlayers = await LotteryContract.methods.getPowerBallPlayers().call();
    const latestPowerBallNumber = await LotteryContract.methods.getPowerBall().call();
    const balance = await web3.eth.getBalance(LotteryContract.options.address);
    this.setState({ players, powerBallPlayers, balance, latestPowerBallNumber, message: "The latest Power Ball Number has fetched!" });
  };

  render() {
    return (
      <div className="container mt-5">
        <div className="container">
          <h1 className="h1">CCMP 606 - Integrated Services Using Smart Contracts</h1>
          <h5 className="h5">You are login as <a target="_blank" rel="noreferrer" href={"https://sepolia.etherscan.io/address/" + this.state.accountAddress}>{this.state.accountAddress}</a></h5>
          <h5 className="h5">
            This contract is managed by <a target="_blank" rel="noreferrer" href={"https://sepolia.etherscan.io/address/" + this.state.manager}>{this.state.manager} </a>
          </h5>
          <h5 className="h5">This contract address is <a target="_blank" rel="noreferrer" href={"https://sepolia.etherscan.io/address/" + this.state.contractAddress}>{this.state.contractAddress}</a></h5>
          <hr></hr>
        </div>
        <div className="container">
          <form onSubmit={this.onSubmit}>
            <h4>Want to try your luck?</h4>
            <div >
              <label>Amount of ether to enter, must be equal or more than 0.1 ETH</label>
              <div className="input-group flex-nowrap">
                <span className="input-group-text" id="addon-wrapping">ETH</span>
                <input
                  type="text"
                  placeholder="Amount of ETH"
                  className="form-control"
                  value={this.state.value}
                  onChange={(event) => this.setState({ value: event.target.value })}
                />
              </div>
            </div>
            <div >
              <label>PowerBall Number</label>
              <div className="input-group flex-nowrap">
                <span className="input-group-text" id="addon-wrapping">PowerBall</span>
                <input
                  type="text"
                  placeholder="Your PowerBall Number"
                  className="form-control"
                  value={this.state.powerBall}
                  onChange={(event) => this.setState({ powerBall: event.target.value })}
                />
              </div>
            </div>
            <button className="btn btn-primary btn-lg mt-2">Enter</button>
          </form>
          <hr></hr>
        </div>
        <div className="container">
          {this.state.accountAddress === this.state.manager ?
            <div>
              <h4>Ready to pick a winner?</h4>
              <button type="button" className="btn btn-success btn-lg" onClick={this.onClick}>Pick a winner!</button>
              <hr />
            </div>
            : ""}

          {this.state.accountAddress === this.state.manager ?
            <div>
              <h4>Fetching latest Powerl Ball Number</h4>
              <button type="button" className="btn btn-danger text-white btn-lg" onClick={this.fetchPowerBallNumber}>Request Oracle The Latest PowerBall Number!</button>
              <hr />
            </div>
            : ""}

          {this.state.latestPowerBallNumber && this.state.manager === this.state.accountAddress ? <div class="">The latest Power Ball Number is <span class="h1">{Number(this.state.latestPowerBallNumber)}</span><hr></hr></div> : ""}

          {this.state.message ?
            <div>
              <h1>{this.state.message}</h1>
              <hr></hr>
            </div>
            : ""}
          <p>There are currently {this.state.players.length} people entered, competing to win {Web3.utils.fromWei(this.state.balance, "ether")} ether!</p>
          <p>List and index of players:</p>
          <ol type="number">
            {this.state.players.map((player, index) => (
              <li key={index}>{player} - {Number(this.state.powerBallPlayers[index])}</li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default App;