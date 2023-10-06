"use client";

import { Database } from "@/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import Searchbar from "./Searchbar";
import UserButton from "./UserButton";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { ProfileDB } from "@/types/types";

export default function Navbar() {
  const supabase = createClientComponentClient<Database>();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<ProfileDB | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();
  });

  useEffect(() => {
    const getProfile = async () => {
      if (!user) return;
      const { data } = await supabase
        .from("profile")
        .select()
        .eq("id", user.id)
        .single();
      if (data) setProfile(data);
    };
    getProfile();
  }, [user]);

  return (
    <nav className="fixed top-0 z-50 w-full bg-slate-900 p-1 shadow-lg px-3 py-3 h-[68px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start gap-2">
          <Link className="border-r-2 border-slate-700 p-2 text-xl" href={"/"}>
            LoLFriends
          </Link>

          <Searchbar />
        </div>
        <div className="flex items-center">
          <div className="flex items-center ml-3">
            {user ? (
              <UserButton profile={profile} />
            ) : (
              <Link href={"/login"}>Log in</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
