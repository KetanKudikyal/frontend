import { ethers } from "ethers";
import { Chain, erc20ABI } from "wagmi";
import Autopay from "./autoPay_abi.json";
import Conditional from "./conditional_abi.json";

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
const AUTOPAY_CONTRACT_ADDRESSES = {
  mainnets: {
    polygon: "0x",
    ethereum: "0x",
    optimism: "0x",
    arbitrum: "0x",
    bsc: "0x",
  },
  testnets: {
    polygonMumbai: "0xb0853E24843fA174E6cA3F5Acd4c2689Ea39FFef",
    goerli: "0x6c03614d33eFC94Aca36dD80E3ff42Ab02d2017a",
  },
};

const CONDITIONAL_CONTRACT_ADDRESSES = {
  mainnets: {
    polygon: "0x",
    ethereum: "0x",
    optimism: "0x",
    arbitrum: "0x",
    bsc: "0x",
  },
  testnets: {
    polygonMumbai: "0x7A680B8CE96127c03F28348CcFB8c9BAB4f29FC5",
    goerli: "0x868606dA0fbBD60c40ba8c93A8944E7Ec2D9C193",
  },
};

const TOKEN_ADDRESSES = {
  polygon: {
    USDC: "0x",
    USDT: "0x",
    DAI: "0x",
  },
  goerli: {
    TEST: "0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1",
  },
  optimismGoerli: {
    TEST: "0x68Db1c8d85C09d546097C65ec7DCBFF4D6497CbF",
  },
  polygonMumbai: {
    TEST: "0xeDb95D8037f769B72AAab41deeC92903A98C9E16",
  },
  arbitrum: {
    TEST: "0xDC805eAaaBd6F68904cA706C221c72F8a8a68F9f",
  },
  "polygon-zkevm": {
    TEST: "0x5f921E4DE609472632CEFc72a3846eCcfbed4ed8",
  },
};

const CONNEXT_DOMAINS = {
  goerli: "1735353714",
  optimismGoerli: "1735356532",
  polygonMumbai: "9991",
  arbitrumGoerli: "1734439522",
  polygonZkevmTestnet: "1887071092",
};

const AUTOPAY_CONTRACT = (chain: Chain, provider) =>
  new ethers.Contract(
    chain
      ? AUTOPAY_CONTRACT_ADDRESSES[chain?.testnet ? "testnets" : "mainnets"][
          chain?.network
        ]
      : AUTOPAY_CONTRACT_ADDRESSES["testnets"]["goerli"],
    Autopay.abi,
    provider
  );

const CONDITIONAL_CONTRACT = (chain: Chain, provider) =>
  new ethers.Contract(
    chain
      ? CONDITIONAL_CONTRACT_ADDRESSES[
          chain?.testnet ? "testnets" : "mainnets"
        ][chain?.network]
      : CONDITIONAL_CONTRACT_ADDRESSES["testnets"]["goerli"],
    Conditional.abi,
    provider
  );

const ERC20_CONTRACT = (tokenAddress, provider) =>
  new ethers.Contract(tokenAddress, erc20ABI, provider);

export {
  CONDITIONAL_CONTRACT_ADDRESSES,
  AUTOPAY_CONTRACT_ADDRESSES,
  CONDITIONAL_CONTRACT,
  TOKEN_ADDRESSES,
  AUTOPAY_CONTRACT,
  ERC20_CONTRACT,
  ZERO_ADDRESS,
  CONNEXT_DOMAINS,
};
