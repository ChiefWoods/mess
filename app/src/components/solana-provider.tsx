import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { ReactNode, useEffect } from 'react';
import '@solana/wallet-adapter-react-ui/styles.css';
import { connection } from '@/lib/constants';
import { registerLazorkitWallet } from '@lazorkit/wallet';

export function SolanaProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    registerLazorkitWallet({
      rpcUrl: import.meta.env.VITE_RPC_URL,
      portalUrl: import.meta.env.VITE_LAZORKIT_PORTAL_URL,
      paymasterConfig: {
        paymasterUrl: import.meta.env.VITE_LAZORKIT_PAYMASTER_URL,
        apiKey: import.meta.env.VITE_LAZORKIT_API_KEY,
      },
      clusterSimulation: import.meta.env.VITE_RPC_CLUSTER,
    });
  }, []);

  return (
    <ConnectionProvider endpoint={connection.rpcEndpoint}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
