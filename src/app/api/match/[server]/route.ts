import { Match, MatchDB, MatchData } from "@/types/types";
import { serviceSupabase } from "@/utils/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params: { server } }: { params: { server: string } }
) {
  const matchIds = request.nextUrl.searchParams.get("matchIds")?.split(",");
  if (!server || !matchIds)
    return NextResponse.json({ error: "Invalid region or match ids" });

  const { data: matchesDB, error: sberror } = await serviceSupabase
    .from("match")
    .select()
    .in("match_id", matchIds)
    .limit(matchIds.length);
  if (!matchesDB) return NextResponse.json({ error: sberror });

  let matches =
    matchesDB.length > 0
      ? matchesDB.map(
          (matchDB) => JSON.parse(matchDB.match_data!.toString()) as Match
        )
      : [];

  let missingMatches: Match[];
  if (matches.length !== matchIds.length) {
    const foundMatchIds =
      matches.length == 0 ? [] : matches.map((match) => match.metadata.matchId);
    const missingIds = matchIds.filter((id) => !foundMatchIds.includes(id));
    const missingMatchesResponsePromises = missingIds.map((matchId) =>
      fetch(
        `https://${server}.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${process.env.RIOT_API_KEY}`
      )
    );
    const missingMatchesResponse = await Promise.all(
      missingMatchesResponsePromises
    );
    const missingMatchesPromises = missingMatchesResponse.map((res) =>
      res.json()
    );
    missingMatches = await Promise.all(missingMatchesPromises);

    missingMatches.forEach((match) =>
      match.info.participants.forEach((participant) =>
        serviceSupabase
          .from("participant")
          .upsert({ ...participant, match_id: match.metadata.matchId })
      )
    );

    matches = [...missingMatches, ...matches];
  }

  console.info("api/match/region performed");

  return NextResponse.json({ matches });
}
