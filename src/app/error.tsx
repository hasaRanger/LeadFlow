"use client"

import { useEffect } from "react"
import { AlertTriangle, RefreshCw } from "lucide-react"

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
            <div className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-red-600/20 rounded-2xl mb-6 border border-red-500/20">
                    <AlertTriangle className="w-7 h-7 text-red-400" />
                </div>
                <h1 className="text-2xl font-bold text-white mb-2">
                    Something went wrong
                </h1>
                <p className="text-slate-400 text-sm mb-8 max-w-sm mx-auto">
                    An unexpected error occurred. Please try again or contact support if
                    the problem persists.
                </p>
                <button
                    onClick={reset}
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition shadow-lg shadow-blue-600/20"
                >
                    <RefreshCw className="w-4 h-4" />
                    Try again
                </button>
            </div>
        </div>
    )
}