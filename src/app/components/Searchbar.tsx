"use client";

import { Database } from "@/types/supabase";
import { SummonerDB } from "@/types/types";
import { regions } from "@/utils/constants";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Searchbar() {
  const [inputValue, setInputValue] = useState("");
  const [region, setRegion] = useState("eune");
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [isRegionVisible, setIsRegionVisible] = useState(false);
  const [summoners, setSummoners] = useState<SummonerDB[] | null>(null);
  const router = useRouter();

  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    const getSummoners = async () => {
      const { data } = await supabase
        .from("summoner")
        .select()
        .ilike("name", `%${inputValue}%`)
        .limit(5);
      setSummoners(data);
    };
    getSummoners();
  }, [supabase, inputValue]);

  function onSubmit(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") router.push(`/summoners/${region}/${inputValue}`);
  }

  return (
    <div className="flex items-center bg-slate-700 border-[1px] border-slate-900">
      <div
        onFocus={() => setIsRegionVisible(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget))
            setIsRegionVisible(false);
        }}
      >
        <button className="p-1">{region}</button>
        {isRegionVisible && (
          <div className="absolute bg-slate-700 flex flex-col border-[1px] border-slate-800 shadow-lg overflow-y-scroll h-[140px] gap-1">
            {Object.keys(regions).map((region, i) => (
              <button
                key={i}
                onClick={() => {
                  setIsRegionVisible(false);
                  setRegion(region);
                }}
              >
                {region}
              </button>
            ))}
          </div>
        )}
      </div>
      <div
        onFocus={() => setIsInputVisible(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget))
            setIsInputVisible(false);
        }}
      >
        <input
          className="bg-transparent p-1 w-[150px]"
          type="text"
          placeholder="Search"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => onSubmit(e)}
        />
        {isInputVisible && (
          <div className="absolute bg-slate-700 flex flex-col border-[1px] border-slate-800 shadow-lg gap-1">
            {summoners
              ?.filter((summoner) =>
                summoner.name?.toLowerCase().includes(inputValue.toLowerCase())
              )
              .map((summoner) => (
                <Link
                  key={summoner.id}
                  href={`/summoners/${summoner.region}/${summoner.name}`}
                  onClick={() => {
                    setInputValue("");
                    setIsInputVisible(false);
                  }}
                >
                  <div className="flex gap-1">
                    <Image
                      src={`https://dtneqrqtsogjewiotxnf.supabase.co/storage/v1/object/public/lolassets/profileicon/${summoner.profileIconId}.png`}
                      alt="icon"
                      width={25}
                      height={25}
                    />
                    <span>{`${summoner.name} (${summoner.region})`}</span>
                  </div>
                </Link>
              ))}
          </div>
        )}
      </div>
      <Image
        className="cursor-pointer"
        src={"/search-icon.png"}
        alt="Search"
        width={25}
        height={25}
        onClick={() => router.push(`/summoners/${region}/${inputValue}`)}
      />
    </div>
  );
}
