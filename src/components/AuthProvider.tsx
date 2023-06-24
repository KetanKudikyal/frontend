import { getNetwork } from '@wagmi/core';
import React, { ReactNode } from 'react';
import { createContext, useState } from 'react';
import { Chain, useAccount } from 'wagmi';

type Props = {
  children: ReactNode;
};

interface token {
  address: string;
  decimals: string;
  logo: string;
}

interface AuthData {
  userAddress: `0x${string}` | undefined;
  isConnected: boolean | null;
  viewChain: { name: string; id: number } | null;
  setViewChain: (chain: { name: string; id: number }) => void;
  sourceChain: (Chain & { unsupported?: boolean | undefined }) | undefined;
  sourceToken: token | null;
  appMode: 'Auto Pay' | 'xStream';
  setSourceToken: (token: token) => void;
  setAppMode: (mode: 'Auto Pay' | 'xStream') => void;
}

export const AuthContext = createContext<AuthData>({
  userAddress: undefined,
  isConnected: false,
  viewChain: null,
  setViewChain: () => {
    return null;
  },
  sourceChain: undefined,
  sourceToken: null,
  appMode: 'Auto Pay',
  setSourceToken: () => () => {
    return null;
  },
  setAppMode: () => () => {
    return null;
  },
  // gasMode: "Forward",
});

const AuthProvider = ({ children }: Props) => {
  const { address, isConnected } = useAccount();
  const { chain } = getNetwork();
  const [viewChain, setViewChain] = useState({
    name: 'goerli',
    id: 5,
  });
  const [sourceToken, setSourceToken] = useState<token | null>(null);
  const [appMode, setAppMode] = useState<'Auto Pay' | 'xStream'>('Auto Pay');

  return (
    <AuthContext.Provider
      value={{
        userAddress: address,
        isConnected: isConnected,
        viewChain: viewChain,
        setViewChain: setViewChain,
        sourceChain: chain,
        sourceToken: sourceToken,
        appMode: appMode,
        setSourceToken: setSourceToken,
        setAppMode: setAppMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;