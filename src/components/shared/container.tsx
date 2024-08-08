interface Props{
    className?:string,
    children?: React.ReactNode
}

export function Container({className, children}:Props) {
    return(
        <div className={`mx-auto max-w-5xl w-full px-5 sm:px-8 md:px-14 lg:px-5 ${className}`}>
            {children}
        </div>
    )
}