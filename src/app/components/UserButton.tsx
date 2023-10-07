"use client";

import { ProfileDB } from "@/types/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, type DetailedHTMLProps, type HTMLAttributes } from "react";
import { useAuth } from "../auth/Auth";

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export default function UserButton({ ...props }: Props) {
  const [visible, setVisible] = useState(false);
  const { profile } = useAuth();

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  if (profile) {
    return (
      <div {...props}>
        <button
          onFocus={() => setVisible(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) setVisible(false);
          }}
        >
          <Image
            className="rounded-full border-2 border-slate-500"
            src={"/user-icon.png"}
            alt="User Image"
            width={40}
            height={40}
          />
          {visible && (
            <div className="absolute right-0 flex flex-col border-2 border-slate-800 bg-slate-700 p-2 shadow-lg">
              <div className="flex flex-col items-center border-b-2 border-slate-750 pb-2">
                <Image
                  className="rounded-full border-2 border-slate-500"
                  src={"/user-icon.png"}
                  alt="User Image"
                  width={64}
                  height={64}
                />
                <p className="text-lg">{profile.name}</p>
                <p className="text-sm text-slate-400">{profile.email}</p>
              </div>
              <form action="/auth/sign-out" method="post">
                <button className="w-full text-center hover:bg-slate-750">
                  Logout
                </button>
              </form>
            </div>
          )}
        </button>
      </div>
    );
  } else null;
}
