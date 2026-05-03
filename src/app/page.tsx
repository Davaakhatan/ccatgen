import Link from "next/link";
import UserNav from "@/components/UserNav";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <span className="text-base font-bold tracking-tight">CCAT Practice</span>
        <div className="flex items-center gap-4">
          <Link href="/lessons" className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-950">
            Lessons
          </Link>
          <UserNav />
        </div>
      </nav>

      <main className="mx-auto grid max-w-6xl gap-8 px-4 pb-12 pt-8 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <section className="space-y-8">
          <div className="space-y-5">
            <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm">
              50 questions · 15 minutes · no calculator
            </div>
            <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Timed CCAT-style cognitive practice
            </h1>
            <p className="max-w-2xl text-base leading-7 text-slate-600">
              Practice a tighter mix of verbal reasoning, numerical logic, and spatial pattern questions under realistic time pressure.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <div className="text-2xl font-bold">22</div>
              <div className="mt-1 text-sm text-slate-500">Verbal</div>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <div className="text-2xl font-bold">17</div>
              <div className="mt-1 text-sm text-slate-500">Math & Logic</div>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <div className="text-2xl font-bold">11</div>
              <div className="mt-1 text-sm text-slate-500">Spatial</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/test/instructions"
              className="inline-flex items-center justify-center rounded-lg bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-slate-800"
            >
              Start Practice Test
            </Link>
            <Link
              href="/lessons"
              className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-100"
            >
              Learn Fast Methods
            </Link>
            <Link
              href="/test/results"
              className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-100"
            >
              View Results
            </Link>
          </div>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Practice Mix</h2>
          <div className="mt-5 space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold">Verbal reasoning</h3>
              <p className="mt-1 text-sm text-slate-600">Analogies, antonyms, and sentence completion.</p>
            </div>
            <div className="border-l-4 border-emerald-500 pl-4">
              <h3 className="font-semibold">Numerical logic</h3>
              <p className="mt-1 text-sm text-slate-600">Rates, ratios, data interpretation, sequences, and syllogisms.</p>
            </div>
            <div className="border-l-4 border-violet-500 pl-4">
              <h3 className="font-semibold">Spatial reasoning</h3>
              <p className="mt-1 text-sm text-slate-600">Visual series, rotations, transformations, and matrix completion.</p>
            </div>
          </div>
          <p className="mt-6 border-t border-slate-100 pt-4 text-xs text-slate-500">
            Not an official CCAT product. For practice purposes only.
          </p>
        </section>
      </main>
    </div>
  );
}
