import MatchHistory from "@/app/components/MatchHistory";
import SummonerHeader from "./SummonerHeader";
import SummonerStatistics from "./SummonerStatistics";
import { getSummoner } from "./fetching";

export const revalidate = 60;

type Route = {
  region: string;
  riotId: string;
};

export default async function Page({
  params: { riotId, region },
}: {
  params: Route;
}) {
  let [name, tag] = riotId.split("-");
  if (!tag) tag = region;

  const { account, summoner, leagues, matches, error } = await getSummoner(
    region,
    name,
    tag
  );

  if (error) {
    if (error.status_code == 403) return <p>Riot API key has expired</p>;
    return <pre>{JSON.stringify(error, null, 2)}</pre>;
  }

  // const data = await getSummonerClasses24();
  // return <pre>{data}</pre>;

  if (!summoner || !account) return <main>Summoner not found</main>;

  return (
    <main className="flex flex-col gap-2">
      <div className="bg-slate-800 p-4 shadow-lg">
        <SummonerHeader summoner={summoner} account={account} />
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
