import './App.css';
import { ConnectWalletProvider, getDefaultConnectors } from '@shopify/connect-wallet';
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { sepolia, mainnet, polygon } from "wagmi/chains";
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Market from './pages/market/Market';
import Services from './pages/services/Services';




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
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element= {<Market />} />
            <Route path='/services' element= {<Services />} />
          </Routes>
        </Router>

        </ConnectWalletProvider>
      </WagmiConfig>
    </div>
  );
}

export default App;
