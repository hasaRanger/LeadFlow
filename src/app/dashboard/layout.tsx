import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import Sidebar from "../../components/Sidebar"

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await auth()
    if (!session) redirect("/login")

    return (
        <div className="min-h-screen bg-slate-950 flex">
            <Sidebar user={session.user} />
            <main className="flex-1 ml-64 p-8">
                {children}
            </main>
        </div>
    )
}