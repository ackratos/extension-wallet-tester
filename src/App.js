import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

var Web3 = require('web3');

const masterChiefContract = [
  {
    "inputs": [
      {
        "internalType": "contract SushiToken",
        "name": "_sushi",
        "type": "address"
      },
      { "internalType": "address", "name": "_devaddr", "type": "address" },
      {
        "internalType": "uint256",
        "name": "_sushiPerBlock",
        "type": "uint256"
      },
      { "internalType": "uint256", "name": "_startBlock", "type": "uint256" },
      { "internalType": "uint256", "name": "_bonusEndBlock", "type": "uint256" }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "BONUS_MULTIPLIER",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "_allocPoint", "type": "uint256" },
      {
        "internalType": "contract IERC20",
        "name": "_lpToken",
        "type": "address"
      },
      { "internalType": "bool", "name": "_withUpdate", "type": "bool" }
    ],
    "name": "add",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "bonusEndBlock",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "_pid", "type": "uint256" },
      { "internalType": "uint256", "name": "_amount", "type": "uint256" }
    ],
    "name": "deposit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "_devaddr", "type": "address" }
    ],
    "name": "dev",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "devaddr",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "_pid", "type": "uint256" }
    ],
    "name": "emergencyWithdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "_from", "type": "uint256" },
      { "internalType": "uint256", "name": "_to", "type": "uint256" }
    ],
    "name": "getMultiplier",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "massUpdatePools",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "_pid", "type": "uint256" },
      {
        "internalType": "contract Migrator",
        "name": "_migrator",
        "type": "address"
      }
    ],
    "name": "migrate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "_pid", "type": "uint256" },
      { "internalType": "address", "name": "_user", "type": "address" }
    ],
    "name": "pendingSushi",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "name": "poolInfo",
    "outputs": [
      {
        "internalType": "contract IERC20",
        "name": "lpToken",
        "type": "address"
      },
      { "internalType": "uint256", "name": "allocPoint", "type": "uint256" },
      {
        "internalType": "uint256",
        "name": "lastRewardBlock",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "accSushiPerShare",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "poolLength",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "_pid", "type": "uint256" },
      { "internalType": "uint256", "name": "_allocPoint", "type": "uint256" },
      { "internalType": "bool", "name": "_withUpdate", "type": "bool" }
    ],
    "name": "set",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "startBlock",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "sushi",
    "outputs": [
      { "internalType": "contract SushiToken", "name": "", "type": "address" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "sushiPerBlock",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalAllocPoint",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "newOwner", "type": "address" }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "_pid", "type": "uint256" }
    ],
    "name": "updatePool",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" },
      { "internalType": "address", "name": "", "type": "address" }
    ],
    "name": "userInfo",
    "outputs": [
      { "internalType": "uint256", "name": "amount", "type": "uint256" },
      { "internalType": "uint256", "name": "rewardDebt", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "_pid", "type": "uint256" },
      { "internalType": "uint256", "name": "_amount", "type": "uint256" }
    ],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

