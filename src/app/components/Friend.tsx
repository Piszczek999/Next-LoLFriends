"use client";

import { ProfileDB } from "@/types/types";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState } from "react";

export default function Friend({ friend }: { friend: ProfileDB }) {
  const [optionsVisible, setOptionVisible] = useState(false);

  return (
    <div className="flex p-2 hover:bg-slate-700 items-center ">
      <Image
        className="rounded-full mr-2"
        src="/user-icon.png"
        alt="icon"
        width={24}
        height={24}
      />
      <p>{friend.name}</p>
      <button
        className="ml-auto px-2 hover:bg-slate-600 rounded"
        onFocus={() => setOptionVisible(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget))
            setOptionVisible(false);
        }}
      >
        <FontAwesomeIcon icon={faEllipsisVertical} size="lg" />
        {optionsVisible && (
          <div className="absolute right-0 flex flex-col bg-slate-800 p-1">
            <button className="hover:bg-slate-750 hover:text-slate-300">
              Send Message
            </button>
            <button className="hover:bg-slate-750 hover:text-slate-300">
              Remove
            </button>
          </div>
        )}
      </button>
    </div>
  );
}
