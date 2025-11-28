import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton, WalletDisconnectButton } from "@solana/wallet-adapter-react-ui";
import { useEffect } from 'react';
import Logo from '../assets/images/logo.png';

const Header = (props) => {
    const wallet = useWallet();
    const { connected, setConnected } = props;

    useEffect(() => {
        if (wallet.publicKey) {
            setConnected(true);
        } else {
            setConnected(false);
        }
    }, [wallet, setConnected])

    return (
        <div className="flex items-center justify-between text-white py-3">
            <img src={Logo} alt="logo" />
            {
                connected
                    ?   <div className="flex items-center">
                            <WalletDisconnectButton className='wallet-connect-button' />
                        </div>
                    :   <WalletMultiButton className='wallet-connect-button' />
            }
            
        </div>
    );
}

export default Header;