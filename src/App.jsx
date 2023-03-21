import './App.css';
import { ConnectButton, ConnectWalletProvider, getDefaultConnectors } from '@shopify/connect-wallet';
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { goerli, sepolia, mainnet, polygon, polygonMumbai } from "wagmi/chains";
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'
import Market from './pages/market/Market';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Rent from './pages/rent/Rent';





function App() {

  const { chains, provider } = configureChains(
    [ polygonMumbai, goerli, sepolia, mainnet, polygon], 
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
          <Router>
            <div><ConnectButton /></div>
            <div className='AppTitle'>
              <h1>Meta Estate Rentals</h1>
            </div>
            <div className='AppContent'>
              <Routes>
                <Route path='/rent/:tokenId' element= {<Rent />} />
                <Route path='/' element= {<Market />} />
              </Routes>
            </div>
          </Router>
        </div>
        </ConnectWalletProvider>
      </WagmiConfig>
      
    </div>
  );
}

export default App;
