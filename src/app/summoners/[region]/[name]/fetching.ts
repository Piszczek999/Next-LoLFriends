import { LeagueDB, SummonerDB, SummonerData } from "@/types/types";
import { regions, servers } from "@/utils/constants";
import { serviceSupabase } from "@/utils/supabase";

export async function getSummoner(
  region: string,
  name: string
): Promise<SummonerData> {
  if (!region || !name)
    return { error: { message: "Region or name not provided" } };

  const apiRegion = regions[region];
  if (!apiRegion) return { error: { message: "provided region is invalid" } };

  // Summoner
  const resSummoner = await fetch(
    `https://${apiRegion}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${process.env.RIOT_API_KEY}`
  );

  if (!resSummoner.ok)
    return {
      error: {
        message: resSummoner.statusText,
        status_code: resSummoner.status,
      },
    };

  const summoner: SummonerDB = await resSummoner.json();

  const { error: summError } = await serviceSupabase
    .from("summoner")
    .upsert({ ...summoner, region });

  if (summError) console.warn("Supabase error: ", summError);

  // Leagues
  const resLeagues = await fetch(
    `https://${apiRegion}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summoner.id}?api_key=${process.env.RIOT_API_KEY}`
  );

  if (!resLeagues.ok)
    return {
      error: {
        message: resLeagues.statusText,
        status_code: resLeagues.status,
      },
    };

  const leagues: LeagueDB[] = await resLeagues.json();

  await Promise.all(
    leagues.map(async (league) => {
      const res = await serviceSupabase.from("league").upsert(league);
      if (res.error)
        console.warn(`Failed to upsert league: ${res.error.message}`);
      return res;
    })
  );

  const resMatches = await fetch(
    `https://${servers[region]}.api.riotgames.com/lol/match/v5/matches/by-puuid/${summoner.puuid}/ids?start=0&count=100&api_key=${process.env.RIOT_API_KEY}`
  );

  if (!resMatches.ok)
    return {
      error: {
        message: resMatches.statusText,
        status_code: resMatches.status,
      },
    };

  const matches: string[] = await resMatches.json();

  console.info("getSummoner performed");

  const data: SummonerData = {
    summoner: summoner,
    leagues: leagues,
    matches: matches,
  };

  return data;
}
