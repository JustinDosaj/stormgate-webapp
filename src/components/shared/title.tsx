interface TextProps {
    children?: React.ReactNode,
    className?:string,
}

export function Title({children, className}: TextProps) {
    return(
        <h1 className={`text-center lg:text-left text-3xl lg:text-4xl font-semibold text-white ${className}`}>
            {children}
        </h1>
    )
}



