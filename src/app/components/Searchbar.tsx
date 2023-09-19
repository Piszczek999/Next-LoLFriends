"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Searchbar() {
  const [inputValue, setInputValue] = useState("");
  const [region, setRegion] = useState("");
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [isRegionVisible, setIsRegionVisible] = useState(false);
  const router = useRouter();

  function onSubmit(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") router.push(`/summoners/eune/${inputValue}`);
  }

  return (
    <div className="flex">
      <div
        onFocus={() => setIsRegionVisible(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget))
            setIsRegionVisible(false);
        }}
      ></div>
      <div
        onFocus={() => setIsInputVisible(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget))
            setIsInputVisible(false);
        }}
      >
        <input
          className="bg-slate-700 p-1"
          type="text"
          placeholder="Search"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => onSubmit(e)}
        />
        {isInputVisible && (
          <div className="absolute bg-slate-900 flex flex-col">
            <Link
              href={`/summoners/eune/Piszczek`}
              onClick={() => setIsInputVisible(false)}
            >
              Piszczek
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
