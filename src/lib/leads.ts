import { prisma } from "@/lib/prisma"

type LeadStatus = "NEW" | "CONTACTED" | "QUALIFIED" | "PROPOSAL_SENT" | "WON" | "LOST"
type LeadSource = "WEBSITE" | "LINKEDIN" | "REFERRAL" | "COLD_EMAIL" | "EVENT" | "OTHER"

export interface LeadFilters {
    search?: string
    status?: LeadStatus
    source?: LeadSource
    assignedToId?: string
}

export async function getLeads(filters: LeadFilters = {}) {
    const { search, status, source, assignedToId } = filters

    return prisma.lead.findMany({
        where: {
            AND: [
                status ? { status } : {},
                source ? { source } : {},
                assignedToId ? { assignedToId } : {},
                search
                    ? {
                        OR: [
                            { name: { contains: search, mode: "insensitive" } },
                            { company: { contains: search, mode: "insensitive" } },
                            { email: { contains: search, mode: "insensitive" } },
                        ],
                    }
                    : {},
            ],
        },
        include: {
            assignedTo: {
                select: { id: true, name: true, email: true },
            },
            _count: { select: { notes: true } },
        },
        orderBy: { createdAt: "desc" },
    })
}

export async function getSalespeople() {
    return prisma.user.findMany({
        select: { id: true, name: true, email: true },
        orderBy: { name: "asc" },
    })
}