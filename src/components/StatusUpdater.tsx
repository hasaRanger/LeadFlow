"use client"

import { updateLeadStatus } from "@/app/actions/leads"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import type { LeadStatus } from "@/types/enums"

const statuses: { value: LeadStatus; label: string }[] = [
    { value: "NEW", label: "New" },
    { value: "CONTACTED", label: "Contacted" },
    { value: "QUALIFIED", label: "Qualified" },
    { value: "PROPOSAL_SENT", label: "Proposal Sent" },
    { value: "WON", label: "Won" },
    { value: "LOST", label: "Lost" },
]

export default function StatusUpdater({
    id,
    currentStatus,
}: {
    id: string
    currentStatus: LeadStatus
}) {
    const [loading, setLoading] = useState(false)
    const [selected, setSelected] = useState<LeadStatus>(currentStatus)

    async function handleChange(status: LeadStatus) {
        setLoading(true)
        setSelected(status)
        await updateLeadStatus(id, status)
        setLoading(false)
    }

    return (
        <div className="flex items-center gap-2">
            <select
                value={selected}
                onChange={(e) => handleChange(e.target.value as LeadStatus)}
                disabled={loading}
                className="bg-slate-800 border border-slate-700 text-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition disabled:opacity-50"
            >
                {statuses.map((s) => (
                    <option key={s.value} value={s.value}>
                        {s.label}
                    </option>
                ))}
            </select>
            {loading && <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />}
        </div>
    )
}