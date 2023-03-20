import { useContract, useNFT } from '@thirdweb-dev/react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAccount, useContractRead, useContractWrite } from 'wagmi';
import './rent.css';
import MetaEstateRents from'./MetaEstateRents.json'
import { ethers } from 'ethers';

function Rent() {

    const [expires, setExpires] = useState(1)

    const location = useLocation();

    const { address: user} = useAccount()

    const { contract } = useContract("0xB70b94a982A405236b2fBe5cec81F4DD4e0dFFD2");

    console.log(user)

    const tokenId = location.pathname.split("/")[2];

    const  contractWrite = useContractWrite({
        mode: 'recklesslyUnprepared',
        address: "0xB70b94a982A405236b2fBe5cec81F4DD4e0dFFD2",
        abi: MetaEstateRents.abi,
        functionName: "setUserNative",
        args: [tokenId, user, expires],
        overrides: {
            value: ethers.utils.parseEther((0.005 * expires).toString()),
          },
    })

    const contractReadUserOf = useContractRead({
        address: "0xB70b94a982A405236b2fBe5cec81F4DD4e0dFFD2",
        abi: MetaEstateRents.abi,
        functionName: 'userOf',
        chainId: 80001,
        args: [Number(tokenId)],
        watch: true,
    })

    console.log(contractReadUserOf.data)

    const contractReadUserExpires = useContractRead({
        address: "0xB70b94a982A405236b2fBe5cec81F4DD4e0dFFD2",
        abi: MetaEstateRents.abi,
        functionName: 'userExpires',
        chainId: 80001,
        args: [Number(tokenId)],
        watch: true,
    })

    console.log(contractReadUserExpires.data)

    const { data: rental, isLoading, error } = useNFT(contract, tokenId);
  
    console.log(rental?.metadata)

    const handleDecrement = () => {
        if (expires <= 1) return;
        setExpires(expires - 1 );
      };
    
      const handleIncrement = () => {
          if (expires >= 12 ) return;
          setExpires(expires + 1);
      };

    async function rent () {
        try {
            const data = await contractWrite.writeAsync?.();
            console.info("contract call successs", data);
        } catch (err) {
            console.error("contract call failure", err);
        }
    }
    
    return (

        
        <div className="rent">
            
            <div className="rentContainer">
                <img 
                    src={rental?.metadata.image} 
                    alt="" 
                    className="rentImg" 
                />
                <div className="rentDetails">
                    <h2 className="siTitle">{rental?.metadata.name}</h2>
                    <p>{rental?.metadata.description}</p>
                </div>
                <div>
                {contractReadUserOf?.data === user && <p>Congratulations! You can currently occupy this property until: {new Date((parseInt(contractReadUserExpires?.data?.['_hex'],16))*1000).toString()}</p>}
                </div>
                {contractReadUserOf?.data != "0x0000000000000000000000000000000000000000" && contractReadUserOf?.data != user &&(
                        <p>Sorry! This property is currently occupied until: {new Date((parseInt(contractReadUserExpires?.data?.['_hex'],16))*1000).toString()}</p>
                )}   
                {contractReadUserOf?.data === "0x0000000000000000000000000000000000000000" && 
                    <>
                        <div>
                            <button
                            onClick={handleDecrement}>-
                            </button>
                            <input 
                            readOnly
                            type='number' 
                            value={expires}/>
                            <button
                            onClick={handleIncrement}>+
                            </button>
                        </div>
                        <div>
                            <button onClick={rent}>Rent</button>
                        </div>
                    </>
                }
                
                
            </div>
            
        </div>
  );
}

export default Rent;