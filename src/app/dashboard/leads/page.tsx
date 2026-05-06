import Link from "next/link"
import { getLeads, getSalespeople } from "@/lib/leads"
import { StatusBadge, SourceBadge } from "@/components/LeadBadge"
import LeadFilters from "@/components/LeadFilters"
import { Plus, MessageSquare, ExternalLink } from "lucide-react"
import type { Prisma } from "@prisma/client"

type LeadStatus = "NEW" | "CONTACTED" | "QUALIFIED" | "PROPOSAL_SENT" | "WON" | "LOST"
type LeadSource = "WEBSITE" | "LINKEDIN" | "REFERRAL" | "COLD_EMAIL" | "EVENT" | "OTHER"

interface PageProps {
    searchParams: Promise<{
        search?: string
        status?: string
        source?: string
        assignedToId?: string
    }>
}

export default async function LeadsPage({ searchParams }: PageProps) {
    const params = await searchParams
    const salespeople = await getSalespeople()

    type LeadWithRelations = Prisma.LeadGetPayload<{
        include: {
            assignedTo: { select: { id: true; name: true; email: true } }
            _count: { select: { notes: true } }
        }
    }>

    const leads: LeadWithRelations[] = await getLeads({
        search: params.search,
        status: params.status as LeadStatus | undefined,
        source: params.source as LeadSource | undefined,
        assignedToId: params.assignedToId,
    })

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-white">Leads</h1>
                    <p className="text-slate-400 text-sm mt-1">
                        {leads.length} lead{leads.length !== 1 ? "s" : ""} found
                    </p>
                </div>
                <Link
                    href="/dashboard/leads/new"
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition shadow-lg shadow-blue-600/20"
                >
                    <Plus className="w-4 h-4" />
                    New Lead
                </Link>
            </div>

            {/* Filters */}
            <div className="mb-6">
                <LeadFilters salespeople={salespeople} />
            </div>

            {/* Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                {leads.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <p className="text-slate-400 text-sm">No leads found</p>
                        <p className="text-slate-600 text-xs mt-1">
                            Try adjusting your filters or create a new lead
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-slate-800">
                                    {[
                                        "Lead",
                                        "Status",
                                        "Source",
                                        "Assigned To",
                                        "Deal Value",
                                        "Notes",
                                        "",
                                    ].map((h) => (
                                        <th
                                            key={h}
                                            className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-5 py-3.5"
                                        >
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {leads.map((lead) => (
                                    <tr
                                        key={lead.id}
                                        className="hover:bg-slate-800/50 transition-colors"
                                    >
                                        <td className="px-5 py-4">
                                            <p className="text-white text-sm font-medium">
                                                {lead.name}
                                            </p>
                                            <p className="text-slate-500 text-xs mt-0.5">
                                                {lead.company}
                                            </p>
                                            <p className="text-slate-600 text-xs">{lead.email}</p>
                                        </td>
                                        <td className="px-5 py-4">
                                            <StatusBadge status={lead.status} />
                                        </td>
                                        <td className="px-5 py-4">
                                            <SourceBadge source={lead.source} />
                                        </td>
                                        <td className="px-5 py-4">
                                            <p className="text-slate-300 text-sm">
                                                {lead.assignedTo?.name ?? (
                                                    <span className="text-slate-600">Unassigned</span>
                                                )}
                                            </p>
                                        </td>
                                        <td className="px-5 py-4">
                                            <p className="text-slate-300 text-sm">
                                                {lead.dealValue != null ? (
                                                    `$${lead.dealValue.toLocaleString()}`
                                                ) : (
                                                    <span className="text-slate-600">—</span>
                                                )}
                                            </p>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-1 text-slate-500 text-xs">
                                                <MessageSquare className="w-3.5 h-3.5" />
                                                {lead._count.notes}
                                            </div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <Link
                                                href={`/dashboard/leads/${lead.id}`}
                                                className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-xs font-medium transition"
                                            >
                                                View
                                                <ExternalLink className="w-3 h-3" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}