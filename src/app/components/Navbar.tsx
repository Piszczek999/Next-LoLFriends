"use client";

import Link from "next/link";
import { useAuth } from "../auth/Auth";
import Searchbar from "./Searchbar";
import UserButton from "./UserButton";

export default function Navbar() {
  const { session, profile } = useAuth();

  return (
    <nav className="fixed top-0 z-50 w-full bg-slate-900 p-1 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start gap-2">
          <Link className="border-r-2 border-slate-700 p-2 text-xl" href={"/"}>
            LoLFriends
          </Link>

          <Searchbar />
        </div>
        <div className="flex items-center">
          <div className="flex items-center ml-3">
            {session ? <UserButton /> : <Link href={"/login"}>Log in</Link>}
          </div>
        </div>
      </div>
    </nav>
  );
}
