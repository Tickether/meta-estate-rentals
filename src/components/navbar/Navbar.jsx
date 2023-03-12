import './navbar.css';
import { ConnectButton } from '@shopify/connect-wallet';


function Navbar() {

    
  
    return (
        <div className="navbar">
            <div className="navbarContainer">
                <div>
                    <span> Meta Estate Rentals </span>
                </div>
                <div> 
                    <ConnectButton />
                </div>
            </div>
        </div>
  );
}

export default Navbar;