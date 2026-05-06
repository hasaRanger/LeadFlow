import Link from "next/link"
import { ArrowLeft, CircleX } from "lucide-react"

export default function NotFound() {
    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
            <div className="text-center">
                <div className="inline-flex items-center justify-center mb-6">
                    <CircleX className="w-14 h-14 text-red-500" />
                </div>
                <h1 className="text-6xl font-bold text-white mb-2">404</h1>
                <p className="text-slate-400 text-lg mb-1">Page not found</p>
                <p className="text-slate-600 text-sm mb-8">
                    The page you&apos;re looking for doesn&apos;t exist.
                </p>
                <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition shadow-lg shadow-blue-600/20"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Dashboard
                </Link>
            </div>
        </div>
    )
}