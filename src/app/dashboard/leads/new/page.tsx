import { getSalespeople } from "@/lib/leads"
import LeadForm from "@/components/LeadForm"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export default async function NewLeadPage() {
    const salespeople = await getSalespeople()

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <Link
                    href="/dashboard/leads"
                    className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm mb-4 transition w-fit"
                >
                    <ChevronLeft className="w-4 h-4" />
                    Back to Leads
                </Link>
                <h1 className="text-2xl font-bold text-white">Create New Lead</h1>
                <p className="text-slate-400 text-sm mt-1">
                    Add a new prospect to your pipeline
                </p>
            </div>

            {/* Form Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-3xl">
                <LeadForm salespeople={salespeople} />
            </div>
        </div>
    )
}