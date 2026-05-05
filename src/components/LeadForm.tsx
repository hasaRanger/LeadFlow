"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { leadSchema, LeadFormData } from "@/lib/schemas/lead"
import { createLead } from "@/app/actions/leads"
import FormField from "@/components/FormField"
import { Loader2 } from "lucide-react"
import { useState } from "react"

const inputClass =
    "w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition"

const selectClass =
    "w-full bg-slate-800 border border-slate-700 text-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition"

interface LeadFormProps {
    salespeople: { id: string; name: string | null; email: string }[]
}

export default function LeadForm({ salespeople }: LeadFormProps) {
    const [serverError, setServerError] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LeadFormData>({
        resolver: zodResolver(leadSchema),
        defaultValues: {
            status: "NEW",
            source: "WEBSITE",
        },
    })

    async function onSubmit(data: LeadFormData) {
        setServerError(null)
        const formData = new FormData()
        Object.entries(data).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                formData.append(key, String(value))
            }
        })

        try {
            await createLead(formData)
        } catch (e: unknown) {
            if (e instanceof Error && e.message !== "NEXT_REDIRECT") {
                setServerError(e.message)
            }
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {serverError && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                    <p className="text-red-400 text-sm">{serverError}</p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField label="Lead Name" required error={errors.name?.message}>
                    <input
                        {...register("name")}
                        placeholder="John Smith"
                        className={inputClass}
                    />
                </FormField>

                <FormField label="Company" required error={errors.company?.message}>
                    <input
                        {...register("company")}
                        placeholder="Acme Corp"
                        className={inputClass}
                    />
                </FormField>

                <FormField label="Email" required error={errors.email?.message}>
                    <input
                        {...register("email")}
                        type="email"
                        placeholder="john@acme.com"
                        className={inputClass}
                    />
                </FormField>

                <FormField label="Phone" error={errors.phone?.message}>
                    <input
                        {...register("phone")}
                        placeholder="+1 234 567 8900"
                        className={inputClass}
                    />
                </FormField>

                <FormField label="Lead Source" required error={errors.source?.message}>
                    <select {...register("source")} className={selectClass}>
                        <option value="WEBSITE">Website</option>
                        <option value="LINKEDIN">LinkedIn</option>
                        <option value="REFERRAL">Referral</option>
                        <option value="COLD_EMAIL">Cold Email</option>
                        <option value="EVENT">Event</option>
                        <option value="OTHER">Other</option>
                    </select>
                </FormField>

                <FormField label="Status" required error={errors.status?.message}>
                    <select {...register("status")} className={selectClass}>
                        <option value="NEW">New</option>
                        <option value="CONTACTED">Contacted</option>
                        <option value="QUALIFIED">Qualified</option>
                        <option value="PROPOSAL_SENT">Proposal Sent</option>
                        <option value="WON">Won</option>
                        <option value="LOST">Lost</option>
                    </select>
                </FormField>

                <FormField label="Estimated Deal Value ($)" error={errors.dealValue?.message}>
                    <input
                        {...register("dealValue")}
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="5000"
                        className={inputClass}
                    />
                </FormField>

                <FormField label="Assigned Salesperson" error={errors.assignedToId?.message}>
                    <select {...register("assignedToId")} className={selectClass}>
                        <option value="">Unassigned</option>
                        {salespeople.map((s) => (
                            <option key={s.id} value={s.id}>
                                {s.name ?? s.email}
                            </option>
                        ))}
                    </select>
                </FormField>
            </div>

            <div className="flex items-center gap-3 pt-2">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition shadow-lg shadow-blue-600/20"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Creating...
                        </>
                    ) : (
                        "Create Lead"
                    )}
                </button>
            </div>
        </form>
    )
}