import React from 'react';
import './App.css';
import {createWeb3Modal, defaultConfig, useWeb3ModalAccount} from '@web3modal/ethers/react';
import {useWeb3Modal} from '@web3modal/ethers/react';

// 1. Get projectId
const projectId = '74370368811ba66914930f4fb4b97b9d'

// 2. Set chains
const mainnet = {
    chainId: 97,
    name: 'BNB Smart Chain Testnet',
    currency: 'tBNB',
    explorerUrl: 'https://bscscan.io',
    rpcUrl: 'https://data-seed-prebsc-1-s2.bnbchain.org:8545'
}

// 3. Create a metadata object
const metadata = {
    name: 'CryptoLottery777',
    description: 'CryptoLottery777',
    url: 'https://cryptolottery777.netlify.app/', // origin must match your domain & subdomain
    icons: ["avatar"]
}

// 4. Create Ethers config
const ethersConfig = defaultConfig({
    /*Required*/
    metadata,

    /*Optional*/
    enableEIP6963: true, // true by default
    enableInjected: true, // true by default
    enableCoinbase: true, // true by default
    rpcUrl: '...', // used for the Coinbase SDK
    defaultChainId: 97 // used for the Coinbase SDK
})

// 5. Create a Web3Modal instance
createWeb3Modal({
    ethersConfig,
    chains: [mainnet],
    projectId,
    enableAnalytics: true, // Optional - defaults to your Cloud configuration
    themeMode: "dark",
    themeVariables: {
        "--w3m-font-family": 'Noto Sans Regular',
        "--w3m-accent": "#FFF",
        "--w3m-border-radius-master": "16px",
    },
})

function App() {

    const {address, chainId, isConnected, status} = useWeb3ModalAccount();
    const { open } = useWeb3Modal()

    const handleConnect = async () => {
            await open();
    }

    console.log("address", address)
    console.log("chainId", chainId)
    console.log("isConnected", isConnected)
    console.log("status", status)

  return (
    <div className="App">
      <button onClick={handleConnect}>{!isConnected? "Connect": "disconnect"}</button>
        <br/>
        {isConnected?<div>
            <div>isConnected: {isConnected.toString()}</div>
            <div>address: {address}</div>
            <div>chainId: {chainId}</div>
            <div>status: {status}</div>
        </div>:<div>isConnected: {isConnected.toString()}</div>}

    </div>
  );
}

export default App;
