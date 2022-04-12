import React, { useEffect, useState } from "react";
import "./App.css";
import {
  CircularProgress,
  Button,
  Card,
  CardContent,
  TextField
} from "@material-ui/core";
import { ethers } from "ethers";
const App = () => {
  const [contractAddress, setContractAddress] = useState(
    "0xa620A06C3950C35a418E9B41b53610Fe5F1dB109"
  );
  const [contractABI, setContractABI] = useState([
    {
      inputs: [
        { internalType: "uint256", name: "initialSupply", type: "uint256" },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        { indexed: true, internalType: "address", name: "to", type: "address" },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      inputs: [
        { internalType: "address", name: "owner", type: "address" },
        { internalType: "address", name: "spender", type: "address" },
      ],
      name: "allowance",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "approve",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "account", type: "address" }],
      name: "balanceOf",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "decimals",
      outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "subtractedValue", type: "uint256" },
      ],
      name: "decreaseAllowance",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "addedValue", type: "uint256" },
      ],
      name: "increaseAllowance",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalSupply",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "recipient", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "transfer",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "sender", type: "address" },
        { internalType: "address", name: "recipient", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "transferFrom",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
  ]);
  const [walletAddress, setWalletAddress] = useState("");
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [contractTx, setContractTx] = useState("");
  const [loading, setLoading] = useState(false);
  const [handleOpen, setHandleOpen] = useState(false);
  const [handleClose, setHandleClose] = useState(false);

  const handleWalletAddressChange = (e) => {
    setWalletAddress(e.target.value);
  };

  const connectWallet = async () => {
    try {
      if (!window.ethereum)
        throw new Error("No crypto wallet found. Please install it.");

      await window.ethereum.send("eth_requestAccounts");
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const signature = await signer.signMessage("Welcome Dragon");
      const tx = new ethers.Contract(contractAddress, contractABI, signer);
      setContractTx(tx);
      const name = await tx.name();
      setTokenName(name);

      const symbol = await tx.symbol();
      setTokenSymbol(symbol);
    } catch (error) {
      console.log(error);
    }
  };
  const tokenTransfer = async () => {
    try {
      if (contractTx) {
        if (walletAddress) {
          const transferTx = await contractTx.transfer(
            walletAddress,
            ethers.utils.parseEther("1000")
          );
          setLoading(true);
          setTimeout(
            function () {
              setLoading(false);
            }.bind(this),
            20000
          );
        } else {
          alert("please Enter Wallet Address")
        }
      } else {
       alert("please connect Wallet")
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='App'>
      <div>
        <div id='button'>
          <Button
            variant='contained'
            color='primary'
            onClick={connectWallet}
            style={{ marginTop: 50, marginRight: 100 }}
          >
            Connect Wallet
          </Button>
        </div>
      </div>
      <Card
      variant="outlined"
        style={{
          width: "70%",
          height: ' 30%',
          marginLeft: "15%",
          marginTop: 50,
          // backgroundColor: "yellow",
        }}
      >
        <CardContent>
          <p>Token Name: {tokenName ? <b>{tokenName}</b> : "Token Name"}</p>
          <p>
            Token Symbol: {tokenSymbol ? <b>{tokenSymbol}</b> : "Token Symbol"}
          </p>
        </CardContent>
      </Card>

      <Card
      variant="outlined"
        style={{
          width: "70%",
          height: ' 30%',
          marginLeft: "15%",
          marginTop: 50,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 30,
          }}
        >
          <div style={{ width: "50%" }}>
            <TextField
              id='outlined-basic'
              label='Wallet Address'
              variant='outlined'
              size='large'
              fullWidth
              value={walletAddress}
              onChange={handleWalletAddressChange}
            />
          </div>
        </div>
        <CardContent>
          <Button
            variant='contained'
            color='primary'
            onClick={tokenTransfer}
            disabled={loading}
          >
            {loading && (
              <CircularProgress
                size={30}
                style={{ marginLeft: 50, marginRight: 50 }}
              />
            )}
            {!loading && "Transfer"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
export default App;
