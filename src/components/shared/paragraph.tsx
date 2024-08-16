import { classNames } from "./classNames"

interface TextProps {
    children?: React.ReactNode,
    className?: string,
    size?: 'xsmall' | 'small' | 'medium' | 'large'
}

export function Paragraph({className, children, size}: TextProps){

    return(
        <p className={classNames(
            size == 'xsmall' ? `text-xs` 
            : size == 'small' ? `text-xs lg:text-sm` 
            : size == 'medium' ? `text-sm lg:text-base` 
            : `text-base lg:text-lg`, `text-gray-300 ${className}`
            )}>
            {children}
        </p>
    )
}