import { z } from "zod"

export const leadSchema = z.object({
    name: z.string().min(1, "Name is required"),
    company: z.string().min(1, "Company is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
    source: z.enum([
        "WEBSITE",
        "LINKEDIN",
        "REFERRAL",
        "COLD_EMAIL",
        "EVENT",
        "OTHER",
    ]),
    status: z.enum([
        "NEW",
        "CONTACTED",
        "QUALIFIED",
        "PROPOSAL_SENT",
        "WON",
        "LOST",
    ]),
    dealValue: z.coerce.number().min(0).optional().or(z.literal("")),
    assignedToId: z.string().optional(),
})

export type LeadFormData = z.infer<typeof leadSchema>