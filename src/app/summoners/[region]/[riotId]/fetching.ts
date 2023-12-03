import { Account, LeagueDB, SummonerDB, SummonerData } from "@/types/types";
import { regions, servers } from "@/utils/constants";
import { serviceSupabase } from "@/utils/supabase";

export async function getSummoner(
  region: string,
  name: string,
  tag: string
): Promise<SummonerData> {
  // Check if required parameters are provided
  if (!region || !name || !tag)
    return { error: { message: "Region, name, or tag not provided" } };

  // Check if API key is provided
  if (!process.env.RIOT_API_KEY)
    return { error: { message: "RIOT_API_KEY not provided" } };

  // Helper function for handling API errors
  const handleApiError = (response: Response) => {
    return {
      error: {
        message: response.statusText,
        status_code: response.status,
      },
    };
  };

  try {
    // Account
    let account: Account;
    const { data: accDataFromSupa } = await serviceSupabase
      .from("account")
      .select("*")
      .eq("gameName", name)
      .eq("tagLine", tag)
      .single();

    if (accDataFromSupa) account = accDataFromSupa;
    else {
      const resAccount = await fetch(
        `https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${name}/${tag}?api_key=${process.env.RIOT_API_KEY}`
      );

      if (!resAccount.ok) return handleApiError(resAccount);

      account = await resAccount.json();
      await serviceSupabase.from("account").insert(account);
      console.log("new account inserted");
    }

    // Summoner
    const resSummoner = await fetch(
      `https://${regions[region]}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${account.puuid}?api_key=${process.env.RIOT_API_KEY}`
    );

    if (!resSummoner.ok) return handleApiError(resSummoner);

    const summoner: SummonerDB = await resSummoner.json();

    // Update summoner data in Supabase
    const { error: summError } = await serviceSupabase
      .from("summoner")
      .upsert({ ...summoner, region });

    if (summError) console.warn("Supabase error: ", summError);

    // Leagues
    const resLeagues = await fetch(
      `https://${regions[region]}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summoner.id}?api_key=${process.env.RIOT_API_KEY}`
    );

    if (!resLeagues.ok) return handleApiError(resLeagues);

    const leagues: LeagueDB[] = await resLeagues.json();

    // Update leagues data in Supabase
    await Promise.all(
      leagues.map(async (league) => {
        const res = await serviceSupabase
          .from("league")
          .upsert({ ...league, region });
        if (res.error)
          console.warn(`Failed to upsert league: ${res.error.message}`);
        return res;
      })
    );

    // Matches
    const resMatches = await fetch(
      `https://${servers[region]}.api.riotgames.com/lol/match/v5/matches/by-puuid/${account.puuid}/ids?start=0&count=100&api_key=${process.env.RIOT_API_KEY}`
    );

    if (!resMatches.ok) return handleApiError(resMatches);

    const matches: string[] = await resMatches.json();

    console.info("getSummoner performed");

    const data: SummonerData = {
      summoner,
      leagues,
      matches,
      account,
    };

    return data;
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    return { error: { message: "An unexpected error occurred" } };
  }
}
