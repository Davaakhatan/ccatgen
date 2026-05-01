"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function UserNav() {
  const { data: session } = useSession();

  if (!session?.user) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href="/login"
          className="text-sm font-medium text-slate-600 hover:text-slate-950 transition-colors"
        >
          Sign In
        </Link>
        <Link
          href="/signup"
          className="text-sm font-medium bg-slate-950 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors"
        >
          Sign Up
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-slate-600">
        {session.user.name}
      </span>
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="text-sm font-medium text-slate-600 hover:text-slate-950 transition-colors"
      >
        Sign Out
      </button>
    </div>
  );
}
