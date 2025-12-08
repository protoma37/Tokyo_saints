const CoinInfo = (props) => {
    const {imgSrc, title, percent, stakedAmount, className, underLine} = props;
    return (
        <div className={`flex items-end justify-between py-5 ${className} ${underLine && 'border-b border-zinc-800'}`}>
            <div className="flex">
                <img className="mr-8" src={imgSrc} alt="img" />
                <div className="">
                    <p className="text-2xl">{title}</p>
                    <p className="text-sm">{stakedAmount} Saints staked</p>
                </div>
            </div>
            <div className="text-3xl font-bold">{percent}%</div>
        </div>
    );
}

export default CoinInfo;