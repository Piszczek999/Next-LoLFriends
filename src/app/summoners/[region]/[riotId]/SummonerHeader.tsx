import { Account, ProfileDB, SummonerDB } from "@/types/types";
import Image from "next/image";
import AddButton from "./AddButton";
import Link from "next/link";

export default function SummonerHeader({
  summoner,
  account,
  profile,
  onProfile = false,
}: {
  summoner: SummonerDB;
  account: Account;
  profile?: ProfileDB | null;
  onProfile?: boolean;
}) {
  return (
    <div className="flex gap-2">
      <div className="relative">
        <Image
          src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/LoLFriends/profileicon/${summoner.profileIconId}.png`}
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
        <h1 className="text-2xl">{account.gameName}</h1>
        {profile && (
          <div className="flex items-center gap-2 hover:opacity-80">
            <Image
              className="rounded-full border-2 border-slate-500"
              src={"/user-icon.png"}
              alt="User Image"
              width={20}
              height={20}
            />
            <Link href={`/profile/${profile.name}`}>{profile.name}</Link>
          </div>
        )}
      </div>
      <div>{!onProfile && <AddButton puuid={summoner.puuid} />}</div>
    </div>
  );
}
