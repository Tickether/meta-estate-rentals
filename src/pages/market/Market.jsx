
import './market.css';

import { useContract, useOwnedNFTs } from "@thirdweb-dev/react";
import axios from 'axios';
import { useEffect, useState } from 'react';
import Rentals from '../../components/rentals/Rentals';


/*
<div className="market">
            <div className="marketContainer">
                <div className="marketListWrapper">
                    {data.map(item=>(
                      <Rentals item={item} key={item.contractAddress}/>
                    ))}
                </div>
            </div>
</div>
*/
function Market() {

  const [homes, setHomes] = useState([])
  const { contract } = useContract("0xB70b94a982A405236b2fBe5cec81F4DD4e0dFFD2");

  const { data: ownedNFTs, isLoading, error } = useOwnedNFTs(contract, "0xF7B083022560C6b7FD0a758A5A1edD47eA87C2bC");
  
  console.log(ownedNFTs)
  console.log(isLoading)

  
  useEffect (  ()=> {
    async function loadHomes() {

    
      const rentalHomes = await Promise.all(ownedNFTs?.map(async i => {

        const tokenUri = await axios.get(i.metadata.uri) //
        const uri = tokenUri.data
        console.log(uri)
  
        let rentalHome = {
          tokenId: i.metadata.id,
          image: tokenUri.data.image,
          name: tokenUri.data.name,
          description: tokenUri.data.description
        }
        return rentalHome
      }))
      
      setHomes(rentalHomes)
    //console.log(uri)
  }
  loadHomes();
  }, [ownedNFTs])

  console.log(homes)
 
  return (
    <div className="market">
      <div className="marketContainer">
        <div className="marketListWrapper">
        {homes.map(item=>(
          <Rentals item={item} key={item.tokenId}/>
        ))}
        </div> 
      </div>
    </div>
  );
}

export default Market;