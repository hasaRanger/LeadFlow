"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { login, register } from "@/app/actions/auth"
import { Loader2, Lock, Mail, User } from "lucide-react"
import { Suspense } from "react"
import Image from "next/image"

const inputClass =
    "w-full bg-slate-900/50 border border-slate-600/50 text-white placeholder-slate-500 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition"

function LoginForm() {
    const [mode, setMode] = useState<"login" | "register">("login")
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const searchParams = useSearchParams()
    const registered = searchParams.get("registered")

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setError(null)
        setLoading(true)

        const formData = new FormData(e.currentTarget)

        try {
            if (mode === "login") {
                const result = await login(formData)
                if (result?.error) {
                    setError(result.error)
                } else {
                    router.push("/dashboard")
                }
            } else {
                const result = await register(formData)
                if (result?.error) {
                    const firstError = Object.values(result.error)[0]?.[0]
                    setError(firstError ?? "Registration failed")
                }
            }
        } catch {
            router.push("/dashboard")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full">
                        <Image src="/logo.png" alt="LeadFlow Logo" width={56} height={56} />
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">
                        Lead<span className="text-blue-400">Flow</span>
                    </h1>
                    <p className="text-slate-400 mt-1 text-sm">
                        {mode === "login"
                            ? "Sign in to your CRM dashboard"
                            : "Create your LeadFlow account"}
                    </p>
                </div>

                {/* Success message */}
                {registered && (
                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3 mb-4">
                        <p className="text-emerald-400 text-sm text-center">
                            Account created! Sign in below.
                        </p>
                    </div>
                )}

                {/* Card */}
                <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Name field — register only */}
                        {mode === "register" && (
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1.5">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                    <input
                                        name="name"
                                        type="text"
                                        required
                                        placeholder="John Smith"
                                        className={inputClass}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1.5">
                                Email address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    defaultValue={
                                        mode === "login" ? "admin@example.com" : undefined
                                    }
                                    placeholder="you@example.com"
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1.5">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                <input
                                    name="password"
                                    type="password"
                                    required
                                    defaultValue={
                                        mode === "login" ? "password123" : undefined
                                    }
                                    placeholder="••••••••"
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                                <p className="text-red-400 text-sm">{error}</p>
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl py-3 text-sm transition-all duration-200 shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    {mode === "login" ? "Signing in..." : "Creating account..."}
                                </>
                            ) : mode === "login" ? (
                                "Sign in"
                            ) : (
                                "Create account"
                            )}
                        </button>
                    </form>

                    {/* Toggle */}
                    <div className="mt-6 pt-5 border-t border-slate-700/50 text-center">
                        {mode === "login" ? (
                            <p className="text-sm text-slate-400">
                                Don&apos;t have an account?{" "}
                                <button
                                    onClick={() => {
                                        setMode("register")
                                        setError(null)
                                    }}
                                    className="text-blue-400 hover:text-blue-300 font-medium transition"
                                >
                                    Sign up
                                </button>
                            </p>
                        ) : (
                            <p className="text-sm text-slate-400">
                                Already have an account?{" "}
                                <button
                                    onClick={() => {
                                        setMode("login")
                                        setError(null)
                                    }}
                                    className="text-blue-400 hover:text-blue-300 font-medium transition"
                                >
                                    Sign in
                                </button>
                            </p>
                        )}
                        {/* {mode === "login" && (
                            <p className="text-xs text-slate-500 mt-2">
                                Test credentials are pre-filled above
                            </p>
                        )} */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function LoginPage() {
    return (
        <Suspense>
            <LoginForm />
        </Suspense>
    )
}