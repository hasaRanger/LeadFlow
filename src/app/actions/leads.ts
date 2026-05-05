"use server"

import { prisma } from "@/lib/prisma"
import { leadSchema } from "@/lib/schemas/lead"
import { auth } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createLead(formData: FormData) {
    const session = await auth()
    if (!session) throw new Error("Unauthorized")

    const raw = {
        name: formData.get("name"),
        company: formData.get("company"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        source: formData.get("source"),
        status: formData.get("status"),
        dealValue: formData.get("dealValue"),
        assignedToId: formData.get("assignedToId"),
    }

    const parsed = leadSchema.safeParse(raw)

    if (!parsed.success) {
        return {
            error: parsed.error.flatten().fieldErrors,
        }
    }

    const { dealValue, assignedToId, ...rest } = parsed.data

    await prisma.lead.create({
        data: {
            ...rest,
            dealValue: dealValue === "" || dealValue === undefined ? null : Number(dealValue),
            assignedToId: assignedToId || null,
        },
    })

    revalidatePath("/dashboard/leads")
    revalidatePath("/dashboard")
    redirect("/dashboard/leads")
}