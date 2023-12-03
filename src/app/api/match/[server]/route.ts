import { Match, MatchDB, MatchData } from "@/types/types";
import { serviceSupabase } from "@/utils/supabase";
import { NextRequest, NextResponse } from "next/server";

// Function to fetch matches from Supabase
async function fetchMatchesFromSupabase(matchIds: string[]) {
  const { data: matchesFromSupabase, error } = await serviceSupabase
    .from("match")
    .select()
    .in("match_id", matchIds)
    .limit(matchIds.length);

  if (error) {
    console.error("Error fetching matches from Supabase:", error);
    return { error: "Error fetching matches from Supabase" };
  }

  const matches = matchesFromSupabase.map(
    (match) => JSON.parse(match.match_data!.toString()) as Match
  );

  return { matches };
}

// Function to fetch missing matches from the Riot API
async function fetchMissingMatchesFromRiotAPI(
  server: string,
  missingIds: string[]
) {
  const riotApiKey = process.env.RIOT_API_KEY;

  if (!riotApiKey) {
    console.error("Riot API key is missing");
    return { error: "Riot API key is missing" };
  }

  const missingMatchesResponsePromises = missingIds.map((matchId) =>
    fetch(
      `https://${server}.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${riotApiKey}`
    )
  );

  const missingMatchesResponse = await Promise.all(
    missingMatchesResponsePromises
  );

  if (missingMatchesResponse.some((res) => !res.ok)) {
    console.error("Error fetching missing matches from Riot API");
    return { error: "Error fetching missing matches from Riot API" };
  }

  const missingMatchesPromises = missingMatchesResponse.map(async (res) => {
    const match: Match = await res.json();
    return match;
  });

  const missingMatches = await Promise.all(missingMatchesPromises);
  const insertData = missingMatches.map((match) => ({
    match_id: match.metadata.matchId,
    match_data: JSON.stringify(match),
  }));

  await serviceSupabase
    .from("match")
    .upsert(insertData, { onConflict: "match_id" });

  return { missingMatches };
}

// Function to process matches and update the Supabase database
async function processMatches(
  matchesFromSupabase: Match[],
  matchIds: string[],
  server: string
) {
  const foundMatchIds =
    matchesFromSupabase.length > 0
      ? matchesFromSupabase.map((match) => match.metadata.matchId)
      : [];
  const missingIds = matchIds.filter((id) => !foundMatchIds.includes(id));

  const { missingMatches, error: riotApiError } =
    await fetchMissingMatchesFromRiotAPI(server, missingIds);

  if (!missingMatches) {
    return { error: riotApiError };
  }
  console.log(missingMatches.length);

  missingMatches.forEach((match) =>
    match.info.participants.forEach(async (participant) => {
      console.log(participant);

      await serviceSupabase
        .from("participant")
        .upsert({ ...participant, match_id: match.metadata.matchId });
    })
  );

  const matches = [...missingMatches, ...matchesFromSupabase];
  return { matches };
}

// Your existing GET function
export async function GET(
  request: NextRequest,
  { params: { server } }: { params: { server: string } }
) {
  const matchIds = request.nextUrl.searchParams.get("matchIds")?.split(",");
  if (!server || !matchIds) {
    return NextResponse.json({ error: "Invalid region or match ids" });
  }

  const { matches: matchesFromSupabase, error: supabaseError } =
    await fetchMatchesFromSupabase(matchIds);

  if (!matchesFromSupabase) {
    return NextResponse.json({ error: supabaseError });
  }

  const { matches, error: processMatchesError } = await processMatches(
    matchesFromSupabase,
    matchIds,
    server
  );

  if (processMatchesError) {
    return NextResponse.json({ error: processMatchesError });
  }

  console.info(
    `api/match/region performed for server: ${server}, matchIds: ${matchIds.join(
      ", "
    )}`
  );
  return NextResponse.json({ matches });
}
