"use server"

import { prisma } from "@/lib/prisma"
import { leadSchema } from "@/lib/schemas/lead"
import { auth } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
type LeadStatus = "NEW" | "CONTACTED" | "QUALIFIED" | "PROPOSAL_SENT" | "WON" | "LOST"

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
        return { error: parsed.error.flatten().fieldErrors }
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

export async function updateLead(id: string, formData: FormData) {
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
        return { error: parsed.error.flatten().fieldErrors }
    }

    const { dealValue, assignedToId, ...rest } = parsed.data

    await prisma.lead.update({
        where: { id },
        data: {
            ...rest,
            dealValue: dealValue === "" || dealValue === undefined ? null : Number(dealValue),
            assignedToId: assignedToId || null,
        },
    })

    revalidatePath("/dashboard/leads")
    revalidatePath(`/dashboard/leads/${id}`)
    revalidatePath("/dashboard")
    redirect(`/dashboard/leads/${id}`)
}

export async function deleteLead(id: string) {
    const session = await auth()
    if (!session) throw new Error("Unauthorized")

    await prisma.lead.delete({ where: { id } })

    revalidatePath("/dashboard/leads")
    revalidatePath("/dashboard")
    redirect("/dashboard/leads")
}

export async function updateLeadStatus(id: string, status: LeadStatus) {
    const session = await auth()
    if (!session) throw new Error("Unauthorized")

    await prisma.lead.update({
        where: { id },
        data: { status },
    })

    revalidatePath("/dashboard/leads")
    revalidatePath(`/dashboard/leads/${id}`)
    revalidatePath("/dashboard")
}