"use server"

import { signIn, signOut } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { AuthError } from "next-auth"
import { z } from "zod"
import bcrypt from "bcryptjs"
import { redirect } from "next/navigation"

const registerSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
})

export async function login(formData: FormData) {
    try {
        await signIn("credentials", {
            email: formData.get("email") as string,
            password: formData.get("password") as string,
            redirectTo: "/dashboard",
        })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid email or password" }
                default:
                    return { error: "Something went wrong" }
            }
        }
        throw error
    }
}

export async function register(formData: FormData) {
    const parsed = registerSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
    })

    if (!parsed.success) {
        return { error: parsed.error.flatten().fieldErrors }
    }

    const { name, email, password } = parsed.data

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
        return { error: { email: ["Email already in use"] } }
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            role: "salesperson",
        },
    })

    // Auto sign in after registration
    await signIn("credentials", {
        email,
        password,
        redirectTo: "/dashboard",
    })
}

export async function logout() {
    await signOut({ redirectTo: "/login" })
}