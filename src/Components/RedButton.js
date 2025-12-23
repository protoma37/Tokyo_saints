const RedButton = (props) => {
    const { children, handleBtn, className, disabled } = props;

    return (
        <button 
            className={`px-5 py-2 rounded-md text-sm md:text-base font-medium ${className} 
            ${
                disabled 
                    ? 'bg-blue-900 text-gray-400 cursor-default'
                    : 'bg-blue-500 text-white border-blue-500 border hover:bg-transparent hover:border-blue-500 hover:text-blue-500'
            }`}
            onClick={!disabled ? handleBtn : () => {}} 
        >
            {children}
        </button>
    );
}

export default RedButton;