import { prisma } from "@/lib/prisma"
import { getSalespeople } from "@/lib/leads"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronLeft, Mail, Phone, Building2, Calendar } from "lucide-react"
import { StatusBadge, SourceBadge } from "@/components/LeadBadge"
import LeadForm from "@/components/LeadForm"
import DeleteLeadButton from "@/components/DeleteLeadButton"
import StatusUpdater from "@/components/StatusUpdater"

interface PageProps {
    params: Promise<{ id: string }>
}

export default async function LeadDetailPage({ params }: PageProps) {
    const { id } = await params
    const [lead, salespeople] = await Promise.all([
        prisma.lead.findUnique({
            where: { id },
            include: {
                assignedTo: { select: { id: true, name: true, email: true } },
                notes: {
                    include: {
                        createdBy: { select: { name: true, email: true } },
                    },
                    orderBy: { createdAt: "desc" },
                },
            },
        }),
        getSalespeople(),
    ])

    if (!lead) notFound()

    const defaultValues = {
        name: lead.name,
        company: lead.company,
        email: lead.email,
        phone: lead.phone ?? undefined,
        source: lead.source,
        status: lead.status,
        dealValue: lead.dealValue ?? undefined,
        assignedToId: lead.assignedToId ?? undefined,
    }

    return (
        <div className="max-w-4xl">
            {/* Back */}
            <Link
                href="/dashboard/leads"
                className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm mb-6 transition w-fit"
            >
                <ChevronLeft className="w-4 h-4" />
                Back to Leads
            </Link>

            {/* Header */}
            <div className="flex items-start justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-white">{lead.name}</h1>
                    <p className="text-slate-400 text-sm mt-1">{lead.company}</p>
                </div>
                <div className="flex items-center gap-3">
                    <StatusUpdater id={lead.id} currentStatus={lead.status} />
                    <DeleteLeadButton id={lead.id} />
                </div>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                        <Mail className="w-3.5 h-3.5" />
                        Email
                    </div>
                    <p className="text-white text-sm truncate">{lead.email}</p>
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                        <Phone className="w-3.5 h-3.5" />
                        Phone
                    </div>
                    <p className="text-white text-sm">{lead.phone ?? "—"}</p>
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                        <Building2 className="w-3.5 h-3.5" />
                        Source
                    </div>
                    <SourceBadge source={lead.source} />
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                        <Calendar className="w-3.5 h-3.5" />
                        Created
                    </div>
                    <p className="text-white text-sm">
                        {new Date(lead.createdAt).toLocaleDateString()}
                    </p>
                </div>
            </div>

            {/* Deal Value + Assigned */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                    <p className="text-slate-500 text-xs mb-1">Deal Value</p>
                    <p className="text-white text-xl font-bold">
                        {lead.dealValue != null
                            ? `$${lead.dealValue.toLocaleString()}`
                            : "—"}
                    </p>
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                    <p className="text-slate-500 text-xs mb-1">Assigned To</p>
                    <p className="text-white text-sm font-medium">
                        {lead.assignedTo?.name ?? lead.assignedTo?.email ?? "Unassigned"}
                    </p>
                </div>
            </div>

            {/* Edit Form */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 mb-6">
                <h2 className="text-lg font-semibold text-white mb-5">Edit Lead</h2>
                <LeadForm
                    salespeople={salespeople}
                    defaultValues={defaultValues}
                    leadId={lead.id}
                    mode="edit"
                />
            </div>

            {/* Notes placeholder — will be built in next commit */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
                <h2 className="text-lg font-semibold text-white mb-2">Notes</h2>
                <p className="text-slate-500 text-sm">
                    {lead.notes.length === 0
                        ? "No notes yet."
                        : `${lead.notes.length} note(s) — notes UI coming next.`}
                </p>
            </div>
        </div>
    )
}