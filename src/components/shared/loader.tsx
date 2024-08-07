import React from "react"
import { classNames } from "./classNames"

interface LoaderProps {
    className?: string,
    type?: 'recipe-list' | 'page' | 'button',
    color?: 'white' | 'primary',
}

export function Loader({type, className}: LoaderProps) {
    return(
        <main className={`flex min-h-screen flex-col items-center justify-between pt-14 bg-background ${className}`}>
            <div className={' grid justify-center bg-gray-900 px-6 py-3 outline-none relative overflow-hidden duration-300 ease-linear'}>
                <div className="animate-spin flex justify-center w-10 h-10 border-[4px] border-current border-t-transparent text-violet-600 rounded-full" role="status" aria-label="loading">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        </main>
    )
}
