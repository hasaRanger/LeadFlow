"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const noteSchema = z.object({
    content: z.string().min(1, "Note cannot be empty").max(2000),
})

export async function addNote(leadId: string, formData: FormData) {
    const session = await auth()
    if (!session?.user?.id) throw new Error("Unauthorized")

    const parsed = noteSchema.safeParse({
        content: formData.get("content"),
    })

    if (!parsed.success) {
        return { error: parsed.error.flatten().fieldErrors.content?.[0] }
    }

    await prisma.note.create({
        data: {
            content: parsed.data.content,
            leadId,
            createdById: session.user.id,
        },
    })

    revalidatePath(`/dashboard/leads/${leadId}`)
    return { success: true }
}

export async function deleteNote(noteId: string, leadId: string) {
    const session = await auth()
    if (!session) throw new Error("Unauthorized")

    await prisma.note.delete({ where: { id: noteId } })

    revalidatePath(`/dashboard/leads/${leadId}`)
}