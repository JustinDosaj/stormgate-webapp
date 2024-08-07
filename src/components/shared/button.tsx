interface ButtonProps {
    text: string,
    buttonType: 'submit' | 'button',
    className?: string,
    children?: React.ReactNode,
    onClick?: any,
    isDisabled?: boolean,
    size?: 'xsmall' | 'small' | 'medium' | 'large',
    color?: 'violet' | 'red' | 'green' | 'blue' | 'yellow' | 'gray' | 'white'
}




export function Button({text, buttonType, className, children, onClick, isDisabled = false, size="medium", color="violet"}: ButtonProps) {

    const buttonSize = {
        'xsmall': 'px-3 py-1.5 text-xs',
        'small': 'px-4 py-2 text-sm',
        'medium': 'px-5 py-3 text-base',
        'large': 'px-6 py-4 text-lg'
    }

    const buttonColor = {
        'violet': 'bg-violet-700 hover:bg-violet-900',
        'red': 'bg-red-600 hover:bg-red-800',
        'green': 'bg-green-500 hover:bg-green-700',
        'blue': 'bg-blue-700 hover:bg-blue-900',
        'yellow': 'bg-yellow-700 hover:bg-yellow-900',
        'gray': 'bg-gray-700 hover:bg-gray-900',
        'white': 'bg-white hover:bg-gray-200 text-gray-800',
    }

    return(
        <button type={buttonType} onClick={onClick} disabled={isDisabled}
            className={`text-white ${buttonColor[color]} ${buttonSize[size]} rounded-md outline-none relative overflow-hidden border duration-200 ease-linear
                hover:after:opacity-100 font-semibold ${className}`}>
                    <span className="relative z-10">{text}</span>
                    {children}
        </button>
    )
}