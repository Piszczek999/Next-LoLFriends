import { LeagueDB, SummonerDB } from "@/types/types";

function initLeagues(leagueData: LeagueDB[]) {
  return {
    solo: leagueData.find((item) => item.queueType === "RANKED_SOLO_5x5") || {
      queueType: "RANKED_SOLO_5x5",
      tier: "UNRANKED",
      rank: "",
    },
    flex: leagueData.find((item) => item.queueType === "RANKED_FLEX_SR") || {
      queueType: "RANKED_FLEX_SR",
      tier: "UNRANKED",
      rank: "",
    },
  };
}

export default async function SummonerStatistics({
  leagues,
}: {
  leagues: LeagueDB[];
}) {
  return (
    <div className="flex flex-col gap-1">
      {leagues?.map((queue, i) => (
        <div key={i} className="bg-slate-700 shadow p-2">
          <div className="flex">
            <img
              src={`https://dtneqrqtsogjewiotxnf.supabase.co/storage/v1/object/public/lolassets/rank/TFT_Regalia_${
                queue.tier.toLowerCase().charAt(0).toUpperCase() +
                queue.tier.slice(1).toLowerCase()
              }.png`}
              alt={queue.tier}
              width={100}
            />
            <div className="flex flex-col justify-center text-slate-400">
              <p className="capitalize text-xs">{queue.queueType}</p>
              <p className="font-bold">{`${queue.tier} ${queue.rank}`}</p>
              {queue.tier === "UNRANKED" || (
                <>
                  <p>{`LP: ${queue.leaguePoints}`}</p>
                  <div className="text-xs">
                    <p>
                      Wins:{" "}
                      {<span className="text-green-500">{queue.wins}</span>} -
                      Losses{" "}
                      {<span className="text-red-500">{queue.losses}</span>}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
