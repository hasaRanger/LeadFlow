"use client"

import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { useCallback } from "react"
import { Search, X } from "lucide-react"

const statuses = [
    { value: "", label: "All Statuses" },
    { value: "NEW", label: "New" },
    { value: "CONTACTED", label: "Contacted" },
    { value: "QUALIFIED", label: "Qualified" },
    { value: "PROPOSAL_SENT", label: "Proposal Sent" },
    { value: "WON", label: "Won" },
    { value: "LOST", label: "Lost" },
]

const sources = [
    { value: "", label: "All Sources" },
    { value: "WEBSITE", label: "Website" },
    { value: "LINKEDIN", label: "LinkedIn" },
    { value: "REFERRAL", label: "Referral" },
    { value: "COLD_EMAIL", label: "Cold Email" },
    { value: "EVENT", label: "Event" },
    { value: "OTHER", label: "Other" },
]

interface LeadFiltersProps {
    salespeople: { id: string; name: string | null; email: string }[]
}

export default function LeadFilters({ salespeople }: LeadFiltersProps) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const updateParam = useCallback(
        (key: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            if (value) {
                params.set(key, value)
            } else {
                params.delete(key)
            }
            router.push(`${pathname}?${params.toString()}`)
        },
        [router, pathname, searchParams]
    )

    const hasFilters =
        searchParams.has("search") ||
        searchParams.has("status") ||
        searchParams.has("source") ||
        searchParams.has("assignedToId")

    const selectClass =
        "bg-slate-800 border border-slate-700 text-slate-300 text-sm rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition"

    return (
        <div className="flex flex-wrap gap-3 items-center">
            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                    type="text"
                    placeholder="Search leads..."
                    defaultValue={searchParams.get("search") ?? ""}
                    onChange={(e) => updateParam("search", e.target.value)}
                    className="bg-slate-800 border border-slate-700 text-slate-300 placeholder-slate-500 text-sm rounded-xl pl-9 pr-4 py-2 w-56 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition"
                />
            </div>

            {/* Status */}
            <select
                value={searchParams.get("status") ?? ""}
                onChange={(e) => updateParam("status", e.target.value)}
                className={selectClass}
            >
                {statuses.map((s) => (
                    <option key={s.value} value={s.value}>
                        {s.label}
                    </option>
                ))}
            </select>

            {/* Source */}
            <select
                value={searchParams.get("source") ?? ""}
                onChange={(e) => updateParam("source", e.target.value)}
                className={selectClass}
            >
                {sources.map((s) => (
                    <option key={s.value} value={s.value}>
                        {s.label}
                    </option>
                ))}
            </select>

            {/* Salesperson */}
            <select
                value={searchParams.get("assignedToId") ?? ""}
                onChange={(e) => updateParam("assignedToId", e.target.value)}
                className={selectClass}
            >
                <option value="">All Salespeople</option>
                {salespeople.map((s) => (
                    <option key={s.id} value={s.id}>
                        {s.name ?? s.email}
                    </option>
                ))}
            </select>

            {/* Clear */}
            {hasFilters && (
                <button
                    onClick={() => router.push(pathname)}
                    className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition"
                >
                    <X className="w-4 h-4" />
                    Clear
                </button>
            )}
        </div>
    )
}