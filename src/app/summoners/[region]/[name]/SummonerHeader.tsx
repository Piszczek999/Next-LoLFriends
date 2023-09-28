import { SummonerDB } from "@/types/types";
import Image from "next/image";

export default function SummonerHeader({ summoner }: { summoner: SummonerDB }) {
  return (
    <div className="flex gap-2">
      <div className="relative">
        <Image
          src={`https://dtneqrqtsogjewiotxnf.supabase.co/storage/v1/object/public/lolassets/profileicon/${summoner.profileIconId}.png`}
          alt="profileicon"
          width={100}
          height={100}
        />
        <div className="absolute flex justify-center -bottom-3 w-full text-center">
          <p className="bg-slate-700 px-2 rounded-full">
            {summoner.summonerLevel}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl">{summoner.name}</h1>
        <p>#friends rank</p>
      </div>
    </div>
  );
}
