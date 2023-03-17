import './App.css';
import { ConnectButton, ConnectWalletProvider, getDefaultConnectors } from '@shopify/connect-wallet';
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { sepolia, mainnet, polygon } from "wagmi/chains";
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'

import { Page, LegacyCard, Button } from '@shopify/polaris';




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


  return (
    <div className="App">
      
      <WagmiConfig client={wagmiClient}>
        <ConnectWalletProvider chains={chains}>
        <div className='AppWrapper'>
          <div><ConnectButton /></div>
          <div className='AppTitle'>
            <h1>Meta Estate Rentals</h1>
          </div>
          <div className='AppContent'>
            

          </div>
        </div>
          
          
          
 

        </ConnectWalletProvider>
      </WagmiConfig>
      
    </div>
  );
}

export default App;
