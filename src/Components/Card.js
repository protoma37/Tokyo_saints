const Card = (props) => {
    const { staked, info, handleStake, handleUnstake } = props;

    return (
        <div className='w-48p flex flex-col mb-8 p-1'>
            <img className='max-w-none' src={info.image} alt="img" />
            <div className='flex justify-between py-4 text-sm'>
                <span>ID# {info.id}</span>
                <span className='text-right'>{info.name}</span>
            </div>
            <button 
                className='py-1 border border-white rounded-lg'
                onClick={staked ? handleUnstake : handleStake}
            >
                {
                    staked ? 'Unstake' : 'Stake'
                }
            </button>
        </div>
    );
}

export default Card;