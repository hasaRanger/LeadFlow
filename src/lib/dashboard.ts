import { prisma } from "@/lib/prisma"

export async function getDashboardStats() {
    const [
        totalLeads,
        newLeads,
        qualifiedLeads,
        wonLeads,
        lostLeads,
        dealValueResult,
        wonValueResult,
    ] = await Promise.all([
        prisma.lead.count(),
        prisma.lead.count({ where: { status: "NEW" } }),
        prisma.lead.count({ where: { status: "QUALIFIED" } }),
        prisma.lead.count({ where: { status: "WON" } }),
        prisma.lead.count({ where: { status: "LOST" } }),
        prisma.lead.aggregate({ _sum: { dealValue: true } }),
        prisma.lead.aggregate({
            _sum: { dealValue: true },
            where: { status: "WON" },
        }),
    ])

    return {
        totalLeads,
        newLeads,
        qualifiedLeads,
        wonLeads,
        lostLeads,
        totalDealValue: dealValueResult._sum.dealValue ?? 0,
        wonDealValue: wonValueResult._sum.dealValue ?? 0,
    }
}