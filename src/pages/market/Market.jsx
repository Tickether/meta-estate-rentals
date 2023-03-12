import Rentals from '../../components/rentals/Rentals';
import './market.css';

function Market() {

    const data = []
    return (
        <div className="market">
            <div className="marketContainer">
                <div className="marketListWrapper">
                    {data.map(item=>(
                      <Rentals item={item} key={item.contractAddress}/>
                    ))}
                </div>
            </div>
        </div>
  );
}

export default Market;