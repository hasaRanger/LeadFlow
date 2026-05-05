"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { logout } from "@/app/actions/auth"
import {
    LayoutDashboard,
    Users,
    PlusCircle,
    LogOut,
    Zap,
} from "lucide-react"
import Image from "next/image"

const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/leads", label: "Leads", icon: Users },
    { href: "/dashboard/leads/new", label: "New Lead", icon: PlusCircle },
]

interface SidebarProps {
    user: {
        name?: string | null
        email?: string | null
        image?: string | null
    }
}

export default function Sidebar({ user }: SidebarProps) {
    const pathname = usePathname()
    const activeIndex = navItems.findIndex(({ href }) =>
        href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(href)
    )

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-900 border-r border-slate-800 flex flex-col z-40">
            {/* Logo */}
            <div className="p-6 border-b border-slate-800">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center">
                        <Image src="/favicon.png" alt="favicon" width={56} height={56} />
                    </div>
                    <div>
                        <p className="text-white font-bold text-lg leading-none">
                            LeadFlow
                        </p>
                        <p className="text-slate-500 text-xs mt-0.5">CRM Dashboard</p>
                    </div>
                </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 p-4 relative flex flex-col gap-1">
                <div
                    className="absolute left-4 right-4 h-11 rounded-xl bg-blue-600/20 border border-blue-500/20 transition-transform duration-150 ease-out"
                    style={{
                        transform: `translateY(${(activeIndex === -1 ? 0 : activeIndex) * 48}px)`,
                    }}
                />
                {navItems.map(({ href, label, icon: Icon }) => {
                    const isActive =
                        href === "/dashboard"
                            ? pathname === "/dashboard"
                            : pathname.startsWith(href)

                    return (
                        <Link
                            key={href}
                            href={href}
                            className={`relative z-10 flex items-center gap-3 px-4 h-11 rounded-xl text-sm font-semibold transition-colors duration-150 ease-in ${isActive
                                    ? "text-blue-400"
                                    : "text-slate-400 hover:text-blue-500"
                                }`}
                        >
                            <Icon className="w-4 h-4" />
                            {label}
                        </Link>
                    )
                })}
            </nav>

            {/* User + Logout */}
            <div className="p-4 border-t border-slate-800">
                <div className="flex items-center gap-3 px-3 py-2 mb-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {user.name?.[0]?.toUpperCase() ?? "U"}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-semibold truncate">
                            {user.name ?? "User"}
                        </p>
                        <p className="text-slate-500 text-xs truncate">{user.email}</p>
                    </div>
                </div>
                <form action={logout}>
                    <button
                        type="submit"
                        className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-all duration-150"
                    >
                        <LogOut className="w-4 h-4" />
                        Sign out
                    </button>
                </form>
            </div>
        </aside>
    )
}