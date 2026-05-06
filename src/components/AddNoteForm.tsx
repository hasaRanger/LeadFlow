"use client"

import { addNote } from "@/app/actions/notes"
import { Loader2, Send } from "lucide-react"
import { useState, useRef } from "react"

export default function AddNoteForm({ leadId }: { leadId: string }) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const ref = useRef<HTMLFormElement>(null)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const formData = new FormData(e.currentTarget)
        const result = await addNote(leadId, formData)

        if (result?.error) {
            setError(result.error)
        } else {
            ref.current?.reset()
        }

        setLoading(false)
    }

    return (
        <form ref={ref} onSubmit={handleSubmit} className="space-y-3">
            <textarea
                name="content"
                rows={3}
                placeholder="Add a note about this lead — calls, emails, meetings, follow-ups..."
                className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition resize-none"
            />
            {error && <p className="text-red-400 text-xs">{error}</p>}
            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition shadow-lg shadow-blue-600/20"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Adding...
                        </>
                    ) : (
                        <>
                            <Send className="w-4 h-4" />
                            Add Note
                        </>
                    )}
                </button>
            </div>
        </form>
    )
}