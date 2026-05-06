export default function LeadsLoading() {
    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <div className="h-8 w-24 bg-slate-800 rounded-xl animate-pulse mb-2" />
                    <div className="h-4 w-32 bg-slate-800 rounded-xl animate-pulse" />
                </div>
                <div className="h-10 w-28 bg-slate-800 rounded-xl animate-pulse" />
            </div>

            <div className="flex gap-3 mb-6">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-9 w-36 bg-slate-800 rounded-xl animate-pulse" />
                ))}
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <div className="border-b border-slate-800 px-5 py-3.5 flex gap-8">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="h-3 w-16 bg-slate-800 rounded animate-pulse" />
                    ))}
                </div>
                {Array.from({ length: 6 }).map((_, i) => (
                    <div
                        key={i}
                        className="flex gap-8 px-5 py-4 border-b border-slate-800/50"
                    >
                        <div className="flex-1">
                            <div className="h-4 w-32 bg-slate-800 rounded animate-pulse mb-1.5" />
                            <div className="h-3 w-24 bg-slate-800 rounded animate-pulse" />
                        </div>
                        <div className="h-5 w-16 bg-slate-800 rounded-full animate-pulse" />
                        <div className="h-5 w-16 bg-slate-800 rounded-full animate-pulse" />
                        <div className="h-4 w-20 bg-slate-800 rounded animate-pulse" />
                        <div className="h-4 w-16 bg-slate-800 rounded animate-pulse" />
                    </div>
                ))}
            </div>
        </div>
    )
}