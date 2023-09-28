import { MatchDB, Match } from "@/types/types";
import { serviceSupabase } from "@/utils/supabase";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { server: string; id: string } }
) {
  let match: Match;
  if (!params.server || !params.id) return NextResponse.error();

  const { data, error } = await serviceSupabase
    .from("match")
    .select()
    .eq("match_id", params.id)
    .single();

  if (data) {
    match = JSON.parse(data.match_data!.toString());
  } else {
    console.log(error.message);
    const res = await fetch(
      `https://${params.server}.api.riotgames.com/lol/match/v5/matches/${params.id}?api_key=${process.env.RIOT_API_KEY}`
    );
    match = await res.json();
    await serviceSupabase.from("match").upsert(
      {
        match_id: match.metadata.matchId,
        match_data: JSON.stringify(match),
      },
      { onConflict: "match_id" }
    );
  }

  match.info.participants.forEach(async (participant) => {
    const { error } = await serviceSupabase
      .from("participant")
      .upsert({ ...participant, match_id: match.metadata.matchId });
    if (error && error.code !== "23503") console.warn(error.message);
  });

  console.info("api/match/region/id performed");

  return NextResponse.json(match);
}
