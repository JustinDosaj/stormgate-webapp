interface BorderProps {
    className?: string,
    width?: string,
}

export function HorizontalBorder({className, width}: BorderProps) {
    return (
        <div className={`border-t border-gray-400 border-opacity-75 ${className}`} style={{ width: width }} />
    )

}