import { LeagueDB, SummonerDB, SummonerData } from "@/types/types";
import { regions } from "@/utils/constants";
import { serviceSupabase } from "@/utils/supabase";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { region: string; id: string } }
) {
  if (!params.region || !params.id) return NextResponse.error();

  // Summoner
  const resSummoner = await fetch(
    `https://${
      regions[params.region]
    }.api.riotgames.com/lol/summoner/v4/summoners/by-name/${
      params.id
    }?api_key=${process.env.RIOT_API_KEY}`
  );
  const summoner: SummonerDB = await resSummoner.json();
  if (!summoner.name) return null;
  await serviceSupabase
    .from("summoner")
    .upsert({ ...summoner, region: params.region });

  // Leagues
  const resLeagues = await fetch(
    `https://${
      regions[params.region]
    }.api.riotgames.com/lol/league/v4/entries/by-summoner/${
      summoner.id
    }?api_key=${process.env.RIOT_API_KEY}`
  );
  const leagues: LeagueDB[] = await resLeagues.json();

  leagues.forEach(async (league) => {
    const es = await serviceSupabase.from("league").upsert(league);
    console.log(es.error);
  });

  console.log(leagues);

  console.log("api/summoner/region/id performed");

  const data: SummonerData = { summoner: summoner, leagues: leagues };
  console.log(data);

  return NextResponse.json(data);
}
