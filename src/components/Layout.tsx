import * as React from "react";
import * as ReactDOM from "react-dom/client";

import { Toaster } from 'react-hot-toast';
import "react-csv-importer/dist/index.css";

import SourceContextWrapper from "../hooks/context";
import { ISPRODUCTION } from "../constants/constants";
import Navbar from "./Navbar";
import BgImages from "./BgImages";

import { RainbowKitProvider, darkTheme, getDefaultWallets } from '@rainbow-me/rainbowkit'

import { WagmiConfig, createConfig, configureChains } from 'wagmi'
import { mainnet, goerli, polygon, polygonMumbai } from "wagmi/chains";

import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  // @ts-ignore
  ISPRODUCTION ? [mainnet, polygon] : [polygonMumbai, goerli],
  [
    alchemyProvider({
      apiKey: "q-gyDMWPExy6buiSYXupWffZ5fnn5fSp",
    }),
    publicProvider(),
  ]
)

const { connectors } = getDefaultWallets({
  appName: 'Fragments',
  projectId: 'YOUR_PROJECT_ID',
  chains
});


// Set up wagmi config
const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
})


const Layout = ({ children }) => {
  return (
    <>
      <WagmiConfig config={config}>
        <RainbowKitProvider
          appInfo={{
            appName: "framents",
            learnMoreUrl: "",
          }}
          chains={chains}
          showRecentTransactions={true}
          theme={darkTheme()}
        >
          <SourceContextWrapper>
            <Navbar />
            {children}
            <BgImages />
            <Toaster
              position="top-center"
              reverseOrder={false}
              gutter={8}
              containerClassName=""
              containerStyle={{}}
              toastOptions={{
                // Define default options
                className: '',
                duration: 5000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },

                // Default options for specific types
                success: {
                  duration: 3000,
                  // @ts-ignore
                  theme: {
                    primary: 'green',
                    secondary: 'black',
                  },
                },
              }}
            />
          </SourceContextWrapper>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
};

export default Layout;
