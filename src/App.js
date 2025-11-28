import { useState, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { WalletBalanceProvider } from './hooks/use-wallet-balance';
import { NEXT_PUBLIC_SOLANA_NETWORK } from './consts/env';
import Header from './Components/Header';
import Home from './Pages/Home';
import Detail from './Pages/Detail';
import "@solana/wallet-adapter-react-ui/styles.css";
import './App.css';

let WALLETS = {
  getPhantomWallet: () => ({ name: "Phantom" }),
  getSolflareWallet: () => ({ name: "Solflare" }),
  getSolletWallet: () => ({ name: "Sollet" }),
  getLedgerWallet: () => ({ name: "Ledger" }),
  getSlopeWallet: () => ({ name: "Slope" }),
  getSolletExtensionWallet: () => ({ name: "SolletExtension" }),
}

if (typeof window !== "undefined") {
  WALLETS = require("@solana/wallet-adapter-wallets");
}

const network = NEXT_PUBLIC_SOLANA_NETWORK;

function App() {
  const [connected, setConnected] = useState(false);
  const endPoint = useMemo(() => "https://solana-api.projectserum.com", []);

  const wallets = useMemo(() => [
    WALLETS.getPhantomWallet(),
    WALLETS.getSolflareWallet(),
    WALLETS.getSolletWallet({ network }),
    WALLETS.getLedgerWallet(),
    WALLETS.getSlopeWallet(),
    WALLETS.getSolletExtensionWallet({ network }),
  ], [])

  return (
    <ConnectionProvider endpoint={endPoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <WalletBalanceProvider>
            <div className="App bg-black w-full md:w-5/6 lg:w-4/6 m-auto px-4 md:px-0 h-full flex flex-col">
              <Header connected={connected} setConnected={setConnected} />
              {
                connected
                  ? <Detail />
                  : <Home />
              }
            </div>
          </WalletBalanceProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
