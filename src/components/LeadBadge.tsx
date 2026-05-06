type LeadStatus = "NEW" | "CONTACTED" | "QUALIFIED" | "PROPOSAL_SENT" | "WON" | "LOST"
type LeadSource = "WEBSITE" | "LINKEDIN" | "REFERRAL" | "COLD_EMAIL" | "EVENT" | "OTHER"

type BadgeConfig = { label: string; className: string }

const statusConfig: { [key in LeadStatus]: BadgeConfig } = {
    NEW: { label: "New", className: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" },
    CONTACTED: { label: "Contacted", className: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
    QUALIFIED: { label: "Qualified", className: "bg-violet-500/10 text-violet-400 border-violet-500/20" },
    PROPOSAL_SENT: { label: "Proposal Sent", className: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
    WON: { label: "Won", className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
    LOST: { label: "Lost", className: "bg-red-500/10 text-red-400 border-red-500/20" },
}

const sourceConfig: { [key in LeadSource]: BadgeConfig } = {
    WEBSITE: { label: "Website", className: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
    LINKEDIN: { label: "LinkedIn", className: "bg-sky-500/10 text-sky-400 border-sky-500/20" },
    REFERRAL: { label: "Referral", className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
    COLD_EMAIL: { label: "Cold Email", className: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
    EVENT: { label: "Event", className: "bg-violet-500/10 text-violet-400 border-violet-500/20" },
    OTHER: { label: "Other", className: "bg-slate-500/10 text-slate-400 border-slate-500/20" },
}

export function StatusBadge({ status }: { status: LeadStatus }) {
    const config = statusConfig[status]
    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.className}`}>
            {config.label}
        </span>
    )
}

export function SourceBadge({ source }: { source: LeadSource }) {
    const config = sourceConfig[source]
    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.className}`}>
            {config.label}
        </span>
    )
}