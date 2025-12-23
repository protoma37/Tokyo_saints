import { useEffect, useState, useCallback } from 'react';
import * as anchor from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import CoinInfo from '../Components/CoinInfo';
import { STAKE_CONTRACT_IDL } from '../consts/contract';
import { NEXT_PUBLIC_STAKE_CONTRACT_ID, NEXT_PUBLIC_SOLANA_RPC_HOST, NEXT_PUBLIC_STAKE_POOL_ID } from '../consts/env';
import GinzaImg from '../assets/images/coin1.png';
import ShibuyaImg from '../assets/images/coin2.png';
import RoppongiImg from '../assets/images/coin3.png';
import MeguroImg from '../assets/images/coin4.png';
import MainImg from '../assets/images/not-connected.png';

const confirmOption = {
    commitment : 'finalized',
    preflightCommitment : 'finalized',
    skipPreflight : false
}

const Home = () => {
    const defaultInfo = {amount: 0, percent: 0};
    const [ginzaInfo, setGinzaInfo] = useState(defaultInfo);
    const [shibuyaInfo, setShibuyaInfo] = useState(defaultInfo);
    const [roppongiInfo, setRoppongiInfo] = useState(defaultInfo);
    const [meguroInfo, setMeguroInfo] = useState(defaultInfo);


    const getPoolData = useCallback( async () => {
        const connection = new anchor.web3.Connection(NEXT_PUBLIC_SOLANA_RPC_HOST);
        const pool = new PublicKey(NEXT_PUBLIC_STAKE_POOL_ID);
        const programId = new PublicKey(NEXT_PUBLIC_STAKE_CONTRACT_ID);
        let provider = new anchor.Provider(connection, confirmOption);
        const program = new anchor.Program(STAKE_CONTRACT_IDL, programId, provider);
        let fetchData = await program.account.pool.fetch(pool);
        const ginzaAmount = fetchData.ginza.toNumber();
        const shibuyaAmount = fetchData.shibuya.toNumber();
        const roppongiAmount = fetchData.roppongi.toNumber();
        const meguroAmount = fetchData.meguro.toNumber();
        setGinzaInfo({amount: ginzaAmount, percent: parseInt(ginzaAmount * 100 / 1000)});
        setShibuyaInfo({amount: shibuyaAmount, percent: parseInt(shibuyaAmount * 100 / 1000)});
        setRoppongiInfo({amount: roppongiAmount, percent: parseInt(roppongiAmount * 100 / 1000)});
        setMeguroInfo({amount: meguroAmount, percent: parseInt(meguroAmount * 100 / 1000)});
    }, []);
    
    useEffect(() => {
        getPoolData();
    }, [getPoolData])

    return (
        <div className="h-full flex flex-col text-white relative">
            <div className="pt-8 md:pt-52 pb-12 flex flex-col md:flex-row items-center justify-between">
                <div className="w-full md:w-auto mb-8 md:mb-0">
                    <p className="special-font text-7xl">Stake</p>
                    <p className="text-xl py-8">
                        Join your vigilante group &<br />
                        become stronger together
                    </p>
                    <WalletMultiButton className="wallet-connect-button mb-8" />
                    <p className="text-sm">View only permissions</p>
                </div>
                <div className="w-full md:w-5/12 lg:w-4/12 flex flex-col">
                    <CoinInfo imgSrc={GinzaImg} title="Ginza" stakedAmount={ginzaInfo.amount} percent={ginzaInfo.percent} underLine />
                    <CoinInfo imgSrc={ShibuyaImg} title="Shibuya" stakedAmount={shibuyaInfo.amount} percent={shibuyaInfo.percent} underLine />
                    <CoinInfo imgSrc={RoppongiImg} title="Roppongi" stakedAmount={roppongiInfo.amount} percent={roppongiInfo.percent} underLine />
                    <CoinInfo imgSrc={MeguroImg} title="Meguro" stakedAmount={meguroInfo.amount} percent={meguroInfo.percent} />
                </div>
            </div>
            <img className='hidden md:block absolute bottom-0 left-1/2 center-effect' src={MainImg} alt="main" />
        </div>
    );
}

export default Home;