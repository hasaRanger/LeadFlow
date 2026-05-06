"use client"

import { deleteLead } from "@/app/actions/leads"
import { Trash2, Loader2 } from "lucide-react"
import { useState } from "react"

export default function DeleteLeadButton({ id }: { id: string }) {
    const [confirming, setConfirming] = useState(false)
    const [loading, setLoading] = useState(false)

    async function handleDelete() {
        setLoading(true)
        await deleteLead(id)
    }

    if (confirming) {
        return (
            <div className="flex items-center gap-2">
                <span className="text-sm text-slate-400">Are you sure?</span>
                <button
                    onClick={handleDelete}
                    disabled={loading}
                    className="flex items-center gap-1.5 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white text-sm font-medium px-3 py-2 rounded-xl transition"
                >
                    {loading ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                        "Yes, delete"
                    )}
                </button>
                <button
                    onClick={() => setConfirming(false)}
                    className="text-sm text-slate-400 hover:text-white px-3 py-2 rounded-xl transition"
                >
                    Cancel
                </button>
            </div>
        )
    }

    return (
        <button
            onClick={() => setConfirming(true)}
            className="flex items-center gap-2 border border-red-500/30 text-red-400 hover:bg-red-500/10 text-sm font-medium px-4 py-2.5 rounded-xl transition"
        >
            <Trash2 className="w-4 h-4" />
            Delete Lead
        </button>
    )
}