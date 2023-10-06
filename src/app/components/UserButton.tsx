"use client";

import { User } from "@supabase/supabase-js";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, type DetailedHTMLProps, type HTMLAttributes } from "react";

type Props = {
  user: User | undefined;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export default function UserButton({ user, ...props }: Props) {
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  const toggleVisibility = () => {
    setVisible(!visible);
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
            height={40}
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
                height={64}
              />
              <div className="flex flex-col">
                <p className="text-left text-xl">{user.email}</p>
              </div>
            </div>
            <form action="/auth/sign-out" method="post">
              <button className="w-full text-center hover:bg-slate-750">
                Logout
              </button>
            </form>
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
