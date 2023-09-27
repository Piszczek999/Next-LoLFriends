import type { SummonerDB, SummonerData } from "@/types/types";
import { servers } from "@/utils/constants";
import SummonerHeader from "./SummonerHeader";
import MatchHistory from "@/app/components/MatchHistory";
import SummonerStatistics from "./SummonerStatistics";

async function getSummoner(name: string, region: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOSTNAME}/api/summoner/${region}/${name}`,
    {
      next: { revalidate: 60 * 5 },
    }
  );
  const summoner: SummonerData = await res.json();

  return summoner;
}

async function getMatches(region: string, puuid: string): Promise<string[]> {
  const res = await fetch(
    `https://${servers[region]}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=100&api_key=${process.env.RIOT_API_KEY}`
  );
  return await res.json();
}

type Route = {
  region: string;
  id: string;
};

export default async function page({ params }: { params: Route }) {
  const { summoner, leagues } = await getSummoner(params.id, params.region);

  console.log(summoner);

  if (!summoner) return <main>Summoner not found</main>;
  const matches = await getMatches(params.region, summoner.puuid);

  return (
    <main className="flex flex-col gap-2">
      <div className="bg-slate-800 p-4 shadow-lg">
        <SummonerHeader summoner={summoner} />
      </div>
      <div className="flex flex-col lg:flex-row gap-2">
        <div className="basis-[256px] bg-slate-750 p-2 shadow-lg">
          <SummonerStatistics leagues={leagues} />
        </div>
        <div className="bg-slate-750 p-2 shadow-lg grow">
          <MatchHistory
            matchIds={matches}
            puuid={summoner.puuid}
            region={params.region}
          />
        </div>
      </div>
    </main>
  );
}
