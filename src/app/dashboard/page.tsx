import { getDashboardStats } from "@/lib/dashboard"
import {
    Users,
    UserPlus,
    CheckCircle,
    Trophy,
    XCircle,
    DollarSign,
    TrendingUp,
} from "lucide-react"

function StatCard({
    label,
    value,
    icon: Icon,
    color,
    prefix,
}: {
    label: string
    value: number
    icon: React.ElementType
    color: string
    prefix?: string
}) {
    return (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
                <Icon className="w-6 h-6" />
            </div>
            <div>
                <p className="text-slate-400 text-sm">{label}</p>
                <p className="text-white text-2xl font-bold mt-0.5">
                    {prefix}
                    {typeof value === "number" && value > 999
                        ? value.toLocaleString()
                        : value}
                </p>
            </div>
        </div>
    )
}

export default async function DashboardPage() {
    const stats = await getDashboardStats()

    const cards = [
        {
            label: "Total Leads",
            value: stats.totalLeads,
            icon: Users,
            color: "bg-blue-600/20 text-blue-400",
        },
        {
            label: "New Leads",
            value: stats.newLeads,
            icon: UserPlus,
            color: "bg-cyan-600/20 text-cyan-400",
        },
        {
            label: "Qualified",
            value: stats.qualifiedLeads,
            icon: CheckCircle,
            color: "bg-violet-600/20 text-violet-400",
        },
        {
            label: "Won",
            value: stats.wonLeads,
            icon: Trophy,
            color: "bg-emerald-600/20 text-emerald-400",
        },
        {
            label: "Lost",
            value: stats.lostLeads,
            icon: XCircle,
            color: "bg-red-600/20 text-red-400",
        },
        {
            label: "Total Deal Value",
            value: stats.totalDealValue,
            icon: DollarSign,
            color: "bg-amber-600/20 text-amber-400",
            prefix: "$",
        },
        {
            label: "Won Deal Value",
            value: stats.wonDealValue,
            icon: TrendingUp,
            color: "bg-emerald-600/20 text-emerald-400",
            prefix: "$",
        },
    ]

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                <p className="text-slate-400 mt-1 text-sm">
                    Your sales pipeline at a glance
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {cards.map((card) => (
                    <StatCard key={card.label} {...card} />
                ))}
            </div>
        </div>
    )
}