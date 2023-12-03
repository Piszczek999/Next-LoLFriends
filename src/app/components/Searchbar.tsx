"use client";

import { Database } from "@/types/supabase";
import { Account, SummonerDB } from "@/types/types";
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
  const [accounts, setAccounts] = useState<AccSumm[] | null>(null);
  const router = useRouter();

  const supabase = createClientComponentClient<Database>();

  type AccSumm = Account & {
    summoner: SummonerDB[];
  };

  useEffect(() => {
    const getSummoners = async () => {
      try {
        const { data } = await supabase
          .from("account")
          .select("*, summoner(*)")
          .ilike("gameName", `%${inputValue}%`)
          .limit(5);

        setAccounts(data);
      } catch (error) {
        console.error("Error fetching summoners:", error);
      }
    };
    getSummoners();
  }, [supabase, inputValue]);

  function onSubmit(e: React.KeyboardEvent<HTMLInputElement>) {
    let [name, tag] = inputValue.split("#");
    if (!tag) tag = region;
    if (e.key === "Enter") router.push(`/summoners/${region}/${name}-${tag}`);
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
            {accounts
              // .filter((summoner) =>
              //   summoner.name?.toLowerCase().includes(inputValue.toLowerCase())
              // )
              ?.map((account) =>
                account.summoner.map((summoner, i) => (
                  <Link
                    key={i}
                    href={`/summoners/${summoner.region}/${account.gameName}-${account.tagLine}`}
                    onClick={() => {
                      setInputValue("");
                      setIsInputVisible(false);
                    }}
                  >
                    <div className="flex gap-1">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/LoLFriends/profileicon/${summoner.profileIconId}.png`}
                        alt="icon"
                        width={25}
                        height={25}
                      />
                      <span>{`${account.gameName}#${account.tagLine} (${summoner.region})`}</span>
                    </div>
                  </Link>
                ))
              )}
          </div>
        )}
      </div>
      <Image
        className="cursor-pointer"
        src={"/search-icon.png"}
        alt="Search"
        width={25}
        height={25}
        onClick={() => {
          let [name, tag] = inputValue.split("#");
          if (!tag) tag = region;
          router.push(`/summoners/${region}/${name}-${tag}`);
        }}
      />
    </div>
  );
}
