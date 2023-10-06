"use client";

import { useEffect, useState } from "react";

import type { Match, MatchData } from "@/types/types";
import { servers } from "@/utils/constants";
import MatchTile from "./MatchTile/MatchTile";

async function clientGetMatch(
  matchId: string,
  region: string
): Promise<MatchData> {
  const res = await fetch(`/api/match/${servers[region]}/${matchId}`);

  if (!res.ok)
    return {
      error: {
        message: res.statusText,
        status_code: res.status,
      },
    };

  const match: Match = await res.json();

  return { match };
}

export default function MatchHistory({
  puuid,
  matchIds,
  region,
}: {
  puuid: string;
  matchIds: string[];
  region: string;
}) {
  const [visibleMatches, setVisibleMatches] = useState(5);
  const [matches, setMatches] = useState<MatchData[]>([]);
  const [loadingMatches, setLoadingMatches] = useState(true);

  const loadMoreMatches = () => {
    setVisibleMatches(visibleMatches + 5);
  };

  useEffect(() => {
    const fetchMatches = async () => {
      setLoadingMatches(true);
      console.log(matchIds.slice(visibleMatches - 5, visibleMatches));
      const additionalMatchesData = await Promise.all(
        matchIds
          .slice(visibleMatches - 5, visibleMatches)
          .map((matchId) => clientGetMatch(matchId, region))
      );
      setMatches((prevMatches) => [...prevMatches, ...additionalMatchesData]);
      setLoadingMatches(false);
    };
    fetchMatches();
  }, [matchIds, region, visibleMatches]);

  return (
    <div className="flex flex-col gap-1 grow">
      {matches.map((matchData, i) => (
        <MatchTile key={i} puuid={puuid} matchData={matchData} />
      ))}
      {loadingMatches &&
        [1, 2, 3, 4, 5].map((e) => (
          <div
            key={e}
            className="flex h-24 gap-4 shadow px-2 bg-slate-750 items-center"
          >
            <div className="basis-20 h-5/6 bg-slate-700 rounded"></div>
            <div className="basis-20 h-5/6 bg-slate-700 rounded"></div>
            <div className="basis-32 h-5/6 bg-slate-700 rounded"></div>
            <div className="basis-20 h-5/6 bg-slate-700 rounded"></div>
            <div className="basis-56 h-5/6 bg-slate-700 rounded"></div>
          </div>
        ))}

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        onClick={loadMoreMatches}
      >
        Load More
      </button>
    </div>
  );
}
