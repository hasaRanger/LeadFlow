"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";

const cards = [
  {
    title: "Sales Overview at a Glance",
    description: "Track leads, deal value, and pipeline performance instantly.",
  },
  {
    title: "Manage and Track Leads",
    description: "View, filter, and update leads across pipeline stages.",
  },
  {
    title: "Add and Update Leads",
    description: "Capture lead details and keep records up to date.",
  },
]

export default function Home() {

  const router = useRouter();

  function handleSubmit() {
    router.push("/login");
  }

  return (
    <div className="h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 overflow-hidden">
      <main className="flex flex-col w-full max-w-5xl items-center justify-between py-32 px-16 sm:items-center overflow-hidden">
        <Image
          src="/logo.png"
          alt="logo"
          width={150}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-center sm:text-center mt-5">
          <h1 className="max-w-xs text-5xl sm:text-5xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Lead<span className="text-blue-400">Flow</span>
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Turn leads into deals → faster.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row mt-10">
          <button
            className="flex h-12 w-full items-center justify-center rounded-full border-2 hover:text-blue-400 font-semibold transition md:w-39.5"
            onClick={handleSubmit}
            type="button"
          >
            Get Started
          </button>
        </div>
        <div className="flex flex-col items-center justify-baseline">
          <h2 className="text-2xl font-bold text-white mt-20 mb-10">What can LeadFlow do for you?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cards.map((card) => (
              <div key={card.title} className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col items-start text-start">
                <h3 className="text-xl font-semibold text-white mb-2">{card.title}</h3>
                <p className="text-md text-slate-400">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div>

        </div>
      </main>
    </div>
  );
}
