export default function DashboardLoading() {
    return (
        <div>
            <div className="mb-8">
                <div className="h-8 w-32 bg-slate-800 rounded-xl animate-pulse mb-2" />
                <div className="h-4 w-48 bg-slate-800 rounded-xl animate-pulse" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {Array.from({ length: 7 }).map((_, i) => (
                    <div
                        key={i}
                        className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex items-center gap-4"
                    >
                        <div className="w-12 h-12 bg-slate-800 rounded-xl animate-pulse" />
                        <div className="flex-1">
                            <div className="h-3 w-20 bg-slate-800 rounded animate-pulse mb-2" />
                            <div className="h-7 w-12 bg-slate-800 rounded animate-pulse" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}