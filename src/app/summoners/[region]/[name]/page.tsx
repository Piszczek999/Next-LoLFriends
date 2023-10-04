import MatchHistory from "@/app/components/MatchHistory";
import SummonerHeader from "./SummonerHeader";
import SummonerStatistics from "./SummonerStatistics";
import { getSummoner } from "./fetching";
import { getChampionClasses16, getChampionsData } from "@/utils/generatingData";

export const revalidate = 60;

type Route = {
  region: string;
  name: string;
};

export default async function page({
  params: { name, region },
}: {
  params: Route;
}) {
  const { summoner, leagues, matches, error } = await getSummoner(region, name);

  if (error) {
    console.error(error);
    return <pre>{JSON.stringify(error, null, 2)}</pre>;
  }

  // const data = await getChampionClasses16();
  // return <pre>{data}</pre>;

  if (!summoner) return <main>Summoner not found</main>;

  return (
    <main className="flex flex-col gap-2">
      <div className="bg-slate-800 p-4 shadow-lg">
        <SummonerHeader summoner={summoner} />
      </div>
      <div className="flex flex-col lg:flex-row gap-2">
        <div className="basis-[256px] bg-slate-750 p-2 shadow-lg">
          <SummonerStatistics leagues={leagues!} />
        </div>
        <div className="bg-slate-750 p-2 shadow-lg grow">
          <MatchHistory
            matchIds={matches!}
            puuid={summoner.puuid}
            region={region}
          />
        </div>
      </div>
    </main>
  );
}
