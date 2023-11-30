import { LeagueDB } from "@/types/types";
import Image from "next/image";

const unrankedSolo = {
  queueType: "Ranked Solo",
  tier: "UNRANKED",
  rank: "",
  created_at: "",
  freshBlood: false,
  hotStreak: false,
  inactive: false,
  leagueId: "",
  leaguePoints: 0,
  losses: 0,
  miniSeries: null,
  summonerId: "",
  summonerName: "",
  veteran: false,
  wins: 0,
};

const unrankedFlex = {
  queueType: "Ranked Flex",
  tier: "UNRANKED",
  rank: "",
  created_at: "",
  freshBlood: false,
  hotStreak: false,
  inactive: false,
  leagueId: "",
  leaguePoints: 0,
  losses: 0,
  miniSeries: null,
  summonerId: "",
  summonerName: "",
  veteran: false,
  wins: 0,
};

function initLeagues(leagueData: LeagueDB[]) {
  let newLeagueData: LeagueDB[] = [];

  const solo = leagueData.find(
    (league) => league.queueType === "RANKED_SOLO_5x5"
  );
  if (solo) newLeagueData.push({ ...solo, queueType: "Ranked Solo" });
  else newLeagueData.push(unrankedSolo);

  const flex = leagueData.find(
    (league) => league.queueType === "RANKED_FLEX_SR"
  );
  if (flex) newLeagueData.push({ ...flex, queueType: "Ranked Flex" });
  else newLeagueData.push(unrankedFlex);

  return newLeagueData;
}

export default async function SummonerStatistics({
  leagues,
}: {
  leagues: LeagueDB[];
}) {
  const leagueData = initLeagues(leagues);

  return (
    <div className="flex flex-col gap-1 max-h-[68vh] overflow-y-scroll no-scroll">
      {leagueData.map((queue, i) => (
        <div key={i} className="bg-slate-700 shadow p- flex">
          <Image
            src={`${
              process.env.NEXT_PUBLIC_SUPABASE_URL
            }/storage/v1/object/public/LoLFriends/rank/TFT_Regalia_${
              queue.tier.toLowerCase().charAt(0).toUpperCase() +
              queue.tier.slice(1).toLowerCase()
            }.png`}
            alt={queue.tier}
            width={100}
            height={100}
          />
          <div className="flex flex-col justify-center text-slate-400">
            <p className="capitalize text-xs">{queue.queueType}</p>
            <p className="font-bold">{`${queue.tier} ${queue.rank}`}</p>
            {queue.tier === "UNRANKED" || (
              <>
                <p>{`LP: ${queue.leaguePoints}`}</p>
                <div className="text-xs">
                  <p>
                    Wins: {<span className="text-green-500">{queue.wins}</span>}{" "}
                    - Losses{" "}
                    {<span className="text-red-500">{queue.losses}</span>}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
