"use client";

import { Database } from "@/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { User } from "@supabase/supabase-js";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { type DetailedHTMLProps, type HTMLAttributes, useState } from "react";

type Props = {
  user: User | undefined;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export default function UserButton({ user, ...props }: Props) {
  const [visible, setVisible] = useState(false);
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  if (user) {
    return (
      <div {...props}>
        <button onClick={toggleVisibility}>
          <Image
            className="rounded-full border-2 border-slate-500"
            src={"/user-icon.png"}
            alt="User Image"
            width={40}
          />
        </button>
        {visible && (
          <div className="absolute right-0 top-12 flex flex-col border-2 border-slate-900 bg-slate-800 p-2 shadow-lg">
            <div className="flex gap-2 border-b-2 border-slate-900 pb-2">
              <Image
                className="rounded-full border-2 border-slate-500"
                src={"/user-icon.png"}
                alt="User Image"
                width={64}
              />
              <div className="flex flex-col">
                <p className="text-left text-xl">{user.email}</p>
                <p>{user.email}</p>
              </div>
            </div>
            <button className="btn" onClick={handleSignOut}>
              Sign Out
            </button>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div {...props}>
        <button onClick={toggleVisibility}>
          <Image
            className="rounded-full border-2 border-slate-500"
            src={"/user-icon.png"}
            alt="User Image"
            width={40}
          />
        </button>
        {visible && (
          <div className="absolute right-0 top-12 flex flex-col border-2 border-slate-900 bg-slate-800 p-2 shadow-lg"></div>
        )}
      </div>
    );
  }
}
