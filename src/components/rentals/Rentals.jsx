import { Link } from 'react-router-dom';
import './rentals.css';

function Rentals({item}) {

    
  
    return (
        <div className="rental">
            <Link to={`/rent/${item.tokenId}`}>
                <div className="rentalContainer">
                    <img 
                        src={item.image} 
                        alt="" 
                        className="rentalImg" 
                    />
                    <div className="rentalDetails">
                        <h2 className="siTitle">{item.name}</h2>
                    </div>
                    
                </div>
            </Link>
        </div>
  );
}

export default Rentals;