export const supportedPools = [
  {
    pid: 12,
    lpAddresses: {
      1: '0x795065dCc9f64b5614C407a6EFDC400DA6221FB0',
    },
    tokenAddresses: {
      1: '0x6b3595068778dd592e39a122f4f5a5cf09c90fe2',
    },
    name: 'Sushi Party!',
    symbol: 'SUSHI-ETH SLP',
    tokenSymbol: 'SUSHI',
    icon: '🍣',
  },
  {
    pid: 18,
    lpAddresses: {
      1: '0xdafd66636e2561b0284edde37e42d192f2844d40', //change this
    },
    tokenAddresses: {
      1: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
    },
    name: 'UNI Unicorn',
    symbol: 'UNI-ETH SLP',
    tokenSymbol: 'UNI',
    icon: '🦄',
  },
  {
    pid: 0,
    lpAddresses: {
      1: '0x06da0fd433C1A5d7a4faa01111c044910A184553',
    },
    tokenAddresses: {
      1: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    },
    name: 'Tether Turtle',
    symbol: 'USDT-ETH SLP',
    tokenSymbol: 'USDT',
    icon: '🐢',
  },
  {
    pid: 1,
    lpAddresses: {
      1: '0x397FF1542f962076d0BFE58eA045FfA2d347ACa0',
    },
    tokenAddresses: {
      1: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    },
    name: 'Circle Snail',
    symbol: 'USDC-ETH SLP',
    tokenSymbol: 'USDC',
    icon: '🐌',
  },
  {
    pid: 2,
    lpAddresses: {
      1: '0xC3D03e4F041Fd4cD388c549Ee2A29a9E5075882f',
    },
    tokenAddresses: {
      1: '0x6b175474e89094c44da98b954eedeac495271d0f',
    },
    name: 'Donald DAI',
    symbol: 'DAI-ETH SLP',
    tokenSymbol: 'DAI',
    icon: '🦆',
  },
  {
    pid: 3,
    lpAddresses: {
      1: '0xF1F85b2C54a2bD284B1cf4141D64fD171Bd85539',
    },
    tokenAddresses: {
      1: '0x57ab1ec28d129707052df4df418d58a2d46d5f51',
    },
    name: 'Spartan Dollar',
    symbol: 'SUSD-ETH SLP',
    tokenSymbol: 'SUSD',
    icon: '🦍',
  },
  {
    pid: 7,
    lpAddresses: {
      1: '0x001b6450083e531a5a7bf310bd2c1af4247e23d4',
    },
    tokenAddresses: {
      1: '0x04fa0d235c4abf4bcf4787af4cf447de572ef828',
    },
    name: 'Umami Squid',
    symbol: 'UMA-ETH SLP',
    tokenSymbol: 'UMA',
    icon: '🦑',
  },
  {
    pid: 9,
    lpAddresses: {
      1: '0xA75F7c2F025f470355515482BdE9EFA8153536A8',
    },
    tokenAddresses: {
      1: '0xba11d00c5f74255f56a5e366f4f77f5a186d7f55',
    },
    name: 'Band-osaurus',
    symbol: 'BAND-ETH SLP',
    tokenSymbol: 'BAND',
    icon: '🦖',
  },
  {
    pid: 8,
    lpAddresses: {
      1: '0xC40D16476380e4037e6b1A2594cAF6a6cc8Da967',
    },
    tokenAddresses: {
      1: '0x514910771af9ca656af840dff83e8264ecf986ca',
    },
    name: 'Toadie Marine',
    symbol: 'LINK-ETH SLP',
    tokenSymbol: 'LINK',
    icon: '🐸',
  },
  {
    pid: 10,
    lpAddresses: {
      1: '0xCb2286d9471cc185281c4f763d34A962ED212962',
    },
    tokenAddresses: {
      1: '0xd46ba6d942050d489dbd938a2c909a5d5039a161',
    },
    name: 'Ample Chicks',
    symbol: 'AMPL-ETH SLP',
    tokenSymbol: 'AMPL',
    icon: '🐥',
  },
  {
    pid: 4,
    lpAddresses: {
      1: '0x31503dcb60119a812fee820bb7042752019f2355',
    },
    tokenAddresses: {
      1: '0xc00e94cb662c3520282e6f5717214004a7f26888',
    },
    name: 'Compound Truffle',
    symbol: 'COMP-ETH SLP',
    tokenSymbol: 'COMP',
    icon: '🍄',
  },
  {
    pid: 5,
    lpAddresses: {
      1: '0x5E63360E891BD60C69445970256C260b0A6A54c6',
    },
    tokenAddresses: {
      1: '0x80fb784b7ed66730e8b1dbd9820afd29931aab03',
    },
    name: 'Aave Boar',
    symbol: 'LEND-ETH SLP',
    tokenSymbol: 'LEND',
    icon: '🐗',
  },
  {
    pid: 6,
    lpAddresses: {
      1: '0xA1d7b2d891e3A1f9ef4bBC5be20630C2FEB1c470',
    },
    tokenAddresses: {
      1: '0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f',
    },
    name: 'Synthetic Snake',
    symbol: 'SNX-ETH SLP',
    tokenSymbol: 'SNX',
    icon: '🐍',
  },
  {
    pid: 11,
    lpAddresses: {
      1: '0x088ee5007C98a9677165D78dD2109AE4a3D04d0C',
    },
    tokenAddresses: {
      1: '0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e',
    },
    name: 'YFI Whale',
    symbol: 'YFI-ETH SLP',
    tokenSymbol: 'YFI',
    icon: '🐋',
  },
  {
    pid: 13,
    lpAddresses: {
      1: '0x611cde65dea90918c0078ac0400a72b0d25b9bb1',
    },
    tokenAddresses: {
      1: '0x408e41876cccdc0f92210600ef50372656052a38',
    },
    name: 'REN Rhino',
    symbol: 'REN-ETH SLP',
    tokenSymbol: 'REN',
    icon: '🦏',
  },
  {
    pid: 14,
    lpAddresses: {
      1: '0xaad22f5543fcdaa694b68f94be177b561836ae57',
    },
    tokenAddresses: {
      1: '0x68A118Ef45063051Eac49c7e647CE5Ace48a68a5',
    },
    name: 'BASED Bull',
    symbol: 'BASED-sUSD SLP',
    tokenSymbol: 'BASED',
    icon: '🐂',
  },
  {
    pid: 15,
    lpAddresses: {
      1: '0x117d4288b3635021a3d612fe05a3cbf5c717fef2',
    },
    tokenAddresses: {
      1: '0x476c5E26a75bd202a9683ffD34359C0CC15be0fF',
    },
    name: 'SRM Shark',
    symbol: 'SRM-ETH SLP',
    tokenSymbol: 'SRM',
    icon: '🦈',
  },
  {
    pid: 16,
    lpAddresses: {
      1: '0x95b54c8da12bb23f7a5f6e26c38d04acc6f81820',
    },
    tokenAddresses: {
      1: '0xaba8cac6866b83ae4eec97dd07ed254282f6ad8a',
    },
    name: 'YAMv2',
    symbol: 'YAMv2-ETH SLP',
    tokenSymbol: 'YAMv2',
    icon: '🍠',
  },
  {
    pid: 17,
    lpAddresses: {
      1: '0x58Dc5a51fE44589BEb22E8CE67720B5BC5378009',
    },
    tokenAddresses: {
      1: '0xD533a949740bb3306d119CC777fa900bA034cd52',
    },
    name: 'CRV Crocodile',
    symbol: 'CRV-ETH SLP',
    tokenSymbol: 'CRV',
    icon: '🐊',
  },
  {
    pid: 19,
    lpAddresses: {
      1: '0x36e2FCCCc59e5747Ff63a03ea2e5C0c2C14911e7',
    },
    tokenAddresses: {
      1: '0x8798249c2E607446EfB7Ad49eC89dD1865Ff4272',
    },
    name: "Chef's Menu",
    symbol: 'xSUSHI-ETH SLP',
    tokenSymbol: 'xSUSHI',
    icon: '👨🏻‍🍳',
  },
  {
    pid: 20,
    lpAddresses: {
      1: '0x0Cfe7968e7c34A51217a7C9b9dc1690F416E027e',
    },
    tokenAddresses: {
      1: '0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643',
    },
    name: "Chef's Menu",
    symbol: 'cDAI-DAI SLP',
    tokenSymbol: 'cDAI',
    icon: '‍👨🏻‍🍳',
  },
  {
    pid: 21,
    lpAddresses: {
      1: '0xceff51756c56ceffca006cd410b03ffc46dd3a58',
    },
    tokenAddresses: {
      1: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
    },
    name: "Chef's Menu",
    symbol: 'WBTC-ETH SLP',
    tokenSymbol: 'WBTC',
    icon: '👨🏻‍🍳',
  },
  {
    pid: 22,
    lpAddresses: {
      1: '0xf169CeA51EB51774cF107c88309717ddA20be167',
    },
    tokenAddresses: {
      1: '0x2ba592F78dB6436527729929AAf6c908497cB200',
    },
    name: "Chef's Menu",
    symbol: 'CREAM-ETH SLP',
    tokenSymbol: 'CREAM',
    icon: '👨🏻‍🍳',
  },
  {
    pid: 23,
    lpAddresses: {
      1: '0x17b3C19Bd640a59E832AB73eCcF716CB47419846',
    },
    tokenAddresses: {
      1: '0xD5525D397898e5502075Ea5E830d8914f6F0affe',
    },
    name: "Chef's Menu",
    symbol: 'MEME-ETH SLP',
    tokenSymbol: 'MEME',
    icon: '👨🏻‍🍳',
  },
  {
    pid: 24,
    lpAddresses: {
      1: '0xFcff3b04C499A57778ae2CF05584ab24278A7FCb',
    },
    tokenAddresses: {
      1: '0x0d438f3b5175bebc262bf23753c1e53d03432bde',
    },
    name: "Chef's Menu",
    symbol: 'wNXM-ETH SLP',
    tokenSymbol: 'wNXM',
    icon: '👨🏻‍🍳',
  },
  {
    pid: 25,
    lpAddresses: {
      1: '0x382c4a5147Fd4090F7BE3A9Ff398F95638F5D39E',
    },
    tokenAddresses: {
      1: '0x5dbcf33d8c2e976c6b560249878e6f1491bca25c',
    },
    name: "Chef's Menu",
    symbol: 'yUSD-ETH SLP',
    tokenSymbol: 'yUSD',
    icon: '👨🏻‍🍳',
  },
  {
    pid: 26,
    lpAddresses: {
      1: '0x2024324a99231509a3715172d4f4f4e751b38d4d',
    },
    tokenAddresses: {
      1: '0x5dbcf33d8c2e976c6b560249878e6f1491bca25c',
    },
    name: "Chef's Menu",
    symbol: 'yUSD-WBTC SLP',
    tokenSymbol: 'yUSD',
    icon: '👨🏻‍🍳',
  },
  {
    pid: 27,
    lpAddresses: {
      1: '0x0be88ac4b5C81700acF3a606a52a31C261a24A35',
    },
    tokenAddresses: {
      1: '0xa0b73e1ff0b80914ab6fe0444e65848c4c34450b',
    },
    name: "Chef's Menu",
    symbol: 'CRO-ETH SLP',
    tokenSymbol: 'CRO',
    icon: '👨🏻‍🍳',
  },
  {
    pid: 28,
    lpAddresses: {
      1: '0x518d6CE2D7A689A591Bf46433443C31615b206C5',
    },
    tokenAddresses: {
      1: '0xeb4c2781e4eba804ce9a9803c67d0893436bb27d',
    },
    name: "Chef's Menu",
    symbol: 'renBTC-WBTC SLP',
    tokenSymbol: 'renBTC',
    icon: '👨🏻‍🍳',
  },
]

function App() {
  useEffect(() => {
    setTimeout(async () => {
      // const provider = new Web3.providers.HttpProvider('https://bsc-dataseed.binance.org/');
      const provider = window.ethereum;
      // const provider = window.BinanceChain;
      const web3js = new Web3(provider);
      window.web3js = web3js;
      var MyContract = new web3js.eth.Contract(
          masterChiefContract
      );
      MyContract.setProvider(provider)
      MyContract.options.address = "0xc2edad668740f1aa35e4d8f227fb8e17dca888cd"

      await Promise.all(
          supportedPools.map(
              (pool) => {
                MyContract.methods.poolInfo(pool.pid).call();
                MyContract.methods.poolLength().call(); // if we comment out this line, everything would be fine
              }
          ))
    }, 5000);
  })

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
