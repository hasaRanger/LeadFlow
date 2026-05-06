"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";



export default function Home() {

  const router = useRouter();

  function handleSubmit() {
    router.push("/login");
  }
  
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <main className="flex flex-col w-full max-w-3xl items-center justify-between py-32 px-16 sm:items-center">
        <Image
          src="/logo.png"
          alt="logo"
          width={150}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-center sm:text-center mt-5">
          <h1 className="max-w-xs text-5xl sm:text-5xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            LeadFlow
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Turn leads into deals — faster.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row mt-10">
          <button
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid hover:text-blue-300 font-medium transition md:w-39.5"
            onClick={handleSubmit}
            type="button"
          >
            Get Started
          </button>
        </div>
      </main>
    </div>
  );
}
