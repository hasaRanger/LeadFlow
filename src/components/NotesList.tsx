import { deleteNote } from "@/app/actions/notes"
import { Trash2 } from "lucide-react"

interface Note {
    id: string
    content: string
    createdAt: Date
    createdBy: {
        name: string | null
        email: string
    }
}

function DeleteNoteButton({
    noteId,
    leadId,
}: {
    noteId: string
    leadId: string
}) {
    return (
        <form
            action={async () => {
                "use server"
                await deleteNote(noteId, leadId)
            }}
        >
            <button
                type="submit"
                className="text-slate-600 hover:text-red-400 transition"
                title="Delete note"
            >
                <Trash2 className="w-3.5 h-3.5" />
            </button>
        </form>
    )
}

export default function NotesList({
    notes,
    leadId,
}: {
    notes: Note[]
    leadId: string
}) {
    if (notes.length === 0) {
        return (
            <p className="text-slate-500 text-sm text-center py-6">
                No notes yet. Add one below.
            </p>
        )
    }

    return (
        <div className="space-y-4">
            {notes.map((note) => (
                <div
                    key={note.id}
                    className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4"
                >
                    <div className="flex items-start justify-between gap-3">
                        <p className="text-slate-200 text-sm leading-relaxed flex-1">
                            {note.content}
                        </p>
                        <DeleteNoteButton noteId={note.id} leadId={leadId} />
                    </div>
                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-700/50">
                        <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                            {(note.createdBy.name ?? note.createdBy.email)[0].toUpperCase()}
                        </div>
                        <p className="text-slate-500 text-xs">
                            {note.createdBy.name ?? note.createdBy.email}
                        </p>
                        <span className="text-slate-700 text-xs">·</span>
                        <p className="text-slate-500 text-xs">
                            {new Date(note.createdAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}