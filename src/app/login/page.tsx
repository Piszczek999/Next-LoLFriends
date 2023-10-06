import Link from "next/link";
import Messages from "./messages";

export default function Login() {
  return (
    <main className="flex flex-col gap-2 items-center">
      <div className="bg-slate-750 p-4 shadow-lg">
        <Link
          href="/"
          className="py-2 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>{" "}
          Back
        </Link>

        <form
          className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
          action="/auth/sign-in"
          method="post"
        >
          <label className="text-md" htmlFor="email">
            Email
          </label>
          <input
            className="px-4 py-2 bg-slate-700 border mb-6"
            name="email"
            placeholder="you@example.com"
            required
          />
          <label className="text-md" htmlFor="password">
            Password
          </label>
          <input
            className="px-4 py-2 bg-slate-700 border mb-6"
            type="password"
            name="password"
            placeholder="••••••••"
            required
          />
          <button className="bg-green-700 rounded px-4 py-2 text-slate-300 mb-2">
            Sign In
          </button>
          <button
            formAction="/auth/sign-up"
            className="border bg-yellow-700 border-gray-700 rounded px-4 py-2 text-slate-300 mb-2"
          >
            Sign Up
          </button>
          <Messages />
        </form>
        <form action="/auth/sign-in-github" method="post">
          <button>Sign in with Github</button>
        </form>
      </div>
    </main>
  );
}
