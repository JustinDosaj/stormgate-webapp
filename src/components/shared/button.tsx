interface ButtonProps {
    text: string,
    buttonType: 'submit' | 'button',
    className?: string,
    children?: React.ReactNode,
    onClick?: any,
    isDisabled?: boolean,
    size?: 'small' | 'medium' | 'large',
}




export function Button({text, buttonType, className, children, onClick, isDisabled = false, size="medium"}: ButtonProps) {

    const buttonSize = {
        'small': 'px-4 py-2 text-sm',
        'medium': 'px-5 py-3 text-base',
        'large': 'px-6 py-4 text-lg'
    }

    return(
        <button type={buttonType} onClick={onClick} disabled={isDisabled}
            className={`text-white bg-violet-700 hover:bg-violet-900 ${buttonSize[size]} rounded-md outline-none relative overflow-hidden border duration-200 ease-linear
                hover:after:opacity-100 font-semibold ${className}`}>
                    <span className="relative z-10">{text}</span>
                    {children}
        </button>
    )
}