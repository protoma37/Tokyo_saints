import { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
// import axios from 'axios';
import { FadeLoader } from 'react-spinners';
import { Toaster } from 'react-hot-toast';
import RedButton from '../Components/RedButton';
import Card from '../Components/Card';
// import { TWITTER_API_URL, BEARER_TOKEN } from "../consts/env"
import useNftStake from '../hooks/use-nft-stake';
import useWalletNfts from '../hooks/use-wallet-nfts';

const Detail = () => {
    // const [avatar, setAvatar] = useState();
    // const [userName, setUserName] = useState();
    const { isLoading, stakedNfts, stakeNft, unstakeNft, claimAmount, claimRewards, dailyRewardAmount } = useNftStake();
    const { isLoadingWalletNfts, walletNfts } = useWalletNfts();
    const wallet = useWallet();

    const [walletAddress, setWalletAddress] = useState("");

    useEffect(() => {
        if (wallet.publicKey) {
            setWalletAddress(wallet.publicKey.toString());
        }
    }, [wallet])

    const handleStake = async (nft) => {
        await stakeNft([nft]);
    }

    const handleStakeAll = async (nft) => {
        await stakeNft(walletNfts);
    }

    const handleUnstake = async (nft) => {
        await unstakeNft([nft]);
    }

    const handleUnStakeAll = async () => {
        await unstakeNft(stakedNfts)
    }

    const handleClaim = async () => {
        await claimRewards();
    }

    // const getTwitterUserInfo = useCallback( async (userId) => {
    //     const url = `${TWITTER_API_URL}/${userId}/user.fields=profile_image_url`;
    //     const headers = {
    //         'Authorization': `Bearer ${BEARER_TOKEN}`,
    //         'Content-type': 'application/x-www-form-urlencoded',
    //         'Access-Control-Allow-Origin': '*'
    //     }
    
    //     const response = await axios.get(url, { headers });
    //     if (Object.keys(response.data)[0] === 'data') {
    //         const userInfo = response.data.data;
    //         setUserName(userInfo.username);
    //         setAvatar(userInfo.profile_image_url);
    //     } else {
    //         setUserName('unknown_user')
    //     }
    
    // }, []);

    // useEffect(() => {
    //     getTwitterUserInfo('893827304358424576');
    // }, [getTwitterUserInfo]);

    return (
        <div className="flex flex-col flex-1 text-white pb-10 overflow-auto">
            <div className="flex flex-wrap py-12">
                <div className="w-full md:w-3/6 lg:w-3/12 border-r-0 lg:border-r border-zinc-800 mb-4">
                    <div className="text-left md:text-center font-medium">
                        <p className="mb-4">Wallet Address</p>
                        <p className="text-2xl">{walletAddress.slice(0, 4) + '...' + walletAddress.substring(walletAddress.length - 4)}</p>
                    </div>
                </div>
                <div className="w-full md:w-3/6 lg:w-3/12 border-r-0 lg:border-r border-zinc-800 mb-4">
                    <div className="text-left md:text-center font-medium">
                        <p className="mb-4">Saints Staked</p>
                        <p className="text-2xl">{stakedNfts.length}</p>
                    </div>
                </div>
                <div className="w-full md:w-3/6 lg:w-3/12 border-r-0 md:border-r border-zinc-800 mb-4">
                    <div className="text-left md:text-center font-medium">
                        <p className="mb-4">Your Rewards</p>
                        <p className="text-2xl">{claimAmount} $AERO</p>
                    </div>
                </div>
                <div className="w-full md:w-3/6 lg:w-3/12 mb-4">
                    <div className="text-left md:text-center font-medium">
                        <p className="mb-4">Daily Earnings</p>
                        <p className="text-2xl">{dailyRewardAmount} $AERO DAILY</p>
                    </div>
                </div>
                
            </div>
            <div className='flex justify-center flex-col md:flex-row mb-10'>
                <RedButton disabled={walletNfts.length === 0} className="mb-2 " handleBtn={handleStakeAll}>Stake All</RedButton>
                <RedButton disabled={stakedNfts.length === 0} className="mb-2 mx-0 md:mx-20" handleBtn={handleUnStakeAll}>Unstake All</RedButton>
                <RedButton disabled={claimAmount * 1 === 0} className="mb-2" handleBtn={handleClaim}>Claim $AERO</RedButton>
            </div>
            <div className='flex-1 bg-gray-900 rounded-lg overflow-auto relative'>
                {
                    (isLoading || isLoadingWalletNfts) &&
                        <div className="absolute w-full h-full flex items-center justify-center bg-black bg-opacity-75">
                            <FadeLoader loading color='white' />
                        </div>
                }   
                <div className='h-full mx-2 md:mx-10 lg:mx-24 flex flex-col md:flex-row justify-between'>
                    <div className='w-full md:w-5/12 flex flex-col pb-8'>
                        <p className='text-center py-10 text-xl special-font'>Your wallet</p>
                        <div className='flex flex-1 flex-nowrap md:flex-wrap justify-between overflow-auto px-1'>
                            {
                                walletNfts.length > 0
                                    ? walletNfts.map((nft, index) =>
                                        <Card key={index} info={nft} handleStake={() => handleStake(nft)} />
                                    )
                                    : <div className="w-full text-center">You have no NFTs.</div>
                            }
                        </div>
                    </div>
                    <div className='w-full md:w-5/12 flex flex-col pb-8'>
                        <p className='text-center py-10 text-xl special-font'>{stakedNfts.length} Saint Stakes</p>
                        <div className='flex flex-1 flex-nowrap md:flex-wrap justify-between overflow-auto px-1'>
                            {
                                stakedNfts.length > 0 
                                    ? stakedNfts.map((nft, index) => 
                                        <Card key={index} info={nft} staked handleUnstake={() => handleUnstake(nft)} />
                                    )
                                    : <p className="w-full text-center">You didn't stake any NFTs.</p>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Toaster />
        </div>
    );
}

export default Detail;