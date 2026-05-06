import "dotenv/config"
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
})
const prisma = new PrismaClient({ adapter })

async function main() {
    console.log("🌱 Seeding database...")

    // Users 
    const admin = await prisma.user.upsert({
        where: { email: "admin@example.com" },
        update: { password: await bcrypt.hash("password123", 12) },
        create: {
            email: "admin@example.com",
            name: "Admin User",
            password: await bcrypt.hash("password123", 12),
            role: "admin",
        },
    })

    const sarah = await prisma.user.upsert({
        where: { email: "sarah@example.com" },
        update: { password: await bcrypt.hash("password123", 12) },
        create: {
            email: "sarah@example.com",
            name: "Sarah Chen",
            password: await bcrypt.hash("password123", 12),
            role: "salesperson",
        },
    })

    const marcus = await prisma.user.upsert({
        where: { email: "marcus@example.com" },
        update: { password: await bcrypt.hash("password123", 12) },
        create: {
            email: "marcus@example.com",
            name: "Marcus Johnson",
            password: await bcrypt.hash("password123", 12),
            role: "salesperson",
        },
    })

    console.log("✅ Users seeded")

    // Leads 
    const leadsData = [
        {
            name: "Emily Watson",
            company: "TechVision Inc",
            email: "emily@techvision.com",
            phone: "+1 415 234 5678",
            source: "LINKEDIN" as const,
            status: "WON" as const,
            dealValue: 24000,
            assignedToId: sarah.id,
        },
        {
            name: "James Patel",
            company: "Nexus Solutions",
            email: "james@nexussolutions.com",
            phone: "+1 212 345 6789",
            source: "REFERRAL" as const,
            status: "WON" as const,
            dealValue: 18500,
            assignedToId: marcus.id,
        },
        {
            name: "Olivia Kim",
            company: "Brightpath Analytics",
            email: "olivia@brightpath.io",
            phone: "+1 650 456 7890",
            source: "WEBSITE" as const,
            status: "PROPOSAL_SENT" as const,
            dealValue: 32000,
            assignedToId: sarah.id,
        },
        {
            name: "Daniel Torres",
            company: "CloudBase Systems",
            email: "daniel@cloudbase.com",
            phone: "+1 310 567 8901",
            source: "COLD_EMAIL" as const,
            status: "QUALIFIED" as const,
            dealValue: 15000,
            assignedToId: marcus.id,
        },
        {
            name: "Rachel Nguyen",
            company: "Horizon Media Group",
            email: "rachel@horizonmedia.com",
            phone: "+1 617 678 9012",
            source: "EVENT" as const,
            status: "QUALIFIED" as const,
            dealValue: 9500,
            assignedToId: admin.id,
        },
        {
            name: "Kevin Brooks",
            company: "Streamline Logistics",
            email: "kevin@streamline.com",
            phone: "+1 512 789 0123",
            source: "WEBSITE" as const,
            status: "CONTACTED" as const,
            dealValue: 7200,
            assignedToId: sarah.id,
        },
        {
            name: "Priya Sharma",
            company: "FinEdge Capital",
            email: "priya@finedge.com",
            phone: "+1 408 890 1234",
            source: "LINKEDIN" as const,
            status: "CONTACTED" as const,
            dealValue: 41000,
            assignedToId: marcus.id,
        },
        {
            name: "Tom Ellison",
            company: "GreenGrow AgTech",
            email: "tom@greengrow.io",
            phone: "+1 303 901 2345",
            source: "REFERRAL" as const,
            status: "NEW" as const,
            dealValue: 12000,
            assignedToId: admin.id,
        },
        {
            name: "Natalie Ford",
            company: "UrbanSpace Realty",
            email: "natalie@urbanspace.com",
            phone: "+1 702 012 3456",
            source: "COLD_EMAIL" as const,
            status: "NEW" as const,
            dealValue: 5500,
            assignedToId: sarah.id,
        },
        {
            name: "Chris Adeyemi",
            company: "Pinnacle Software",
            email: "chris@pinnaclesoft.com",
            phone: "+1 646 123 4567",
            source: "EVENT" as const,
            status: "LOST" as const,
            dealValue: 28000,
            assignedToId: marcus.id,
        },
        {
            name: "Maya Johansson",
            company: "Nordic Ventures",
            email: "maya@nordicventures.se",
            phone: "+46 70 234 5678",
            source: "LINKEDIN" as const,
            status: "LOST" as const,
            dealValue: 19000,
            assignedToId: admin.id,
        },
        {
            name: "Liam O'Brien",
            company: "Cobalt Robotics",
            email: "liam@cobaltrobotics.com",
            phone: "+1 415 345 6789",
            source: "WEBSITE" as const,
            status: "NEW" as const,
            dealValue: 55000,
            assignedToId: sarah.id,
        },
    ]

    await prisma.note.deleteMany()
    await prisma.lead.deleteMany()

    const leads = await prisma.lead.createMany({
        data: leadsData,
    })

    const createdLeads = await prisma.lead.findMany()

    console.log(`✅ ${leads.count} leads seeded`)

    // Notes 
    const notesData = [
        {
            leadEmail: "emily@techvision.com",
            content: "Had a great discovery call. Emily is very interested in the enterprise plan. Decision maker confirmed.",
            createdById: sarah.id,
        },
        {
            leadEmail: "emily@techvision.com",
            content: "Sent over the contract. Legal review in progress on their end. Expected close by end of month.",
            createdById: sarah.id,
        },
        {
            leadEmail: "james@nexussolutions.com",
            content: "James was referred by Tom at Brightpath. Strong fit for our mid-market solution.",
            createdById: marcus.id,
        },
        {
            leadEmail: "olivia@brightpath.io",
            content: "Proposal sent for the analytics dashboard integration. Olivia requested a custom pricing breakdown.",
            createdById: sarah.id,
        },
        {
            leadEmail: "olivia@brightpath.io",
            content: "Follow-up call scheduled for next Tuesday. She wants to loop in their CTO.",
            createdById: sarah.id,
        },
        {
            leadEmail: "daniel@cloudbase.com",
            content: "Qualified after demo call. Daniel confirmed budget availability for Q2.",
            createdById: marcus.id,
        },
        {
            leadEmail: "priya@finedge.com",
            content: "Initial LinkedIn outreach responded positively. Booked intro call for next week.",
            createdById: marcus.id,
        },
        {
            leadEmail: "chris@pinnaclesoft.com",
            content: "Lost to competitor. They went with a cheaper option. Worth re-engaging in 6 months.",
            createdById: marcus.id,
        },
    ]

    for (const noteData of notesData) {
        const lead = createdLeads.find((l) => l.email === noteData.leadEmail)
        if (!lead) continue

        await prisma.note.create({
            data: {
                content: noteData.content,
                leadId: lead.id,
                createdById: noteData.createdById,
            },
        })
    }

    console.log("✅ Notes seeded")
    console.log("🎉 Database seeded successfully!")
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())