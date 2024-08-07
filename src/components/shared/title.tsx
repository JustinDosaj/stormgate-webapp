interface TextProps {
    children?: React.ReactNode,
    className?:string,
}

export function Title({children, className}: TextProps) {
    return(
        <h1 className={`text-heading-1 font-semibold text-4xl lg:text-5xl ${className}`}>
            {children}
        </h1>
    )
}



