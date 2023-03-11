import './App.css';
import { ConnectWalletProvider, getDefaultConnectors, ConnectButton, useConnectionModal } from '@shopify/connect-wallet';
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { sepolia, mainnet, polygon } from "wagmi/chains";
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'


function App() {

  const { chains, provider } = configureChains(
    [sepolia, mainnet, polygon], 
    [infuraProvider({ apiKey: "8231230ce0b44ec29c8682c1e47319f9" }), publicProvider()],

  );

  const {connectors} = getDefaultConnectors({chains})

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider
  });

  const {openModal} = useConnectionModal()

  return (
    <div className="App">
      <WagmiConfig client={wagmiClient}>
        <ConnectWalletProvider chains={chains}>
          <div><ConnectButton/></div>
          <div>
            <button onClick={openModal}> connect </button>
          </div>
        </ConnectWalletProvider>
      </WagmiConfig>
    </div>
  );
}

export default App;
