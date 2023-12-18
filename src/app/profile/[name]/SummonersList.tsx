import SummonerHeader from "@/app/summoners/[region]/[riotId]/SummonerHeader";
import { Database } from "@/types/supabase";
import { ProfileDB } from "@/types/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";

export default async function SummonersList({
  profile,
}: {
  profile: ProfileDB;
}) {
  const supabase = createClientComponentClient<Database>();
  if (!profile.puuid) return <p>No summoners to show</p>;
  const { data: summoners } = await supabase
    .from("summoner")
    .select()
    .eq("puuid", profile.puuid);

  const { data: account } = await supabase
    .from("account")
    .select()
    .eq("puuid", profile.puuid)
    .single();

  if (!summoners || !account) return <p>Could not get data</p>;

  return (
    <div className="flex flex-col gap-2">
      {summoners?.map((summoner) => (
        <Link
          key={summoner.id}
          className="bg-slate-750 p-2 hover:bg-slate-800"
          href={`/summoners/${summoner.region}/${account.gameName}-${account.tagLine}`}
        >
          <SummonerHeader account={account} summoner={summoner} onProfile />
        </Link>
      ))}
    </div>
  );
}
