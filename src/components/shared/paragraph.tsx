import { classNames } from "./classNames"

interface TextProps {
    children?: React.ReactNode,
    className?: string,
    size?: 'small' | 'medium' | 'large'
}

export function Paragraph({className, children, size}: TextProps){

    return(
        <p className={classNames(size == 'small' ? `text-sm` : size == 'medium' ? `text-base` : `text-base md:text-md lg:text-lg`, `text-white ${className}`)}>
            {children}
        </p>
    )
}